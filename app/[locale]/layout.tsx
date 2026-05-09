'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const [isLoading, setIsLoading] = useState(true);
  const direction = 'ltr';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ width: '60px', height: '60px', marginBottom: '1rem' }}></div>
          <p style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>🛠️ ToolKit ProAI</p>
          <p style={{ color: 'var(--text-secondary)' }}>
            {locale === 'ar' ? 'جاري تحميل الأدوات...' : 'Loading tools...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div dir={direction} className="min-h-screen">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />

      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}
    </div>
  );
}