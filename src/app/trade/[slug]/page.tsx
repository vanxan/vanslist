import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTradeBySlug, getListingsForTrade, getTasks, getContentTypes } from '@/lib/queries';
import { ListingCard } from '@/components/ListingCard';
import { TradeFilters } from '@/components/TradeFilters';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string; task?: string; difficulty?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trade = await getTradeBySlug(slug);
  if (!trade) return { title: 'Not Found' };
  return {
    title: trade.seo_title || `AI for ${trade.name}s | VansList`,
    description: trade.seo_description || trade.description,
  };
}

export default async function TradePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const trade = await getTradeBySlug(slug);
  if (!trade) notFound();

  const [listings, tasks, contentTypes] = await Promise.all([
    getListingsForTrade(trade.id, {
      contentTypeSlug: sp.type,
      taskSlug: sp.task,
      difficulty: sp.difficulty,
    }),
    getTasks(),
    getContentTypes(),
  ]);

  const featured = listings.filter((l) => l.is_featured);
  const rest = listings.filter((l) => !l.is_featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Trade Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{trade.icon}</span>
          <h1 className="text-3xl font-bold">AI for {trade.name}s</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl">{trade.description}</p>
      </div>

      {/* Filters */}
      <TradeFilters
        tradeSlug={trade.slug}
        tasks={tasks}
        contentTypes={contentTypes}
        activeType={sp.type}
        activeTask={sp.task}
        activeDifficulty={sp.difficulty}
      />

      {/* Featured */}
      {featured.length > 0 && !sp.type && !sp.task && !sp.difficulty && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            ⭐ Featured
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} tradeSlug={trade.slug} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Listings */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {sp.type || sp.task || sp.difficulty ? `Filtered Results (${listings.length})` : `All Resources (${listings.length})`}
        </h2>
        {listings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No results match your filters.</p>
            <a href={`/trade/${trade.slug}`} className="text-blue-600 hover:underline text-sm mt-2 inline-block">
              Clear filters
            </a>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {(sp.type || sp.task || sp.difficulty ? listings : rest).map((listing) => (
              <ListingCard key={listing.id} listing={listing} tradeSlug={trade.slug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
