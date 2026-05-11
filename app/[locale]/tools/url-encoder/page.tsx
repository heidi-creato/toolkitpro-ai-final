'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

const translations = {
  ar: { title: 'ترميز URL', subtitle: 'ترميز وفك ترميز الروابط', inputLabel: 'أدخل النص أو الرابط', resultLabel: 'النتيجة', encodeBtn: '🔒 ترميز', decodeBtn: '🔓 فك الترميز', copyBtn: 'نسخ', copied: 'تم النسخ!' },
  en: { title: 'URL Encoder/Decoder', subtitle: 'Encode and decode URL strings', inputLabel: 'Enter text or URL', resultLabel: 'Result', encodeBtn: '🔒 Encode', decodeBtn: '🔓 Decode', copyBtn: 'Copy', copied: 'Copied!' },
  de: { title: 'URL-Kodierer/Dekodierer', subtitle: 'URL-Strings kodieren und dekodieren', inputLabel: 'Text oder URL eingeben', resultLabel: 'Ergebnis', encodeBtn: '🔒 Kodieren', decodeBtn: '🔓 Dekodieren', copyBtn: 'Kopieren', copied: 'Kopiert!' },
  fr: { title: 'Encodeur/Décodeur URL', subtitle: 'Encoder et décoder les chaînes URL', inputLabel: 'Entrez le texte ou l\'URL', resultLabel: 'Résultat', encodeBtn: '🔒 Encoder', decodeBtn: '🔓 Décoder', copyBtn: 'Copier', copied: 'Copié!' },
  es: { title: 'Codificador/Decodificador URL', subtitle: 'Codificar y decodificar cadenas URL', inputLabel: 'Ingrese texto o URL', resultLabel: 'Resultado', encodeBtn: '🔒 Codificar', decodeBtn: '🔓 Decodificar', copyBtn: 'Copiar', copied: '¡Copiado!' }
};

export default function UrlEncoderPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch { setOutput('❌ Invalid input'); }
  };
  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch { setOutput('❌ Invalid encoded string'); }
  };
  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="tool-page-container animate-fade-in-up">
      <div className="tool-card-single">
        <div className="tool-header"><div className="tool-header-icon">🔗</div><h1>{t.title}</h1><p className="tool-desc-single">{t.subtitle}</p></div>
        <div className="tool-area">
          <label>{t.inputLabel}</label>
          <textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://example.com/?q=hello world" />
          <div className="button-group"><button className="btn" onClick={encode}>{t.encodeBtn}</button><button className="btn" onClick={decode}>{t.decodeBtn}</button></div>
          {output && <><label>{t.resultLabel}</label><div className="result-box break-all">{output}</div><button className="btn mt-2" onClick={copy}>{copied ? t.copied : t.copyBtn}</button></>}
        </div>
      </div>
    </div>
  );
}