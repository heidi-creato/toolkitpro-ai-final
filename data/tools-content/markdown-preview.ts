// data/tools-content/markdown-preview.ts
const markdownPreviewContent = {
  // العربية
  ar: {
    title: 'معاينة Markdown المباشرة',
    description: '📝 **أداة معاينة Markdown** من ToolKit ProAI – اكتب نصاً بتنسيق Markdown وشاهد المعاينة المباشرة منسقة HTML في نفس الوقت. تدعم العناوين، القوائم، الروابط، الصور، الجداول، والاقتباسات. مثالية للكتّاب، المطورين، وأي شخص يحتاج لتحرير وتنسيق المحتوى بسرعة قبل نشره.',
    whyUse: [
      '📝 معاينة فورية أثناء كتابة Markdown',
      '🎨 دعم كامل لعناصر Markdown الأساسية والمتقدمة',
      '🖼️ عرض الصور والروابط والجداول مباشرة',
      '🔒 آمن تماماً – لا يتم تخزين أي نص',
      '🌍 يدعم 5 لغات واجهة',
      '📋 نسخ كود Markdown أو HTML الناتج',
      '⚡ مثالي لكتابة المستندات، المشاركات، أو ملفات README'
    ],
    howUse: [
      '1. اكتب أو الصق نص Markdown في المربع الأيسر',
      '2. تظهر المعاينة المنسقة تلقائياً في المربع الأيمن',
      '3. يمكنك تعديل النص ورؤية التحديثات لحظياً',
      '4. انسخ Markdown المعدّل أو HTML الناتج باستخدام الأزرار',
      '5. استخدم "مسح" لبدء مستند جديد'
    ],
    faq: [
      { q: 'ما هي صيغة Markdown؟', a: 'لغة ترميز خفيفة تستخدم رموزاً بسيطة لتنسيق النص (مثل # للعناوين، * للقوائم، [رابط](url) للروابط). تهدف لجعل الكتابة للويب سهلة القراءة والكتابة.' },
      { q: 'ما هي العناصر المدعومة؟', a: 'العناوين (6 مستويات)، القوائم المرتبة وغير المرتبة، الروابط، الصور، الجداول، الاقتباسات، الكود (inline و blocks)، الخط العريض والمائل، والتسطير عبر HTML.' },
      { q: 'هل يمكن استخدام الأكواد (Code blocks) مع تمييز الصيغة؟', a: 'نعم، تستخدم الأداة تمييزاً بسيطاً للصيغة للمقتطفات البرمجية. كتل الكود مع لغة محددة (مثل ```js) تعرض بشكل منسق.' },
      { q: 'هل الأداة مجانية؟', a: 'نعم، مجانية بالكامل وتعمل محلياً في متصفحك – لا تُرسل بياناتك لأي خادم.' }
    ]
  },
  // الإنجليزية
  en: {
    title: 'Live Markdown Preview',
    description: '📝 **Markdown Preview Tool** by ToolKit ProAI – write Markdown text and see a live formatted HTML preview side by side. Supports headings, lists, links, images, tables, blockquotes, and code blocks. Perfect for writers, developers, or anyone needing fast content formatting before publishing.',
    whyUse: [
      '📝 Instant preview while writing Markdown',
      '🎨 Full support for basic and extended Markdown elements',
      '🖼️ Render images, links, and tables directly',
      '🔒 100% secure – no text stored',
      '🌍 Supports 5 UI languages',
      '📋 Copy Markdown source or generated HTML',
      '⚡ Ideal for docs, blog posts, or README files'
    ],
    howUse: [
      '1. Type or paste Markdown text into the left input box',
      '2. The formatted preview automatically updates on the right side',
      '3. Edit the text to see real‑time changes',
      '4. Copy the edited Markdown or the resulting HTML using buttons',
      '5. Use "Clear" to start a new document'
    ],
    faq: [
      { q: 'What is Markdown?', a: 'A lightweight markup language using simple symbols (e.g., # for headings, * for lists, [link](url) for links) to format text. It aims to be easy to read and write for web content.' },
      { q: 'Which elements are supported?', a: 'Headings (6 levels), ordered/unordered lists, links, images, tables, blockquotes, inline code, code blocks, bold, italic, and underline via HTML.' },
      { q: 'Does it support syntax highlighting for code blocks?', a: 'Yes, the tool uses basic syntax highlighting for code snippets. Code blocks with a language hint (e.g., ```js) are displayed with proper styling.' },
      { q: 'Is it free?', a: 'Yes, completely free and runs client‑side – your data never leaves your browser.' }
    ]
  },
  // الألمانية
  de: {
    title: 'Live‑Markdown‑Vorschau',
    description: '📝 **Markdown‑Vorschau‑Tool** von ToolKit ProAI – schreiben Sie Markdown‑Text und sehen Sie parallel die live formatierte HTML‑Vorschau. Unterstützt Überschriften, Listen, Links, Bilder, Tabellen, Zitate und Codeblöcke. Ideal für Autoren, Entwickler oder alle, die Inhalte vor der Veröffentlichung schnell formatieren möchten.',
    whyUse: [
      '📝 Sofortige Vorschau während des Schreibens',
      '🎨 Volle Unterstützung grundlegender und erweiterter Markdown‑Elemente',
      '🖼️ Direkte Darstellung von Bildern, Links und Tabellen',
      '🔒 100% sicher – kein Text wird gespeichert',
      '🌍 Unterstützt 5 UI‑Sprachen',
      '📋 Markdown‑Quelltext oder generiertes HTML kopieren',
      '⚡ Ideal für Dokumentationen, Blogbeiträge oder README‑Dateien'
    ],
    howUse: [
      '1. Geben Sie Markdown‑Text in das linke Eingabefeld ein',
      '2. Die formatierte Vorschau aktualisiert sich automatisch auf der rechten Seite',
      '3. Bearbeiten Sie den Text für Echtzeit‑Änderungen',
      '4. Kopieren Sie das bearbeitete Markdown oder das generierte HTML mit den Buttons',
      '5. Verwenden Sie "Löschen" für ein neues Dokument'
    ],
    faq: [
      { q: 'Was ist Markdown?', a: 'Eine leichte Auszeichnungssprache mit einfachen Symbolen (z.B. # für Überschriften, * für Listen, [Link](URL) für Links). Sie macht das Schreiben für das Web leicht lesbar und schreibbar.' },
      { q: 'Welche Elemente werden unterstützt?', a: 'Überschriften (6 Ebenen), geordnete/ungeordnete Listen, Links, Bilder, Tabellen, Zitate, Inline‑Code, Codeblöcke, fett, kursiv und Unterstreichung über HTML.' },
      { q: 'Unterstützt es Syntaxhervorhebung für Codeblöcke?', a: 'Ja, das Tool bietet grundlegende Syntaxhervorhebung für Code‑Snippets. Codeblöcke mit Sprachangebe (z.B. ```js) werden entsprechend formatiert.' },
      { q: 'Ist es kostenlos?', a: 'Ja, völlig kostenlos und clientseitig – Ihre Daten verlassen niemals Ihren Browser.' }
    ]
  },
  // الفرنسية
  fr: {
    title: 'Aperçu Markdown en direct',
    description: '📝 **Outil d’aperçu Markdown** par ToolKit ProAI – écrivez du texte Markdown et voyez l’aperçu HTML formaté en direct côte à côte. Prend en charge les titres, listes, liens, images, tableaux, citations et blocs de code. Parfait pour les rédacteurs, développeurs ou toute personne ayant besoin de formater rapidement du contenu avant publication.',
    whyUse: [
      '📝 Aperçu instantané pendant l’écriture',
      '🎨 Prise en charge complète des éléments Markdown basiques et étendus',
      '🖼️ Rendu direct des images, liens et tableaux',
      '🔒 100% sécurisé – aucun texte stocké',
      '🌍 Prend en charge 5 langues d’interface',
      '📋 Copier la source Markdown ou le HTML généré',
      '⚡ Idéal pour docs, articles de blog ou fichiers README'
    ],
    howUse: [
      '1. Saisissez ou collez du texte Markdown dans la zone de gauche',
      '2. L’aperçu formaté se met automatiquement à jour à droite',
      '3. Modifiez le texte pour voir les changements en temps réel',
      '4. Copiez le Markdown modifié ou le HTML généré avec les boutons',
      '5. Utilisez "Effacer" pour un nouveau document'
    ],
    faq: [
      { q: 'Qu’est‑ce que Markdown ?', a: 'Un langage de balisage léger utilisant des symboles simples (ex. # pour titres, * pour listes, [lien](url) pour les liens) pour formater du texte. Vise à rendre l’écriture pour le web facile à lire et à écrire.' },
      { q: 'Quels éléments sont pris en charge ?', a: 'Titres (6 niveaux), listes ordonnées/non ordonnées, liens, images, tableaux, citations, code en ligne, blocs de code, gras, italique et soulignement via HTML.' },
      { q: 'Prend‑il en charge la coloration syntaxique pour les blocs de code ?', a: 'Oui, l’outil fournit une coloration syntaxique de base pour les extraits de code. Les blocs de code avec indication du langage (ex. ```js) s’affichent correctement.' },
      { q: 'Est‑ce gratuit ?', a: 'Oui, entièrement gratuit et fonctionne côté client – vos données ne quittent jamais votre navigateur.' }
    ]
  },
  // الإسبانية
  es: {
    title: 'Vista previa en vivo de Markdown',
    description: '📝 **Herramienta de vista previa de Markdown** de ToolKit ProAI – escribe texto Markdown y ve la vista previa HTML formateada en vivo lado a lado. Soporta encabezados, listas, enlaces, imágenes, tablas, citas y bloques de código. Perfecto para escritores, desarrolladores o cualquiera que necesite formatear contenido rápidamente antes de publicar.',
    whyUse: [
      '📝 Vista previa instantánea mientras escribes Markdown',
      '🎨 Soporte completo para elementos básicos y extendidos de Markdown',
      '🖼️ Muestra imágenes, enlaces y tablas directamente',
      '🔒 100% seguro – no se almacena ningún texto',
      '🌍 Soporta 5 idiomas de interfaz',
      '📋 Copiar el código Markdown o el HTML generado',
      '⚡ Ideal para documentación, publicaciones de blog o archivos README'
    ],
    howUse: [
      '1. Escribe o pega texto Markdown en el cuadro izquierdo',
      '2. La vista previa formateada se actualiza automáticamente en el lado derecho',
      '3. Edita el texto para ver cambios en tiempo real',
      '4. Copia el Markdown editado o el HTML resultante usando los botones',
      '5. Usa "Borrar" para empezar un nuevo documento'
    ],
    faq: [
      { q: '¿Qué es Markdown?', a: 'Un lenguaje de marcado ligero que usa símbolos simples (ej. # para encabezados, * para listas, [enlace](url) para enlaces) para formatear texto. Facilita la escritura para la web de manera legible.' },
      { q: '¿Qué elementos están soportados?', a: 'Encabezados (6 niveles), listas ordenadas/desordenadas, enlaces, imágenes, tablas, citas, código en línea, bloques de código, negrita, cursiva y subrayado mediante HTML.' },
      { q: '¿Soporta resaltado de sintaxis para bloques de código?', a: 'Sí, la herramienta proporciona resaltado de sintaxis básico para fragmentos de código. Los bloques de código con indicación de lenguaje (ej. ```js) se muestran formateados.' },
      { q: '¿Es gratuito?', a: 'Sí, completamente gratuito y funciona del lado del cliente – tus datos nunca salen de tu navegador.' }
    ]
  }
};

export default markdownPreviewContent;