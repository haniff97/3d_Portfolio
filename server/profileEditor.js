import { readFile, writeFile, rename, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';

const revision = text => createHash('sha256').update(text).digest('hex');
const isLocal = address => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address);
export default function profileEditor() {
  let busy = false;
  return {
    name: 'local-profile-editor',
    apply: 'serve',
    configureServer(server) {
      const file = path.join(server.config.root, 'src/data/profile.json');
      server.middlewares.use('/__profile-editor', async (req, res) => {
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
            return respond(200, { profile: JSON.parse(text), revision: revision(text) });
          } catch { return respond(500, { error: 'Could not read project data.' }); }
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
          if (input.revision !== revision(current)) return respond(409, { error: 'Profile changed elsewhere. Reload the editor before saving.' });
          const candidate = input.profile;
          if (!candidate || typeof candidate !== 'object') throw new Error('Profile data is missing.');
          const profile = {};
          const fields = { name: 120, role: 160, location: 120, headline: 100, headlineAccent: 100, intro: 300, summary: 1200, homeAbout: 2000, aboutTitle: 120, aboutSubtitle: 120, aboutBody: 10000, email: 254, contactTitle: 160, contactIntro: 500, photo: 2000, photoAlt: 200, photoPosition: 30 };
          for (const [key, max] of Object.entries(fields)) {
            if (typeof candidate[key] !== 'string' || candidate[key].length > max) throw new Error(`Invalid ${key}.`);
            profile[key] = candidate[key].trim();
          }
          for (const key of ['name', 'role', 'headline', 'headlineAccent', 'intro', 'summary', 'homeAbout', 'aboutTitle', 'aboutSubtitle', 'aboutBody', 'contactTitle']) {
            if (!profile[key]) throw new Error(`${key} is required.`);
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) || /[?&#]/.test(profile.email)) throw new Error('Enter a valid contact email.');
          if (!['50% 25%', '50% 50%', '50% 75%'].includes(profile.photoPosition)) throw new Error('Invalid photo framing.');
          if (profile.photo && !/^\/profile-images\/[a-zA-Z0-9-]+\.(png|jpeg|webp)$/.test(profile.photo)) throw new Error('Choose a photo using the upload field.');
          if (input.upload) {
            const match = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/.exec(input.upload);
            if (!match) throw new Error('Use a PNG, JPEG, or WebP image.');
            const bytes = Buffer.from(match[2], 'base64');
            const valid = match[1] === 'png' ? bytes.subarray(0, 8).toString('hex') === '89504e470d0a1a0a' : match[1] === 'jpeg' ? bytes.subarray(0, 3).toString('hex') === 'ffd8ff' : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
            if (!valid || bytes.length > 5 * 1024 * 1024) throw new Error('Invalid image, or image exceeds 5 MB.');
            const name = `${randomUUID()}.${match[1]}`;
            const folder = path.join(server.config.root, 'public/profile-images');
            await mkdir(folder, { recursive: true });
            uploaded = path.join(folder, name);
            await writeFile(uploaded, bytes);
            profile.photo = `/profile-images/${name}`;
          }
          if (profile.photo && !profile.photoAlt) throw new Error('Add a description of your photo.');
          const output = JSON.stringify(profile, null, 2) + '\n';
          temporary = file + '.tmp';
          await writeFile(temporary, output);
          await rename(temporary, file);
          uploaded = undefined;
          return respond(200, { profile, revision: revision(output) });
        } catch (error) {
          if (uploaded) await unlink(uploaded).catch(() => {});
          if (temporary) await unlink(temporary).catch(() => {});
          respond(400, { error: error.message || 'Could not save project.' });
        } finally { busy = false; }
      });
    },
  };
}
