const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../..');
const docSiteDir = path.join(__dirname, '..');
const targetDocsDir = path.join(docSiteDir, 'docs/components');

// Helper to escape characters that crash the MDX parser outside of code blocks
function escapeMdxText(text) {
  const parts = text.split('```');
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Outside code blocks:
      // 1. Escape < not followed by a valid HTML tag name
      parts[i] = parts[i].replace(/<(?!\/?(?:a|b|i|p|br|span|div|strong|em|img|code|pre|details|summary|h[1-6]|ul|ol|li|table|thead|tbody|tr|th|td)(?=\s|>|\/|\b))/gi, '&lt;');
      // 2. Escape curly braces
      parts[i] = parts[i].replace(/{/g, '&#123;').replace(/}/g, '&#125;');
    }
  }
  return parts.join('```');
}

// Clean and create target docs dir
if (fs.existsSync(targetDocsDir)) {
  fs.rmSync(targetDocsDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDocsDir, { recursive: true });

fs.writeFileSync(
  path.join(targetDocsDir, '_category_.json'),
  JSON.stringify({
    label: 'Components',
    position: 2,
    link: {
      type: 'generated-index',
      description: 'List of reusable Momah UI components, partial views, and tables.'
    }
  }, null, 2),
  'utf8'
);

// Read all directories in the root
const items = fs.readdirSync(rootDir, { withFileTypes: true });

items.forEach(item => {
  if (!item.isDirectory()) return;
  const name = item.name;
  
  // Filter for component directories (start with _ or is momah-table)
  if (!name.startsWith('_') && name !== 'momah-table') return;

  const componentSrcDir = path.join(rootDir, name);
  const targetComponentName = name.startsWith('_') ? name.substring(1) : name;
  const componentDestDir = path.join(targetDocsDir, targetComponentName);

  fs.mkdirSync(componentDestDir, { recursive: true });

  // Find all files in the component folder
  const files = fs.readdirSync(componentSrcDir);
  let mdFile = null;
  const codeFiles = [];
  const images = [];

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.md') {
      mdFile = file;
    } else if (['.cshtml', '.js', '.css'].includes(ext)) {
      codeFiles.push(file);
    } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
      images.push(file);
    }
  });

  // Copy images
  images.forEach(img => {
    fs.copyFileSync(path.join(componentSrcDir, img), path.join(componentDestDir, img));
  });

  if (mdFile) {
    let mdContent = fs.readFileSync(path.join(componentSrcDir, mdFile), 'utf8');

    // Run escaping on markdown content to prevent MDX compilation errors
    mdContent = escapeMdxText(mdContent);

    // Replace relative image references e.g. ![Alt](image.png) -> ![Alt](./image.png)
    // Make sure we only prepend ./ if it doesn't already start with ./, ../, /, or http
    mdContent = mdContent.replace(/!\[([^\]]*)\]\((?!https?:\/\/|\/|\.\/|\.\.\/)([^)]+)\)/g, '![$1](./$2)');

    // Generate MDX content with Tabs
    // Note: Tabs and TabItem JSX tags must NOT have leading whitespace,
    // otherwise the MDX loader parses them as indented markdown blocks.
    let mdxContent = `---
sidebar_label: "${name}"
title: "${name} Component"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="guide" label="Guide" default>

${mdContent}

</TabItem>
`;

    // Add Code Tabs
    codeFiles.forEach(codeFile => {
      const codeContent = fs.readFileSync(path.join(componentSrcDir, codeFile), 'utf8');
      const ext = path.extname(codeFile).toLowerCase();
      let lang = 'cshtml';
      if (ext === '.js') lang = 'javascript';
      if (ext === '.css') lang = 'css';

      mdxContent += `<TabItem value="${codeFile}" label="${codeFile}">

\`\`\`${lang}
${codeContent}
\`\`\`

</TabItem>
`;
    });

    mdxContent += `</Tabs>\n`;

    fs.writeFileSync(path.join(componentDestDir, 'index.mdx'), mdxContent, 'utf8');
    console.log(`Synced ${name} -> docs/components/${targetComponentName}`);
  }
});
