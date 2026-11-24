# Krish Ankur Shah — portfolio

Live at **https://krish0728vt.github.io/resume/**

An engineering-drawing-style portfolio built with [Astro](https://astro.build) and [Three.js](https://threejs.org). Every hardware project has a 3D exploded view generated from its real CAD (KiCad and EasyEDA STEP exports, OpenSCAD and CadQuery).

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321/resume/
npm run build      # static site in dist/
```

Pushing to `main` builds and deploys automatically through GitHub Actions (`.github/workflows/deploy.yml`).

## Where things live

| Path | What it is |
|---|---|
| `src/content/projects/*.md` | One file per project: front matter (title, status, stack, 3D model, parts list, photos) plus the write-up in Markdown |
| `src/data/profile.ts` | About text, experience, education, skills, certifications, contact details |
| `src/pages/index.astro` | The home page (title sheet, about, experience, education, project register, skills, notes, contact) |
| `src/pages/projects/[slug].astro` | The project page template, with the pinned exploded view and the write-up |
| `src/scripts/drawing.ts` | Turns a `.glb` into the line drawing: hidden lines dashed, dimensions, exploded offsets |
| `src/scripts/project-viewer.ts` | Scroll-driven exploded view, parts list and callout balloons |
| `src/scripts/showcase.ts` | The rotating drawing carousel on the home page |
| `src/styles/global.css` | The whole design system |
| `public/models/*.glb` | 3D models (compressed, one node per part, exploded offsets stored in each node's extras) |
| `public/thumbs/*.png` | Line-drawing thumbnails for the project register |
| `public/images/<project>/` | Photos |

## Adding a project

1. Create `src/content/projects/my-project.md`. Copy an existing file for the front matter.
2. Add `cover:` and `gallery:` entries pointing at images in `public/images/my-project/`.
3. For a 3D view, add `model: my-project.glb` and a `parts:` list. Each `match` is a regular expression tested against the part names inside the model.
4. Set `order:` to place it in the register.

## Adding photos to an existing project

Put the files in `public/images/<project>/` and list them under `gallery:` in that project's Markdown file. The first image becomes the header and card photo if you also set `cover:`.
