// lib/language-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en' | 'de' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // استرجاع اللغة المخزنة أو استخدام لغة المتصفح
    const stored = localStorage.getItem('toolkit-language') as Language | null;
    if (stored && ['ar', 'en', 'de', 'fr', 'es'].includes(stored)) {
      setLanguage(stored);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ar') setLanguage('ar');
      else if (browserLang === 'de') setLanguage('de');
      else if (browserLang === 'fr') setLanguage('fr');
      else if (browserLang === 'es') setLanguage('es');
      else setLanguage('en');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toolkit-language', language);
    setDir(language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};