'use client';

import { useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { CONTENT_TYPES } from '@/data/trades';
import { ListingCard } from '@/components/ListingCard';
import { DynIcon } from '@/components/DynIcon';
import type { Listing } from '@/data/listings';

export function TradePageContent({ listings }: { listings: Listing[] }) {
  const [activeType, setActiveType] = useState('All');

  const filtered = listings.filter(item => {
    if (activeType === 'All') return true;
    if (activeType === 'Apps') return item.type === 'App';
    if (activeType === 'Prompts') return item.type === 'Prompt';
    if (activeType === 'Skills') return item.type === 'Skill';
    if (activeType === 'Workflows') return item.type === 'Workflow' || item.type === 'Automation';
    if (activeType === 'Bundles') return item.type === 'Stack' || item.type === 'Bundle';
    if (activeType === 'Services') return item.type === 'Service';
    return true;
  }).sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {/* Hero */}
      <div className="text-center pt-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-[44px] font-extrabold mb-3 tracking-tight">
          AI for <span className="underline decoration-gold decoration-[3px] underline-offset-[6px]">Plumbers</span>
        </h1>
        <p className="text-[15px] text-gray-400 max-w-[550px] mx-auto leading-relaxed mb-1">
          The best AI tools, prompts, and workflows for plumbing businesses.
        </p>
        <p className="text-[15px] text-gray-400 mb-7">
          <span className="text-gold font-bold">{listings.length}</span> tools
        </p>

        {/* Search */}
        <div className="max-w-[500px] mx-auto mb-6 relative">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            placeholder="Search plumber tools..."
            className="w-full py-3.5 pl-11 pr-5 border border-gray-200 rounded-full text-sm outline-none bg-white"
          />
        </div>

        {/* Type filters */}
        <div className="flex gap-2 justify-center flex-wrap mb-12 overflow-x-auto pb-1">
          {CONTENT_TYPES.map(c => (
            <button key={c.label} onClick={() => setActiveType(c.label)} className={`rounded-full px-3 sm:px-4 py-1.5 text-xs font-semibold border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeType === c.label ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}>
              <DynIcon name={c.icon} size={13} color={activeType === c.label ? '#fff' : '#999'} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-container mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((item, i) => <ListingCard key={i} listing={item} />)}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-300 text-sm py-20">No {activeType.toLowerCase()} found yet. Be the first to submit one!</p>
        )}
      </div>
    </div>
  );
}
