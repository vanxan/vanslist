import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit a Tool | VansList',
  description: 'Built an AI tool for a specific trade? Submit it for review and get in front of the right audience.',
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Submit a Tool</h1>
      <p className="text-gray-600 mb-8">
        Built an AI tool that helps a specific trade? We review every submission
        and add the ones that actually work.
      </p>

      <form action="/api/submit" method="POST" className="space-y-6">
        <div>
          <label htmlFor="tool_name" className="block text-sm font-medium text-gray-700 mb-1">
            Tool Name *
          </label>
          <input
            type="text"
            id="tool_name"
            name="tool_name"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., CountBricks"
          />
        </div>

        <div>
          <label htmlFor="tool_url" className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            type="url"
            id="tool_url"
            name="tool_url"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            What does it do? (in plain English) *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Describe what your tool does and which trades it helps..."
          />
        </div>

        <div>
          <label htmlFor="trades" className="block text-sm font-medium text-gray-700 mb-1">
            Which trades does it serve?
          </label>
          <input
            type="text"
            id="trades"
            name="trades"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., Plumbers, HVAC, Electricians"
          />
        </div>

        <div>
          <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 mb-1">
            Pricing
          </label>
          <input
            type="text"
            id="pricing"
            name="pricing"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., Free tier, then $39/mo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="submitter_name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="submitter_name"
              name="submitter_name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="submitter_email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="submitter_email"
              name="submitter_email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Submit for Review
        </button>

        <p className="text-xs text-gray-500 text-center">
          We review every submission. If approved, we'll write an honest review
          — good and bad. No pay-for-play.
        </p>
      </form>
    </div>
  );
}
