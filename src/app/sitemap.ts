import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://icare4women.com';

  const routes = [
    '',
    '/services',
    '/conditions',
    '/about',
    '/book',
    '/faq',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
