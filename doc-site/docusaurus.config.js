// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Momah Components",
  tagline: "Enterprise ASP.NET MVC UI Components Library",
  favicon: "img/favicon.svg",

  future: {
    v4: true,
  },

  url: "https://momah-components.example.com",
  baseUrl: "/",

  onBrokenLinks: "ignore",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Momah Components",
        logo: {
          alt: "Momah Components Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            to: "/components",
            label: "Gallery",
            position: "left",
          },
          // {
          //   to: "/playground",
          //   label: "Playground",
          //   position: "left",
          // },
          {
            href: "https://github.com/bahaayoussof/custom-components",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Documentation",
            items: [
              { label: "Overview", to: "/docs/intro" },
              { label: "Components Gallery", to: "/components" },
              // { label: "Playground", to: "/playground" },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Momah Components. Crafted by <a href="https://www.linkedin.com/in/bahaayoussof/" target="_blank" rel="noopener noreferrer">Bahaa Youssof</a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          "csharp",
          "aspnet",
          "bash",
          "json",
          "markup-templating",
        ],
      },
    }),
};

export default config;
