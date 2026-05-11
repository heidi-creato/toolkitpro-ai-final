'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

const translations = {
  ar: { title: 'مولد UUID', subtitle: 'توليد معرفات فريدة (UUID v4)', countLabel: 'عدد المعرفات', generateBtn: 'توليد', copyBtn: 'نسخ', copied: 'تم النسخ!' },
  en: { title: 'UUID Generator', subtitle: 'Generate unique identifiers (UUID v4)', countLabel: 'Number of UUIDs', generateBtn: 'Generate', copyBtn: 'Copy', copied: 'Copied!' },
  de: { title: 'UUID-Generator', subtitle: 'Generieren Sie eindeutige Kennungen (UUID v4)', countLabel: 'Anzahl UUIDs', generateBtn: 'Generieren', copyBtn: 'Kopieren', copied: 'Kopiert!' },
  fr: { title: 'Générateur UUID', subtitle: 'Générer des identifiants uniques (UUID v4)', countLabel: 'Nombre d\'UUID', generateBtn: 'Générer', copyBtn: 'Copier', copied: 'Copié!' },
  es: { title: 'Generador UUID', subtitle: 'Generar identificadores únicos (UUID v4)', countLabel: 'Número de UUIDs', generateBtn: 'Generar', copyBtn: 'Copiar', copied: '¡Copiado!' }
};

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function UuidPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const arr: string[] = [];
    for (let i = 0; i < Math.min(count, 50); i++) {
      arr.push(generateUUID());
    }
    setUuids(arr);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-page-container animate-fade-in-up">
      <div className="tool-card-single">
        <div className="tool-header"><div className="tool-header-icon">🆔</div><h1>{t.title}</h1><p className="tool-desc-single">{t.subtitle}</p></div>
        <div className="tool-area">
          <label>{t.countLabel}</label>
          <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-24" />
          <button className="btn" onClick={generate}>{t.generateBtn}</button>
          {uuids.length > 0 && (
            <>
              <div className="result-box font-mono space-y-1">
                {uuids.map((id, i) => <div key={i}>{id}</div>)}
              </div>
              <button className="btn" onClick={copyAll}>{copied ? t.copied : t.copyBtn}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}