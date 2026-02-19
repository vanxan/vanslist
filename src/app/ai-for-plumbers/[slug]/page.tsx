import { Metadata } from 'next';
import { LISTINGS } from '@/data/listings';
import { ListingDetail } from './ListingDetail';
import { notFound } from 'next/navigation';
import { listingJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';

export async function generateStaticParams() {
  return LISTINGS.map(l => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const listing = LISTINGS.find(l => l.slug === params.slug);
  if (!listing) return { title: 'Not Found' };
  return {
    title: `${listing.title} — AI for Plumbers`,
    description: listing.summary,
    openGraph: {
      title: `${listing.title} — VansList`,
      description: listing.summary,
    },
  };
}

export default function ListingDetailPage({ params }: { params: { slug: string } }) {
  const listing = LISTINGS.find(l => l.slug === params.slug);
  if (!listing) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd(listing, 'Plumber')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: 'Home', url: 'https://vanslist.com' },
        { name: 'AI for Plumbers', url: 'https://vanslist.com/ai-for-plumbers' },
        { name: listing.title, url: `https://vanslist.com/ai-for-plumbers/${listing.slug}` },
      ])) }} />
      <ListingDetail listing={listing} />
    </>
  );
}
