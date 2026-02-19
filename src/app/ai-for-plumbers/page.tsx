import { Metadata } from 'next';
import { LISTINGS } from '@/data/listings';
import { TradePageContent } from './TradePageContent';

export const metadata: Metadata = {
  title: 'AI for Plumbers — Tools, Prompts & Workflows',
  description: 'Discover AI tools, prompts, and workflows built for plumbing businesses. Browse 14 resources and find the perfect AI for your needs.',
};

export default function TradePage() {
  return <TradePageContent listings={LISTINGS} />;
}
