'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CaretUp } from '@phosphor-icons/react';
import { DynIcon } from './DynIcon';
import type { Listing } from '@/data/listings';

export function ListingCard({ listing }: { listing: Listing }) {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(listing.votes);

  return (
    <Link
      href={`/ai-for-plumbers/${listing.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-gold hover:shadow-[0_2px_12px_rgba(212,168,83,0.12)] transition-all group"
    >
      {/* Row 1: type + task */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 rounded-full px-2.5 py-0.5 text-[10px] text-gray-500 font-semibold flex items-center gap-1">
            <DynIcon name={listing.typeIcon} size={11} color="#999" /> {listing.type}
          </span>
          <span className="bg-gold-light text-[#8b7355] rounded-full px-2.5 py-0.5 text-[10px] font-medium flex items-center gap-1">
            <DynIcon name={listing.taskIcon} size={11} color="#8b7355" /> {listing.task}
          </span>
        </div>
        {listing.difficulty && (
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
            listing.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
            listing.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200' :
            'bg-red-50 text-red-600 border-red-200'
          }`}>
            {listing.difficulty}
          </span>
        )}
      </div>

      {/* Row 2: title */}
      <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1.5 group-hover:text-gold transition-colors">
        {listing.title}
      </h3>

      {/* Row 3: summary */}
      <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
        {listing.summary}
      </p>

      {/* Row 4: upvote */}
      <div className="flex items-center justify-between">
        <div />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!voted) { setVoted(true); setVotes(v => v + 1); }
            else { setVoted(false); setVotes(v => v - 1); }
          }}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
            voted ? 'bg-gold text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
          }`}
        >
          <CaretUp size={13} weight="bold" />
          {votes.toLocaleString()}
        </button>
      </div>
    </Link>
  );
}
