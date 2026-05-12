import { Cairo, Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'ToolKit ProAI - 28+ Professional Text Tools',
    template: '%s | ToolKit ProAI'
  },
  description: 'Free online text tools platform with 28+ professional tools for writers, content creators, and developers. JSON Formatter, Slug Generator, Word Counter, Hashtag Generator and more. Support 5 languages.',
  keywords: 'text tools, json formatter, slug generator, word counter, hashtag generator, text reverser, character counter, remove spaces, sentence case, title case, text cleaner, strikethrough, upside down text, mirror text, italic text, underline text, bold text, alternating case, invert case, small text, wide text, binary converter, unicode converter, invisible text, sort words, roman numeral',
  authors: [{ name: 'ToolKit ProAI', url: 'https://toolkitpro-ai.com' }],
  creator: 'ToolKit ProAI',
  publisher: 'ToolKit ProAI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'ToolKit ProAI - 28+ Professional Text Tools',
    description: 'Free online text tools platform with 28+ professional tools for writers and developers.',
    url: 'https://toolkitpro-ai.com',
    siteName: 'ToolKit ProAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ToolKit ProAI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolKit ProAI - 28+ Professional Text Tools',
    description: 'Free online text tools platform with 28+ professional tools.',
    images: ['/twitter-image.jpg'],
    creator: '@toolkitproai',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    languages: {
      'en': '/en',
      'ar': '/ar',
      'de': '/de',
      'fr': '/fr',
      'es': '/es',
      'x-default': '/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo-small.png" />
        <link rel="apple-touch-icon" href="/images/logo-small.png" />
        <link rel="canonical" href="https://toolkitpro-ai.com" />
      </head>
      <body className={`${cairo.variable} ${inter.variable}`} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}