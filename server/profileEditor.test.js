import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import profileEditor from './profileEditor.js';

test('profile editor saves text and photos, detects conflicts, and rejects unsafe input', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-profile-'));
  const file = path.join(root, 'src/data/profile.json');
  const original = await readFile(new URL('../src/data/profile.json', import.meta.url), 'utf8');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, original);
  let handler;
  const plugin = profileEditor();
  assert.equal(plugin.apply, 'serve');
  plugin.configureServer({ config: { root }, middlewares: { use: (_path, fn) => { handler = fn; } } });
  const server = http.createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const save = (body, origin = url) => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    const initial = await (await fetch(url)).json();
    assert.equal((await save(initial, 'https://untrusted.example')).status, 403);
    assert.equal((await save({ ...initial, profile: { ...initial.profile, photo: '/../../private.png' } })).status, 400);
    assert.equal((await save({ ...initial, profile: { ...initial.profile, email: 'not an email' } })).status, 400);
    assert.equal((await save({ ...initial, upload: 'data:image/svg+xml;base64,AAAA' })).status, 400);
    const response = await save({ ...initial, profile: { ...initial.profile, intro: 'Updated introduction' }, upload: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=' });
    assert.equal(response.status, 200);
    const updated = await response.json();
    assert.equal(updated.profile.intro, 'Updated introduction');
    assert.match(updated.profile.photo, /^\/profile-images\/.*\.png$/);
    assert.ok((await readFile(path.join(root, 'public', updated.profile.photo))).length > 0);
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), updated.profile);
    assert.equal((await save(initial)).status, 409);
    const removed = await save({ ...updated, profile: { ...updated.profile, photo: '' } });
    assert.equal(removed.status, 200);
    assert.equal((await removed.json()).profile.photo, '');
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});
