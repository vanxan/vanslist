'use client';

import { useState } from 'react';
import Link from 'next/link';
import { List, X, SquaresFour, RocketLaunch, Trophy, PaperPlaneTilt, SealCheck } from '@phosphor-icons/react';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden p-1.5 -mr-1.5" aria-label="Toggle menu">
        {open ? <X size={22} /> : <List size={22} />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-50">
          <div className="flex flex-col px-6 py-4 gap-4 text-[13px] text-gray-500 font-medium">
            <Link href="/browse" onClick={() => setOpen(false)} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <SquaresFour size={15} /> Browse
            </Link>
            <Link href="/apps" onClick={() => setOpen(false)} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <RocketLaunch size={15} /> Apps
            </Link>
            <Link href="/leaderboard" onClick={() => setOpen(false)} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <Trophy size={15} /> Leaderboard
            </Link>
            <Link href="/submit" onClick={() => setOpen(false)} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <PaperPlaneTilt size={15} /> Submit
            </Link>
            <Link href="/get-verified" onClick={() => setOpen(false)} className="bg-[#1a1a1a] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 w-fit hover:bg-black transition-colors">
              <SealCheck size={14} className="text-gold" /> Get Verified
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
