import type { MiddlewareHandler } from 'hono';

const CRAWLER_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|kakaotalk-scrap|telegrambot|discordbot|whatsapp|twitterbot|linkedinbot|pinterestbot|yeti|naver|daum/i;

interface OgData {
  title: string;
  description: string;
  image?: string;
}

/**
 * Fetch OG metadata for a given path from internal API.
 * TODO: Implement per-page OG data resolution.
 */
async function fetchOgData(_path: string): Promise<OgData | null> {
  // 예시: /detail/:id 패턴이면 int-api에서 상품 정보 조회
  // const match = _path.match(/^\/detail\/(\d+)$/);
  // if (!match) return null;
  // const res = await fetch(`${INT_API}/items/${match[1]}`);
  // const data = await res.json();
  // return { title: data.name, description: data.summary, image: data.thumbnail };
  return null;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Middleware that injects OG meta tags for crawlers.
 * Normal users receive the plain SPA HTML (no SSR).
 */
export function ogInjector(indexHtml: string): MiddlewareHandler {
  return async (c, next) => {
    const ua = c.req.header('User-Agent') ?? '';

    if (!CRAWLER_UA.test(ua)) {
      await next();
      return;
    }

    const ogData = await fetchOgData(c.req.path);
    if (!ogData) {
      await next();
      return;
    }

    const ogTags = [
      `<meta property="og:title" content="${escapeHtml(ogData.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(ogData.description)}" />`,
      `<meta property="og:url" content="${escapeHtml(c.req.url)}" />`,
      ogData.image ? `<meta property="og:image" content="${escapeHtml(ogData.image)}" />` : '',
    ]
      .filter(Boolean)
      .join('\n    ');

    const html = indexHtml.replace('</head>', `    ${ogTags}\n  </head>`);
    return c.html(html);
  };
}
