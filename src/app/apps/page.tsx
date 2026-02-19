import { Metadata } from 'next';
import { AI_APPS, AI_APP_CATEGORIES } from '@/data/ai-apps';
import { AppsPageContent } from './AppsPageContent';

export const metadata: Metadata = {
  title: 'AI Apps — Curated Tools for Your Business',
  description: 'Our curated picks for the best AI-powered tools for your business. Browse apps across writing, design, marketing, SEO, and more.',
};

export default function AppsPage() {
  return <AppsPageContent apps={AI_APPS} categories={AI_APP_CATEGORIES} />;
}
