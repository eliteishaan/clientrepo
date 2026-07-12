import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/internal/'],
    },
    sitemap: 'https://vivaan.dev/sitemap.xml',
  };
}
