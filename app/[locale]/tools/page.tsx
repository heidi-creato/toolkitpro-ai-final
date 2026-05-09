'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import toolsData from '@/data/tools.json';

const translations = {
  ar: {
    title: 'جميع الأدوات',
    subtitle: 'استكشف أكثر من 28 أداة احترافية لمعالجة النصوص',
    searchPlaceholder: '🔍 ابحث في الأدوات...',
    noResults: 'لا توجد أدوات مطابقة للبحث',
    backToHome: 'العودة للرئيسية',
    categories: {
      all: 'الكل',
      primary: 'أساسية',
      secondary: 'متوسطة',
      decorative: 'زخرفية'
    }
  },
  en: {
    title: 'All Tools',
    subtitle: 'Explore over 28 professional text processing tools',
    searchPlaceholder: '🔍 Search tools...',
    noResults: 'No tools match your search',
    backToHome: 'Back to Home',
    categories: {
      all: 'All',
      primary: 'Essential',
      secondary: 'Medium',
      decorative: 'Decorative'
    }
  },
  de: {
    title: 'Alle Werkzeuge',
    subtitle: 'Entdecken Sie über 28 professionelle Textverarbeitungswerkzeuge',
    searchPlaceholder: '🔍 Werkzeuge durchsuchen...',
    noResults: 'Keine Werkzeuge gefunden',
    backToHome: 'Zurück zur Startseite',
    categories: {
      all: 'Alle',
      primary: 'Wesentlich',
      secondary: 'Mittel',
      decorative: 'Dekorativ'
    }
  },
  fr: {
    title: 'Tous les outils',
    subtitle: 'Découvrez plus de 28 outils professionnels de traitement de texte',
    searchPlaceholder: '🔍 Rechercher des outils...',
    noResults: 'Aucun outil trouvé',
    backToHome: 'Retour à l\'accueil',
    categories: {
      all: 'Tous',
      primary: 'Essentiels',
      secondary: 'Moyens',
      decorative: 'Décoratifs'
    }
  },
  es: {
    title: 'Todas las herramientas',
    subtitle: 'Descubre más de 28 herramientas profesionales de procesamiento de texto',
    searchPlaceholder: '🔍 Buscar herramientas...',
    noResults: 'No se encontraron herramientas',
    backToHome: 'Volver al inicio',
    categories: {
      all: 'Todos',
      primary: 'Esenciales',
      secondary: 'Medios',
      decorative: 'Decorativos'
    }
  }
};

export default function ToolsListPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const t = translations[locale as keyof typeof translations] || translations.en;
  const tools = toolsData.tools || [];
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const getToolName = (tool: any) => {
    switch(locale) {
      case 'ar': return tool.nameAr || tool.name;
      case 'de': return tool.nameDe || tool.name;
      case 'fr': return tool.nameFr || tool.name;
      case 'es': return tool.nameEs || tool.name;
      default: return tool.name;
    }
  };

  const filteredTools = tools.filter((tool) => {
    const name = getToolName(tool).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  // تحديث URL عند تغيير البحث
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('search', value);
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="container-custom animate-fade-in-up">
      {/* Hero Section with Logo */}
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
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '5px', lineHeight: '1.2' }}>{t.subtitle}</p>
      </div>

      {/* شريط البحث */}
      <div style={{ maxWidth: '500px', margin: '1rem auto 2rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          style={{
            width: '100%',
            padding: '0.8rem 1rem',
            borderRadius: '2rem',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
      </div>

      <div className="ads-container">
        <div className="ads-placeholder">📢 مساحة إعلانات Google AdSense</div>
      </div>

      {filteredTools.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>{t.noResults}</p>
        </div>
      ) : (
        <div className="tools-grid">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={`/${locale}/tools/${tool.id}`} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-name">{getToolName(tool)}</div>
              <div className="tool-desc">{tool.description}</div>
            </Link>
          ))}
        </div>
      )}

      <div className="ads-container">
        <div className="ads-placeholder">📢 مساحة إعلانات Google AdSense</div>
      </div>
    </div>
  );
}