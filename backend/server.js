import { createApp } from './app.js';
const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '127.0.0.1';
const server = createApp().listen(port, host, () => {
  console.log(`Portfolio chat backend: http://${host}:${port}`);
  if (!process.env.DEEPSEEK_API_KEY) console.log('Add DEEPSEEK_API_KEY to backend/.env to enable chat.');
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
