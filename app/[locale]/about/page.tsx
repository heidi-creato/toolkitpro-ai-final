'use client';

const translations = {
  ar: {
    title: '📖 من نحن',
    para1: 'ToolKit Pro هي منصة متكاملة تحتوي على 28+ أداة احترافية لمعالجة النصوص.',
    para2: 'نحن نؤمن بأن الأدوات الجيدة يجب أن تكون متاحة للجميع دون تعقيدات.',
    missionTitle: '🎯 مهمتنا',
    mission: 'تمكين الكتّاب وصناع المحتوى من أدوات احترافية.',
    visionTitle: '👁️ رؤيتنا',
    vision: 'أن نكون المنصة الأولى عالمياً في مجال أدوات معالجة النصوص.'
  },
  en: {
    title: '📖 About Us',
    para1: 'ToolKit Pro is a comprehensive platform with 28+ professional tools for text processing.',
    para2: 'We believe that good tools should be available to everyone without complexity.',
    missionTitle: '🎯 Our Mission',
    mission: 'Empower writers and content creators with professional tools.',
    visionTitle: '👁️ Our Vision',
    vision: 'To be the leading platform worldwide for text processing tools.'
  },
  de: {
    title: '📖 Über uns',
    para1: 'ToolKit Pro ist eine Plattform mit 28+ professionellen Werkzeugen.',
    para2: 'Wir glauben, dass gute Werkzeuge für alle verfügbar sein sollten.',
    missionTitle: '🎯 Unsere Mission',
    mission: 'Autoren und Content-Ersteller zu befähigen.',
    visionTitle: '👁️ Unsere Vision',
    vision: 'Die führende Plattform für Textverarbeitung zu sein.'
  },
  fr: {
    title: '📖 À propos',
    para1: 'ToolKit Pro est une plateforme avec 28+ outils professionnels.',
    para2: 'Nous croyons que les bons outils devraient être accessibles à tous.',
    missionTitle: '🎯 Notre mission',
    mission: 'Autonomiser les rédacteurs et créateurs de contenu.',
    visionTitle: '👁️ Notre vision',
    vision: 'Être la plateforme leader pour les outils de traitement de texte.'
  },
  es: {
    title: '📖 Acerca de',
    para1: 'ToolKit Pro es una plataforma con 28+ herramientas profesionales.',
    para2: 'Creemos que las buenas herramientas deberían estar disponibles para todos.',
    missionTitle: '🎯 Nuestra misión',
    mission: 'Empoderar a escritores y creadores de contenido.',
    visionTitle: '👁️ Nuestra visión',
    vision: 'Ser la plataforma líder en herramientas de procesamiento de texto.'
  }
};

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const isRTL = locale === 'ar';

  return (
    <div className="container-custom animate-fade-in-up" style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="tool-card-single">
        <h1 style={{ 
          fontSize: '1.8rem', 
          color: 'var(--accent)', 
          marginBottom: '1rem', 
          textAlign: isRTL ? 'right' : 'left' 
        }}>{t.title}</h1>
        
        <div style={{ marginTop: '1rem' }}>
          <p style={{ lineHeight: '1.8', marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>{t.para1}</p>
          <p style={{ lineHeight: '1.8', marginBottom: '2rem', textAlign: isRTL ? 'right' : 'left' }}>{t.para2}</p>
          
          <div style={{ background: 'rgba(255,159,74,0.1)', padding: '1rem', borderRadius: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem', textAlign: isRTL ? 'right' : 'left' }}>{t.missionTitle}</h3>
            <p style={{ textAlign: isRTL ? 'right' : 'left' }}>{t.mission}</p>
          </div>
          
          <div style={{ background: 'rgba(255,159,74,0.1)', padding: '1rem', borderRadius: '1rem' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem', textAlign: isRTL ? 'right' : 'left' }}>{t.visionTitle}</h3>
            <p style={{ textAlign: isRTL ? 'right' : 'left' }}>{t.vision}</p>
          </div>
        </div>
      </div>
    </div>
  );
}