'use client';

import { useState } from 'react';
import { MagnifyingGlass, ArrowSquareOut, Crown } from '@phosphor-icons/react';
import { DynIcon } from '@/components/DynIcon';
import type { AIApp } from '@/data/ai-apps';

export function AppsPageContent({ apps, categories }: { apps: AIApp[]; categories: string[] }) {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = apps.filter(a => {
    if (cat !== 'All' && a.category !== cat) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="text-center pt-12 px-6">
        <h1 className="text-[44px] font-extrabold mb-3 tracking-tight">
          AI <span className="underline decoration-gold decoration-[3px] underline-offset-[6px]">Apps</span>
        </h1>
        <p className="text-[15px] text-gray-400 max-w-[550px] mx-auto leading-relaxed">
          Our curated picks for the best AI-powered tools for your business.
        </p>
        <p className="text-[15px] text-gray-400 max-w-[550px] mx-auto leading-relaxed mt-1 mb-7">
          Browse <span className="text-gold font-bold">{apps.length}</span> apps across {categories.length - 1} categories.
        </p>

        <div className="max-w-[500px] mx-auto mb-6 relative">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search AI apps..."
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
        <div className="grid grid-cols-3 gap-3.5">
          {filtered.map((app, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gold hover:shadow-[0_2px_12px_rgba(212,168,83,0.12)] transition-all relative">
              {app.featured && (
                <div className="absolute top-3 right-3 bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown size={10} weight="fill" /> Featured
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gold-light border border-gray-200 flex items-center justify-center shrink-0">
                  <DynIcon name={app.icon} size={22} color="#8b7355" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1a1a1a]">{app.name}</h3>
                  <span className="text-[11px] text-gray-400">{app.category}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{app.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                  {app.commission}
                </span>
                <a href={app.url} target="_blank" rel="noopener" className="text-gold text-xs font-semibold flex items-center gap-1 hover:brightness-110">
                  Try it <ArrowSquareOut size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
