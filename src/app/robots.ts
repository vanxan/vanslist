import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/get-verified/verifying'],
    },
    sitemap: 'https://vanslist.com/sitemap.xml',
  };
}
