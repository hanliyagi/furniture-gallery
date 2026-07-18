# Furniture Gallery

An open-source 3D furniture gallery built with React, TypeScript, and React Three Fiber. It presents 93 procedural furniture designs across 21 furniture types, each with an interactive WebGL preview and downloadable JSON definition.

The gallery works without a backend: the complete catalog is bundled with the app. An optional API can supply the same catalog at runtime.

## Features

- Interactive, keyboard-accessible 3D previews powered by React Three Fiber
- 93 procedurally defined designs with dimensions, materials, parts, and geometry metadata
- Search and filters for furniture type, style, lifestyle, and rendering compatibility
- Download a single design or the complete catalog as JSON
- Deterministic catalog validation and export commands
- Responsive layout for desktop, tablet, and mobile

## Quick start

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/hanliyagi/furniture-gallery.git
cd furniture-gallery
npm ci
npm run dev
```

Open `http://localhost:5173` in a browser.

## Commands

```bash
npm run dev               # Start the development server
npm run test              # Run unit tests
npm run lint              # Run ESLint
npm run typecheck         # Check TypeScript types
npm run build             # Create a production build in dist/
npm run verify            # Run test, lint, typecheck, and build
npm run catalog:validate  # Validate catalog data
npm run catalog:report    # Generate catalog-output reports
npm run catalog:export    # Export the catalog as a ZIP archive
```

## Optional API

By default, the app displays its bundled catalog. To use an external API, copy the example environment file and set its base URL.

```bash
cp .env.example .env.local
```

```env
VITE_API_BASE_URL=http://localhost:4000
```

The API must provide `GET /api/furniture` and return an object containing the complete `items` array. If the request fails or the response is invalid, the app automatically falls back to its bundled data.

## Catalog data

Furniture definitions live in `src/three/*Designs.ts`. Each definition uses meters, a floor-centered coordinate system, material IDs from `src/three/materials.json`, and JSON-serializable geometry parts.

To add a design, define it in the appropriate `*Designs.ts` file, register the renderer in `src/three/modelRegistry.ts`, add its metadata to `src/data/fallbackFurniture.ts`, then run `npm run verify` and `npm run catalog:validate`.

## Deployment

The included `render.yaml` deploys the project as a static site on Render. Connect this repository through **New → Blueprint** in Render. The build command is `npm ci && npm run build` and the publish directory is `dist`.

Any static host that supports a Vite single-page application can also be used.

## Data and trademarks

The models are original procedural representations for visualization and development. Product names, dimensions, and outbound purchase links, where present, are reference information only. Trademarks belong to their respective owners; this project is not affiliated with or endorsed by them.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## License

Released under the [MIT License](LICENSE).
