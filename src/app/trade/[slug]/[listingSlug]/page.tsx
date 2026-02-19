import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getListingBySlug } from '@/lib/queries';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string; listingSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, listingSlug } = await params;
  const listing = await getListingBySlug(slug, listingSlug);
  if (!listing) return { title: 'Not Found' };
  return {
    title: listing.seo_title || `${listing.title} — AI for ${listing.trade?.name}s | VansList`,
    description: listing.seo_description || listing.summary,
  };
}

function DifficultyBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    'needs-tech-person': 'bg-red-100 text-red-800',
  };
  const labels: Record<string, string> = {
    beginner: 'Beginner Friendly',
    intermediate: 'Intermediate',
    'needs-tech-person': 'Needs a Tech Person',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[level] || 'bg-gray-100 text-gray-800'}`}>
      {labels[level] || level}
    </span>
  );
}

function VerifiedBadge({ date }: { date: string | null }) {
  if (!date) return null;
  const d = new Date(date);
  return (
    <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 rounded-full px-2.5 py-0.5">
      ✓ Verified {d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
    </span>
  );
}

export default async function ListingPage({ params }: Props) {
  const { slug, listingSlug } = await params;
  const listing = await getListingBySlug(slug, listingSlug);
  if (!listing) notFound();

  const contentTypeSlug = listing.content_type?.slug;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">VansList</Link>
        <span className="mx-2">›</span>
        <Link href={`/trade/${slug}`} className="hover:text-gray-700">
          {listing.trade?.icon} {listing.trade?.name}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{listing.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-medium">
            {listing.content_type?.icon} {listing.content_type?.name}
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2.5 py-0.5 text-xs font-medium">
            {listing.task?.icon} {listing.task?.name}
          </span>
          <DifficultyBadge level={listing.difficulty} />
          <VerifiedBadge date={listing.last_verified_at} />
        </div>
        <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
        <p className="text-lg text-gray-600">{listing.summary}</p>
        {listing.cost_display && (
          <p className="mt-2 text-sm font-semibold text-gray-900">
            💰 {listing.cost_display}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="prose prose-gray max-w-none whitespace-pre-line">
          {listing.description}
        </div>
      </div>

      {/* Prompt Text */}
      {contentTypeSlug === 'prompt' && listing.prompt_text && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">📋 The Prompt — Copy & Paste This</h2>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-5 text-sm font-mono whitespace-pre-wrap leading-relaxed">
            {listing.prompt_text}
          </div>
          {listing.llm_compatibility && listing.llm_compatibility.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Works on: {listing.llm_compatibility.map((l) => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Steps (Workflows & Automations) */}
      {(contentTypeSlug === 'workflow' || contentTypeSlug === 'automation') && listing.steps && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            {contentTypeSlug === 'workflow' ? '🔄 Steps' : '⚡ Setup Steps'}
          </h2>
          <div className="space-y-4">
            {listing.steps.map((step: any) => (
              <div key={step.step} className="flex gap-4 bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  {step.tool && (
                    <p className="text-xs text-gray-400 mt-1">Tool: {step.tool}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pros / Cons / The Catch (App reviews) */}
      {contentTypeSlug === 'app' && (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {listing.pros && listing.pros.length > 0 && (
            <div className="bg-green-50 rounded-lg border border-green-200 p-5">
              <h2 className="text-sm font-semibold text-green-800 mb-3">👍 What's Good</h2>
              <ul className="space-y-2">
                {listing.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-green-900 flex gap-2">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {listing.cons && listing.cons.length > 0 && (
            <div className="bg-red-50 rounded-lg border border-red-200 p-5">
              <h2 className="text-sm font-semibold text-red-800 mb-3">👎 What's Not</h2>
              <ul className="space-y-2">
                {listing.cons.map((con, i) => (
                  <li key={i} className="text-sm text-red-900 flex gap-2">
                    <span className="text-red-500 flex-shrink-0">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {listing.the_catch && (
        <div className="bg-amber-50 rounded-lg border border-amber-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-amber-800 mb-2">⚠️ What's the Catch?</h2>
          <p className="text-sm text-amber-900">{listing.the_catch}</p>
        </div>
      )}

      {/* Stack Details */}
      {listing.is_stack && listing.stack_total_monthly && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-blue-800 mb-2">💰 Total Stack Cost</h2>
          <p className="text-2xl font-bold text-blue-900">${listing.stack_total_monthly}/mo</p>
        </div>
      )}

      {/* External Link */}
      {listing.external_url && (
        <div className="mb-6">
          <a
            href={listing.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Visit {listing.title} →
          </a>
        </div>
      )}

      {/* Back link */}
      <div className="pt-6 border-t border-gray-200">
        <Link
          href={`/trade/${slug}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to AI for {listing.trade?.name}s
        </Link>
      </div>
    </div>
  );
}
