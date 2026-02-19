import type { Listing } from '@/data/listings';

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VansList',
    url: 'https://vanslist.com',
    description: 'AI tools, prompts, and workflows for every trade. Reviewed in plain English.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://vanslist.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function tradePageJsonLd(tradeName: string, count: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `AI Tools for ${tradeName}s`,
    description: `The best AI tools, prompts, skills, and workflows for ${tradeName.toLowerCase()} businesses.`,
    url: `https://vanslist.com/ai-for-${tradeName.toLowerCase().replace(/\s+/g, '-')}s`,
    numberOfItems: count,
    isPartOf: { '@type': 'WebSite', name: 'VansList', url: 'https://vanslist.com' },
  };
}

export function listingJsonLd(listing: Listing, tradeName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: listing.title,
    description: listing.description || listing.summary,
    applicationCategory: listing.type,
    url: listing.url || `https://vanslist.com/ai-for-${tradeName.toLowerCase().replace(/\s+/g, '-')}s/${listing.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Math.min(5, 3 + (listing.votes / 300)).toFixed(1),
      ratingCount: listing.votes,
      bestRating: 5,
    },
    ...(listing.cost && { offers: { '@type': 'Offer', price: listing.cost, priceCurrency: 'USD' } }),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
