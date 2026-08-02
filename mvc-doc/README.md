# Momah UI Components

A modern, reusable, and customizable UI component library with an interactive documentation website built using Docusaurus.

The project is designed to simplify building consistent web applications by providing production-ready UI components, live playgrounds, implementation guides, and source code examples.

## ✨ Features

- 📚 Interactive documentation
- 🎮 Live playground for components
- 💻 View complete source code
- 📝 Step-by-step implementation guides
- 🎨 Reusable UI components
- ⚡ Automatic documentation synchronization
- 🔍 Component search
- 📱 Responsive documentation website

---

## Project Structure

```
/
├── _Banner/
├── _DateRange/
├── _Tooltip/
├── docs/
├── src/
├── scripts/
└── docusaurus.config.ts
```

Each component lives inside its own root directory (`_ComponentName`).

A component typically contains:

- Documentation
- Razor template
- JavaScript
- CSS / SCSS
- Assets (images, icons)

---

## Documentation Sync

Instead of maintaining documentation manually, this project automatically synchronizes component files into the Docusaurus documentation.

The synchronization script extracts:

- Markdown documentation
- Razor (.cshtml)
- JavaScript
- CSS / SCSS
- Images and assets

and generates the documentation under:

```
docs/components/
```

Run manually:

```bash
npm run presync
```

The sync process also runs automatically before:

```bash
npm start
```

and

```bash
npm run build
```

---

## Installation

```bash
npm install
```

---

## Local Development

```bash
npm start
```

Starts the local development server and automatically synchronizes all component documentation.

---

## Production Build

```bash
npm run build
```

Builds the static documentation website.

---

## Tech Stack

- Docusaurus
- React
- TypeScript
- MDX
- Sass
- Prism
- Node.js

---

## Contributing

Contributions are welcome.

If you'd like to improve the documentation, fix bugs, or add new components:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## Roadmap

- [ ] More UI Components
- [ ] Dark / Light theme improvements
- [ ] AI component search
- [ ] Better playground customization
- [ ] Accessibility improvements
- [ ] Versioned documentation

---

## License

MIT License
