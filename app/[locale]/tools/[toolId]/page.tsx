'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toolsData from '@/data/tools.json';
import { transformText } from '@/lib/tools/transformers';



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
    countChars: 'Caracteres (con espacios):',
    countCharsNoSpace: 'Caracteres (sin espacios):',
    countWords: 'Palabras:',
    countLines: 'Líneas:',
    exportTXT: '📄 TXT',
    exportCSV: '📊 CSV',
    exportPDF: '📑 PDF'
  }
};

export default function ToolPage({
  params,
}: {
  params: { locale: string; toolId: string };
}) {
  const { locale, toolId } = params;
  const router = useRouter();
  const tool = toolsData.tools?.find(t => t.id === toolId);
  const t = pageTranslations[locale as keyof typeof pageTranslations] || pageTranslations.en;
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ chars: 0, charsNoSpace: 0, words: 0, lines: 0 });
  
  useEffect(() => {
    if (input) {
      const result = transformText(toolId, input);
      setOutput(result);
      const chars = input.length;
      const charsNoSpace = input.replace(/\s/g, '').length;
      const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
      const lines = input.split(/\r?\n/).length;
      setStats({ chars, charsNoSpace, words, lines });
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
  
  const handleCopy = async () => { 
    await navigator.clipboard.writeText(output); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleClear = () => setInput('');
  
  const handlePaste = async () => { 
    const text = await navigator.clipboard.readText(); 
    setInput(text);
  };
  
  const handleExport = async (format: string) => {
    if (!output) return;
    const filename = `${toolName}_result_${new Date().toISOString().slice(0, 19)}`;
    
    if (format === 'txt') {
      const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const csvContent = `"Result"\n"${output.replace(/"/g, '""')}"`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
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
            if (y > 280) {
              doc.addPage();
              y = 20;
            }
            doc.text(lines[i], 20, y);
            y += 7;
          }
          doc.save(`${filename}.pdf`);
        } catch (error) {
          console.error('PDF export error:', error);
        }
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
          
          <div className="result-box" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {output || t.resultPlaceholder}
          </div>
          
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
      
      {similarTools.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>{t.similarTools}</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
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
                <Link
                  key={similarTool.id}
                  href={`/${locale}/tools/${similarTool.id}`}
                  className="tool-card"
                  style={{ textAlign: 'center' }}
                >
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