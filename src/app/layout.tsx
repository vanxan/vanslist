import type { Metadata } from 'next';
import { Inter, DM_Mono } from 'next/font/google';
import Link from 'next/link';
import { SquaresFour, RocketLaunch, Trophy, PaperPlaneTilt, SealCheck } from '@phosphor-icons/react/dist/ssr';
import { MobileNav } from '@/components/MobileNav';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vanslist.com'),
  title: {
    default: 'VansList — AI Tools for Every Trade',
    template: '%s | VansList',
  },
  description: 'The best AI tools, prompts, and workflows for small businesses. Organized by trade. Reviewed in plain English. No tech degree required.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'VansList',
    title: 'VansList — AI Tools for Every Trade',
    description: 'The best AI tools, prompts, and workflows for small businesses. Organized by trade. Reviewed in plain English.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VansList — AI Tools for Every Trade',
    description: 'The best AI tools, prompts, and workflows for small businesses.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body className="bg-page text-gray-900 antialiased font-[family-name:var(--font-inter)]">
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm relative">
          <div className="mx-auto max-w-container px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-extrabold tracking-tight">
              Vans<span className="text-gold">List</span>
            </Link>
            <div className="hidden lg:flex gap-6 text-[13px] text-gray-500 font-medium">
              <Link href="/browse" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                <SquaresFour size={15} /> Browse
              </Link>
              <Link href="/apps" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                <RocketLaunch size={15} /> Apps
              </Link>
              <Link href="/leaderboard" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                <Trophy size={15} /> Leaderboard
              </Link>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/submit" className="text-[13px] text-gray-500 flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                <PaperPlaneTilt size={15} /> Submit
              </Link>
              <Link href="/get-verified" className="bg-[#1a1a1a] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-black transition-colors">
                <SealCheck size={14} className="text-gold" /> Get Verified
              </Link>
            </div>
            <MobileNav />
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-100 bg-white py-8 text-center px-4">
          <div className="text-base font-extrabold mb-1.5">
            Vans<span className="text-gold">List</span>
          </div>
          <p className="text-xs text-gray-400">AI tools for every trade, reviewed in plain English.</p>
          <p className="text-[11px] text-gray-300 mt-1">Not affiliated with any tools listed. We call it like we see it.</p>
        </footer>
      </body>
    </html>
  );
}
