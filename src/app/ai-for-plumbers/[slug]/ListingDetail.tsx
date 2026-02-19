'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CaretUp, Star, SealCheck, ArrowSquareOut, CaretRight,
  ShareNetwork, Globe, WarningCircle, CurrencyDollar
} from '@phosphor-icons/react';
import { DynIcon } from '@/components/DynIcon';
import { LISTINGS } from '@/data/listings';
import type { Listing } from '@/data/listings';

export function ListingDetail({ listing }: { listing: Listing }) {
  const [tab, setTab] = useState<'about' | 'pros' | 'catch' | 'faq'>('about');
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(listing.votes);

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'pros', label: 'Pros & Cons' },
    { id: 'catch', label: 'The Catch' },
    { id: 'faq', label: 'FAQ' },
  ];

  const related = LISTINGS.filter(l => l.slug !== listing.slug && l.task === listing.task).slice(0, 3);

  return (
    <div>
      {/* Header band — includes breadcrumb, title row, tags, description, Try Now, and tabs */}
      <div className="bg-[#fafaf8] border-b border-gray-100">
        <div className="max-w-container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-5">
            <Link href="/" className="hover:text-gray-600 flex items-center gap-1">
              <DynIcon name="House" size={12} color="#999" /> Home
            </Link>
            <CaretRight size={10} />
            <Link href="/ai-for-plumbers" className="hover:text-gray-600 flex items-center gap-1">
              <DynIcon name="Wrench" size={12} color="#999" /> AI for Plumbers
            </Link>
            <CaretRight size={10} />
            <Link href="/ai-for-plumbers" className="hover:text-gray-600">Apps</Link>
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
                <span className="text-gray-300">&bull;</span>
                <div className="inline-flex items-center gap-1 border border-gold-border rounded-full px-2.5 py-0.5 bg-white">
                  <Star size={13} weight="fill" className="text-gold" />
                  <span className="text-xs font-bold text-gold">{votes.toLocaleString()}</span>
                </div>
                <span className="text-gray-300">&bull;</span>
                {listing.verified && (
                  <div className="relative group">
                    <div className="inline-flex items-center gap-1 border border-emerald-200 rounded-full px-2.5 py-0.5 bg-emerald-50 cursor-default">
                      <SealCheck size={13} weight="fill" className="text-emerald-600" />
                      <span className="text-[11px] font-bold text-emerald-600">Verified</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a1a] text-white rounded-lg px-3.5 py-2.5 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
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
          <div className="flex gap-6 mt-2.5">
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

          {/* Tab bar — inside header band */}
          <div className="flex gap-6 mt-8">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id as any)} className={`pb-3 text-sm font-semibold transition-colors ${
                tab === t.id ? 'text-[#1a1a1a] border-b-2 border-gold' : 'text-gray-400 hover:text-gray-600'
              }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body: content + sidebar */}
      <div className="max-w-container mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* About tab */}
            {tab === 'about' && (
              <div>
                <h3 className="text-lg font-bold mb-3">About</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  {listing.description || listing.summary}
                </p>

                {listing.cost && (
                  <>
                    <h3 className="text-lg font-bold mb-3">Pricing</h3>
                    <div className="inline-flex items-center gap-2 bg-gold-light border border-gold-border rounded-lg px-4 py-2.5 mb-8">
                      <CurrencyDollar size={16} className="text-gold" />
                      <span className="text-sm font-bold text-gold">{listing.cost}</span>
                    </div>
                  </>
                )}

                <h3 className="text-lg font-bold mb-3">Best For</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {listing.type === 'App'
                    ? `Solo plumbers or small teams (1-5 people) who want to stop juggling spreadsheets, missed calls, and paper invoices. If you're doing under $1M in revenue, this is probably the right fit.`
                    : `Small business owners looking to save time with AI-powered ${listing.task.toLowerCase()}.`
                  }
                </p>
              </div>
            )}

            {/* Pros & Cons tab */}
            {tab === 'pros' && (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-emerald-600">Pros</h3>
                  {(listing.pros || ['Easy to use', 'Good value for money', 'Saves significant time weekly']).map((p, i) => (
                    <div key={i} className="flex gap-2.5 mb-3">
                      <span className="text-emerald-500 font-bold text-sm mt-0.5">+</span>
                      <p className="text-sm text-gray-600 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4 text-red-500">Cons</h3>
                  {(listing.cons || ['Limited features on free plan', 'Learning curve for advanced features']).map((c, i) => (
                    <div key={i} className="flex gap-2.5 mb-3">
                      <span className="text-red-400 font-bold text-sm mt-0.5">&minus;</span>
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

            {/* FAQ tab */}
            {tab === 'faq' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    { q: `Is ${listing.title} worth the price?`, a: `It depends on your business size. For solo operators doing under $1M in revenue, the time savings typically pay for the subscription within the first month.` },
                    { q: `Does ${listing.title} work with other tools?`, a: `Yes, most field service tools integrate with QuickBooks, Google Calendar, and common payment processors. Check their integrations page for a full list.` },
                    { q: `How long does it take to set up?`, a: `Most users are up and running within a day. The onboarding process is straightforward and they offer support if you get stuck.` },
                    { q: `Can I try it before I buy?`, a: listing.cost ? `Yes, most plans include a free trial period so you can test it with your actual workflow before committing.` : `This is free to use — no commitment required.` },
                  ].map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5">
                      <h4 className="text-sm font-bold text-[#1a1a1a] mb-2">{item.q}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-[280px] shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Action buttons */}
              <button className="w-full bg-white border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-500 flex items-center justify-center gap-2 hover:border-gray-300 transition-colors">
                <ShareNetwork size={16} /> Share
              </button>
              <a href={listing.url || '#'} target="_blank" rel="noopener"
                className="w-full bg-white border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-500 flex items-center justify-center gap-2 hover:border-gray-300 transition-colors">
                <Globe size={16} /> Visit Website
              </a>
              <button className="w-full bg-white border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-500 flex items-center justify-center gap-2 hover:border-gray-300 transition-colors">
                <WarningCircle size={16} /> Report Issue
              </button>

              {/* Ad space */}
              <div className="bg-gray-100 rounded-xl h-[200px] flex items-center justify-center">
                <span className="text-xs text-gray-400">Ad Space</span>
              </div>
              <p className="text-[10px] text-gray-300 text-center">Sponsored</p>

              {/* Related */}
              {related.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold">Related</h4>
                    <Link href="/ai-for-plumbers" className="text-xs text-gold font-semibold hover:underline">View more</Link>
                  </div>
                  <div className="space-y-4">
                    {related.map((r, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gold-light border border-gray-200 flex items-center justify-center shrink-0">
                          <DynIcon name={r.typeIcon} size={16} color="#8b7355" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#1a1a1a] truncate">{r.title}</div>
                          <div className="text-[11px] text-gray-400 truncate">{r.summary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
