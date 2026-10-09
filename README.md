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

## PDF preview and blog navigation fixes

### PDF page: navbar stopped responding

**Reported behavior:** After opening the résumé page, other navbar buttons could no longer be clicked.

The previous résumé component included a full-screen particle layer, which was a likely source of intercepted pointer events. The fix removed that layer from the résumé page and separated the navigation from the PDF rendering area. This addressed the overlap risk without relying on the PDF viewer to manage navigation.

Changes:

- The fixed `.site-header` sits above page content with `z-index: 100`.
- The `.pdf-shell` contains the preview in its own stacking context (`position: relative`, `z-index: 0`, and `isolation: isolate`). Decorative canvas layers do not receive pointer events.
- `ResizeObserver` fits PDF pages to the preview container instead of using fixed desktop/mobile scale values. All pages render after the document loads.
- The PDF.js worker is bundled locally from the version used by `react-pdf`, instead of loading it from a CDN. The installed top-level `pdfjs-dist` version differs from the nested version used by `react-pdf`; using the matching worker avoids a version mismatch.
- The embedded preview disables text and annotation layers. Use **Open PDF** for the browser's full PDF viewing features, including selectable text and document links.
- **Download PDF** downloads the file, while **Open PDF** opens it in a new tab. Both remain available if the embedded preview fails, and a loading/error message explains the preview state.
- Mobile navigation uses an accessible toggle button, closes on route changes, and supports Escape.

Relevant files: `src/components/Resume/ResumeNew.jsx`, `src/components/Navbar.jsx`, `src/index.css`, and `src/siteConfig.js`.

To replace the downloadable résumé, update `public/Haniff-Resume.pdf`. `RESUME_URL` in `src/siteConfig.js` is shared by the preview, download, and open links.

### Blog: link did not reach the intended page

**Reported behavior:** Clicking Blog did not open the intended blog page.

The old navbar pointed to `http://35.230.24.195/`. That address responded successfully when checked, so it was not treated as a confirmed server outage. The owner supplied the intended article URL:

[Welcome to my blog](http://35.230.24.195/blog/welcome-to-my-blog-aFPGQ)

The fix stores that exact URL in `BLOG_URL` in `src/siteConfig.js`. Both the navbar and About page use this shared value. Blog navigation uses a normal `<a href>` in the same tab, while internal portfolio pages use React Router links. This keeps the external destination separate from client-side routes and removes the need to open another tab.

If the blog moves, update the default in `src/siteConfig.js`, or set `VITE_BLOG_URL` before building. Vite reads this environment variable at build time, so rebuild and redeploy after changing it. Changing the link does not manage the external blog server or its availability.

### Verification and regression checks

During the fix, the PDF was visually confirmed to render, navigation from Résumé to Projects/About worked on mobile and desktop layouts, and clicking Blog opened the supplied “Welcome to my blog” article. The production build and targeted lint checks passed; the repository-wide lint command still reported existing errors in older components.

To recheck after future changes:

1. Run `npm run dev` and open **Résumé**.
2. Wait for the PDF to render, then click **About**, **Projects**, and **Home** to confirm the navbar remains usable.
3. At a narrow viewport, open the mobile menu while the PDF is visible and navigate to another page.
4. Check **Download PDF** and **Open PDF**, and confirm the preview fits the viewport.
5. Click **Blog** from the navbar and **Read my blog** from About; both should reach the configured external article.
6. Run `npm run build` before deploying.
