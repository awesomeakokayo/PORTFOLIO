# Awesome Akokayo — Portfolio

This repository contains the active portfolio and an archive of the previous site.

```text
awesome-portfolio-complete/   Active Next.js portfolio (deployment target)
resources/                    Archived Vite site, source, docs, media and assets
```

## Run the active site

```bash
cd awesome-portfolio-complete
npm install
npm run dev
```

Open http://localhost:3000.

## Verify

```bash
cd awesome-portfolio-complete
npm run typecheck
npm run build
```

## Deploy

Point the hosting project at this repository and set the **Root Directory** to `awesome-portfolio-complete`. The repository root is intentionally not a Next.js app; `resources/` is archived material and is never deployed.

## Archive

`resources/` preserves the previous Vite implementation, its project media, brand notes, planning documents and the TechSkillHub design package. Dependencies (`node_modules`, `.venv`) were removed because they can be regenerated from the archived package files.
