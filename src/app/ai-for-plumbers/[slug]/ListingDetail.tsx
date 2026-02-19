'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CaretUp, Star, SealCheck, ArrowSquareOut, CaretRight } from '@phosphor-icons/react';
import { DynIcon } from '@/components/DynIcon';
import type { Listing } from '@/data/listings';

export function ListingDetail({ listing }: { listing: Listing }) {
  const [tab, setTab] = useState<'about' | 'pros' | 'catch'>('about');
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(listing.votes);

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'pros', label: 'Pros & Cons' },
    { id: 'catch', label: "The Catch" },
  ];

  return (
    <div>
      {/* Header band */}
      <div className="bg-[#fafaf8] border-b border-gray-100">
        <div className="max-w-container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-5">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <CaretRight size={10} />
            <Link href="/ai-for-plumbers" className="hover:text-gray-600">AI for Plumbers</Link>
            <CaretRight size={10} />
            <span className="text-[#1a1a1a] font-semibold">{listing.title}</span>
          </div>

          {/* Icon + title + votes + verified */}
          <div className="flex items-center gap-5 pt-14 pb-4">
            <div className="w-20 h-20 rounded-2xl bg-gold-light border border-gray-200 flex items-center justify-center shrink-0">
              <DynIcon name={listing.typeIcon} size={36} color="#8b7355" />
            </div>
            <div>
              <h1 className="text-[44px] font-bold tracking-tight text-[#1a1a1a]">{listing.title}</h1>
              <div className="flex items-center gap-2 -mt-1">
                <span className="text-[13px] text-gray-500">by <strong className="text-[#1a1a1a]">getjobber</strong></span>
                <span className="text-gray-300">•</span>
                <div className="inline-flex items-center gap-1 border border-gold-border rounded-full px-2.5 py-0.5 bg-white">
                  <Star size={13} weight="fill" className="text-gold" />
                  <span className="text-xs font-bold text-gold">{votes.toLocaleString()}</span>
                </div>
                <span className="text-gray-300">•</span>
                {listing.verified && (
                  <div className="relative group">
                    <div className="inline-flex items-center gap-1 border border-emerald-200 rounded-full px-2.5 py-0.5 bg-emerald-50 cursor-default">
                      <SealCheck size={13} weight="fill" className="text-emerald-600" />
                      <span className="text-[11px] font-bold text-emerald-600">Verified</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a1a] text-white rounded-lg px-3.5 py-2.5 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      <div className="font-bold mb-0.5">Trust Score: {listing.trustScore?.passed}/{listing.trustScore?.total}</div>
                      <div className="text-gray-400 text-[10px]">Passed {listing.trustScore?.passed} of {listing.trustScore?.total} quality checks</div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags + description + Try Now */}
          <div className="flex gap-6 mt-2.5 pb-10">
            <div className="flex-[0_0_80%]">
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {(listing.tags || [listing.type, listing.task, listing.difficulty]).map(t => (
                  <span key={t} className="bg-white border border-gray-200 rounded-full px-3 py-0.5 text-[11px] text-gray-500 font-medium">{t}</span>
                ))}
              </div>
              <p className="text-[15px] text-gray-400 leading-relaxed max-w-[700px]">{listing.summary}</p>
            </div>
            <div className="flex-[0_0_20%] flex justify-end items-start pt-1">
              {listing.url && (
                <a href={listing.url} target="_blank" rel="noopener" className="bg-gold text-white text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:brightness-110 transition-all">
                  Try Now <ArrowSquareOut size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body: tabs + sidebar */}
      <div className="max-w-container mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Main content */}
          <div className="flex-1">
            {/* Tab bar */}
            <div className="flex gap-6 border-b border-gray-200 mb-8">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id as any)} className={`pb-3 text-sm font-semibold transition-colors ${
                  tab === t.id ? 'text-[#1a1a1a] border-b-2 border-gold' : 'text-gray-400 hover:text-gray-600'
                }`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* About tab */}
            {tab === 'about' && (
              <div>
                <h3 className="text-lg font-bold mb-3">About</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {listing.description || listing.summary}
                </p>
              </div>
            )}

            {/* Pros & Cons tab */}
            {tab === 'pros' && (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-emerald-600">Pros</h3>
                  {(listing.pros || ['Easy to use', 'Good value']).map((p, i) => (
                    <div key={i} className="flex gap-2.5 mb-3">
                      <span className="text-emerald-500 font-bold text-sm mt-0.5">+</span>
                      <p className="text-sm text-gray-600 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4 text-red-500">Cons</h3>
                  {(listing.cons || ['Limited features on free plan']).map((c, i) => (
                    <div key={i} className="flex gap-2.5 mb-3">
                      <span className="text-red-400 font-bold text-sm mt-0.5">−</span>
                      <p className="text-sm text-gray-600 leading-relaxed">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* The Catch tab */}
            {tab === 'catch' && (
              <div>
                <h3 className="text-lg font-bold mb-3">The Catch</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {listing.theCatch || 'No catch identified yet. If you\'ve used this tool, let us know!'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-[280px] shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
              <h4 className="text-sm font-bold mb-4">Quick Info</h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="font-semibold text-[#1a1a1a]">{listing.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Task</span>
                  <span className="font-semibold text-[#1a1a1a]">{listing.task}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Difficulty</span>
                  <span className={`font-semibold ${
                    listing.difficulty === 'Easy' ? 'text-emerald-600' : listing.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-600'
                  }`}>{listing.difficulty}</span>
                </div>
                {listing.cost && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pricing</span>
                    <span className="font-semibold text-[#1a1a1a]">{listing.cost}</span>
                  </div>
                )}
              </div>

              {/* Upvote */}
              <button
                onClick={() => {
                  if (!voted) { setVoted(true); setVotes(v => v + 1); }
                  else { setVoted(false); setVotes(v => v - 1); }
                }}
                className={`w-full mt-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  voted ? 'bg-gold text-white' : 'bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <CaretUp size={15} weight="bold" />
                Upvote · {votes.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
