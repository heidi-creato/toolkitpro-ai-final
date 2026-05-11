'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

const translations = {
  ar: { title: 'معاينة Markdown', subtitle: 'كتابة ومعاينة نصوص Markdown مباشرة', inputLabel: 'نص Markdown', resultLabel: 'المعاينة', copyBtn: 'نسخ HTML', copied: 'تم النسخ!' },
  en: { title: 'Markdown Preview', subtitle: 'Write and preview Markdown text instantly', inputLabel: 'Markdown text', resultLabel: 'Preview', copyBtn: 'Copy HTML', copied: 'Copied!' },
  de: { title: 'Markdown-Vorschau', subtitle: 'Markdown-Text schreiben und sofort anzeigen', inputLabel: 'Markdown-Text', resultLabel: 'Vorschau', copyBtn: 'HTML kopieren', copied: 'Kopiert!' },
  fr: { title: 'Aperçu Markdown', subtitle: 'Écrire et prévisualiser du texte Markdown', inputLabel: 'Texte Markdown', resultLabel: 'Aperçu', copyBtn: 'Copier HTML', copied: 'Copié!' },
  es: { title: 'Vista previa Markdown', subtitle: 'Escribir y previsualizar texto Markdown', inputLabel: 'Texto Markdown', resultLabel: 'Vista previa', copyBtn: 'Copiar HTML', copied: '¡Copiado!' }
};

export default function MarkdownPreviewPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    let html = input
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br>');
    if (html.includes('<li>')) html = '<ul>' + html + '</ul>';
    setOutput(html);
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="tool-page-container animate-fade-in-up">
      <div className="tool-card-single">
        <div className="tool-header"><div className="tool-header-icon">📝</div><h1>{t.title}</h1><p className="tool-desc-single">{t.subtitle}</p></div>
        <div className="tool-area">
          <label>{t.inputLabel}</label>
          <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder="# عنوان\n**نص عريض**\n- قائمة" />
          <button className="btn" onClick={convert}>✨ Preview</button>
          {output && <><label>{t.resultLabel}</label><div className="result-box prose" dangerouslySetInnerHTML={{ __html: output }} /><button className="btn mt-2" onClick={copy}>{copied ? t.copied : t.copyBtn}</button></>}
        </div>
      </div>
    </div>
  );
}