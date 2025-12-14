import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers';

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Erasmus+ Youth Exchange',
  description: 'Manage your Erasmus+ Youth Exchange events, participants, and partner organizations',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
