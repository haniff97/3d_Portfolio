import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { createApp } from './app.js';

const key = defineSecret('DEEPSEEK_API_KEY');
let app;
export const portfolioChat = onRequest({
  region: 'asia-east1', secrets: [key], timeoutSeconds: 60,
  memory: '256MiB', minInstances: 0, maxInstances: 1, concurrency: 3,
  invoker: 'public',
}, (req, res) => {
  app ||= createApp({ env: {
    ...process.env,
    DEEPSEEK_API_KEY: key.value(),
    PORTFOLIO_DATA_DIR: new URL('./data/', import.meta.url).href,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'https://haniff-portfolio-de804.web.app,https://haniff-portfolio-de804.firebaseapp.com',
  } });
  return app(req, res);
});
