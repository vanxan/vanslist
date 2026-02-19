'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SealCheck, Spinner, Check, X, ArrowLeft } from '@phosphor-icons/react';
import { DynIcon } from '@/components/DynIcon';
import { VERIFICATION_CHECKS } from '@/data/verification';
import { TRADES } from '@/data/trades';

export function VerifyContent() {
  const [phase, setPhase] = useState<'form' | 'verifying'>('form');
  const [checkIndex, setCheckIndex] = useState(-1);
  const [checkResults, setCheckResults] = useState<boolean[]>([]);

  useEffect(() => {
    if (phase !== 'verifying') return;
    setCheckIndex(-1);
    setCheckResults([]);
    let i = 0;
    const run = () => {
      if (i >= VERIFICATION_CHECKS.length) return;
      setTimeout(() => {
        setCheckIndex(i);
        setCheckResults(prev => [...prev, Math.random() > 0.1]);
        i++;
        run();
      }, 180 + Math.random() * 300);
    };
    run();
  }, [phase]);

  const allDone = checkResults.length === VERIFICATION_CHECKS.length;
  const passed = checkResults.filter(Boolean).length;
  const score = allDone ? Math.round((passed / VERIFICATION_CHECKS.length) * 100) : 0;

  if (phase === 'verifying') {
    return (
      <div className="max-w-[680px] mx-auto px-6 pt-12 pb-20">
        {/* Status */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mx-auto mb-5">
            {allDone ? (
              score >= 80 ? <SealCheck size={32} weight="fill" className="text-emerald-500" /> : <X size={32} weight="bold" className="text-red-500" />
            ) : (
              <Spinner size={32} className="text-gold animate-spin-slow" />
            )}
          </div>
          <h1 className="text-[28px] font-extrabold mb-2">
            {allDone ? (score >= 80 ? 'Verified!' : 'Needs Attention') : 'Running verification...'}
          </h1>
          {!allDone && (
            <div className="w-full max-w-sm mx-auto h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-gold rounded-full transition-all duration-300" style={{ width: `${(checkResults.length / VERIFICATION_CHECKS.length) * 100}%` }} />
            </div>
          )}
        </div>

        {/* Checklist */}
        <div className="space-y-1">
          {VERIFICATION_CHECKS.map((check, i) => {
            const isDone = i < checkResults.length;
            const isActive = i === checkIndex && !allDone;
            const passed = isDone ? checkResults[i] : false;
            return (
              <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive ? 'bg-white border border-gray-200 shadow-sm' :
                isDone ? (passed ? 'bg-emerald-50/50' : 'bg-red-50/50') : 'opacity-[0.35]'
              }`}>
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {isActive ? <Spinner size={16} className="text-gold animate-spin-slow" /> :
                   isDone ? (passed ? <Check size={16} weight="bold" className="text-emerald-500" /> : <X size={16} weight="bold" className="text-red-500" />) :
                   <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                </div>
                <DynIcon name={check.icon} size={16} color={isDone ? (passed ? '#059669' : '#ef4444') : '#ccc'} />
                <span className="text-sm text-gray-600 flex-1">{check.label}</span>
                {isDone && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {passed ? 'PASS' : 'FAIL'}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Result */}
        {allDone && (
          <div className="mt-8 text-center animate-fade-up">
            <p className="text-sm text-gray-500 mb-4">Passed {passed} of {VERIFICATION_CHECKS.length} markers ({score}%)</p>
            {score >= 80 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-4">
                <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold">
                  <SealCheck size={18} weight="fill" /> Your verified badge is now live
                </div>
                <p className="text-xs text-gray-400 mt-1">Your listing has been updated with the verified badge.</p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
                <p className="text-red-700 font-bold">{VERIFICATION_CHECKS.length - passed} markers need attention</p>
                <p className="text-xs text-gray-400 mt-1">Fix the failing checks and try again.</p>
              </div>
            )}
            <button onClick={() => { setPhase('form'); setCheckIndex(-1); setCheckResults([]); }}
              className="bg-white border border-gray-200 rounded-lg px-5 py-2.5 text-[13px] font-semibold flex items-center gap-1.5 mx-auto hover:border-gray-300">
              <ArrowLeft size={14} /> Back to form
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[680px] mx-auto px-6 pt-12 pb-20">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mx-auto mb-5">
          <SealCheck size={32} weight="fill" className="text-gold" />
        </div>
        <h1 className="text-[36px] font-extrabold tracking-tight mb-2">Get Verified</h1>
        <p className="text-[15px] text-gray-400 max-w-[460px] mx-auto leading-relaxed">
          Submit your app or tool. We automatically check against <strong className="text-[#1a1a1a]">{VERIFICATION_CHECKS.length} quality markers</strong> and add the verified badge to your listing.
        </p>
        <span className="inline-block mt-3 bg-[#1a1a1a] text-gold text-xs font-bold px-3 py-1 rounded-full">$39.99 one-time</span>
      </div>

      {/* Form */}
      <div className="space-y-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company Name *</label>
            <input className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Jobber" />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Website URL *</label>
            <input className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" placeholder="https://yourapp.com" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Contact Email *</label>
            <input className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" placeholder="you@company.com" />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category *</label>
            <select className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white text-gray-400">
              <option>Select a category</option>
              <option>App</option>
              <option>Prompt</option>
              <option>Skill</option>
              <option>Workflow</option>
              <option>Bundle</option>
              <option>Service</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Target Trade *</label>
            <select className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white text-gray-400">
              <option>Select a trade</option>
              <option>All trades</option>
              {TRADES.map(t => <option key={t.slug}>{t.name}</option>)}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Pricing</label>
            <input className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" placeholder="e.g. Free, $39/mo" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Short Description *</label>
          <input className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" placeholder="One sentence about what this does" />
        </div>
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Description</label>
          <textarea rows={4} className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white resize-y" placeholder="Detailed description of your product..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">GitHub Repo URL</label>
            <input className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" placeholder="Optional" />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Logo URL</label>
            <input className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" placeholder="Optional" />
          </div>
        </div>
      </div>

      <button onClick={() => setPhase('verifying')}
        className="w-full bg-[#1a1a1a] text-white rounded-lg py-3.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors mt-4">
        <SealCheck size={16} className="text-gold" /> Pay & Verify — $39.99
      </button>

      {/* FAQ */}
      <div className="mt-12 border-t border-gray-100 pt-8">
        <h3 className="text-sm font-bold mb-4">FAQ</h3>
        {[
          { q: 'What does verification check?', a: `We run ${VERIFICATION_CHECKS.length} automated quality checks including SSL, uptime, privacy policy, mobile responsiveness, and more.` },
          { q: 'How long does it take?', a: 'About 30 seconds. All checks are automated.' },
          { q: 'How long does the verified badge last?', a: "One year. We'll notify you 30 days before expiration." },
          { q: 'Can I get a featured placement too?', a: 'Verified apps are eligible for featured placements, priced separately.' },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <p className="text-sm font-semibold text-[#1a1a1a]">{f.q}</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
