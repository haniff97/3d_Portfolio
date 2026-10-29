import { load } from 'cheerio';

const HOME = 'http://35.230.24.195/';
const TTL = 5 * 60 * 1000;
// Only server-defined public blog URLs are fetched; visitor input is never a URL source.
export function createBlogReader({ fetchImpl = fetch, now = Date.now } = {}) {
  let cached = null;
  let refreshed = 0;
  let pending;
  async function html(url) {
    const response = await fetchImpl(url, { redirect: 'error', signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error('Blog unavailable');
    const reader = response.body.getReader();
    const chunks = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 512000) throw new Error('Blog page too large');
        chunks.push(Buffer.from(value));
      }
    } finally { await reader.cancel(); }
    const $ = load(Buffer.concat(chunks).toString('utf8'));
    $('script, style, iframe, noscript').remove();
    return $;
  }
  async function refresh() {
    try {
      const $ = await html(HOME);
      const urls = [...new Set($('a.story-card[href]').map((_, el) => {
        try {
          const url = new URL($(el).attr('href'), HOME);
          return url.origin === new URL(HOME).origin && url.pathname.startsWith('/blog/') ? url.href : null;
        } catch { return null; }
      }).get())].slice(0, 6);
      const posts = await Promise.all(urls.map(async url => {
        try {
          const page = await html(url);
          return { url, title: page('article h1').first().text().trim(), text: page('.article-content').text().replace(/\s+/g, ' ').trim().slice(0, 6000) };
        } catch { return null; }
      }));
      cached = { status: 'available', fetchedAt: new Date(now()).toISOString(), posts: posts.filter(post => post?.title && post.text) };
      return cached;
    } catch {
      return { status: 'unavailable', posts: [] };
    } finally { refreshed = now(); }
  }
  return async () => {
    if (pending) return pending;
    if (now() - refreshed < TTL && refreshed) return cached || { status: 'unavailable', posts: [] };
    // Failed refreshes must not keep presenting deleted/outdated cached posts as current.
    cached = null;
    pending = refresh().finally(() => { pending = null; });
    return pending;
  };
}
export const readBlog = createBlogReader();
