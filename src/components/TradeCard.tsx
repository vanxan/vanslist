import Link from 'next/link';
import { DynIcon } from './DynIcon';
import type { Trade } from '@/data/trades';

export function TradeCard({ trade }: { trade: Trade }) {
  const inner = (
    <div className={`bg-white border border-gray-200 rounded-[10px] px-4 py-3 flex items-center gap-3 transition-all ${
      trade.soon ? 'opacity-45 cursor-default' : 'hover:border-gold hover:shadow-[0_2px_12px_rgba(212,168,83,0.12)] cursor-pointer'
    }`}>
      <div className="w-10 h-10 rounded-[10px] bg-gold-light flex items-center justify-center shrink-0">
        <DynIcon name={trade.icon} size={18} color="#8b7355" />
      </div>
      <div>
        <div className="text-sm font-semibold text-[#1a1a1a]">AI for {trade.name}s</div>
        <div className="text-[11px] text-gray-400 mt-0.5">
          {trade.count > 0 ? `${trade.count} resources` : 'Coming soon'}
        </div>
      </div>
    </div>
  );

  if (trade.soon) return <div>{inner}</div>;
  return <Link href={`/ai-for-${trade.slug}`}>{inner}</Link>;
}
