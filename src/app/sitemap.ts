import type { MetadataRoute } from 'next';
import { TRADES } from '@/data/trades';
import { LISTINGS } from '@/data/listings';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://vanslist.com';

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/browse`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/apps`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/leaderboard`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${base}/submit`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/get-verified`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const tradePages = TRADES.filter(t => !t.soon).map(t => ({
    url: `${base}/ai-for-${t.slug}s`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const listingPages = LISTINGS.map(l => ({
    url: `${base}/ai-for-plumbers/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...tradePages, ...listingPages];
}
