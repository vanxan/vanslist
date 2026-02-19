import { getTrades } from '@/lib/queries';
import Link from 'next/link';

export default async function HomePage() {
  const trades = await getTrades();

  // Group by category
  const grouped = trades.reduce((acc, trade) => {
    const cat = trade.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(trade);
    return acc;
  }, {} as Record<string, typeof trades>);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          What do you do?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          AI tools, prompts, and workflows for your trade.
          Reviewed in plain English. No tech degree required.
        </p>
      </div>

      {/* Trade Grid */}
      {Object.entries(grouped).map(([category, categoryTrades]) => (
        <div key={category} className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categoryTrades.map((trade) => (
              <Link
                key={trade.id}
                href={`/trade/${trade.slug}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="text-2xl">{trade.icon}</span>
                <span className="font-medium text-sm">{trade.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Coming Soon */}
      <div className="mt-16 text-center py-12 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500 text-lg">More trades coming soon.</p>
        <p className="text-gray-400 text-sm mt-1">
          Don't see your trade?{' '}
          <a href="mailto:hello@vanslist.com" className="text-blue-600 hover:underline">
            Let us know
          </a>
        </p>
      </div>
    </div>
  );
}
