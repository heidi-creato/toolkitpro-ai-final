'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toolsData from '@/data/tools.json';
import { transformText } from '@/lib/tools/transformers';

// ========== ترجمة واجهة الأداة (الأزرار والتسميات) ==========
const pageTranslations = {
  ar: {
    back: '🏠 العودة للرئيسية',
    paste: '📋 لصق',
    example: '📄 مثال',
    clear: '🗑️ مسح',
    exampleHint: '📋 مثال: اضغط لاستخدام النص التجريبي',
    copy: '📋 نسخ النتيجة',
    copied: '✅ تم النسخ!',
    inputLabel: '📝 النص المصدر',
    outputLabel: '✨ النتيجة',
    placeholder: 'أدخل النص هنا...',
    resultPlaceholder: 'ستظهر النتيجة هنا...',
    notFound: '🔍 الأداة غير موجودة',
    backHome: 'العودة للرئيسية',
    similarTools: '🔗 أدوات قد تهمك أيضاً',
    loading: 'جاري المعالجة...',
    countChars: 'عدد الأحرف (مع المسافات):',
    countCharsNoSpace: 'عدد الأحرف (بدون مسافات):',
    countWords: 'عدد الكلمات:',
    countLines: 'عدد الأسطر:',
    exportTXT: '📄 TXT',
    exportCSV: '📊 CSV',
    exportPDF: '📑 PDF'
  },
  en: {
    back: '🏠 Back to Home',
    paste: '📋 Paste',
    example: '📄 Example',
    clear: '🗑️ Clear',
    exampleHint: '📋 Example: Click to use sample text',
    copy: '📋 Copy Result',
    copied: '✅ Copied!',
    inputLabel: '📝 Source Text',
    outputLabel: '✨ Result',
    placeholder: 'Enter your text here...',
    resultPlaceholder: 'Result will appear here...',
    notFound: '🔍 Tool not found',
    backHome: 'Back to Home',
    similarTools: '🔗 You might also like',
    loading: 'Processing...',
    countChars: 'Characters (with spaces):',
    countCharsNoSpace: 'Characters (no spaces):',
    countWords: 'Words:',
    countLines: 'Lines:',
    exportTXT: '📄 TXT',
    exportCSV: '📊 CSV',
    exportPDF: '📑 PDF'
  },
  de: {
    back: '🏠 Zurück zur Startseite',
    paste: '📋 Einfügen',
    example: '📄 Beispiel',
    clear: '🗑️ Löschen',
    exampleHint: '📋 Beispiel: Klicken Sie hier',
    copy: '📋 Ergebnis kopieren',
    copied: '✅ Kopiert!',
    inputLabel: '📝 Quelltext',
    outputLabel: '✨ Ergebnis',
    placeholder: 'Text hier eingeben...',
    resultPlaceholder: 'Ergebnis wird hier angezeigt...',
    notFound: '🔍 Werkzeug nicht gefunden',
    backHome: 'Zurück zur Startseite',
    similarTools: '🔗 Das könnte Ihnen auch gefallen',
    loading: 'Verarbeitung...',
    countChars: 'Zeichen (mit Leerzeichen):',
    countCharsNoSpace: 'Zeichen (ohne Leerzeichen):',
    countWords: 'Wörter:',
    countLines: 'Zeilen:',
    exportTXT: '📄 TXT',
    exportCSV: '📊 CSV',
    exportPDF: '📑 PDF'
  },
  fr: {
    back: '🏠 Retour à l\'accueil',
    paste: '📋 Coller',
    example: '📄 Exemple',
    clear: '🗑️ Effacer',
    exampleHint: '📋 Exemple: Cliquez ici',
    copy: '📋 Copier le résultat',
    copied: '✅ Copié!',
    inputLabel: '📝 Texte source',
    outputLabel: '✨ Résultat',
    placeholder: 'Entrez votre texte...',
    resultPlaceholder: 'Le résultat apparaîtra ici...',
    notFound: '🔍 Outil non trouvé',
    backHome: 'Retour à l\'accueil',
    similarTools: '🔗 Cela pourrait aussi vous intéresser',
    loading: 'Traitement...',
    countChars: 'Caractères (avec espaces):',
    countCharsNoSpace: 'Caractères (sans espaces):',
    countWords: 'Mots:',
    countLines: 'Lignes:',
    exportTXT: '📄 TXT',
    exportCSV: '📊 CSV',
    exportPDF: '📑 PDF'
  },
  es: {
    back: '🏠 Volver al inicio',
    paste: '📋 Pegar',
    example: '📄 Ejemplo',
    clear: '🗑️ Borrar',
    exampleHint: '📋 Ejemplo: Haga clic aquí',
    copy: '📋 Copiar resultado',
    copied: '✅ ¡Copiado!',
    inputLabel: '📝 Texto fuente',
    outputLabel: '✨ Resultado',
    placeholder: 'Ingrese su texto...',
    resultPlaceholder: 'El resultado aparecerá aquí...',
    notFound: '🔍 Herramienta no encontrada',
    backHome: 'Volver al inicio',
    similarTools: '🔗 También te puede interesar',
    loading: 'Procesando...',
    countChars: 'Caracteres (con espacios):',
    countCharsNoSpace: 'Caracteres (sin espacios):',
    countWords: 'Palabras:',
    countLines: 'Líneas:',
    exportTXT: '📄 TXT',
    exportCSV: '📊 CSV',
    exportPDF: '📑 PDF'
  }
};

// ========== محتوى SEO متعدد اللغات (يتم توليده لكل أداة) ==========
// سنستخدم دالة تقوم ببناء المحتوى بناءً على اسم الأداة ونوعها
function getLocalizedContent(toolId: string, toolName: string, locale: string) {
  const isArabic = locale === 'ar';
  
  // قواميس الترجمة للأقسام الثابتة (Why use, How to use)
  const whyUseTexts = {
    ar: [
      '⚡ نتائج فورية – اكتب وسترى النتيجة مباشرة',
      '🔒 آمن 100% – لا تترك بياناتك المتصفح',
      '🌍 يدعم 5 لغات (العربية، الإنجليزية، الألمانية، الفرنسية، الإسبانية)',
      '📱 متجاوب بالكامل – يعمل على الجوال، الجهاز اللوحي، الكمبيوتر',
      '💾 انسخ أو حمّل النتيجة بنقرة واحدة'
    ],
    en: [
      '⚡ Instant results – type and see the output immediately',
      '🔒 100% secure – no data leaves your browser',
      '🌍 Supports 5 languages (Arabic, English, German, French, Spanish)',
      '📱 Fully responsive – works on mobile, tablet, desktop',
      '💾 Download or copy results with one click'
    ],
    de: [
      '⚡ Sofortige Ergebnisse – Eingabe und Ausgabe erscheint sofort',
      '🔒 100% sicher – keine Daten verlassen Ihren Browser',
      '🌍 Unterstützt 5 Sprachen (Arabisch, Englisch, Deutsch, Französisch, Spanisch)',
      '📱 Vollständig responsiv – funktioniert auf Handy, Tablet, PC',
      '💾 Ergebnisse kopieren oder als Datei herunterladen'
    ],
    fr: [
      '⚡ Résultats instantanés – tapez et voyez le résultat immédiatement',
      '🔒 100% sécurisé – aucune donnée ne quitte votre navigateur',
      '🌍 Prend en charge 5 langues (arabe, anglais, allemand, français, espagnol)',
      '📱 Entièrement responsive – fonctionne sur mobile, tablette, ordinateur',
      '💾 Copiez ou téléchargez le résultat en un clic'
    ],
    es: [
      '⚡ Resultados instantáneos – escribe y ve el resultado al instante',
      '🔒 100% seguro – los datos no salen de tu navegador',
      '🌍 Soporta 5 idiomas (árabe, inglés, alemán, francés, español)',
      '📱 Totalmente responsive – funciona en móvil, tableta, ordenador',
      '💾 Copia o descarga el resultado con un clic'
    ]
  };
  
  const howUseTexts = {
    ar: [
      'أدخل النص في المربع العلوي',
      'ستظهر النتيجة مباشرة في المربع السفلي',
      'انقر "نسخ" لنسخ النتيجة أو "تحميل" لحفظها كملف TXT/CSV/PDF',
      'استخدم زر "مثال" لتجربة الأداة بنص تجريبي'
    ],
    en: [
      'Enter your text in the input box',
      'The result appears instantly in the output box',
      'Click "Copy" to copy the result or "Download" to save as TXT/CSV/PDF',
      'Use the "Example" button to try a sample text'
    ],
    de: [
      'Geben Sie Ihren Text in das Eingabefeld ein',
      'Das Ergebnis erscheint sofort im Ausgabefeld',
      'Klicken Sie auf "Kopieren", um das Ergebnis zu kopieren, oder auf "Herunterladen", um es als TXT/CSV/PDF zu speichern',
      'Verwenden Sie die Schaltfläche "Beispiel", um einen Beispieltext auszuprobieren'
    ],
    fr: [
      'Entrez votre texte dans la zone de saisie',
      'Le résultat apparaît instantanément dans la zone de sortie',
      'Cliquez sur "Copier" pour copier le résultat ou sur "Télécharger" pour l\'enregistrer en TXT/CSV/PDF',
      'Utilisez le bouton "Exemple" pour essayer un texte exemple'
    ],
    es: [
      'Ingrese su texto en el cuadro de entrada',
      'El resultado aparece instantáneamente en el cuadro de salida',
      'Haga clic en "Copiar" para copiar el resultado o en "Descargar" para guardarlo como TXT/CSV/PDF',
      'Use el botón "Ejemplo" para probar un texto de ejemplo'
    ]
  };
  
  // نص وصفي ديناميكي يعتمد على اسم الأداة
  const descriptionMap: Record<string, Record<string, string>> = {
    ar: `أداة **${toolName}** من ToolKit ProAI تسمح لك بمعالجة النصوص بسهولة وسرعة. مثالية للكتّاب والمطورين وصناع المحتوى. استخدمها أونلاين مجاناً – بدون تثبيت.`,
    en: `The **${toolName}** tool from ToolKit ProAI lets you process text easily and quickly. Perfect for writers, developers, and content creators. Use it online for free — no installation required.`,
    de: `Das **${toolName}** Tool von ToolKit ProAI ermöglicht es Ihnen, Texte einfach und schnell zu verarbeiten. Ideal für Autoren, Entwickler und Content-Ersteller. Nutzen Sie es online kostenlos – keine Installation erforderlich.`,
    fr: `L'outil **${toolName}** de ToolKit ProAI vous permet de traiter du texte facilement et rapidement. Parfait pour les rédacteurs, les développeurs et les créateurs de contenu. Utilisez-le en ligne gratuitement – aucune installation requise.`,
    es: `La herramienta **${toolName}** de ToolKit ProAI le permite procesar texto de forma fácil y rápida. Perfecto para escritores, desarrolladores y creadores de contenido. Úselo en línea gratis – sin necesidad de instalación.`
  };
  
  // أسئلة شائعة ديناميكية
  const faqMap: Record<string, Record<string, { q: string; a: string }[]>> = {
    ar: [
      { q: `ما هي أداة ${toolName}؟`, a: `أداة ${toolName} هي خدمة مجانية تتيح لك ${toolDescriptionFallback(toolId)} بسرعة وأمان.` },
      { q: `هل أداة ${toolName} مجانية؟`, a: 'نعم، جميع أدوات ToolKit ProAI مجانية تماماً ولا تحتاج إلى تسجيل.' },
      { q: `هل بياناتي آمنة عند استخدام ${toolName}؟`, a: 'نعم، جميع المعالجات تتم في متصفحك، ولا يتم تخزين أي من بياناتك على خوادمنا.' },
      { q: `كم عدد اللغات التي تدعمها الأداة؟`, a: 'تدعم الأداة 5 لغات: العربية، الإنجليزية، الألمانية، الفرنسية، الإسبانية.' }
    ],
    en: [
      { q: `What is the ${toolName} tool?`, a: `The ${toolName} tool is a free online service that lets you ${toolDescriptionFallback(toolId)} quickly and securely.` },
      { q: `Is the ${toolName} tool free?`, a: 'Yes, all ToolKit ProAI tools are completely free and require no registration.' },
      { q: `Is my data safe when using ${toolName}?`, a: 'Yes, all processing happens in your browser, and we do not store any of your data on our servers.' },
      { q: `How many languages does the tool support?`, a: 'The tool supports 5 languages: Arabic, English, German, French, Spanish.' }
    ],
    de: [
      { q: `Was ist das ${toolName}-Tool?`, a: `Das ${toolName}-Tool ist ein kostenloser Online-Dienst, mit dem Sie ${toolDescriptionFallback(toolId)} schnell und sicher erledigen können.` },
      { q: `Ist das ${toolName}-Tool kostenlos?`, a: 'Ja, alle ToolKit ProAI-Tools sind völlig kostenlos und erfordern keine Registrierung.' },
      { q: `Sind meine Daten bei der Verwendung von ${toolName} sicher?`, a: 'Ja, die gesamte Verarbeitung findet in Ihrem Browser statt, und wir speichern keine Ihrer Daten auf unseren Servern.' },
      { q: `Wie viele Sprachen unterstützt das Tool?`, a: 'Das Tool unterstützt 5 Sprachen: Arabisch, Englisch, Deutsch, Französisch, Spanisch.' }
    ],
    fr: [
      { q: `Qu'est-ce que l'outil ${toolName} ?`, a: `L'outil ${toolName} est un service en ligne gratuit qui vous permet de ${toolDescriptionFallback(toolId)} rapidement et en toute sécurité.` },
      { q: `L'outil ${toolName} est-il gratuit ?`, a: 'Oui, tous les outils ToolKit ProAI sont entièrement gratuits et ne nécessitent aucune inscription.' },
      { q: `Mes données sont-elles en sécurité lorsque j'utilise ${toolName} ?`, a: 'Oui, tout le traitement se fait dans votre navigateur et nous ne stockons aucune de vos données sur nos serveurs.' },
      { q: `Combien de langues l'outil prend-il en charge ?`, a: 'L'outil prend en charge 5 langues : arabe, anglais, allemand, français, espagnol.' }
    ],
    es: [
      { q: `¿Qué es la herramienta ${toolName}?`, a: `La herramienta ${toolName} es un servicio gratuito en línea que le permite ${toolDescriptionFallback(toolId)} de forma rápida y segura.` },
      { q: `¿Es gratuita la herramienta ${toolName}?`, a: 'Sí, todas las herramientas de ToolKit ProAI son completamente gratuitas y no requieren registro.' },
      { q: `¿Mis datos están seguros al usar ${toolName}?`, a: 'Sí, todo el procesamiento ocurre en su navegador y no almacenamos ninguno de sus datos en nuestros servidores.' },
      { q: `¿Cuántos idiomas admite la herramienta?`, a: 'La herramienta admite 5 idiomas: árabe, inglés, alemán, francés, español.' }
    ]
  };
  
  // دالة مساعدة لوصف الأداة تلقائياً (إذا لم تجد وصفاً مخصصاً)
  function toolDescriptionFallback(toolId: string): string {
    switch (toolId) {
      case 'json-formatter': return 'تنسيق كود JSON';
      case 'slug-generator': return 'تحويل النص إلى رابط URL صديق للسيو';
      case 'word-counter': return 'حساب عدد الكلمات والأحرف';
      default: return 'معالجة النصوص';
    }
  }
  
  return {
    description: descriptionMap[locale] || descriptionMap.en,
    whyUse: whyUseTexts[locale as keyof typeof whyUseTexts] || whyUseTexts.en,
    howUse: howUseTexts[locale as keyof typeof howUseTexts] || howUseTexts.en,
    faq: faqMap[locale as keyof typeof faqMap] || faqMap.en
  };
}

export default function ToolClient({ params }: { params: { locale: string; toolId: string } }) {
  const { locale, toolId } = params;
  const router = useRouter();
  const tool = toolsData.tools?.find(t => t.id === toolId);
  const t = pageTranslations[locale as keyof typeof pageTranslations] || pageTranslations.en;
  
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
  const toolDescriptionShort = getToolDescription();
  const seoContent = getLocalizedContent(toolId, toolName, locale);
  
  const loadExample = () => setInput(tool.example);
  const handleCopy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleClear = () => setInput('');
  const handlePaste = async () => { const text = await navigator.clipboard.readText(); setInput(text); };
  const handleExport = async (format: string) => {
    if (!output) return;
    const filename = `${toolName}_result_${new Date().toISOString().slice(0, 19)}`;
    if (format === 'txt') {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const csvContent = `"Result"\n"${output.replace(/"/g, '""')}"`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      if (locale !== 'ar') {
        try {
          const { default: jsPDF } = await import('jspdf');
          const doc = new jsPDF();
          doc.setFont('helvetica');
          doc.setFontSize(12);
          const lines = doc.splitTextToSize(output, 170);
          let y = 20;
          for (let i = 0; i < lines.length; i++) {
            if (y > 280) { doc.addPage(); y = 20; }
            doc.text(lines[i], 20, y);
            y += 7;
          }
          doc.save(`${filename}.pdf`);
        } catch (error) { console.error('PDF export error:', error); }
      }
    }
  };
  const similarTools = toolsData.tools?.filter(t => t.id !== toolId).slice(0, 4) || [];

  return (
    <div className="tool-page-container animate-fade-in-up">
      <button onClick={() => router.push(`/${locale}`)} className="back-home">{t.back}</button>
      
      <div className="tool-card-single animate-scale-in">
        <div className="tool-header">
          <div className="tool-header-icon">{tool.icon}</div>
          <h1>{toolName}</h1>
        </div>
        <div className="tool-desc-single">📖 {toolDescriptionShort}</div>
        
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
      
      {/* ========== المحتوى الوصفي المتعدد اللغات ========== */}
      <div className="tool-card-single" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{toolName}</h2>
        <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>{seoContent.description}</p>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>✨ Why Use {toolName}?</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          {seoContent.whyUse.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>📖 How to Use</h3>
        <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          {seoContent.howUse.map((item, idx) => <li key={idx}>{item}</li>)}
        </ol>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>❓ Frequently Asked Questions</h3>
        {seoContent.faq.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <strong>{item.q}</strong>
            <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>{item.a}</p>
          </div>
        ))}
      </div>
      
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