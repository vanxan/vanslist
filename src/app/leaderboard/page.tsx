import { Metadata } from 'next';
import { LISTINGS } from '@/data/listings';
import { LeaderboardContent } from './LeaderboardContent';

export const metadata: Metadata = {
  title: 'Leaderboard — Top AI Tools',
  description: 'See the most popular AI tools, prompts, and workflows ranked by community votes.',
};

export default function LeaderboardPage() {
  return <LeaderboardContent listings={LISTINGS} />;
}
