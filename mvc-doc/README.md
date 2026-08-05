# Momah UI Components

A modern, reusable UI component platform for ASP.NET Core MVC, accompanied by an interactive documentation website built with Docusaurus.

The project provides a centralized hub where developers can discover reusable UI components, understand their APIs, explore implementation examples, and integrate them quickly into their projects.

Its primary goal is to promote code reuse, standardize UI development, reduce duplicated effort, and accelerate feature delivery across multiple applications.

---

## ✨ Features

- 📚 Interactive component documentation
- 🧩 Reusable ASP.NET Core MVC UI Components
- 💻 View complete source code
- 📝 Step-by-step implementation guides
- 📋 Component API & configuration documentation
- 📄 Copy-ready implementation examples
- 🔍 Fast component search
- 📱 Responsive documentation website
- ⚡ Automatic documentation synchronization
- 🎮 Interactive Playground *(Currently in progress)*
- 🔤 Advanced AutoComplete Component *(Currently under development)*

---

## Project Structure

```text
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
- Razor Partial View (.cshtml)
- JavaScript
- CSS / SCSS
- Assets (images, icons)
- Examples
- Configuration

---

## Documentation Synchronization

Instead of maintaining documentation manually, the project automatically synchronizes component files into the Docusaurus documentation.

The synchronization process extracts:

- Markdown documentation
- Razor templates (.cshtml)
- JavaScript
- CSS / SCSS
- Images & assets

and generates the documentation inside:

```text
docs/components/
```

Run manually:

```bash
npm run presync
```

The synchronization process also runs automatically before:

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

Builds the static documentation website for deployment.

---

## Tech Stack

- ASP.NET Core MVC
- Razor Partial Views
- Docusaurus
- React
- TypeScript
- MDX
- Sass
- Prism
- Node.js

---

## Why This Project?

Many web applications repeatedly implement the same UI patterns.

This platform aims to solve that by providing:

- A single source of truth for reusable components.
- Consistent UI implementation across projects.
- Faster onboarding for new developers.
- Reduced duplicated code.
- Easier maintenance.
- Better developer experience.

---

## Current Status

The project is actively being developed.

### Recently Added

- Documentation synchronization system
- Interactive documentation
- Source code viewer
- Component implementation guides

### Currently Working On

- Interactive Playground
- Advanced AutoComplete component
- Additional reusable MVC components

---

## Roadmap

- [ ] Interactive Playground
- [ ] AutoComplete Component
- [ ] Additional UI Components
- [ ] Theme customization
- [ ] Accessibility improvements
- [ ] AI-powered component search
- [ ] Versioned documentation
- [ ] Component filtering & categories
- [ ] Performance improvements

---

## Contributing

Contributions are welcome.

If you'd like to improve the documentation, fix bugs, or add new reusable components:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

## License

MIT License
