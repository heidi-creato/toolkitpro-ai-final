'use client';

import { useState } from 'react';

const translations = {
  ar: {
    title: 'مولد كلمات المرور',
    subtitle: 'إنشاء كلمات مرور قوية وآمنة',
    lengthLabel: 'طول كلمة المرور',
    includeUppercase: '✓ أحرف كبيرة (A-Z)',
    includeLowercase: '✓ أحرف صغيرة (a-z)',
    includeNumbers: '✓ أرقام (0-9)',
    includeSymbols: '✓ رموز خاصة (!@#$%^&*)',
    generateBtn: 'توليد كلمة مرور',
    copyBtn: 'نسخ',
    copied: 'تم النسخ!',
    passwordStrength: 'قوة كلمة المرور:',
    weak: 'ضعيفة',
    medium: 'متوسطة',
    strong: 'قوية',
    veryStrong: 'قوية جداً',
    fromWordLabel: 'إنشاء من كلمة (اختياري)',
    fromWordPlaceholder: 'أدخل كلمة أساسية (مثل اسمك)',
    generateFromWordBtn: 'توليد من الكلمة',
    orLabel: 'أو',
    passwordResult: 'كلمة المرور الناتجة:'
  },
  en: {
    title: 'Password Generator',
    subtitle: 'Generate strong and secure passwords',
    lengthLabel: 'Password length',
    includeUppercase: '✓ Uppercase letters (A-Z)',
    includeLowercase: '✓ Lowercase letters (a-z)',
    includeNumbers: '✓ Numbers (0-9)',
    includeSymbols: '✓ Special characters (!@#$%^&*)',
    generateBtn: 'Generate Password',
    copyBtn: 'Copy',
    copied: 'Copied!',
    passwordStrength: 'Password strength:',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    veryStrong: 'Very Strong',
    fromWordLabel: 'Generate from a word (optional)',
    fromWordPlaceholder: 'Enter a base word (e.g., your name)',
    generateFromWordBtn: 'Generate from word',
    orLabel: 'or',
    passwordResult: 'Generated password:'
  },
  de: {
    title: 'Passwortgenerator',
    subtitle: 'Generieren Sie starke und sichere Passwörter',
    lengthLabel: 'Passwortlänge',
    includeUppercase: '✓ Großbuchstaben (A-Z)',
    includeLowercase: '✓ Kleinbuchstaben (a-z)',
    includeNumbers: '✓ Zahlen (0-9)',
    includeSymbols: '✓ Sonderzeichen (!@#$%^&*)',
    generateBtn: 'Passwort generieren',
    copyBtn: 'Kopieren',
    copied: 'Kopiert!',
    passwordStrength: 'Passwortstärke:',
    weak: 'Schwach',
    medium: 'Mittel',
    strong: 'Stark',
    veryStrong: 'Sehr stark',
    fromWordLabel: 'Aus einem Wort generieren (optional)',
    fromWordPlaceholder: 'Geben Sie ein Basiswort ein (z.B. Ihr Name)',
    generateFromWordBtn: 'Aus Wort generieren',
    orLabel: 'oder',
    passwordResult: 'Generiertes Passwort:'
  },
  fr: {
    title: 'Générateur de mots de passe',
    subtitle: 'Générez des mots de passe forts et sécurisés',
    lengthLabel: 'Longueur du mot de passe',
    includeUppercase: '✓ Majuscules (A-Z)',
    includeLowercase: '✓ Minuscules (a-z)',
    includeNumbers: '✓ Chiffres (0-9)',
    includeSymbols: '✓ Caractères spéciaux (!@#$%^&*)',
    generateBtn: 'Générer',
    copyBtn: 'Copier',
    copied: 'Copié !',
    passwordStrength: 'Force du mot de passe :',
    weak: 'Faible',
    medium: 'Moyenne',
    strong: 'Forte',
    veryStrong: 'Très forte',
    fromWordLabel: 'Générer à partir d\'un mot (optionnel)',
    fromWordPlaceholder: 'Entrez un mot de base (ex. votre nom)',
    generateFromWordBtn: 'Générer à partir du mot',
    orLabel: 'ou',
    passwordResult: 'Mot de passe généré :'
  },
  es: {
    title: 'Generador de contraseñas',
    subtitle: 'Genere contraseñas seguras y robustas',
    lengthLabel: 'Longitud de la contraseña',
    includeUppercase: '✓ Mayúsculas (A-Z)',
    includeLowercase: '✓ Minúsculas (a-z)',
    includeNumbers: '✓ Números (0-9)',
    includeSymbols: '✓ Caracteres especiales (!@#$%^&*)',
    generateBtn: 'Generar contraseña',
    copyBtn: 'Copiar',
    copied: '¡Copiado!',
    passwordStrength: 'Fortaleza de la contraseña:',
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
    veryStrong: 'Muy fuerte',
    fromWordLabel: 'Generar a partir de una palabra (opcional)',
    fromWordPlaceholder: 'Ingrese una palabra base (ej. su nombre)',
    generateFromWordBtn: 'Generar desde palabra',
    orLabel: 'o',
    passwordResult: 'Contraseña generada:'
  }
};

export default function PasswordGeneratorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [baseWord, setBaseWord] = useState('');

  const evaluateStrength = (pwd: string): string => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) return t.weak;
    if (score <= 4) return t.medium;
    if (score <= 6) return t.strong;
    return t.veryStrong;
  };

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijkmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+{}[]<>?';
    if (chars === '') return;
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
  };

  const generateFromWord = () => {
    if (!baseWord.trim()) return;
    const word = baseWord.trim();
    let modified = word;
    if (includeUppercase) modified = modified.replace(/[a-z]/g, c => Math.random() > 0.5 ? c.toUpperCase() : c);
    if (includeNumbers) modified = modified + Math.floor(Math.random() * 100);
    if (includeSymbols) modified = modified + '!@#$%'[Math.floor(Math.random() * 5)];
    if (modified.length < length) {
      const extra = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%';
      while (modified.length < length) {
        modified += extra.charAt(Math.floor(Math.random() * extra.length));
      }
    } else if (modified.length > length) {
      modified = modified.slice(0, length);
    }
    setPassword(modified);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = evaluateStrength(password);

  return (
    <div className="tool-page-container animate-fade-in-up">
      <div className="tool-card-single">
        <div className="tool-header">
          <div className="tool-header-icon">🔐</div>
          <h1>{t.title}</h1>
          <p className="tool-desc-single">{t.subtitle}</p>
        </div>

        <div className="tool-area">
          {/* إعدادات التوليد */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.lengthLabel}: {length}</label>
              <input
                type="range"
                min="6"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
                {t.includeUppercase}
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
                {t.includeLowercase}
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
                {t.includeNumbers}
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
                {t.includeSymbols}
              </label>
            </div>
          </div>

          <div className="button-group justify-center">
            <button onClick={generatePassword} className="btn">{t.generateBtn}</button>
          </div>

          <div className="my-3 text-center text-gray-500">{t.orLabel}</div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.fromWordLabel}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={baseWord}
                onChange={(e) => setBaseWord(e.target.value)}
                placeholder={t.fromWordPlaceholder}
                className="flex-1 p-2 border rounded"
              />
              <button onClick={generateFromWord} className="btn">{t.generateFromWordBtn}</button>
            </div>
          </div>

          {password && (
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">{t.passwordResult}</label>
              <div className="result-box font-mono break-all">{password}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">{t.passwordStrength} <strong className="text-yellow-500">{strength}</strong></span>
                <button onClick={handleCopy} className="btn">
                  {copied ? t.copied : t.copyBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}