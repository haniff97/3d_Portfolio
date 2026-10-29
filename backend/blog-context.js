import { load } from 'cheerio';

const BLOG = 'http://35.230.24.195';
const clean = value => value.replace(/\s+/g, ' ').trim();

// Fixed source: visitors cannot make the server fetch arbitrary URLs.
export function createBlogContext({ fetchImpl = fetch, now = Date.now } = {}) {
  let posts = [];
  let checked = -Infinity;
  let pending;
  async function html(url, signal) {
    const response = await fetchImpl(url, { signal, redirect: 'error' });
    if (!response.ok) throw new Error('Blog unavailable');
    let body = '';
    let bytes = 0;
    for await (const chunk of response.body) {
      bytes += chunk.length;
      if (bytes > 512000) throw new Error('Blog page too large');
      body += Buffer.from(chunk).toString('utf8');
    }
    return load(body);
  }
  async function refresh() {
    const signal = AbortSignal.timeout(5000);
    try {
      const $ = await html(BLOG + '/', signal);
      const links = [...new Set($('a.story-card').map((_, el) => {
        try {
          const url = new URL($(el).attr('href'), BLOG);
          return url.origin === BLOG && /^\/blog\/[^/]+$/.test(url.pathname) ? url.href : null;
        } catch { return null; }
      }).get())].slice(0, 4);
      if (!links.length) throw new Error('Blog markup changed');
      const results = await Promise.allSettled(links.map(async url => {
        const page = await html(url, signal);
        page('script, style, iframe, form').remove();
        const title = clean(page('article h1').text());
        const content = clean(page('.article-content').text()).slice(0, 4000);
        if (!title || !content) throw new Error('Article markup changed');
        return { title, url, date: page('article time').attr('datetime'), content };
      }));
      const fresh = results.filter(result => result.status === 'fulfilled').map(result => result.value);
      if (fresh.length) posts = fresh;
    } catch { /* Keep last successful public context if the blog is down. */ }
    finally { checked = now(); }
    return posts;
  }
  return async () => {
    if (now() - checked < 300000) return posts;
    if (!pending) pending = refresh().finally(() => { pending = null; });
    return pending;
  };
}
