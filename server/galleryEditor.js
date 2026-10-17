import { readFile, writeFile, rename, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';

const revision = text => createHash('sha256').update(text).digest('hex');
const isLocal = address => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address);
export default function galleryEditor() {
  let busy = false;
  return {
    name: 'local-gallery-editor',
    apply: 'serve',
    configureServer(server) {
      const file = path.join(server.config.root, 'src/data/photos.json');
      server.middlewares.use('/__gallery-editor', async (req, res) => {
        const respond = (status, value) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify(value));
        };
        const origin = req.headers.origin;
        if (!isLocal(req.socket.remoteAddress) ||
          !/^(localhost|127\.0\.0\.1|\[::1\]):\d+$/.test(req.headers.host || '') ||
          (origin && origin !== `http://${req.headers.host}`) ||
          req.headers['sec-fetch-site'] === 'cross-site') {
          return respond(403, { error: 'The editor is only available from this computer.' });
        }
        if (req.method === 'GET') {
          try {
            const text = await readFile(file, 'utf8');
            return respond(200, { photos: JSON.parse(text), revision: revision(text) });
          } catch { return respond(500, { error: 'Could not read gallery data.' }); }
        }
        if (req.method !== 'POST') return respond(405, { error: 'Method not supported.' });
        if (!origin || req.headers['content-type'] !== 'application/json') return respond(403, { error: 'Use the local editor form to save.' });
        if (busy) return respond(409, { error: 'Another save is in progress. Please retry.' });
        busy = true;
        let uploaded;
        let temporary;
        try {
          const chunks = [];
          let size = 0;
          for await (const chunk of req) {
            size += chunk.length;
            if (size > 7 * 1024 * 1024) throw new Error('Image must be smaller than 5 MB.');
            chunks.push(chunk);
          }
          const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const current = await readFile(file, 'utf8');
          if (input.revision !== revision(current)) return respond(409, { error: 'Gallery changed elsewhere. Reload the editor before saving.' });
          const photos = JSON.parse(current);
          if (!['add', 'remove'].includes(input.action)) throw new Error('Unknown action.');
          if (input.action === 'remove') {
            const index = photos.findIndex(photo => photo.id === input.id);
            if (index < 0) throw new Error('Photo not found.');
            photos.splice(index, 1);
          }
          if (input.action === 'add' && !input.upload) throw new Error('Choose a photo.');
          if (input.action === 'add') {
            const match = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/.exec(input.upload);
            if (!match) throw new Error('Use a PNG, JPEG, or WebP image.');
            const bytes = Buffer.from(match[2], 'base64');
            const valid = match[1] === 'png' ? bytes.subarray(0, 8).toString('hex') === '89504e470d0a1a0a' : match[1] === 'jpeg' ? bytes.subarray(0, 3).toString('hex') === 'ffd8ff' : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
            if (!valid || bytes.length > 5 * 1024 * 1024) throw new Error('Invalid image, or image exceeds 5 MB.');
            const name = `${randomUUID()}.${match[1]}`;
            const folder = path.join(server.config.root, 'public/gallery-images');
            await mkdir(folder, { recursive: true });
            uploaded = path.join(folder, name);
            await writeFile(uploaded, bytes);
            photos.push({ id: randomUUID(), src: `/gallery-images/${name}` });
          }
          const output = JSON.stringify(photos, null, 2) + '\n';
          temporary = file + '.tmp';
          await writeFile(temporary, output);
          await rename(temporary, file);
          uploaded = undefined;
          return respond(200, { photos, revision: revision(output) });
        } catch (error) {
          if (uploaded) await unlink(uploaded).catch(() => {});
          if (temporary) await unlink(temporary).catch(() => {});
          respond(400, { error: error.message || 'Could not save gallery.' });
        } finally { busy = false; }
      });
    },
  };
}
