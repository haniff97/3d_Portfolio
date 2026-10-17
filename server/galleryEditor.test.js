import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import galleryEditor from './galleryEditor.js';

test('gallery persists multiple photos and removal, rejects stale and cross-origin writes', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-gallery-'));
  const file = path.join(root, 'src/data/photos.json');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, '[]\n');
  let handler;
  const plugin = galleryEditor();
  assert.equal(plugin.apply, 'serve');
  plugin.configureServer({ config: { root }, middlewares: { use: (_path, fn) => { handler = fn; } } });
  const server = http.createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const save = (body, origin = url) => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    const initial = await (await fetch(url)).json();
    assert.equal((await save(initial, 'https://untrusted.example')).status, 403);
    assert.equal((await save({ ...initial, action: 'add', upload: 'data:image/png;base64,AAAA' })).status, 400);
    let current = initial;
    for (let i = 0; i < 2; i++) {
      const response = await save({ revision: current.revision, action: 'add', upload: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=' });
      assert.equal(response.status, 200);
      current = await response.json();
    }
    assert.equal(current.photos.length, 2);
    assert.notEqual(current.photos[0].id, current.photos[1].id);
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), current.photos);
    assert.equal((await save({ ...initial, action: 'remove', id: current.photos[0].id })).status, 409);
    assert.equal((await save({ revision: current.revision, action: 'remove', id: 'missing' })).status, 400);
    const removedPhoto = current.photos[0];
    const response = await save({ revision: current.revision, action: 'remove', id: removedPhoto.id });
    assert.equal(response.status, 200);
    const remaining = await response.json();
    assert.deepEqual(remaining.photos, [current.photos[1]]);
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), remaining.photos);
    assert.ok((await readFile(path.join(root, 'public', removedPhoto.src))).length > 0);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});
