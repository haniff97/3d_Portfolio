# Haniff Hamdan Portfolio

A React/Vite portfolio with project management, a photo gallery, a shared Three.js ribbon background, and a DeepSeek-powered assistant on the About page. Content editors run locally; the public chatbot uses a separate Express backend.

## Run locally

```sh
npm install
npm run dev
```

Open the URL printed by Vite. To enable chat, start the backend in a separate terminal using the instructions below.

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

The blog URL is configured as `http://35.230.24.195/` in `BLOG_URL` in `src/siteConfig.js`. Both the navbar ("Blog") and About page ("Read my blog") use this shared value. Blog navigation uses a normal `<a href>` in the same tab, while internal portfolio pages use React Router links. This keeps the external destination separate from client-side routes and removes the need to open another tab.

If the blog moves, update the default in `src/siteConfig.js`, or set `VITE_BLOG_URL` before building. Vite reads this environment variable at build time, so rebuild and redeploy after changing it. Changing the link does not manage the external blog server or its availability.

### Verification and regression checks

During the fix, the PDF was visually confirmed to render, navigation from Résumé to Projects/About worked on mobile and desktop layouts, and clicking Blog opened the supplied “Welcome to my blog” article. The production build and targeted lint checks passed; the repository-wide lint command still reported existing errors in older components.

To recheck after future changes:

1. Run `npm run dev` and open **Résumé**.
2. Wait for the PDF to render, then click **About**, **Projects**, and **Home** to confirm the navbar remains usable.
3. At a narrow viewport, open the mobile menu while the PDF is visible and navigate to another page.
4. Check **Download PDF** and **Open PDF**, and confirm the preview fits the viewport.
5. Click **Blog** from the navbar and **Read my blog** from About; both should reach the configured blog homepage.
6. Run `npm run build` before deploying.

## Edit profile content and personal photo

Run `npm run dev`, then open `/manage-profile` or use **Edit profile & photo** in the footer. This local page lets you:

- Upload a JPEG, PNG, or WebP portrait up to 5 MB, add alternative text, and choose top/center/bottom framing.
- Replace or remove the portrait. Home and About show the same saved photo; Putrajaya artwork is the fallback when no portrait is set.
- Edit your name, role, location, homepage headlines, introduction, homepage About text, biography, and contact email/headline.

Click **Save profile**, then commit `src/data/profile.json` and any new files in `public/profile-images/`. Build and deploy normally. Photo removal clears the reference without deleting the original image file. The editor and its `/__profile-editor` write endpoint run only in the local development server and are excluded from production. The public pages display the saved content, not the editor. The résumé PDF, career history, skills, and certifications remain separately maintained; project cards still use `/manage-projects`.

The editorial redesign takes visual inspiration from [Izuddin Helmi’s portfolio](https://www.izuddinhelmi.me/): oversized typography, a quiet gray background, ruled sections, and a prominent contact area. The portfolio retains its own text, projects, navigation, and imagery.

Run `node --test server/*.test.js` to verify both local editors, including uploads, persistence, stale-save protection, and rejection of cross-origin writes.

## Photo-only gallery

**Personal photo** in the navbar opens `/personal-photo`, a responsive gallery with no card titles or captions. Click a photo to open the full image. This gallery is separate from the portrait on Home and About.

Run `npm run dev` and open `/manage-photos` (also linked in the local footer). Select one or multiple PNG, JPEG, or WebP files, up to 5 MB each. Photos save immediately in upload order. Removing a photo removes its gallery entry and keeps the original file.

Commit `src/data/photos.json` and new files in `public/gallery-images/`, then build and deploy normally. The manager, its links, and its write endpoint are development-only; production displays the saved gallery. Run `node --test server/*.test.js` to check the local editors.

## Shared ribbon background

`RibbonBackground.jsx` mounts once above the routes, so its Three.js animation continues across all portfolio pages. The original shader is visually inspired by [Bsehovac’s RetroArch Menu Ribbon](https://codepen.io/bsehovac/pen/jdawXK), adapted to a light sage/lilac palette. The canvas is fixed, ignores pointer events, and cannot change column sizing. Use the bottom-right button to pause; reduced-motion preferences start it paused. Hidden tabs stop rendering, pixel density is capped, and WebGL failure leaves the normal page background.

### Arrange project order

In `/manage-projects`, use the up/down arrows beside each title. Each move saves immediately to `src/data/projects.json`, preserving any unsaved form edits. The Projects page and homepage carousel both follow this order. Commit the JSON file and deploy to publish the new order.

## About-page AI chatbot


The assistant answers questions about Haniff’s experience, projects and this portfolio. It uses DeepSeek through a private Express API. The browser calls `/api/chat`; the server adds public profile/project facts and cached blog excerpts and instructions before calling DeepSeek. It does not train a model or search the résumé PDF.

1. In `backend/`, run `npm install`.
2. Copy `.env.example` to `.env` only if `.env` does not already exist. Add your private `DEEPSEEK_API_KEY` and set `DEEPSEEK_MODEL=deepseek-flash`.
3. Run `npm start` in `backend/`, alongside the frontend development server.
4. Open `/about` and send a question. Restart the backend after changing its environment or prompt when using `npm start`.

Never put the API key in a `VITE_` variable or commit `.env`. Static hosting of `dist/` alone does not run the chatbot; production also needs the backend and an `/api/` reverse proxy.

The prompt asks for short, conversational answers, minimal dash punctuation, and redirects for unrelated questions. These are model instructions, not a guaranteed topic filter. Recent messages stay in React state and are sent with each request; this service does not persist chat history.

- [Chatbot engineering guide](docs/CHATBOT_ENGINEERING.md): request flow, data grounding, tuning, restrictions, limitations and troubleshooting.
- [Backend setup and deployment](backend/README.md): environment, API contract and reverse proxy configuration.
- [Portfolio fixes and design decisions](docs/PORTFOLIO_FIXES.md): issues addressed and practical regression checks.

Run `npm test --prefix backend` for backend HTTP tests with a mocked provider. These tests do not prove real model behavior; evaluate sample questions separately against the live API.

New public blog posts are discovered from the homepage on the next chat request after the five-minute cache expires. The assistant receives up to four articles, with bounded excerpts. No manual portfolio rebuild is needed for blog updates. See the engineering guide for extraction limits.

### Blog knowledge

The chatbot also reads public blog articles automatically. It refreshes up to six posts linked from the blog homepage on the next question after a five-minute cache expires. No portfolio redeployment is needed for those blog updates. Older posts beyond this window and drafts are not included. See the engineering guide for the HTML scraper and its limits.
