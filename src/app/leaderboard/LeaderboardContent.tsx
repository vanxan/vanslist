'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, CaretUp, CaretDown, SortAscending, SortDescending } from '@phosphor-icons/react';
import { DynIcon } from '@/components/DynIcon';
import type { Listing } from '@/data/listings';

export function LeaderboardContent({ listings }: { listings: Listing[] }) {
  const [lbType, setLbType] = useState('All');
  const [lbSort, setLbSort] = useState<'desc' | 'asc'>('desc');

  const types = ['All', 'Apps', 'Prompts', 'Skills', 'Workflows', 'Bundles'];

  const filtered = listings.filter(item => {
    if (lbType === 'All') return true;
    if (lbType === 'Apps') return item.type === 'App';
    if (lbType === 'Prompts') return item.type === 'Prompt';
    if (lbType === 'Skills') return item.type === 'Skill';
    if (lbType === 'Workflows') return item.type === 'Workflow' || item.type === 'Automation';
    if (lbType === 'Bundles') return item.type === 'Stack' || item.type === 'Bundle';
    return true;
  });

  const deduped = filtered.filter((item, i, arr) => arr.findIndex(x => x.title === item.title) === i);
  const sorted = [...deduped].sort((a, b) => lbSort === 'desc' ? b.votes - a.votes : a.votes - b.votes);

  return (
    <div>
      <div className="text-center pt-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-[44px] font-extrabold mb-3 tracking-tight">
          <span className="underline decoration-gold decoration-[3px] underline-offset-[6px]">Leaderboard</span>
        </h1>
        <p className="text-[15px] text-gray-400 max-w-[550px] mx-auto leading-relaxed mb-10">
          The most popular AI tools, prompts, and workflows — ranked by community votes.
        </p>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 pb-20">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
              <button key={t} onClick={() => setLbType(t)} className={`rounded-full px-3 sm:px-4 py-1.5 text-xs font-semibold border transition-colors ${
                lbType === t ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setLbSort(s => s === 'desc' ? 'asc' : 'desc')} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-500 hover:border-gray-300 transition-colors whitespace-nowrap">
            {lbSort === 'desc' ? <SortDescending size={14} /> : <SortAscending size={14} />}
            {lbSort === 'desc' ? 'Most votes' : 'Least votes'}
          </button>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-[32px_1fr_60px] sm:grid-cols-[50px_1fr_100px_120px_80px] gap-2 sm:gap-4 px-3 sm:px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide border-b border-gray-200">
          <span>#</span>
          <span>Name</span>
          <span className="hidden sm:block">Type</span>
          <span className="hidden sm:block">Task</span>
          <span className="text-right">Votes</span>
        </div>

        {/* Rows */}
        {sorted.map((item, i) => {
          const rank = i + 1;
          const trophy = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;
          return (
            <Link key={item.slug} href={`/ai-for-plumbers/${item.slug}`}
              className={`grid grid-cols-[32px_1fr_60px] sm:grid-cols-[50px_1fr_100px_120px_80px] gap-2 sm:gap-4 px-3 sm:px-4 py-3 sm:py-3.5 items-center border-b border-gray-100 hover:bg-gold-light/30 transition-colors ${
                rank <= 3 ? 'bg-[rgba(212,168,83,0.03)]' : ''
              }`}
            >
              <span className="text-sm font-bold text-gray-300">
                {trophy || rank}
              </span>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gold-light flex items-center justify-center shrink-0">
                  <DynIcon name={item.typeIcon} size={15} color="#8b7355" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#1a1a1a] truncate">{item.title}</div>
                  <div className="text-[11px] text-gray-400 line-clamp-1 hidden sm:block">{item.summary}</div>
                </div>
              </div>
              <span className="bg-gray-100 rounded-full px-2.5 py-0.5 text-[10px] text-gray-500 font-semibold w-fit hidden sm:block">{item.type}</span>
              <span className="bg-gold-light text-[#8b7355] rounded-full px-2.5 py-0.5 text-[10px] font-medium w-fit hidden sm:block">{item.task}</span>
              <span className="text-right text-sm font-bold text-gray-500 flex items-center justify-end gap-1">
                <CaretUp size={12} weight="bold" className="text-gray-300" />
                {item.votes.toLocaleString()}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
