# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Manage project cards locally

1. Run `npm run dev` and open the local URL printed by Vite.
2. Open **Projects → Manage projects** (or `/manage-projects`).
3. Choose **New project**, fill in the title and description, upload a PNG/JPEG/WebP image (up to 5 MB) or enter an image URL, and add optional GitHub, demo, and Notion links.
4. Click **Save project**. Select an existing card in the sidebar to edit it.
5. Commit `src/data/projects.json` and any new files in `public/project-images/`, then build and deploy normally.

The editor saves real files, not browser storage. It runs only in the Vite development server on the same computer. The editor page, link, and write endpoint are excluded from the production build. New cards appear first. Existing bundled image paths continue to work. Replacing an image keeps its old file so previously referenced images are not accidentally removed. If another editor changes the data, reload before saving to avoid overwriting their changes.
