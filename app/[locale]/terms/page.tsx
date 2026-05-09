'use client';

const translations = {
  ar: {
    title: '📜 شروط الاستخدام',
    subtitle: 'القواعد التي تحكم استخدامك لموقعنا',
    intro: 'باستخدامك لموقع ToolKit Pro، فإنك توافق على هذه الشروط.',
    useTitle: '✅ الاستخدام المسموح',
    useText: 'يمكنك استخدام جميع الأدوات مجاناً ولأي غرض قانوني.',
    contactTitle: '📞 اتصل بنا',
    contactText: 'لأية أسئلة، راسلنا على info@toolkitpro.com'
  },
  en: {
    title: '📜 Terms of Service',
    subtitle: 'Rules governing your use of our site',
    intro: 'By using ToolKit Pro, you agree to these terms.',
    useTitle: '✅ Permitted Use',
    useText: 'You may use all tools for free for any lawful purpose.',
    contactTitle: '📞 Contact Us',
    contactText: 'For questions, email us at info@toolkitpro.com'
  },
  de: {
    title: '📜 Nutzungsbedingungen',
    subtitle: 'Regeln für die Nutzung unserer Website',
    intro: 'Durch die Nutzung von ToolKit Pro stimmen Sie diesen Bedingungen zu.',
    useTitle: '✅ Zulässige Nutzung',
    useText: 'Sie können alle Werkzeuge kostenlos für jeden rechtmäßigen Zweck nutzen.',
    contactTitle: '📞 Kontakt',
    contactText: 'Bei Fragen kontaktieren Sie uns unter info@toolkitpro.com'
  },
  fr: {
    title: '📜 Conditions d\'utilisation',
    subtitle: 'Règles régissant votre utilisation',
    intro: 'En utilisant ToolKit Pro, vous acceptez ces conditions.',
    useTitle: '✅ Utilisation permise',
    useText: 'Vous pouvez utiliser tous les outils gratuitement pour toute fin légale.',
    contactTitle: '📞 Contactez-nous',
    contactText: 'Pour toute question, contactez-nous à info@toolkitpro.com'
  },
  es: {
    title: '📜 Términos de servicio',
    subtitle: 'Reglas que rigen el uso de nuestro sitio',
    intro: 'Al usar ToolKit Pro, aceptas estos términos.',
    useTitle: '✅ Uso permitido',
    useText: 'Puede usar todas las herramientas gratis para cualquier propósito legal.',
    contactTitle: '📞 Contáctenos',
    contactText: 'Para preguntas, contáctenos en info@toolkitpro.com'
  }
};

export default function TermsPage({
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
          <div className="tool-header-icon">📜</div>
          <h1>{t.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{t.subtitle}</p>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>{t.useTitle}</h3>
            <p>{t.useText}</p>
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