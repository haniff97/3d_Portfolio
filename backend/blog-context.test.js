import test from 'node:test';
import assert from 'node:assert/strict';
import { createBlogContext } from './blog-context.js';

test('blog fetch is bounded to its source, cached, refreshed and survives outage', async () => {
  let clock = 0;
  let calls = 0;
  let down = false;
  const get = createBlogContext({ now: () => clock, fetchImpl: async url => {
    calls++;
    if (down) throw new Error('offline');
    assert.ok(url.startsWith('http://35.230.24.195/'));
    return new Response(url.endsWith('/') ? '<a class="story-card" href="/blog/first">Post</a><a class="story-card" href="https://other.test/blog/secret">Ignore</a>' : '<article><h1>First post</h1><div class="article-content">Real facts<script>bad()</script></div></article>');
  } });
  const first = await get();
  assert.equal(first.length, 1);
  assert.equal(first[0].content, 'Real facts');
  await get();
  assert.equal(calls, 2);
  clock = 300001;
  down = true;
  assert.deepEqual(await get(), first);
  assert.equal(calls, 3);
  await get();
  assert.equal(calls, 3);
});
