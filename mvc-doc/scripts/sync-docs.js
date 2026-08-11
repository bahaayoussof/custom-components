const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "../../components");
const docSiteDir = path.join(__dirname, "..");
const targetDocsDir = path.join(docSiteDir, "docs/components");

// Helper to escape characters that crash the MDX parser outside of code blocks
function escapeMdxText(text) {
  const parts = text.split("```");
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Outside code blocks:
      // 1. Escape < not followed by a valid HTML tag name
      parts[i] = parts[i].replace(
        /<(?!\/?(?:a|b|i|p|br|span|div|strong|em|img|code|pre|details|summary|h[1-6]|ul|ol|li|table|thead|tbody|tr|th|td)(?=\s|>|\/|\b))/gi,
        "&lt;",
      );
      // 2. Escape curly braces
      parts[i] = parts[i].replace(/{/g, "&#123;").replace(/}/g, "&#125;");
    }
  }
  return parts.join("```");
}

// Convert Cshtml/Razor markup to JS Template literal
function convertCshtmlToJsTemplate(content, componentName) {
  // Remove top blocks and ViewData style/asset registers
  let text = content.replace(/@\*[\s\S]*?\*@/g, "");

  function removeViewDataBlocks(str) {
    let s = str;
    while (true) {
      const match = s.match(
        /@if\s*\(!?Html\.(ViewData|ViewContext)[\s\S]*?\{/gi,
      );
      if (!match) break;

      const startIdx = s.indexOf(match[0]);
      let braceCount = 1;
      let j = startIdx + match[0].length;
      while (j < s.length && braceCount > 0) {
        if (s[j] === "{") braceCount++;
        else if (s[j] === "}") braceCount--;
        j++;
      }

      if (braceCount === 0) {
        const inner = s.substring(startIdx + match[0].length, j - 1);
        const cleanInner = inner
          .replace(/Html\.(ViewData|ViewContext)[\s\S]*?;/gi, "")
          .trim();
        s = s.substring(0, startIdx) + cleanInner + s.substring(j);
      } else {
        break;
      }
    }
    return s;
  }

  text = removeViewDataBlocks(text);

  text = text.replace(/@using\s+[\w\.]+;?/g, "");
  text = text.replace(/@model\s+[^\r\n]+/gi, "");

  // Replace ASP.NET Core path shortcuts (tilde prefix) in src/href attributes
  text = text.replace(/src=["']~\/([^"']+)["']/gi, 'src="/$1"');
  text = text.replace(/href=["']~\/([^"']+)["']/gi, 'href="/$1"');

  // Remove C# @await Html.PartialAsync lines
  text = text.replace(/@await\s+Html\.PartialAsync\s*\([^)]*\);?/gi, "");

  // Remove C# blocks like @{ ... }
  // We match matching braces to support blocks with braces inside
  let braceCount = 0;
  let inBlock = false;
  let blockStart = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "@" && text[i + 1] === "{") {
      if (!inBlock) {
        inBlock = true;
        blockStart = i;
        braceCount = 0;
      }
    }
    if (inBlock) {
      if (text[i] === "{") braceCount++;
      if (text[i] === "}") {
        braceCount--;
        if (braceCount === 0) {
          text =
            text.substring(0, blockStart) +
            " ".repeat(i - blockStart + 1) +
            text.substring(i + 1);
          inBlock = false;
        }
      }
    }
  }

  // Extract styles & scripts
  let css = "";
  text = text.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, p1) => {
    css += p1.trim() + "\n";
    return "";
  });

  let js = "";
  text = text.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (match, p1) => {
    js += p1.trim() + "\n";
    return "";
  });

  let markup = text.trim();

  // Perform replacements on markup and js
  function replaceRazor(str) {
    let s = str;

    // Clean up Html.Raw (keeping @ prefix)
    s = s.replace(/@Html\.Raw\(([^)]+)\)/g, "@$1");

    // Replace C# conditionals with balanced brace parser
    let index = 0;
    while (true) {
      const match = s.match(/@if\s*\(([^)]+(?:\([^)]*\)[^)]*)*)\)\s*\{/);
      if (!match) break;

      const startIdx = s.indexOf(match[0]);
      const cond = match[1].trim();

      let braceCount = 1;
      let j = startIdx + match[0].length;
      while (j < s.length && braceCount > 0) {
        if (s[j] === "{") braceCount++;
        else if (s[j] === "}") braceCount--;
        j++;
      }

      if (braceCount === 0) {
        const inner = s.substring(startIdx + match[0].length, j - 1);

        let jsCond = "";
        if (
          cond.includes("IsNullOrWhiteSpace") ||
          cond.includes("IsNullOrEmpty")
        ) {
          const varName = cond
            .split("(")
            .pop()
            .replace(/[)]/g, "")
            .replace("Model.", "")
            .trim();
          const cleanVar = varName.charAt(0).toLowerCase() + varName.slice(1);
          const hasNegation = cond.startsWith("!");
          jsCond = hasNegation ? `props.${cleanVar}` : `!props.${cleanVar}`;
        } else {
          const cleanCond = cond.replace(/^!/, "").trim();
          const varName = cleanCond.replace("Model.", "").trim();
          const cleanVar =
            varName === "Dot"
              ? "dot"
              : varName.charAt(0).toLowerCase() + varName.slice(1);
          jsCond = `props.${cleanVar}`;
          if (cond.startsWith("!")) {
            jsCond = "!" + jsCond;
          }
        }

        // Clean up common C# string helper methods inside jsCond
        jsCond = jsCond.replace(/\.Trim\(\)/gi, ".trim()");
        jsCond = jsCond.replace(/\.StartsWith\(([^)]+)\)/gi, ".startsWith($1)");
        jsCond = jsCond.replace(/\.EndsWith\(([^)]+)\)/gi, ".endsWith($1)");
        jsCond = jsCond.replace(/\.Length/g, ".length");

        // Check if there is a trailing else block
        let elseInner = "";
        let endJ = j;
        const nextSearch = s.substring(j);
        const elseMatch = nextSearch.match(/^\s*else\s*\{/);
        if (elseMatch) {
          const elseStart = j + elseMatch[0].length;
          let elseBraceCount = 1;
          let k = elseStart;
          while (k < s.length && elseBraceCount > 0) {
            if (s[k] === "{") elseBraceCount++;
            else if (s[k] === "}") elseBraceCount--;
            k++;
          }
          if (elseBraceCount === 0) {
            elseInner = s.substring(elseStart, k - 1);
            endJ = k;
          }
        }

        const cleanInner = inner.replace(/`/g, "\\`").trim();
        let replacement = "";
        if (elseInner) {
          const cleanElse = elseInner.replace(/`/g, "\\`").trim();
          replacement = `\${${jsCond} ? \`${cleanInner}\` : \`${cleanElse}\`}`;
        } else {
          replacement = `\${${jsCond} ? \`${cleanInner}\` : ''}`;
        }

        s = s.substring(0, startIdx) + replacement + s.substring(endJ);
      } else {
        break;
      }
    }

    // Replace other attribute ternaries robustly (ignoring whitespaces)
    s = s.replace(
      /@\(Required\s*\?\s*["']\s*required-field\s*["']\s*:\s*["']\s*["']\s*\)/gi,
      "${props.required ? ' required-field' : ''}",
    );
    s = s.replace(
      /@\(Required\s*\?\s*["']\s*required-field\s*["']\s*:\s*["']\s*["']\s*\)/gi,
      "${props.required ? 'required-field' : ''}",
    );
    s = s.replace(
      /@\(Required\s*\?\s*["']\s*required\s+data-required=['"]true['"]\s*["']\s*:\s*["']\s*["']\s*\)/gi,
      "${props.required ? 'required data-required=\"true\"' : ''}",
    );
    s = s.replace(
      /@\(Required\s*\?\s*["']\s*required\s*["']\s*:\s*["']\s*["']\s*\)/gi,
      "${props.required ? 'required' : ''}",
    );
    s = s.replace(
      /@\(readOnly\s*\?\s*["']\s*true\s*["']\s*:\s*["']\s*false\s*["']\s*\)/gi,
      "${props.readonly ? 'true' : 'false'}",
    );

    // Replace dateType script ternaries
    s = s.replace(
      /@\(DateType\s*==\s*["']gregorian["']\s*\?\s*["']gregorian["']\s*:\s*["']ummalqura["']\)/gi,
      "${props.dateType === 'gregorian' ? 'gregorian' : 'ummalqura'}",
    );
    s = s.replace(
      /@\(DateType\s*==\s*["']gregorian["']\s*\?\s*["']["']\s*:\s*DateType\)/gi,
      "${props.dateType === 'gregorian' ? '' : props.dateType}",
    );

    // Replace C# local variables
    s = s.replace(
      /@fontSize/g,
      "${props.fs ? 'font-size: ' + props.fs + ';' : 'font-size: 12px;'}",
    );
    s = s.replace(
      /@fontWeight/g,
      "${props.fw ? 'font-weight: ' + props.fw + ';' : ''}",
    );
    s = s.replace(/@DisplayName/g, "${props.fileName || ''}");
    s = s.replace(
      /@FileType/g,
      "${props.fileId ? props.fileId.split('.').pop().toLowerCase() : 'other'}",
    );
    s = s.replace(/@titleColor/g, "${props.titleColor || ''}");
    s = s.replace(/@borderColor/g, "${props.borderColor || ''}");
    s = s.replace(/@contentClass/g, "${props.isSmall ? 'small' : ''}");
    s = s.replace(/@alreadyWritten/g, "true");
    s = s.replace(/@cssAlreadyWritten/g, "true");

    // Replace standard Razor props
    if (componentName === "Badge") {
      s = s.replace(/@Content/g, "${props.label}");
    }
    if (componentName === "LabelTip") {
      s = s.replace(/props\.hasTooltip/g, "!!props.tooltip");
      s = s.replace(/@wrapperClass/g, "${props.cssClass}");
    }
    if (componentName === "Tooltip") {
      s = s.replace(
        /props\.canRender/g,
        "((!!props.label || !!props.icon) && !!props.content)",
      );
      s = s.replace(/props\.hasLabel/g, "!!props.label");
      s = s.replace(/props\.hasIcon/g, "!!props.icon");
      s = s.replace(/@tooltipId\b/g, "tip-demo");
      s = s.replace(
        /@\(!hasLabel\s*\?\s*["']\s*tt-icon-only\s*["']\s*:\s*["']\s*["']\s*\)/gi,
        "${!props.label ? ' tt-icon-only' : ''}",
      );
      s = s.replace(/@icon\b/g, "${props.icon}");
      s = s.replace(/@content\b/g, "${props.content}");
    }
    if (componentName === "FileUpload") {
      s = s.replace(
        /@\(maxFiles\.HasValue\s*\?\s*maxFiles\.Value\s*:\s*["']null["']\)/gi,
        "${props.multiple ? props.maxFiles : 'null'}",
      );
      s = s.replace(
        /@\(allowedFileTypes\s*!=\s*null\s*\?\s*Html\.Raw\(Json\.Serialize\(allowedFileTypes\)\)\s*:\s*["']null["']\)/gi,
        "${props.allowedExtensions ? JSON.stringify(props.allowedExtensions.split(',').map(e => e.trim())) : 'null'}",
      );
      s = s.replace(
        /@maxFileSizeDouble\.ToString\([^)]+\)/gi,
        "${props.maxSizeMb}",
      );
      s = s.replace(
        /@\(friendlyTypes\)/gi,
        "${props.allowedExtensions ? '، وصيغ الملفات المدعومة تشمل ' + props.allowedExtensions : ''}",
      );
      s = s.replace(/@maxFileSize\b/gi, "${props.maxSizeMb}");
      s = s.replace(/@maxFiles\b/gi, "${props.multiple ? props.maxFiles : ''}");
    }
    s = s.replace(/@(Model\.)?TitleColor/g, "${props.titleColor}");
    s = s.replace(/@(Model\.)?BorderColor/g, "${props.borderColor}");
    s = s.replace(/@(Model\.)?Title/g, "${props.title}");
    s = s.replace(/@(Model\.)?Content/g, "${props.content}");
    s = s.replace(/@(Model\.)?Icon/g, "${props.icon}");
    s = s.replace(/@(Model\.)?IsSmall/g, "${props.isSmall}");
    s = s.replace(/@(Model\.)?Label/g, "${props.label}");
    s = s.replace(/@(Model\.)?Required/g, "${props.required}");
    s = s.replace(/@(Model\.)?Id/g, "${props.id}");
    s = s.replace(/@(Model\.)?Placeholder/g, "${props.placeholder}");
    s = s.replace(/@(Model\.)?DateType/g, "${props.dateType}");
    s = s.replace(/@(Model\.)?OnSelect/g, "${props.onSelect}");
    s = s.replace(/@(Model\.)?FileId/g, "${props.fileId}");
    s = s.replace(/@(Model\.)?FileName/g, "${props.fileName}");
    s = s.replace(/@(Model\.)?Details/g, "${props.details}");
    s = s.replace(/@(Model\.)?actionUrl/g, "${props.actionUrl}");
    s = s.replace(/@placement/g, "${props.placement}");
    s = s.replace(/@maxHeight/g, "${props.maxHeight}");
    s = s.replace(/@cssClass/g, "${props.cssClass}");
    s = s.replace(/@BgColor/g, "${props.bgColor}");
    s = s.replace(/@Color/g, "${props.labelColor}");
    s = s.replace(/@Radius/g, "${props.radius}");
    s = s.replace(/@fs/g, "${props.fs}");
    s = s.replace(/@fw/g, "${props.fw}");
    s = s.replace(/@tooltip\b/g, "${props.tooltip}");

    // Lowercase local variables
    s = s.replace(/@label\b/g, "${props.label}");
    s = s.replace(/@id\b/g, "${props.id}");
    s = s.replace(/@placeholder\b/g, "${props.placeholder}");
    s = s.replace(/@type\b/g, '${props.type || "text"}');
    s = s.replace(/@value\b/g, '${props.value || ""}');

    return s;
  }

  markup = replaceRazor(markup);
  js = replaceRazor(js);

  if (componentName === "StatusModal") {
    js += `
      $(document).ready(function() {
        if (typeof showStatusModal === 'function') {
          showStatusModal({
            type: '\${props.type}',
            title: '\${props.title}',
            message: '\${props.message}',
            showActionButton: true,
            actionButtonText: '\${props.confirmText}',
            confirmText: '\${props.confirmText}',
            showCancelButton: true,
            cancelButtonText: '\${props.cancelText}',
            cancelText: '\${props.cancelText}'
          });
        }
      });
    `;
    css += `
      .modal {
        position: relative !important;
        display: block !important;
        opacity: 1 !important;
        z-index: 1 !important;
      }
      .modal-backdrop {
        display: none !important;
      }
      .modal-dialog {
        margin: 0 auto !important;
        transform: none !important;
      }
      body {
        background: #f8f9fa !important;
      }
    `;
  }

  return {
    markup,
    css,
    js,
  };
}

// Clean and create target docs dir
if (fs.existsSync(targetDocsDir)) {
  fs.rmSync(targetDocsDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDocsDir, { recursive: true });

fs.writeFileSync(
  path.join(targetDocsDir, "_category_.json"),
  JSON.stringify(
    {
      label: "Components",
      position: 2,
      link: {
        type: "generated-index",
        description:
          "List of reusable Momah UI components, partial views, and tables.",
      },
    },
    null,
    2,
  ),
  "utf8",
);

// Read all directories in components folder
const items = fs.readdirSync(componentsDir, { withFileTypes: true });
const generatedComponents = {};

items.forEach((item) => {
  if (!item.isDirectory()) return;
  const name = item.name;

  // Filter for component directories (start with _ or is momah-table)
  if (!name.startsWith("_") && name !== "momah-table") return;

  const componentSrcDir = path.join(componentsDir, name);
  const targetComponentName = name.startsWith("_") ? name.substring(1) : name;
  const componentDestDir = path.join(targetDocsDir, targetComponentName);

  fs.mkdirSync(componentDestDir, { recursive: true });

  // Find all files in the component folder
  const files = fs.readdirSync(componentSrcDir);
  let mdFile = null;
  const codeFiles = [];
  const images = [];

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".md") {
      mdFile = file;
    } else if ([".cshtml", ".js", ".css"].includes(ext)) {
      codeFiles.push(file);
    } else if ([".png", ".jpg", ".jpeg", ".gif", ".svg"].includes(ext)) {
      images.push(file);
    }
  });

  // Copy images
  images.forEach((img) => {
    fs.copyFileSync(
      path.join(componentSrcDir, img),
      path.join(componentDestDir, img),
    );
  });

  // Extract real markup if .cshtml exists
  const cshtmlFile = files.find((f) => f.endsWith(".cshtml"));
  if (cshtmlFile) {
    const cshtmlContent = fs.readFileSync(
      path.join(componentSrcDir, cshtmlFile),
      "utf8",
    );
    try {
      generatedComponents[targetComponentName] = convertCshtmlToJsTemplate(
        cshtmlContent,
        targetComponentName,
      );
    } catch (e) {
      console.error(`Failed parsing cshtml for ${name}:`, e);
    }
  }

  if (mdFile) {
    let mdContent = fs.readFileSync(path.join(componentSrcDir, mdFile), "utf8");

    // Run escaping on markdown content to prevent MDX compilation errors
    mdContent = escapeMdxText(mdContent);

    // Replace relative image references e.g. ![Alt](image.png) -> ![Alt](./image.png)
    // Make sure we only prepend ./ if it doesn't already start with ./, ../, /, or http
    mdContent = mdContent.replace(
      /!\[([^\]]*)\]\((?!https?:\/\/|\/|\.\/|\.\.\/)([^)]+)\)/g,
      "![$1](./$2)",
    );

    // Generate MDX content with Tabs
    let mdxContent = `---
sidebar_label: "${targetComponentName}"
title: "${targetComponentName}"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="guide" label="Guide" default>
${mdContent}
</TabItem>


`;

    // Add Code Tabs
    codeFiles.forEach((codeFile) => {
      const codeContent = fs.readFileSync(
        path.join(componentSrcDir, codeFile),
        "utf8",
      );
      const ext = path.extname(codeFile).toLowerCase();
      let lang = "cshtml";
      if (ext === ".js") lang = "javascript";
      if (ext === ".css") lang = "css";

      mdxContent += `<TabItem value="${codeFile}" label="${codeFile}">

\`\`\`${lang}
${codeContent}
\`\`\`

</TabItem>
`;
    });

    mdxContent += `</Tabs>\n`;

    fs.writeFileSync(
      path.join(componentDestDir, "index.mdx"),
      mdxContent,
      "utf8",
    );
    console.log(`Synced ${name} -> docs/components/${targetComponentName}`);
  }
});

// Output all parsed templates for playground use (disabled - output empty object)
fs.writeFileSync(
  path.join(docSiteDir, "src/components/Playground/generated.js"),
  `export const generatedComponents = {};`,
  "utf8",
);
console.log("Playground templates generation bypassed (disabled).");
