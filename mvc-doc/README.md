# Momah UI Components - Documentation Site

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. It displays the documentation, playground, and source code of all UI components.

## Architecture & Component Sync

The source code and original markdown guides for the UI components live in the root directory of this repository (folders starting with `_` like `_Banner`, `_DateRange`, etc.). 

A synchronization script (`scripts/sync-docs.js`) is used to automatically convert these root component directories into Docusaurus docs in `docs/components/`. It extracts:
- Component guide markdown (`_*.md`)
- C# Razor templates (`_*.cshtml`)
- JavaScript/CSS source files
- Screenshots and assets

### Running Sync Separately
If you make changes to any component files in the root folder, they must be synchronized to the documentation site. You can run:
```bash
npm run presync
```

## Installation

Install dependencies using npm:
```bash
npm install
```

## Local Development

Start the local development server (which automatically runs the sync script first):
```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

To build the static production site (this also runs the sync script first):
```bash
npm run build
```

This command generates static content into the `build` directory.

