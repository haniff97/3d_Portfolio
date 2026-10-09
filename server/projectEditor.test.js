import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import projectEditor from './projectEditor.js';

test('local editor persists cards and images; rejects unsafe requests and stale writes', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-editor-'));
  const file = path.join(root, 'src/data/projects.json');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, '[]\n');
  let handler;
  projectEditor().configureServer({ config: { root }, middlewares: { use: (_path, fn) => { handler = fn; } } });
  const server = http.createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const save = (body, origin = url) => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    const initial = await (await fetch(url)).json();
    const project = { title: 'Test project', description: 'Test description', image: 'https://example.com/image.png', ghLink: '', demoLink: '', notionLink: '' };
    assert.equal((await save({ project, revision: initial.revision }, 'https://untrusted.example')).status, 403);
    assert.equal((await save({ project: { ...project, demoLink: 'javascript:alert(1)' }, revision: initial.revision })).status, 400);
    const response = await save({ project, revision: initial.revision });
    assert.equal(response.status, 200);
    const added = await response.json();
    assert.equal(JSON.parse(await readFile(file, 'utf8'))[0].title, 'Test project');
    assert.equal((await save({ project, revision: initial.revision })).status, 409);
    const upload = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
    const editedResponse = await save({ project: { ...added.projects[0], title: 'Edited project' }, revision: added.revision, upload });
    assert.equal(editedResponse.status, 200);
    const edited = await editedResponse.json();
    assert.equal(edited.projects.length, 1);
    assert.equal(edited.projects[0].title, 'Edited project');
    assert.match(edited.projects[0].image, /^\/project-images\/.*\.png$/);
    assert.ok((await readFile(path.join(root, 'public', edited.projects[0].image))).length > 0);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});
