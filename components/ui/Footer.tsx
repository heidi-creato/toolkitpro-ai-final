'use client';

import { useParams, useRouter } from 'next/navigation';

const translations = {
  ar: { about: '📖 من نحن', contact: '📞 اتصل بنا', privacy: '🔒 سياسة الخصوصية', terms: '📜 شروط الاستخدام', rights: 'جميع الحقوق محفوظة', coffee: '☕ اشتر لي قهوة' },
  en: { about: '📖 About', contact: '📞 Contact', privacy: '🔒 Privacy Policy', terms: '📜 Terms of Service', rights: 'All rights reserved', coffee: '☕ Buy me a coffee' },
  de: { about: '📖 Über uns', contact: '📞 Kontakt', privacy: '🔒 Datenschutz', terms: '📜 Nutzungsbedingungen', rights: 'Alle Rechte vorbehalten', coffee: '☕ Kauf mir einen Kaffee' },
  fr: { about: '📖 À propos', contact: '📞 Contact', privacy: '🔒 Confidentialité', terms: '📜 Conditions', rights: 'Tous droits réservés', coffee: '☕ Offrez-moi un café' },
  es: { about: '📖 Acerca de', contact: '📞 Contacto', privacy: '🔒 Privacidad', terms: '📜 Términos', rights: 'Todos los derechos reservados', coffee: '☕ Cómprame un café' }
};

export default function Footer() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'ar';
  const t = translations[locale as keyof typeof translations] || translations.ar;
  const currentYear = new Date().getFullYear();

  const navigateTo = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  return (
    <footer>
      <div className="footer-links">
        <button onClick={() => navigateTo('/about')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>{t.about}</button>
        <button onClick={() => navigateTo('/contact')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>{t.contact}</button>
        <button onClick={() => navigateTo('/privacy')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>{t.privacy}</button>
        <button onClick={() => navigateTo('/terms')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>{t.terms}</button>
      </div>
      <p>© {currentYear} ToolKit ProAI - 28+ {t.rights.toLowerCase()}</p>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => window.open('https://www.buymeacoffee.com/', '_blank')} style={{ background: '#ffdd99', color: '#3b2a1f', padding: '0.4rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>{t.coffee}</button>
      </div>
    </footer>
  );
}