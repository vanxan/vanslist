import Link from 'next/link';
import { Listing, Task, ContentType } from '@/lib/supabase';

interface Props {
  listing: Listing & { task: Task; content_type: ContentType };
  tradeSlug: string;
  featured?: boolean;
}

export function ListingCard({ listing, tradeSlug, featured }: Props) {
  const difficultyColors: Record<string, string> = {
    beginner: 'text-green-700 bg-green-50',
    intermediate: 'text-yellow-700 bg-yellow-50',
    'needs-tech-person': 'text-red-700 bg-red-50',
  };
  const difficultyLabels: Record<string, string> = {
    beginner: 'Easy',
    intermediate: 'Medium',
    'needs-tech-person': 'Advanced',
  };

  return (
    <Link
      href={`/trade/${tradeSlug}/${listing.slug}`}
      className={`block rounded-lg border bg-white p-5 hover:shadow-md transition-all ${
        featured ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Top row: type + task badges */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium">
          {listing.content_type?.icon} {listing.content_type?.name}
        </span>
        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-600 px-2 py-0.5 text-xs">
          {listing.task?.icon} {listing.task?.name}
        </span>
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${difficultyColors[listing.difficulty]}`}>
          {difficultyLabels[listing.difficulty]}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-base mb-1">{listing.title}</h3>

      {/* Summary */}
      <p className="text-sm text-gray-600 line-clamp-2">{listing.summary}</p>

      {/* Bottom row: price + verified */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        {listing.cost_display ? (
          <span className="text-xs font-medium text-gray-900">{listing.cost_display}</span>
        ) : (
          <span className="text-xs text-gray-400">Free to use</span>
        )}
        {listing.is_verified && (
          <span className="text-xs text-green-600">✓ Verified</span>
        )}
      </div>
    </Link>
  );
}
