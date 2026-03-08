import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/resources'],
    },
    sitemap: 'https://icare4women.com/sitemap.xml',
  };
}
