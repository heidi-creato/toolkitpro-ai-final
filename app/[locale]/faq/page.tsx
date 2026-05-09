'use client';

import { useState } from 'react';

const faqData = {
  ar: {
    title: '❓ الأسئلة الشائعة',
    subtitle: 'أجوبة على أكثر الأسئلة شيوعاً',
    faqs: [
      { q: 'هل الموقع مجاني؟', a: 'نعم، ToolKit Pro مجاني بالكامل ولا يحتاج إلى أي رسوم.' },
      { q: 'هل يتم تخزين بياناتي؟', a: 'لا، جميع المعالجات تتم في متصفحك. لا نخزن أي من نصوصك.' },
      { q: 'كم عدد الأدوات المتاحة؟', a: 'يحتوي الموقع حالياً على أكثر من 28 أداة لمعالجة النصوص.' }
    ]
  },
  en: {
    title: '❓ Frequently Asked Questions',
    subtitle: 'Answers to the most common questions',
    faqs: [
      { q: 'Is the website free?', a: 'Yes, ToolKit Pro is completely free.' },
      { q: 'Is my data stored?', a: 'No, all processing happens in your browser.' },
      { q: 'How many tools are available?', a: 'The website currently has over 28 tools.' }
    ]
  },
  de: {
    title: '❓ Häufig gestellte Fragen',
    subtitle: 'Antworten auf die häufigsten Fragen',
    faqs: [
      { q: 'Ist die Website kostenlos?', a: 'Ja, ToolKit Pro ist völlig kostenlos.' },
      { q: 'Werden meine Daten gespeichert?', a: 'Nein, alle Verarbeitungen erfolgen in Ihrem Browser.' },
      { q: 'Wie viele Werkzeuge gibt es?', a: 'Die Website verfügt über mehr als 28 Werkzeuge.' }
    ]
  },
  fr: {
    title: '❓ Foire aux questions',
    subtitle: 'Réponses aux questions les plus courantes',
    faqs: [
      { q: 'Le site est-il gratuit?', a: 'Oui, ToolKit Pro est entièrement gratuit.' },
      { q: 'Mes données sont-elles stockées?', a: 'Non, tout le traitement se fait dans votre navigateur.' },
      { q: 'Combien d\'outils sont disponibles?', a: 'Le site propose plus de 28 outils.' }
    ]
  },
  es: {
    title: '❓ Preguntas frecuentes',
    subtitle: 'Respuestas a las preguntas más comunes',
    faqs: [
      { q: '¿El sitio es gratuito?', a: 'Sí, ToolKit Pro es completamente gratuito.' },
      { q: '¿Se almacenan mis datos?', a: 'No, todo el procesamiento ocurre en tu navegador.' },
      { q: '¿Cuántas herramientas hay?', a: 'El sitio tiene más de 28 herramientas.' }
    ]
  }
};

export default function FAQPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const data = faqData[locale as keyof typeof faqData] || faqData.en;
  const isRTL = locale === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container-custom animate-fade-in-up" style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="tool-card-single">
        <h1 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '0.5rem', textAlign: isRTL ? 'right' : 'left' }}>{data.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: isRTL ? 'right' : 'left' }}>{data.subtitle}</p>
        
        <div>
          {data.faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <div 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                  padding: '0.5rem', borderRadius: '0.5rem'
                }}
              >
                <h3 style={{ color: 'var(--accent)', fontSize: '1.1rem', textAlign: isRTL ? 'right' : 'left', flex: 1 }}>{faq.q}</h3>
                <span style={{ fontSize: '1.2rem' }}>{openIndex === index ? '▲' : '▼'}</span>
              </div>
              {openIndex === index && (
                <div style={{ padding: '0.5rem', color: 'var(--text-secondary)', lineHeight: '1.6', textAlign: isRTL ? 'right' : 'left' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}