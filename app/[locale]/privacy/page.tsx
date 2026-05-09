'use client';

const translations = {
  ar: {
    title: '🔒 سياسة الخصوصية',
    subtitle: 'كيف نحمي بياناتك',
    intro: 'في ToolKit Pro، نأخذ خصوصيتك على محمل الجد.',
    dataTitle: '📊 البيانات التي نجمعها',
    dataText: 'لا نقوم بتخزين أي من النصوص التي تقوم بمعالجتها على خوادمنا.',
    contactTitle: '📞 اتصل بنا',
    contactText: 'إذا كان لديك أي أسئلة، يرجى الاتصال بنا.'
  },
  en: {
    title: '🔒 Privacy Policy',
    subtitle: 'How we protect your data',
    intro: 'At ToolKit Pro, we take your privacy seriously.',
    dataTitle: '📊 Data we collect',
    dataText: 'We do not store any of the texts you process on our servers.',
    contactTitle: '📞 Contact Us',
    contactText: 'If you have any questions, please contact us.'
  },
  de: {
    title: '🔒 Datenschutzerklärung',
    subtitle: 'Wie wir Ihre Daten schützen',
    intro: 'Bei ToolKit Pro nehmen wir Ihre Privatsphäre ernst.',
    dataTitle: '📊 Gesammelte Daten',
    dataText: 'Wir speichern keine Texte, die Sie verarbeiten, auf unseren Servern.',
    contactTitle: '📞 Kontakt',
    contactText: 'Bei Fragen kontaktieren Sie uns.'
  },
  fr: {
    title: '🔒 Politique de confidentialité',
    subtitle: 'Comment nous protégeons vos données',
    intro: 'Chez ToolKit Pro, nous prenons votre vie privée au sérieux.',
    dataTitle: '📊 Données collectées',
    dataText: 'Nous ne stockons aucun texte que vous traitez sur nos serveurs.',
    contactTitle: '📞 Contactez-nous',
    contactText: 'Pour toute question, contactez-nous.'
  },
  es: {
    title: '🔒 Política de privacidad',
    subtitle: 'Cómo protegemos sus datos',
    intro: 'En ToolKit Pro, nos tomamos su privacidad en serio.',
    dataTitle: '📊 Datos que recopilamos',
    dataText: 'No almacenamos ninguno de los textos que procesa en nuestros servidores.',
    contactTitle: '📞 Contáctenos',
    contactText: 'Si tiene preguntas, contáctenos.'
  }
};

export default function PrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="container-custom animate-fade-in-up" style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="tool-card-single">
        <div className="tool-header">
          <div className="tool-header-icon">🔒</div>
          <h1>{t.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{t.subtitle}</p>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>{t.dataTitle}</h3>
            <p>{t.dataText}</p>
          </div>
          
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>{t.contactTitle}</h3>
            <p>{t.contactText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}