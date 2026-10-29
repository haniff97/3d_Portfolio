# Portfolio chat backend

Requires Node.js 22.9 or newer. This Express service calls DeepSeek from the server; the browser never receives the API key. It reads `src/data/profile.json` and `src/data/projects.json` per request, and includes public blog excerpts from a five-minute on-demand cache. It does not parse the résumé PDF or the experience arrays in About.jsx. Add missing public facts to the profile content if you want the assistant to know them.

For the data flow, prompt tuning, scope restrictions and troubleshooting, read [the chatbot engineering guide](../docs/CHATBOT_ENGINEERING.md). For other changes, see [portfolio fixes](../docs/PORTFOLIO_FIXES.md).

## Start locally

From the portfolio root:

```sh
cd backend
npm install
# Only create this file if it does not already exist:
[ -f .env ] || cp .env.example .env
```

Edit `backend/.env` and add your key to `DEEPSEEK_API_KEY`. Obtain a key from https://platform.deepseek.com/. Keep this file private. Never use a VITE_ variable for a secret. The example uses `deepseek-flash`, following https://api-docs.deepseek.com/quick_start/agent_integrations/; DEEPSEEK_MODEL is configurable.

```sh
npm run dev
```

In a second terminal, from the portfolio root, run `npm run dev`. Vite proxies `/api/chat` and `/api/health` to port 3001. If you change the backend port, update the proxy too.

Test locally (this spends API credits when a key is configured):

```sh
curl http://127.0.0.1:3001/api/chat \
  -H 'Origin: http://127.0.0.1:5173' \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"What AI projects has Haniff built?"}]}'
```

Success: `{"answer":"..."}`. Missing key: HTTP 503. Invalid request: 400. Disallowed origin: 403. Rate limit: 429. Provider failure: 502. Timeout: 504.

Frontend integration:

```js
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
});
const result = await response.json();
if (!response.ok) throw new Error(result.error);
// Render result.answer as text, never as raw HTML.
```

Send alternating user/assistant messages, starting and ending with user. Keep at most the latest three complete exchanges plus the new question (7 messages), each up to 1500 characters. The backend accepts no client system messages. The About page includes PortfolioChat.jsx, which sends requests through this endpoint.

## Deploy alongside the portfolio

Deploy backend files, its lockfile, and `src/data/profile.json` / `projects.json` preserving their relative paths. Run `npm ci --omit=dev` inside backend, set .env, and run `npm start` under your service manager. Static `dist/` hosting alone cannot run this backend.

Set ALLOWED_ORIGINS to your exact portfolio origin, e.g. `https://your-domain.example`, and TRUST_LOCAL_PROXY=true only with a trusted same-machine proxy. Keep HOST=127.0.0.1. Add this location inside the existing HTTPS nginx server:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 35s;
    client_max_body_size 16k;
}
```

Origin checks are not authentication; scripts can spoof them. Limits are 10 requests/minute per IP, 3 concurrent provider calls and 100 attempts/hour for this process. In-memory counters reset on restart and are not shared across workers. Use one process or add a shared limiter before scaling. Set provider-side spending controls where available. No tools, shell commands, or editor routes are exposed by this backend. Prompts encourage grounded answers but cannot guarantee factual accuracy. Questions and the supplied history are sent to DeepSeek; tell visitors this in the chat UI. The service does not store chats or log request bodies or API keys.

## Verification

`npm test` runs HTTP tests using a mock provider, without API charges. Real provider availability and account credentials must be verified separately using the local request above.

## Automatic blog updates

`blog.js` reads the public blog at `http://35.230.24.195/` and up to six homepage articles, with a five-minute on-demand cache. New posts do not require redeploying the portfolio, but must appear on the blog homepage. Article text is capped at 6,000 characters per post. Fetch failures fall back to portfolio-only context. See the engineering guide for bounds and scraper maintenance.

## Firebase Cloud Functions deployment

The repository now includes `firebase.js`, which wraps the existing Express app in a second-generation HTTPS function. Hosting routes `/api/**` to `portfolioChat` in `asia-east1` before the SPA fallback.

Run from the repository root:

```sh
npm --prefix backend install
npm --prefix backend run prepare:firebase
firebase functions:secrets:set DEEPSEEK_API_KEY
npm run build
firebase deploy --only functions:portfolio-chat,hosting
```

Functions require a billing-enabled Firebase project (Blaze). Set the secret using the CLI prompt; do not paste it into source files. The preparation script creates `.firebase-functions/` using an explicit list of backend files and public JSON. It never copies your local `.env`. The predeploy hook refreshes the package on future deployments. Deploy functions again after updating profile/project data, not just Hosting.

The function allows the project's web.app and firebaseapp.com origins by default. Add any custom portfolio domain to its ALLOWED_ORIGINS configuration. It scales to zero, uses at most one instance and supports three concurrent requests. In-memory limits still reset with instance restarts and are not a durable spending cap. Without trusting forwarded headers, the IP limiter may group visitors behind the platform proxy; this is conservative but can limit shared traffic.

After deployment, `/api/health` should return JSON with `chatConfigured: true`, not index.html. Test a chat question from the deployed About page. Local development still uses `backend/server.js` and the Vite proxy.
