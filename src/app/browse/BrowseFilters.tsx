'use client';

import { useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { TradeCard } from '@/components/TradeCard';
import type { Trade } from '@/data/trades';

export function BrowseFilters({ trades, categories }: { trades: Trade[]; categories: string[] }) {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = trades.filter(t => {
    if (cat !== 'All' && t.category !== cat) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const grouped: Record<string, Trade[]> = {};
  filtered.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  return (
    <>
      <div className="text-center px-6">
        <div className="max-w-lg mx-auto mb-6 relative">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for a trade..."
            className="w-full py-3.5 pl-11 pr-5 border border-gray-200 rounded-full text-sm outline-none bg-white"
          />
        </div>
        <div className="flex gap-2 justify-center flex-wrap mb-12">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${
              cat === c ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-container mx-auto px-6 pb-20">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
              {category}
              <span className="text-[11px] text-gray-400 font-medium">({items.length})</span>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
              {items.map(t => <TradeCard key={t.slug} trade={t} />)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
