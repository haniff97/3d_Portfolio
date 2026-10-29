# Portfolio fixes and design decisions

This is a maintenance guide to changes made while developing the portfolio. It describes fixes and checks, not a claim that every feature has automated end-to-end coverage.

## Résumé blocked navigation

The old résumé view had a full-screen particle layer that could intercept clicks. The page was adjusted to keep navigation above content, isolate the PDF preview's stacking context and make decorative canvases ignore pointer events. The preview sizes to its container with ResizeObserver and uses a locally bundled worker matching react-pdf's PDF.js version. Open/download links remain available if preview rendering fails.

Regression check: open the résumé, wait for rendering, then navigate to About and Projects. Repeat with the mobile menu. Check open/download links. See the root README for the detailed PDF notes.

## External blog links

External destinations use normal anchors rather than React Router links. The navbar and About page share `BLOG_URL` in `src/siteConfig.js`, currently the blog homepage. A project can have its own `blogLink`; the receipt tracker has its article link. Same-tab blog navigation avoids depending on a new tab opening.

Regression check: test the global Blog link and a project-specific Read blog link separately. Correct link markup cannot fix an unavailable external server. `VITE_BLOG_URL` changes require a frontend rebuild.

## Project management and carousel ordering

Local editors replaced the need to hardcode every new card. They write `src/data/projects.json` and uploaded assets. Up/down controls persist array order. Both the Projects view and homepage carousel read that order, removing the earlier mismatch between editor order and featured display order.

The homepage uses a horizontal carousel with navigation controls and a visible next-card preview. Local editor pages and write endpoints are development-only. Production receives the saved JSON/assets through the normal build/deployment process.

Regression check: move one card, confirm both displays, then restore its position if this was only a test. Check swipe and buttons at narrow widths. Commit the data and images together.

## Shared background and visual layout

A shared Three.js ribbon replaced the rejected bubbles and earlier About decoration. It mounts outside page routes, ignores pointer events, and is constrained so it does not dictate grid column width. Reduced-motion preferences, pausing, hidden-tab behavior and WebGL fallback keep the page usable without continuous animation.

The contact call-to-action was confined to Contact instead of repeating on every page. Image/PDF frames gained rounded corners; the Putrajaya image rounding was reduced after the larger radius looked excessive.

Regression check: navigate across routes, pause animation, inspect mobile layout and verify the background never covers clickable controls.

## Personal photos

The public personal-photo page is an image-only gallery, separate from the profile portrait. Local upload management saves assets and gallery entries. Removing an entry retains its original file to avoid unexpected deletion. The upload panel was restyled with clearer actions and rounded cards.

Regression check: upload a valid image locally, view it in the gallery, and confirm production does not expose editor routes. Keep uploaded images and JSON together when deploying.

## Chat configuration and behavior

An empty API key or a backend started before the key was saved produced “Chat is not configured yet.” Saving the key and restarting the backend loaded it; `/api/health` confirms configuration without returning the key. A live request then verified provider access.

The original short prompt allowed general debugging answers and lacked facts about the chatbot itself. Explicit scope rules now request redirects for unrelated tasks, and known chatbot implementation facts were added. Conversation style was tuned to shorter, natural answers with fewer dash sentence breaks. These are probabilistic model instructions; see the engineering guide for their limits and evaluation examples.

The UI moved to a consistent sage/charcoal palette, uses a paper-plane send icon and chevrons for suggestions, and replaced the thick input focus outline with a subtle border change. The chatbot remains on About; the temporary mobile homepage instance was removed at the user's request.

Regression check: try a valid portfolio question, an unrelated coding task, a follow-up and Clear chat. Verify disabled/loading/error states and keyboard focus visibility. Backend tests use mocks; live model behavior needs separate checks.

## Useful checks

From the repository root:

```sh
npm run build
node --test server/*.test.js
npm test --prefix backend
```

Build checks cover bundling; editor tests cover local persistence/validation; backend tests cover HTTP behavior using a mocked provider. None replaces visual checks or live model evaluation. These commands are reference instructions, not a record of a fresh full test run for this documentation update.
