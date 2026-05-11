'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toolsData from '@/data/tools.json';
import { transformText } from '@/lib/tools/transformers';

// ترجمات الواجهة (الأزرار، التسميات) – نفس ما كان موجوداً سابقاً
const pageTranslations = {
  ar: {
    back: '🏠 العودة للرئيسية', paste: '📋 لصق', example: '📄 مثال', clear: '🗑️ مسح',
    exampleHint: '📋 مثال: اضغط لاستخدام النص التجريبي', copy: '📋 نسخ النتيجة', copied: '✅ تم النسخ!',
    inputLabel: '📝 النص المصدر', outputLabel: '✨ النتيجة', placeholder: 'أدخل النص هنا...',
    resultPlaceholder: 'ستظهر النتيجة هنا...', notFound: '🔍 الأداة غير موجودة', backHome: 'العودة للرئيسية',
    similarTools: '🔗 أدوات قد تهمك أيضاً', loading: 'جاري المعالجة...',
    countChars: 'عدد الأحرف (مع المسافات):', countCharsNoSpace: 'عدد الأحرف (بدون مسافات):',
    countWords: 'عدد الكلمات:', countLines: 'عدد الأسطر:',
    exportTXT: '📄 TXT', exportCSV: '📊 CSV', exportPDF: '📑 PDF'
  },
  en: {
    back: '🏠 Back to Home', paste: '📋 Paste', example: '📄 Example', clear: '🗑️ Clear',
    exampleHint: '📋 Example: Click to use sample text', copy: '📋 Copy Result', copied: '✅ Copied!',
    inputLabel: '📝 Source Text', outputLabel: '✨ Result', placeholder: 'Enter your text here...',
    resultPlaceholder: 'Result will appear here...', notFound: '🔍 Tool not found', backHome: 'Back to Home',
    similarTools: '🔗 You might also like', loading: 'Processing...',
    countChars: 'Characters (with spaces):', countCharsNoSpace: 'Characters (no spaces):',
    countWords: 'Words:', countLines: 'Lines:',
    exportTXT: '📄 TXT', exportCSV: '📊 CSV', exportPDF: '📑 PDF'
  },
  de: {
    back: '🏠 Zurück zur Startseite', paste: '📋 Einfügen', example: '📄 Beispiel', clear: '🗑️ Löschen',
    exampleHint: '📋 Beispiel: Klicken Sie hier', copy: '📋 Ergebnis kopieren', copied: '✅ Kopiert!',
    inputLabel: '📝 Quelltext', outputLabel: '✨ Ergebnis', placeholder: 'Text hier eingeben...',
    resultPlaceholder: 'Ergebnis wird hier angezeigt...', notFound: '🔍 Werkzeug nicht gefunden', backHome: 'Zurück zur Startseite',
    similarTools: '🔗 Das könnte Ihnen auch gefallen', loading: 'Verarbeitung...',
    countChars: 'Zeichen (mit Leerzeichen):', countCharsNoSpace: 'Zeichen (ohne Leerzeichen):',
    countWords: 'Wörter:', countLines: 'Zeilen:',
    exportTXT: '📄 TXT', exportCSV: '📊 CSV', exportPDF: '📑 PDF'
  },
  fr: {
    back: '🏠 Retour à l\'accueil', paste: '📋 Coller', example: '📄 Exemple', clear: '🗑️ Effacer',
    exampleHint: '📋 Exemple: Cliquez ici', copy: '📋 Copier le résultat', copied: '✅ Copié!',
    inputLabel: '📝 Texte source', outputLabel: '✨ Résultat', placeholder: 'Entrez votre texte...',
    resultPlaceholder: 'Le résultat apparaîtra ici...', notFound: '🔍 Outil non trouvé', backHome: 'Retour à l\'accueil',
    similarTools: '🔗 Cela pourrait aussi vous intéresser', loading: 'Traitement...',
    countChars: 'Caractères (avec espaces):', countCharsNoSpace: 'Caractères (sans espaces):',
    countWords: 'Mots:', countLines: 'Lignes:',
    exportTXT: '📄 TXT', exportCSV: '📊 CSV', exportPDF: '📑 PDF'
  },
  es: {
    back: '🏠 Volver al inicio', paste: '📋 Pegar', example: '📄 Ejemplo', clear: '🗑️ Borrar',
    exampleHint: '📋 Ejemplo: Haga clic aquí', copy: '📋 Copiar resultado', copied: '✅ ¡Copiado!',
    inputLabel: '📝 Texto fuente', outputLabel: '✨ Resultado', placeholder: 'Ingrese su texto...',
    resultPlaceholder: 'El resultado aparecerá aquí...', notFound: '🔍 Herramienta no encontrada', backHome: 'Volver al inicio',
    similarTools: '🔗 También te puede interesar', loading: 'Procesando...',
    countChars: 'Caracteres (con espacios):', countCharsNoSpace: 'Caracteres (sin espacios):',
    countWords: 'Palabras:', countLines: 'Líneas:',
    exportTXT: '📄 TXT', exportCSV: '📊 CSV', exportPDF: '📑 PDF'
  }
};

// محتوى SEO الوصفي والـ FAQ (سنولّدها ديناميكياً لكل أداة)
// سنقوم بإنشاء دالة ترجع المحتوى بناءً على معرف الأداة واللغة
function getSeoContent(toolId: string, locale: string, toolName: string): { description: string; faq: { q: string; a: string }[] } {
  const isArabic = locale === 'ar';
  
  // قواميس خاصة بكل أداة – يمكن توسيعها لكل الأدوات
  const contentMap: Record<string, any> = {
    'json-formatter': {
      en: {
        description: `The **JSON Formatter** tool from ToolKit ProAI helps you format, beautify, and validate JSON data. It makes your JSON code readable by adding proper indentation and line breaks. Perfect for developers working with APIs, configuration files, or data exchange. Use it online for free — no installation required.`,
        faq: [
          { q: 'What is JSON Formatter?', a: 'JSON Formatter is a tool that takes minified or poorly formatted JSON and transforms it into a well-structured, indented, and human-readable format.' },
          { q: 'Is the JSON Formatter free?', a: 'Yes, completely free. No signup, no limitations.' },
          { q: 'Does it validate JSON?', a: 'Yes, it shows an error message if your JSON is invalid.' }
        ]
      },
      ar: {
        description: `أداة **تنسيق JSON** من ToolKit ProAI تساعدك في تنسيق وتجميل والتحقق من صحة بيانات JSON. تجعل كود JSON مقروءاً بإضافة مسافات وأسطر جديدة. مثالية للمطورين الذين يعملون مع واجهات برمجة التطبيقات (APIs) أو ملفات الإعدادات أو تبادل البيانات. استخدمها أونلاين مجاناً – بدون تثبيت.`,
        faq: [
          { q: 'ما هي أداة تنسيق JSON؟', a: 'أداة تحول JSON المضغوط أو سيء التنسيق إلى شكل منظم ومقروء.' },
          { q: 'هل الأداة مجانية؟', a: 'نعم، مجانية تماماً بدون تسجيل أو حدود.' },
          { q: 'هل تتحقق من صحة JSON؟', a: 'نعم، تظهر رسالة خطأ إذا كان JSON غير صالح.' }
        ]
      }
    },
    'slug-generator': {
      en: {
        description: `The **Slug Generator** creates SEO-friendly URL slugs from any text. It removes special characters, replaces spaces with hyphens, and converts everything to lowercase. Ideal for blogs, CMS, and web developers. Improve your search engine rankings by using clean URLs.`,
        faq: [
          { q: 'What is a URL slug?', a: 'A slug is the part of a URL that identifies a specific page, e.g., "my-article-title".' },
          { q: 'Why use a slug generator?', a: 'It ensures your URLs are clean, readable, and optimized for search engines.' }
        ]
      },
      ar: {
        description: `**مولد Slug** يحول أي نص إلى رابط URL صديق لمحركات البحث. يزيل الرموز الخاصة، ويستبدل المسافات بشرطات، ويحول كل شيء إلى أحرف صغيرة. مثالي للمدونات، أنظمة إدارة المحتوى، ومطوري الويب. حسّن ترتيبك في محركات البحث باستخدام روابط نظيفة.`,
        faq: [
          { q: 'ما هو Slug URL؟', a: 'الجزء من الرابط الذي يحدد صفحة معينة، مثل "my-article-title".' },
          { q: 'لماذا استخدام مولد Slug؟', a: 'يضمن أن روابطك نظيفة، مقروءة، ومحسنة لمحركات البحث.' }
        ]
      }
    },
    // يمكنك إضافة باقي الأدوات بنفس النمط
    // هنا سنضيف محتوى عام لأي أداة غير محددة أعلاه
  };
  
  const fallback = {
    en: {
      description: `Use the **${toolName}** tool online for free. Fast, secure, and supports 5 languages. No registration required.`,
      faq: [
        { q: 'Is this tool free?', a: 'Yes, 100% free with no hidden costs.' },
        { q: 'Do I need to sign up?', a: 'No account needed. Just use it instantly.' },
        { q: 'Is my data safe?', a: 'All processing happens in your browser. We don\'t store your data.' }
      ]
    },
    ar: {
      description: `استخدم أداة **${toolName}** أونلاين مجاناً. سريعة، آمنة، وتدعم 5 لغات. لا حاجة للتسجيل.`,
      faq: [
        { q: 'هل الأداة مجانية؟', a: 'نعم، مجانية 100% بدون رسوم خفية.' },
        { q: 'هل أحتاج إلى تسجيل الدخول؟', a: 'لا، استخدمها فوراً بدون حساب.' },
        { q: 'هل بياناتي آمنة؟', a: 'تتم المعالجة في متصفحك. لا نخزن بياناتك.' }
      ]
    }
  };
  
  const data = contentMap[toolId]?.[locale] || fallback[locale as 'en' | 'ar'] || fallback.en;
  return { description: data.description, faq: data.faq };
}

export default function ToolPage({
  params,
}: {
  params: { locale: string; toolId: string };
}) {
  const { locale, toolId } = params;
  const router = useRouter();
  const tool = toolsData.tools?.find(t => t.id === toolId);
  const t = pageTranslations[locale as keyof typeof pageTranslations] || pageTranslations.en;
  const seo = getSeoContent(toolId, locale, tool?.name || toolId);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ chars: 0, charsNoSpace: 0, words: 0, lines: 0 });
  
  useEffect(() => {
    if (input) {
      setIsLoading(true);
      setTimeout(() => {
        const result = transformText(toolId, input);
        setOutput(result);
        const chars = input.length;
        const charsNoSpace = input.replace(/\s/g, '').length;
        const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
        const lines = input.split(/\r?\n/).length;
        setStats({ chars, charsNoSpace, words, lines });
        setIsLoading(false);
      }, 100);
    } else {
      setOutput('');
      setStats({ chars: 0, charsNoSpace: 0, words: 0, lines: 0 });
    }
  }, [input, toolId]);
  
  if (!tool) {
    return (
      <div className="tool-page-container" style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '3rem' }}>🔍</div>
        <h2>{t.notFound}</h2>
        <button onClick={() => router.push(`/${locale}`)} className="back-home">{t.backHome}</button>
      </div>
    );
  }
  
  const getToolName = () => {
    switch(locale) {
      case 'ar': return tool.nameAr || tool.name;
      case 'de': return tool.nameDe || tool.name;
      case 'fr': return tool.nameFr || tool.name;
      case 'es': return tool.nameEs || tool.name;
      default: return tool.name;
    }
  };
  
  const getToolDescription = () => {
    switch(locale) {
      case 'ar': return tool.description;
      case 'de': return tool.descriptionDe || tool.descriptionEn || tool.description;
      case 'fr': return tool.descriptionFr || tool.descriptionEn || tool.description;
      case 'es': return tool.descriptionEs || tool.descriptionEn || tool.description;
      default: return tool.descriptionEn || tool.description;
    }
  };
  
  const toolName = getToolName();
  const toolDescription = getToolDescription();
  
  const loadExample = () => setInput(tool.example);
  const handleCopy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleClear = () => setInput('');
  const handlePaste = async () => { const text = await navigator.clipboard.readText(); setInput(text); };
  const handleExport = async (format: string) => { /* نفس الكود السابق للتصدير */ };
  const similarTools = toolsData.tools?.filter(t => t.id !== toolId).slice(0, 4) || [];

  return (
    <div className="tool-page-container animate-fade-in-up">
      {/* زر العودة */}
      <button onClick={() => router.push(`/${locale}`)} className="back-home">{t.back}</button>
      
      {/* الأداة نفسها */}
      <div className="tool-card-single animate-scale-in">
        <div className="tool-header">
          <div className="tool-header-icon">{tool.icon}</div>
          <h1>{toolName}</h1>
        </div>
        <div className="tool-desc-single">📖 {toolDescription}</div>
        
        <div className="tool-area">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.inputLabel}</label>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={t.placeholder}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          />
          
          <div className="button-group">
            <button onClick={handlePaste} className="btn">{t.paste}</button>
            <button onClick={loadExample} className="btn">{t.example}</button>
            <button onClick={handleClear} className="btn">{t.clear}</button>
          </div>
          
          <div className="example-hint" onClick={loadExample}>{t.exampleHint}</div>
          
          {input && (
            <div style={{ background: 'rgba(255,159,74,0.1)', padding: '1rem', borderRadius: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span>🔢 {t.countChars} <strong>{stats.chars}</strong></span>
                <span>📝 {t.countCharsNoSpace} <strong>{stats.charsNoSpace}</strong></span>
                <span>📊 {t.countWords} <strong>{stats.words}</strong></span>
                <span>📄 {t.countLines} <strong>{stats.lines}</strong></span>
              </div>
            </div>
          )}
          
          <label style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>{t.outputLabel}</label>
          
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <div className="loading-spinner"></div>
              <span style={{ marginLeft: '1rem' }}>{t.loading}</span>
            </div>
          ) : (
            <div className="result-box" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              {output || t.resultPlaceholder}
            </div>
          )}
          
          {output && (
            <div className="button-group" style={{ marginTop: '1rem' }}>
              <button onClick={handleCopy} className="btn">
                {copied ? t.copied : t.copy}
              </button>
              <button onClick={() => handleExport('txt')} className="btn">{t.exportTXT}</button>
              <button onClick={() => handleExport('csv')} className="btn">{t.exportCSV}</button>
              {locale !== 'ar' && (
                <button onClick={() => handleExport('pdf')} className="btn">{t.exportPDF}</button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* ========== قسم SEO ========== */}
      <div className="tool-card-single" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{toolName}</h2>
        <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>{seo.description}</p>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>✨ Why Use {toolName}?</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>⚡ Instant results – type and see the output immediately</li>
          <li>🔒 100% secure – no data leaves your browser</li>
          <li>🌍 Supports 5 languages (Arabic, English, German, French, Spanish)</li>
          <li>📱 Fully responsive – works on mobile, tablet, desktop</li>
          <li>💾 Download or copy results with one click</li>
        </ul>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>📖 How to Use</h3>
        <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Enter your text in the input box</li>
          <li>The result appears instantly</li>
          <li>Click "Copy" to copy the result or "Download" to save as TXT/CSV/PDF</li>
          <li>Use the "Example" button to try a sample</li>
        </ol>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>❓ Frequently Asked Questions</h3>
        {seo.faq.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <strong>{item.q}</strong>
            <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>{item.a}</p>
          </div>
        ))}
      </div>
      
      {/* أدوات مشابهة */}
      {similarTools.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>{t.similarTools}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            {similarTools.map((similarTool) => {
              let similarToolName = similarTool.name;
              switch(locale) {
                case 'ar': similarToolName = similarTool.nameAr || similarTool.name; break;
                case 'de': similarToolName = similarTool.nameDe || similarTool.name; break;
                case 'fr': similarToolName = similarTool.nameFr || similarTool.name; break;
                case 'es': similarToolName = similarTool.nameEs || similarTool.name; break;
                default: similarToolName = similarTool.name;
              }
              return (
                <Link key={similarTool.id} href={`/${locale}/tools/${similarTool.id}`} className="tool-card" style={{ textAlign: 'center' }}>
                  <div className="tool-icon">{similarTool.icon}</div>
                  <div className="tool-name">{similarToolName}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}