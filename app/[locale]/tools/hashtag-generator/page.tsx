'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

const translations = {
  ar: {
    title: 'مولد الهاشتاجات',
    subtitle: 'توليد هاشتاجات مناسبة لوسائل التواصل الاجتماعي',
    inputLabel: '📝 أدخل النص أو الموضوع',
    placeholder: 'مثال: تطوير مواقع برمجة تقنية ذكاء اصطناعي',
    generateBtn: '🔮 توليد هاشتاجات',
    aiGenerateBtn: '✨ توليد هاشتاجات بالذكاء الاصطناعي',
    resultLabel: '🏷️ الهاشتاجات المقترحة',
    copyBtn: '📋 نسخ',
    copied: '✅ تم النسخ!',
    loading: 'جاري التوليد...',
    aiNote: '✨ تعمل بالذكاء الاصطناعي - توليد هاشتاجات ذكية',
    manualNote: '📌 أو أدخل النص أعلاه واختر طريقة التوليد'
  },
  en: {
    title: 'Hashtag Generator',
    subtitle: 'Generate trending hashtags for social media',
    inputLabel: '📝 Enter text or topic',
    placeholder: 'Example: web development programming AI technology',
    generateBtn: '🔮 Generate Hashtags',
    aiGenerateBtn: '✨ AI Generate Hashtags',
    resultLabel: '🏷️ Suggested Hashtags',
    copyBtn: '📋 Copy',
    copied: '✅ Copied!',
    loading: 'Generating...',
    aiNote: '✨ AI-powered smart hashtag generation',
    manualNote: '📌 Enter text above and choose generation method'
  },
  de: {
    title: 'Hashtag-Generator',
    subtitle: 'Generieren Sie trendige Hashtags für soziale Medien',
    inputLabel: '📝 Text oder Thema eingeben',
    placeholder: 'Beispiel: Webentwicklung Programmierung KI',
    generateBtn: '🔮 Hashtags generieren',
    aiGenerateBtn: '✨ KI-Hashtags generieren',
    resultLabel: '🏷️ Vorgeschlagene Hashtags',
    copyBtn: '📋 Kopieren',
    copied: '✅ Kopiert!',
    loading: 'Wird generiert...',
    aiNote: '✨ KI-gestützte intelligente Hashtag-Generierung',
    manualNote: '📌 Geben Sie Text ein und wählen Sie die Methode'
  },
  fr: {
    title: 'Générateur de Hashtags',
    subtitle: 'Générez des hashtags tendance pour les médias sociaux',
    inputLabel: '📝 Entrez le texte ou le sujet',
    placeholder: 'Exemple: développement web programmation IA',
    generateBtn: '🔮 Générer des hashtags',
    aiGenerateBtn: '✨ Générer avec IA',
    resultLabel: '🏷️ Hashtags suggérés',
    copyBtn: '📋 Copier',
    copied: '✅ Copié!',
    loading: 'Génération...',
    aiNote: '✨ Génération intelligente par IA',
    manualNote: '📌 Entrez le texte et choisissez la méthode'
  },
  es: {
    title: 'Generador de Hashtags',
    subtitle: 'Genere hashtags populares para redes sociales',
    inputLabel: '📝 Ingrese texto o tema',
    placeholder: 'Ejemplo: desarrollo web programación IA',
    generateBtn: '🔮 Generar Hashtags',
    aiGenerateBtn: '✨ Generar con IA',
    resultLabel: '🏷️ Hashtags sugeridos',
    copyBtn: '📋 Copiar',
    copied: '✅ ¡Copiado!',
    loading: 'Generando...',
    aiNote: '✨ Generación inteligente por IA',
    manualNote: '📌 Ingrese texto y elija el método'
  }
};

// دالة التحويل اليدوي
const manualHash = (text: string): string => {
  const words = text.match(/[\w\u0600-\u06FF]+/g);
  if (!words) return '';
  return [...new Set(words.map(w => '#' + w.toLowerCase()))].join(' ');
};

export default function HashtagGeneratorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');

  const generateManual = () => {
    if (!input.trim()) return;
    const result = manualHash(input);
    setOutput(result);
    setMode('manual');
  };

  const generateAI = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setOutput('');
    setMode('ai');
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, type: 'hashtags' })
      });
      
      const data = await response.json();
      if (data.success) {
        // تنظيف النتيجة
        let hashtags = data.result;
        // إضافة # إذا لم تكن موجودة
        if (!hashtags.includes('#') && !hashtags.startsWith('#')) {
          hashtags = '#' + hashtags.replace(/\s+/g, ' #');
        }
        setOutput(hashtags);
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
          <div className="tool-header-icon">#️⃣</div>
          <h1>{t.title}</h1>
        </div>
        <div className="tool-desc-single">📖 {t.subtitle}</div>
        
        <div className="tool-area">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.inputLabel}</label>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={t.placeholder}
            rows={3}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '2px solid var(--border)', background: 'var(--input-bg)', color: 'var(--input-text)' }}
          />
          
          <div className="button-group" style={{ justifyContent: 'center' }}>
            <button onClick={generateManual} className="btn" disabled={isLoading}>
              🔮 {t.generateBtn}
            </button>
            <button onClick={generateAI} className="btn" disabled={isLoading} style={{ background: '#7c3aed', color: 'white' }}>
              ✨ {t.aiGenerateBtn}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {mode === 'manual' ? t.manualNote : t.aiNote}
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
    </div>
  );
}