import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Compass, TrendUp, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { TRADES } from '@/data/trades';
import { LISTINGS } from '@/data/listings';
import { RotatingHero } from '@/components/RotatingHero';
import { ListingCard } from '@/components/ListingCard';
import { TradeCard } from '@/components/TradeCard';
import { websiteJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'VansList — AI Tools for Every Trade',
  description: 'Find the best AI tools, prompts, and workflows for your small business. Organized by trade. Reviewed in plain English.',
};

function SectionHeader({ title, icon: Icon, actionLabel, actionHref }: {
  title: string; icon: any; actionLabel?: string; actionHref?: string;
}) {
  return (
    <div className="flex justify-between items-center mb-6 mt-[100px]">
      <h2 className="text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
        <Icon size={22} className="text-gold" />
        {title}
      </h2>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="bg-white border border-gray-200 rounded-lg px-4 py-1.5 text-xs text-gray-500 flex items-center gap-1 hover:border-gray-300 transition-colors">
          {actionLabel} <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const featured = LISTINGS.slice(0, 6);
  const popular = [...LISTINGS].sort((a, b) => b.votes - a.votes).slice(0, 6);

  return (
    <div className="max-w-container mx-auto px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      {/* Hero */}
      <div className="text-center pt-16 pb-10">
        <div className="text-xs font-semibold text-gold tracking-widest uppercase mb-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-light px-3.5 py-1 rounded-full border border-gold-border">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> {TRADES.length} Trades · {LISTINGS.length} Resources Live
          </span>
        </div>
        <RotatingHero />
        <p className="text-base text-gray-400 max-w-xl mx-auto mb-7 leading-relaxed mt-[42px]">
          AI tools, prompts, and workflows for small businesses.
          <br />Reviewed in plain English. No tech degree required.
        </p>
        <div className="max-w-lg mx-auto mb-8 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,218.34l-50.07-50.07a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.31ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
          <input
            placeholder="Search for AI tools by trade..."
            className="w-full py-3.5 pl-11 pr-5 border border-gray-200 rounded-full text-sm outline-none bg-white"
          />
        </div>
        {/* Trade pills */}
        <div className="flex gap-2 justify-center flex-wrap">
          {[
            { label: "All", active: true },
            { label: "Plumbers", count: 14, href: "/ai-for-plumbers" },
            { label: "Electricians", count: 0, soon: true },
            { label: "HVAC", count: 0, soon: true },
            { label: "Landscapers", count: 0, soon: true },
            { label: "Therapists", count: 0, soon: true },
            { label: "Photographers", count: 0, soon: true },
          ].map(t => (
            <span key={t.label} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${
              t.active ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : t.soon ? 'bg-white text-gray-300 border-gray-200 cursor-default' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 cursor-pointer'
            }`}>
              {t.label}
              {t.count !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 rounded-full ${t.soon ? 'bg-gray-100 text-gray-300' : 'bg-gray-100 text-gray-400'}`}>{t.count}</span>
              )}
            </span>
          ))}
          <Link href="/browse" className="inline-flex items-center gap-1 bg-white text-gray-400 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold hover:border-gray-300 transition-colors">
            More trades <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Featured */}
      <SectionHeader title="Featured" icon={Star} actionLabel="View all featured" actionHref="/browse" />
      <div className="grid grid-cols-3 gap-3.5">
        {featured.map((item, i) => <ListingCard key={i} listing={item} />)}
      </div>

      {/* Browse by Trade */}
      <SectionHeader title="Browse by Trade" icon={Compass} actionLabel={`View all ${TRADES.length} trades`} actionHref="/browse" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
        {TRADES.slice(0, 15).map(t => <TradeCard key={t.slug} trade={t} />)}
      </div>

      {/* Most Popular */}
      <SectionHeader title="Most Popular" icon={TrendUp} actionLabel="View leaderboard" actionHref="/leaderboard" />
      <div className="grid grid-cols-3 gap-3.5">
        {popular.map((item, i) => <ListingCard key={i} listing={item} />)}
      </div>

      {/* CTA */}
      <div className="mt-20 mb-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Questions?</h2>
        <p className="text-gray-400 text-sm">
          Don&apos;t see your trade?{' '}
          <Link href="/submit" className="text-gold font-semibold inline-flex items-center gap-1">
            Let us know <ArrowRight size={13} />
          </Link>
        </p>
      </div>
    </div>
  );
}
