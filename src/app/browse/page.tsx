import { Metadata } from 'next';
import { TRADES, CATEGORIES } from '@/data/trades';
import { TradeCard } from '@/components/TradeCard';
import { BrowseFilters } from './BrowseFilters';

export const metadata: Metadata = {
  title: 'Browse All Trades',
  description: 'Find AI tools, prompts, and workflows built for your business. Browse all trades and categories.',
};

export default function BrowsePage() {
  return (
    <div>
      <div className="text-center pt-12 px-6">
        <h1 className="text-[44px] font-extrabold mb-3 tracking-tight">
          Browse <span className="underline decoration-gold decoration-[3px] underline-offset-[6px]">All Trades</span>
        </h1>
        <p className="text-[15px] text-gray-400 max-w-[550px] mx-auto leading-relaxed">
          Find AI tools, prompts, and workflows built for your business.
        </p>
        <p className="text-[15px] text-gray-400 max-w-[550px] mx-auto leading-relaxed mt-1 mb-7">
          <span className="text-gold font-bold">{TRADES.length}</span> trades across {CATEGORIES.length - 1} categories.
        </p>
      </div>
      <BrowseFilters trades={TRADES} categories={CATEGORIES} />
    </div>
  );
}
