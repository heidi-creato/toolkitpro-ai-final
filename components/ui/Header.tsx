'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import toolsData from '@/data/tools.json';

// ترجمة كاملة
const translations = {
  ar: { 
    home: '🏠 الرئيسية', 
    tools: '🛠️ الأدوات', 
    searchPlaceholder: '🔍 ابحث عن أداة...',
    popularTools: '✨ أدوات رائجة',
    searchResults: 'نتائج البحث',
    noResults: 'لا توجد نتائج مطابقة'
  },
  en: { 
    home: '🏠 Home', 
    tools: '🛠️ Tools', 
    searchPlaceholder: '🔍 Search for tool...',
    popularTools: '✨ Popular Tools',
    searchResults: 'Search Results',
    noResults: 'No matching results'
  },
  de: { 
    home: '🏠 Startseite', 
    tools: '🛠️ Werkzeuge', 
    searchPlaceholder: '🔍 Werkzeug suchen...',
    popularTools: '✨ Beliebte Werkzeuge',
    searchResults: 'Suchergebnisse',
    noResults: 'Keine Übereinstimmungen'
  },
  fr: { 
    home: '🏠 Accueil', 
    tools: '🛠️ Outils', 
    searchPlaceholder: '🔍 Rechercher un outil...',
    popularTools: '✨ Outils populaires',
    searchResults: 'Résultats de recherche',
    noResults: 'Aucun résultat'
  },
  es: { 
    home: '🏠 Inicio', 
    tools: '🛠️ Herramientas', 
    searchPlaceholder: '🔍 Buscar herramienta...',
    popularTools: '✨ Herramientas populares',
    searchResults: 'Resultados de búsqueda',
    noResults: 'Sin resultados'
  }
};

// أسماء اللغات للقائمة المنسدلة
const langNames: Record<string, string> = {
  en: '🇬🇧 English',
  de: '🇩🇪 Deutsch',
  fr: '🇫🇷 Français',
  es: '🇪🇸 Español',
  ar: '🇸🇦 العربية'
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('en');
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const pathLang = pathname.split('/')[1];
    if (['en', 'de', 'fr', 'es', 'ar'].includes(pathLang)) {
      setCurrentLang(pathLang);
    } else {
      setCurrentLang('en');
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // دالة البحث الفورية
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const tools = toolsData.tools || [];
      const query = searchQuery.toLowerCase();
      
      const results = tools.filter(tool => {
        // البحث في الاسم باللغة الحالية
        let toolName = '';
        switch(currentLang) {
          case 'ar': toolName = tool.nameAr || tool.name; break;
          case 'de': toolName = tool.nameDe || tool.name; break;
          case 'fr': toolName = tool.nameFr || tool.name; break;
          case 'es': toolName = tool.nameEs || tool.name; break;
          default: toolName = tool.name;
        }
        
        // البحث في الوصف باللغة الحالية
        let toolDesc = '';
        switch(currentLang) {
          case 'ar': toolDesc = tool.description; break;
          case 'de': toolDesc = tool.descriptionDe || tool.descriptionEn || tool.description; break;
          case 'fr': toolDesc = tool.descriptionFr || tool.descriptionEn || tool.description; break;
          case 'es': toolDesc = tool.descriptionEs || tool.descriptionEn || tool.description; break;
          default: toolDesc = tool.descriptionEn || tool.description;
        }
        
        return toolName.toLowerCase().includes(query) || 
               toolDesc.toLowerCase().includes(query);
      });
      
      setSearchResults(results.slice(0, 8)); // حد أقصى 8 نتائج
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery, currentLang]);

  const changeLanguage = (lang: string) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    const newPath = `/${lang}${currentPath ? `/${currentPath}` : ''}`;
    router.push(newPath);
  };

  const navigateTo = (page: string) => {
    router.push(`/${currentLang}${page}`);
  };

  const handleSearchResultClick = (toolId: string) => {
    router.push(`/${currentLang}/tools/${toolId}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // أبعاد الشعار مع الحفاظ على النسبة الأصلية (465:205 ≈ 2.27)
  const LOGO_WIDTH = 120;
  const LOGO_HEIGHT = 60;

  const getToolName = (tool: any) => {
    switch(currentLang) {
      case 'ar': return tool.nameAr || tool.name;
      case 'de': return tool.nameDe || tool.name;
      case 'fr': return tool.nameFr || tool.name;
      case 'es': return tool.nameEs || tool.name;
      default: return tool.name;
    }
  };

  const getToolDescription = (tool: any) => {
    switch(currentLang) {
      case 'ar': return tool.description;
      case 'de': return tool.descriptionDe || tool.descriptionEn || tool.description;
      case 'fr': return tool.descriptionFr || tool.descriptionEn || tool.description;
      case 'es': return tool.descriptionEs || tool.descriptionEn || tool.description;
      default: return tool.descriptionEn || tool.description;
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo-area" onClick={() => navigateTo('')}>
        <div className="logo-desktop">
          <Image 
            src="/images/logo-large.png" 
            alt="Logo" 
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="logo-image"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="logo-mobile">
          <Image 
            src="/images/logo-small.png" 
            alt="Logo" 
            width={45}
            height={19}
            priority
            className="logo-image"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      
      {/* شريط البحث + أزرار Home و Tools */}
      <div className="center-group">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowResults(true)}
            placeholder={t.searchPlaceholder}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
          
          {/* نتائج البحث الفورية */}
          {showResults && (
            <div className="search-results">
              {searchResults.length > 0 ? (
                <>
                  <div className="results-title">{t.searchResults}</div>
                  {searchResults.map((tool) => (
                    <div
                      key={tool.id}
                      className="result-item"
                      onClick={() => handleSearchResultClick(tool.id)}
                    >
                      <div className="result-icon">{tool.icon}</div>
                      <div className="result-info">
                        <div className="result-name">{getToolName(tool)}</div>
                        <div className="result-desc">{getToolDescription(tool)}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                searchQuery.trim().length > 0 && (
                  <div className="no-results">{t.noResults}</div>
                )
              )}
            </div>
          )}
        </div>
        
        <div className="nav-links">
          <button onClick={() => navigateTo('')}>{t.home}</button>
          <button onClick={() => navigateTo('/tools')}>{t.tools}</button>
        </div>
      </div>
      
      <div className="nav-controls">
        <select 
          value={currentLang} 
          onChange={(e) => changeLanguage(e.target.value)}
        >
          {Object.entries(langNames).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        
        <button onClick={toggleTheme} className="theme-btn">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      <style jsx>{`
        .navbar {
          background: rgba(10, 25, 35, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.6rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          flex-wrap: wrap;
        }
        .navbar.scrolled {
          padding: 0.4rem 2rem;
          background: rgba(10, 25, 35, 0.98);
        }
        .logo-area {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .logo-desktop {
          display: block;
        }
        .logo-mobile {
          display: none;
        }
        .logo-image {
          border-radius: 0px;
          border: none;
          outline: none;
          box-shadow: none;
        }
        .center-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          justify-content: center;
        }
        .search-container {
          position: relative;
          max-width: 350px;
          width: 100%;
        }
        .search-input {
          width: 100%;
          padding: 0.5rem 2.5rem 0.5rem 1rem;
          border-radius: 2rem;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-primary);
          outline: none;
          font-size: 0.85rem;
        }
        .search-input:focus {
          border-color: var(--accent);
        }
        .search-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: var(--text-secondary);
          padding: 0;
        }
        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-card);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          border: 1px solid var(--border);
          margin-top: 0.5rem;
          overflow: hidden;
          z-index: 1000;
          max-height: 400px;
          overflow-y: auto;
        }
        .results-title {
          padding: 0.6rem 1rem;
          font-size: 0.7rem;
          color: var(--accent);
          border-bottom: 1px solid var(--border);
          font-weight: bold;
        }
        .result-item {
          padding: 0.6rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: background 0.2s;
          border-bottom: 1px solid var(--border);
        }
        .result-item:hover {
          background: var(--accent);
        }
        .result-item:hover .result-name,
        .result-item:hover .result-desc {
          color: #1e2a2f;
        }
        .result-icon {
          font-size: 1.5rem;
        }
        .result-info {
          flex: 1;
        }
        .result-name {
          font-size: 0.85rem;
          font-weight: bold;
          color: var(--text-primary);
        }
        .result-desc {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
        .no-results {
          padding: 1rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }
        .nav-links {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .nav-links button {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.2s;
          padding: 0.4rem 0.8rem;
          border-radius: 2rem;
        }
        .nav-links button:hover {
          background: var(--accent);
          color: #1e2a2f;
        }
        .nav-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .nav-controls select {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 0.4rem 0.8rem;
          border-radius: 2rem;
          cursor: pointer;
          font-size: 0.8rem;
          color: var(--text-primary);
        }
        .theme-btn {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 0.4rem 0.8rem;
          border-radius: 2rem;
          cursor: pointer;
          font-size: 1rem;
        }
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            padding: 0.8rem 1rem;
          }
          .logo-desktop {
            display: none;
          }
          .logo-mobile {
            display: block;
          }
          .center-group {
            flex-direction: column;
            width: 100%;
          }
          .search-container {
            max-width: 100%;
            width: 100%;
          }
          .nav-links {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}