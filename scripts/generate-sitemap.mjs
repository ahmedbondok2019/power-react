import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Site URL configuration - can be overridden via environment variables
const SITE_URL = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://ppreparation.com').replace(/\/+$/, '');
const API_BASE = process.env.VITE_API_BASE_URL || 'https://admin.globexhup.com/api/v1';

const currentDate = new Date().toISOString().split('T')[0];

// Main static pages
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/about', changefreq: 'monthly', priority: '0.9' },
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/projects', changefreq: 'weekly', priority: '0.9' },
  { url: '/strategy', changefreq: 'monthly', priority: '0.8' },
  { url: '/blogs', changefreq: 'daily', priority: '0.8' },
  { url: '/careers', changefreq: 'weekly', priority: '0.8' },
  { url: '/join-as-vendor', changefreq: 'monthly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
  { url: '/sitemap', changefreq: 'monthly', priority: '0.6' },
];

async function fetchDynamicBlogRoutes() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${API_BASE}/blogs`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'ar',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[sitemap] API returned status ${res.status}, using static fallback`);
      return [];
    }

    const data = await res.json();
    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

    return items
      .filter((item) => item?.slug || item?.id)
      .map((item) => ({
        url: `/blogs/${encodeURIComponent(item.slug || item.id)}`,
        changefreq: 'weekly',
        priority: '0.7',
        lastmod: item.updated_at ? item.updated_at.split('T')[0] : currentDate,
      }));
  } catch (err) {
    console.warn('[sitemap] Notice: Could not fetch remote blog slugs (' + err.message + '). Static pages will be generated.');
    return [];
  }
}

async function generateSitemap() {
  console.log(`[sitemap] Generating sitemap for: ${SITE_URL}`);

  const dynamicBlogRoutes = await fetchDynamicBlogRoutes();
  const allRoutes = [
    ...staticPages.map((p) => ({ ...p, lastmod: currentDate })),
    ...dynamicBlogRoutes,
  ];

  const xmlEntries = allRoutes
    .map((route) => {
      return `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xmlContent.trim() + '\n', 'utf-8');

  console.log(`[sitemap] Successfully wrote ${allRoutes.length} URLs to: ${sitemapPath}`);
}

generateSitemap();
