'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

const translations = {
  ar: {
    title: '🎬 مولد عناوين يوتيوب',
    subtitle: 'توليد عناوين جذابة ومحسنة SEO لفيديوهات يوتيوب',
    inputLabel: '📝 موضوع الفيديو',
    placeholder: 'مثال: كيفية تعلم البرمجة للمبتدئين',
    generateBtn: '✨ توليد عناوين بالذكاء الاصطناعي',
    resultLabel: '💡 العناوين المقترحة',
    copyBtn: '📋 نسخ الكل',
    copied: '✅ تم النسخ!',
    loading: 'جاري توليد العناوين...',
    aiNote: '🤖 يتم التوليد باستخدام الذكاء الاصطناعي - عناوين محسنة لنجاح الفيديو',
    tipTitle: '💡 نصائح لعناوين يوتيوب ناجحة',
    tip1: 'استخدم أرقاماً مثل "5 طرق" أو "10 خطوات"',
    tip2: 'أضف كلمات قوية مثل "مذهل"، "سريع"، "سهل"',
    tip3: 'اجعل العنوان بين 50-70 حرفاً',
    tip4: 'أضف كلمة مفتاحية رئيسية في بداية العنوان',
    tip5: 'استخدم علامات استفهام أو تعجب لجذب الانتباه'
  },
  en: {
    title: '🎬 YouTube Title Generator',
    subtitle: 'Generate catchy, SEO-optimized titles for YouTube videos',
    inputLabel: '📝 Video Topic',
    placeholder: 'Example: How to learn programming for beginners',
    generateBtn: '✨ Generate AI Titles',
    resultLabel: '💡 Suggested Titles',
    copyBtn: '📋 Copy All',
    copied: '✅ Copied!',
    loading: 'Generating titles...',
    aiNote: '🤖 AI-powered title generation for YouTube success',
    tipTitle: '💡 Tips for Great YouTube Titles',
    tip1: 'Use numbers like "5 Ways" or "10 Steps"',
    tip2: 'Add power words like "Amazing", "Fast", "Easy"',
    tip3: 'Keep titles between 50-70 characters',
    tip4: 'Put main keyword at the beginning',
    tip5: 'Use questions or exclamation marks'
  },
  de: {
    title: '🎬 YouTube-Titel-Generator',
    subtitle: 'Generieren Sie eingängige, SEO-optimierte YouTube-Titel',
    inputLabel: '📝 Videotopic',
    placeholder: 'Beispiel: Programmieren für Anfänger lernen',
    generateBtn: '✨ KI-Titel generieren',
    resultLabel: '💡 Vorgeschlagene Titel',
    copyBtn: '📋 Alle kopieren',
    copied: '✅ Kopiert!',
    loading: 'Titel werden generiert...',
    aiNote: '🤖 KI-gestützte Titelgenerierung',
    tipTitle: '💡 Tipps für gute YouTube-Titel',
    tip1: 'Verwenden Sie Zahlen wie "5 Wege"',
    tip2: 'Fügen Sie starke Wörter hinzu',
    tip3: 'Halten Sie Titel unter 70 Zeichen',
    tip4: 'Hauptkeyword am Anfang',
    tip5: 'Verwenden Sie Fragezeichen'
  },
  fr: {
    title: '🎬 Générateur de titres YouTube',
    subtitle: 'Générez des titres accrocheurs optimisés pour le référencement',
    inputLabel: '📝 Sujet de la vidéo',
    placeholder: 'Exemple: Apprendre la programmation pour débutants',
    generateBtn: '✨ Générer des titres IA',
    resultLabel: '💡 Titres suggérés',
    copyBtn: '📋 Tout copier',
    copied: '✅ Copié!',
    loading: 'Génération des titres...',
    aiNote: '🤖 Génération de titres par IA',
    tipTitle: '💡 Conseils pour les titres YouTube',
    tip1: 'Utilisez des chiffres',
    tip2: 'Ajoutez des mots puissants',
    tip3: 'Titres entre 50-70 caractères',
    tip4: 'Mot-clé principal au début',
    tip5: 'Utilisez des points d\'interrogation'
  },
  es: {
    title: '🎬 Generador de títulos para YouTube',
    subtitle: 'Genere títulos atractivos y optimizados para SEO',
    inputLabel: '📝 Tema del video',
    placeholder: 'Ejemplo: Aprender programación para principiantes',
    generateBtn: '✨ Generar títulos con IA',
    resultLabel: '💡 Títulos sugeridos',
    copyBtn: '📋 Copiar todo',
    copied: '✅ ¡Copiado!',
    loading: 'Generando títulos...',
    aiNote: '🤖 Generación de títulos por IA',
    tipTitle: '💡 Consejos para títulos de YouTube',
    tip1: 'Use números como "5 formas"',
    tip2: 'Agregue palabras poderosas',
    tip3: 'Mantenga títulos entre 50-70 caracteres',
    tip4: 'Palabra clave principal al inicio',
    tip5: 'Use signos de interrogación'
  }
};

export default function YouTubeTitlePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateTitles = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setOutput('');
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, type: 'youtube' })
      });
      
      const data = await response.json();
      if (data.success) {
        let titles = data.result;
        // تنظيف النتيجة وجعلها قائمة نقطية
        const lines = titles.split('\n').filter(l => l.trim());
        const formatted = lines.map(l => `🎯 ${l.replace(/^\d+[\.\)]\s*/, '')}`).join('\n');
        setOutput(formatted || titles);
      } else {
        setOutput('❌ ' + (locale === 'ar' ? 'فشل التوليد، حاول مرة أخرى' : 'Generation failed, try again'));
      }
    } catch (error) {
      setOutput('❌ ' + (locale === 'ar' ? 'خطأ في الاتصال بالخدمة' : 'Service error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-page-container animate-fade-in-up">
      <button onClick={() => window.history.back()} className="back-home">
        {locale === 'ar' ? '← العودة' : '← Back'}
      </button>
      
      <div className="tool-card-single animate-scale-in">
        <div className="tool-header">
          <div className="tool-header-icon">🎬</div>
          <h1>{t.title}</h1>
        </div>
        <div className="tool-desc-single">📖 {t.subtitle}</div>
        
        <div className="tool-area">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.inputLabel}</label>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={t.placeholder}
            rows={2}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '2px solid var(--border)', background: 'var(--input-bg)', color: 'var(--input-text)' }}
          />
          
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <button onClick={generateTitles} className="btn" disabled={isLoading} style={{ background: '#7c3aed', color: 'white' }}>
              ✨ {t.generateBtn}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {t.aiNote}
          </div>
          
          <label style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>{t.resultLabel}</label>
          
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <div className="loading-spinner"></div>
              <span style={{ marginLeft: '1rem' }}>{t.loading}</span>
            </div>
          ) : (
            <div className="result-box" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              {output || t.resultLabel}
            </div>
          )}
          
          {output && !isLoading && (
            <button onClick={handleCopy} className="btn" style={{ marginTop: '1rem' }}>
              {copied ? t.copied : t.copyBtn}
            </button>
          )}
        </div>
      </div>
      
      {/* نصائح إضافية */}
      <div className="tool-card-single" style={{ marginTop: '1rem' }}>
        <div className="tool-header">
          <div className="tool-header-icon">💡</div>
          <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{t.tipTitle}</h3>
        </div>
        <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ {t.tip1}</li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ {t.tip2}</li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ {t.tip3}</li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ {t.tip4}</li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ {t.tip5}</li>
        </ul>
      </div>
    </div>
  );
}