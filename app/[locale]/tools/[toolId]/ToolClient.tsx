'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toolsData from '@/data/tools.json';
import { transformText } from '@/lib/tools/transformers';

// ========== ترجمة واجهة الأداة (الأزرار والتسميات + العناوين) ==========
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
    exportPDF: '📑 PDF',
    whyUseTitle: '✨ لماذا تستخدم هذه الأداة؟',
    howUseTitle: '📖 كيفية الاستخدام',
    faqTitle: '❓ الأسئلة الشائعة'
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
    exportPDF: '📑 PDF',
    whyUseTitle: '✨ Why Use This Tool?',
    howUseTitle: '📖 How to Use',
    faqTitle: '❓ Frequently Asked Questions'
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
    exportPDF: '📑 PDF',
    whyUseTitle: '✨ Warum dieses Werkzeug?',
    howUseTitle: '📖 Anleitung',
    faqTitle: '❓ Häufig gestellte Fragen'
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
    exportPDF: '📑 PDF',
    whyUseTitle: '✨ Pourquoi utiliser cet outil ?',
    howUseTitle: '📖 Mode d\'emploi',
    faqTitle: '❓ Questions fréquentes'
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
    exportPDF: '📑 PDF',
    whyUseTitle: '✨ ¿Por qué usar esta herramienta?',
    howUseTitle: '📖 Cómo usar',
    faqTitle: '❓ Preguntas frecuentes'
  }
};

// ========== ⭐⭐⭐ هنا تضيف النصوص المخصصة لكل أداة ⭐⭐⭐ ==========

const toolCustomContent: Record<string, Record<string, any>> = {
  // أداة "uppercase" (تحويل إلى أحرف كبيرة) - دعم 5 لغات
  'uppercase': {
    // العربية
    ar: {
      title: 'أداة تحويل إلى أحرف كبيرة (UPPERCASE)',
      description: '🌟 **أداة تحويل النص إلى أحرف كبيرة** من ToolKit ProAI – حول أي نص إلى حروف كبيرة (UPPERCASE) بضغطة زر. مثالية للعناوين البارزة، التنبيهات القوية، النصوص البرمجية، أو أي موقف تحتاج فيه إلى تكبير جميع الحروف.',
      whyUse: [
        '⚡ تحويل فوري بنقرة واحدة – بدون تعقيد',
        '🔒 آمن تماماً – لا نُخزن نصوصك أبداً',
        '🌍 يدعم اللغة العربية والإنجليزية والفرنسية والألمانية والإسبانية',
        '📱 يعمل على جميع الأجهزة (هواتف، أجهزة لوحية، حواسيب)',
        '💾 انسخ النتيجة مباشرة أو حمّلها كملف نصي (.txt)'
      ],
      howUse: [
        '1. اكتب أو الصق النص في الحقل العلوي',
        '2. اضغط على زر "تحويل" (Convert)',
        '3. استخدم زر "نسخ" لنسخ النتيجة، أو "تحميل" لحفظها كملف نصي'
      ],
      faq: [
        { q: 'ما الفرق بين هذه الأداة وأداة "capitalize"؟', a: 'أداة "uppercase" تحول كل الحروف إلى كبيرة (مثال: hello → HELLO)، بينما "capitalize" تجعل الحرف الأول كبيراً فقط.' },
        { q: 'هل تدعم الأحرف الخاصة والأرقام؟', a: 'نعم، تبقى الأرقام والرموز كما هي دون تغيير، فقط الحروف الأبجدية تُحوَّل.' },
        { q: 'هل أحتاج إلى إنشاء حساب؟', a: 'لا، الأداة مجانية بالكامل وبدون تسجيل دخول.' }
      ]
    },
    // الإنجليزية
    en: {
      title: 'Uppercase Text Converter Tool',
      description: '🌟 **Uppercase Converter** by ToolKit ProAI – instantly transform any text to ALL CAPS (UPPERCASE). Perfect for headings, alerts, programming constants, or any situation requiring full capitalization.',
      whyUse: [
        '⚡ One-click instant conversion',
        '🔒 100% secure – no text is ever stored',
        '🌍 Supports 5 languages: English, Arabic, French, German, Spanish',
        '📱 Works flawlessly on all devices',
        '💾 Copy to clipboard or download as .txt file'
      ],
      howUse: [
        '1. Type or paste your text into the input box',
        '2. Click the "Convert" button',
        '3. Click "Copy" to copy the result, or "Download" to save as a text file'
      ],
      faq: [
        { q: 'What is the difference between Uppercase and Capitalize?', a: 'Uppercase converts every letter to capital (e.g., hello → HELLO). Capitalize only capitalizes the first letter of each word.' },
        { q: 'Does it handle special characters and numbers?', a: 'Yes, numbers and symbols remain unchanged; only alphabet letters are converted.' },
        { q: 'Do I need an account?', a: 'No, the tool is completely free with no login required.' }
      ]
    },
    // الألمانية (Deutsch)
    de: {
      title: 'Großbuchstaben-Konverter (Uppercase)',
      description: '🌟 **Großbuchstaben-Werkzeug** von ToolKit ProAI – wandelt jeden Text sofort in Großbuchstaben (UPPERCASE) um. Ideal für Überschriften, Warnungen, Programmierung oder formelle Dokumente.',
      whyUse: [
        '⚡ Sofortige Umwandlung mit einem Klick',
        '🔒 100% sicher – keine Textspeicherung',
        '🌍 Unterstützt 5 Sprachen: Deutsch, Englisch, Französisch, Spanisch, Arabisch',
        '📱 Funktioniert auf allen Geräten',
        '💾 Ergebnis kopieren oder als .txt herunterladen'
      ],
      howUse: [
        '1. Text in das obere Feld eingeben oder einfügen',
        '2. Klicken Sie auf die Schaltfläche "Umwandeln"',
        '3. Kopieren Sie das Ergebnis oder laden Sie es als Textdatei herunter'
      ],
      faq: [
        { q: 'Was ist der Unterschied zwischen Uppercase und Capitalize?', a: 'Uppercase macht alle Buchstaben groß (z. B. hallo → HALLO). Capitalize macht nur den ersten Buchstaben jedes Wortes groß.' },
        { q: 'Werden Umlaute (ä, ö, ü) richtig verarbeitet?', a: 'Ja, ä wird zu Ä, ö zu Ö, ü zu Ü und ß bleibt ß (da es keine Großform hat, wird es zu SS in manchen Kontexten – aber hier bleibt es ß gemäß Standard).' },
        { q: 'Ist die Nutzung kostenlos?', a: 'Ja, völlig kostenlos ohne Anmeldung.' }
      ]
    },
    // الفرنسية (Français)
    fr: {
      title: 'Convertisseur en majuscules (Uppercase)',
      description: '🌟 **Outil de conversion en majuscules** par ToolKit ProAI – transformez instantanément n’importe quel texte en MAJUSCULES. Idéal pour les titres, alertes, constantes en programmation ou textes officiels.',
      whyUse: [
        '⚡ Conversion instantanée en un clic',
        '🔒 100% sécurisé – aucun texte n’est stocké',
        '🌍 Prend en charge 5 langues : français, anglais, allemand, espagnol, arabe',
        '📱 Fonctionne sur tous les appareils',
        '💾 Copier ou télécharger le résultat au format .txt'
      ],
      howUse: [
        '1. Saisissez ou collez votre texte dans le champ supérieur',
        '2. Cliquez sur le bouton "Convertir"',
        '3. Copiez le résultat ou téléchargez-le en tant que fichier texte'
      ],
      faq: [
        { q: 'Différence entre "Uppercase" et "Capitalize" ?', a: 'Uppercase met tout en majuscules (ex. bonjour → BONJOUR). Capitalize met seulement la première lettre de chaque mot en majuscule.' },
        { q: 'Gère-t-il les caractères accentués (é, è, ç) ?', a: 'Oui, é devient É, è devient È, ç devient Ç, etc. Tous les accents sont conservés.' },
        { q: 'Dois-je créer un compte ?', a: 'Non, l’outil est entièrement gratuit et sans inscription.' }
      ]
    },
    // الإسبانية (Español)
    es: {
      title: 'Convertidor a mayúsculas (Uppercase)',
      description: '🌟 **Herramienta de mayúsculas** de ToolKit ProAI – convierte cualquier texto a MAYÚSCULAS (UPPERCASE) al instante. Perfecto para títulos, alertas, constantes en programación o textos destacados.',
      whyUse: [
        '⚡ Conversión instantánea con un clic',
        '🔒 100% seguro – no se almacena ningún texto',
        '🌍 Soporta 5 idiomas: español, inglés, alemán, francés, árabe',
        '📱 Funciona en todos los dispositivos',
        '💾 Copiar o descargar el resultado como archivo .txt'
      ],
      howUse: [
        '1. Escribe o pega tu texto en el cuadro superior',
        '2. Haz clic en el botón "Convertir"',
        '3. Copia el resultado o descárgalo como archivo de texto'
      ],
      faq: [
        { q: '¿Diferencia entre "Uppercase" y "Capitalize"?', a: 'Uppercase convierte todas las letras a mayúsculas (ej. hola → HOLA). Capitalize solo pone en mayúscula la primera letra de cada palabra.' },
        { q: '¿Maneja correctamente las letras con tilde (á, é, í, ó, ú, ü, ñ)?', a: 'Sí, á → Á, é → É, í → Í, ó → Ó, ú → Ú, ü → Ü, ñ → Ñ, respetando las reglas del español.' },
        { q: '¿Es gratuito?', a: 'Sí, completamente gratuito y sin necesidad de registro.' }
      ]
    }
  }
};


export default function ToolClient({ params }: { params: { locale: string; toolId: string } }) {

// ========== دالة تجلب المحتوى المخصص أو العام ==========
function getLocalizedContent(toolId: string, toolName: string, locale: string) {
  // محاولة الحصول على المحتوى المخصص لهذه الأداة وهذه اللغة
  const custom = toolCustomContent[toolId]?.[locale];
  if (custom) {
    return {
      description: custom.description,
      whyUse: custom.whyUse,
      howUse: custom.howUse,
      faq: custom.faq
    };
  }

  // --- محتوى عام احتياطي (يظهر إذا لم تجد إدخالاً مخصصاً) ---
  const whyUseGeneral = {
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
      '🌍 Unterstützt 5 Sprachen',
      '📱 Vollständig responsiv',
      '💾 Ergebnisse kopieren oder herunterladen'
    ],
    fr: [
      '⚡ Résultats instantanés',
      '🔒 100% sécurisé',
      '🌍 Prend en charge 5 langues',
      '📱 Entièrement responsive',
      '💾 Copiez ou téléchargez le résultat'
    ],
    es: [
      '⚡ Resultados instantáneos',
      '🔒 100% seguro',
      '🌍 Soporta 5 idiomas',
      '📱 Totalmente responsive',
      '💾 Copia o descarga el resultado'
    ]
  };
  const howUseGeneral = {
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
      'Klicken Sie auf "Kopieren" oder "Herunterladen"',
      'Nutzen Sie die Schaltfläche "Beispiel"'
    ],
    fr: [
      'Entrez votre texte dans la zone de saisie',
      'Le résultat apparaît instantanément',
      'Cliquez sur "Copier" ou "Télécharger"',
      'Utilisez le bouton "Exemple"'
    ],
    es: [
      'Ingrese su texto en el cuadro de entrada',
      'El resultado aparece instantáneamente',
      'Haga clic en "Copiar" o "Descargar"',
      'Use el botón "Ejemplo"'
    ]
  };
  const faqGeneral = {
    ar: [
      { q: `ما هي أداة ${toolName}؟`, a: `أداة ${toolName} هي خدمة مجانية تتيح لك معالجة النصوص بسرعة وأمان.` },
      { q: `هل أداة ${toolName} مجانية؟`, a: 'نعم، جميع أدوات ToolKit ProAI مجانية ولا تحتاج إلى تسجيل.' },
      { q: `هل بياناتي آمنة عند استخدام ${toolName}؟`, a: 'نعم، جميع المعالجات تتم في متصفحك، ولا نخزن ملفاتك.' },
      { q: `كم عدد اللغات التي تدعمها الأداة؟`, a: 'تدعم الأداة 5 لغات: العربية، الإنجليزية، الألمانية، الفرنسية، الإسبانية.' }
    ],
    en: [
      { q: `What is the ${toolName} tool?`, a: `The ${toolName} tool is a free online service that lets you process text quickly and securely.` },
      { q: `Is this tool free?`, a: 'Yes, all tools are completely free with no sign-up required.' },
      { q: `Is my data safe?`, a: 'All processing happens in your browser; we never store your data.' },
      { q: `How many languages does it support?`, a: 'It supports 5 languages: Arabic, English, German, French, Spanish.' }
    ],
    de: [
      { q: `Was ist das ${toolName}-Tool?`, a: `Das Tool ist ein kostenloser Online-Dienst zur Textverarbeitung.` },
      { q: `Ist es kostenlos?`, a: 'Ja, völlig kostenlos.' },
      { q: `Sind meine Daten sicher?`, a: 'Ja, die Verarbeitung erfolgt im Browser.' }
    ],
    fr: [
      { q: `Qu'est-ce que l'outil ${toolName} ?`, a: `C'est un service gratuit pour traiter du texte.` },
      { q: `Est-ce gratuit ?`, a: 'Oui, entièrement gratuit.' },
      { q: `Mes données sont-elles sécurisées ?`, a: 'Oui, le traitement se fait dans votre navigateur.' }
    ],
    es: [
      { q: `¿Qué es la herramienta ${toolName}?`, a: `Es un servicio gratuito para procesar texto.` },
      { q: `¿Es gratis?`, a: 'Sí, completamente gratis.' },
      { q: `¿Mis datos están seguros?`, a: 'Sí, el procesamiento ocurre en su navegador.' }
    ]
  };

  return {
    description: (locale === 'ar' ? `أداة **${toolName}** من ToolKit ProAI تسمح لك بمعالجة النصوص بسهولة وسرعة. مثالية للكتّاب والمطورين وصناع المحتوى. استخدمها أونلاين مجاناً – بدون تثبيت.` : `The **${toolName}** tool from ToolKit ProAI lets you process text easily and quickly. Perfect for writers, developers, and content creators. Use it online for free — no installation required.`),
    whyUse: whyUseGeneral[locale as keyof typeof whyUseGeneral] || whyUseGeneral.en,
    howUse: howUseGeneral[locale as keyof typeof howUseGeneral] || howUseGeneral.en,
    faq: faqGeneral[locale as keyof typeof faqGeneral] || faqGeneral.en
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
  const isRTL = locale === 'ar';
  
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
            dir={isRTL ? 'rtl' : 'ltr'}
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
            <div className="result-box" dir={isRTL ? 'rtl' : 'ltr'}>
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
      
      {/* ========== المحتوى الوصفي المتعدد اللغات (مخصص أو عام) ========== */}
      <div className="tool-card-single" style={{ marginTop: '1.5rem' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{toolName}</h2>
        <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>{seoContent.description}</p>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>{t.whyUseTitle}</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          {seoContent.whyUse.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>{t.howUseTitle}</h3>
        <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          {seoContent.howUse.map((item, idx) => <li key={idx}>{item}</li>)}
        </ol>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>{t.faqTitle}</h3>
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