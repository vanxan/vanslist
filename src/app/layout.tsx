import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'VansList — AI Tools for Every Trade',
  description: 'The best AI tools, prompts, and workflows for small businesses. Organized by trade. Reviewed in plain English.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans bg-gray-50 text-gray-900 antialiased`}>
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              Vans<span className="text-blue-600">List</span>
            </a>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900">Browse Trades</a>
              <a href="/submit" className="hover:text-gray-900">Submit a Tool</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-gray-500">
            <p>VansList — AI tools for every trade, reviewed in plain English.</p>
            <p className="mt-1">Not affiliated with any tools listed. We call it like we see it.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
