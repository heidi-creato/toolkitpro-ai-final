'use client';

import Link from 'next/link';
import Image from 'next/image';
import toolsData from '@/data/tools.json';

// ترجمة كاملة - اللغة الإنجليزية هي الافتراضية
const translations = {
  en: {
    heroDesc: '✨ 28+ Professional tools for writers and content creators',
    primaryTitle: '🥇 Essential Tools - High Demand',
    secondaryTitle: '🥈 Medium Tools - Daily Use',
    decorativeTitle: '🎨 Decorative Tools - Creative',
    ads: '📢 Google AdSense Space'
  },
  ar: {
    heroDesc: '✨ 28+ أداة احترافية للكتّاب وصناع المحتوى',
    primaryTitle: '🥇 أدوات أساسية - مطلوبة بشدة',
    secondaryTitle: '🥈 أدوات متوسطة - مفيدة يومياً',
    decorativeTitle: '🎨 أدوات زخرفية - للإبداع والتصميم',
    ads: '📢 مساحة إعلانات Google AdSense'
  },
  de: {
    heroDesc: '✨ 28+ Professionelle Werkzeuge für Autoren',
    primaryTitle: '🥇 Wesentliche Werkzeuge',
    secondaryTitle: '🥈 Mittelwerkzeuge',
    decorativeTitle: '🎨 Dekorative Werkzeuge',
    ads: '📢 Google AdSense Platz'
  },
  fr: {
    heroDesc: '✨ 28+ Outils professionnels pour rédacteurs',
    primaryTitle: '🥇 Outils essentiels',
    secondaryTitle: '🥈 Outils moyens',
    decorativeTitle: '🎨 Outils décoratifs',
    ads: '📢 Espace Google AdSense'
  },
  es: {
    heroDesc: '✨ 28+ Herramientas profesionales para escritores',
    primaryTitle: '🥇 Herramientas esenciales',
    secondaryTitle: '🥈 Herramientas medias',
    decorativeTitle: '🎨 Herramientas decorativas',
    ads: '📢 Espacio Google AdSense'
  }
};

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  
  const tools = toolsData.tools || [];
  const primaryTools = tools.slice(0, 9);
  const secondaryTools = tools.slice(9, 15);
  const decorativeTools = tools.slice(15, 21);

  const getToolName = (tool: any) => {
    switch(locale) {
      case 'ar': return tool.nameAr || tool.name;
      case 'de': return tool.nameDe || tool.name;
      case 'fr': return tool.nameFr || tool.name;
      case 'es': return tool.nameEs || tool.name;
      default: return tool.name;
    }
  };

  const getToolDescription = (tool: any) => {
    switch(locale) {
      case 'ar': return tool.description;
      case 'de': return tool.descriptionDe || tool.descriptionEn || tool.description;
      case 'fr': return tool.descriptionFr || tool.descriptionEn || tool.description;
      case 'es': return tool.descriptionEs || tool.descriptionEn || tool.description;
      default: return tool.descriptionEn || tool.description;
    }
  };

  return (
    <div className="container-custom animate-fade-in-up">
      <div style={{ textAlign: 'center', padding: '0.5rem 0 0.5rem' }}>
        <div className="hero-logo" style={{ marginBottom: '0px', lineHeight: '0' }}>
          <Image 
            src="/images/logo-large.png" 
            alt="Logo" 
            width={200}
            height={88}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '5px', lineHeight: '1.2' }}>{t.heroDesc}</p>
      </div>

      <div className="ads-container">
        <div className="ads-placeholder">{t.ads}</div>
      </div>

      <div className="category-section">
        <div style={{ textAlign: 'center' }}>
          <h2 className="category-title" style={{ display: 'inline-block' }}>{t.primaryTitle}</h2>
        </div>
        <div className="tools-grid">
          {primaryTools.map((tool) => (
            <Link key={tool.id} href={`/${locale}/tools/${tool.id}`} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-name">{getToolName(tool)}</div>
              <div className="tool-desc">{getToolDescription(tool)}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="category-section">
        <div style={{ textAlign: 'center' }}>
          <h2 className="category-title" style={{ display: 'inline-block' }}>{t.secondaryTitle}</h2>
        </div>
        <div className="tools-grid">
          {secondaryTools.map((tool) => (
            <Link key={tool.id} href={`/${locale}/tools/${tool.id}`} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-name">{getToolName(tool)}</div>
              <div className="tool-desc">{getToolDescription(tool)}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="category-section">
        <div style={{ textAlign: 'center' }}>
          <h2 className="category-title" style={{ display: 'inline-block' }}>{t.decorativeTitle}</h2>
        </div>
        <div className="tools-grid">
          {decorativeTools.map((tool) => (
            <Link key={tool.id} href={`/${locale}/tools/${tool.id}`} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-name">{getToolName(tool)}</div>
              <div className="tool-desc">{getToolDescription(tool)}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="ads-container">
        <div className="ads-placeholder">{t.ads}</div>
      </div>
    </div>
  );
}