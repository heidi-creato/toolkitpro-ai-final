// app/tools/markdown-preview/page.tsx
'use client';

import { useLanguage } from '@/lib/language-context';
import toolsContent from '@/data/tools-content';

export default function MarkdownPreviewPage() {
  const { language } = useLanguage();
  const content = toolsContent.markdownPreview[language];

  if (!content) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      
      {/* عرض الوصف (يدعم HTML) */}
      <div 
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: content.description }}
      />
      
      {/* لماذا نستخدم هذه الأداة */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {language === 'ar' ? 'لماذا نستخدم هذه الأداة؟' : 
           language === 'fr' ? 'Pourquoi utiliser cet outil ?' :
           language === 'de' ? 'Warum dieses Tool verwenden?' :
           language === 'es' ? '¿Por qué usar esta herramienta?' :
           'Why Use This Tool?'}
        </h2>
        <ul className="list-disc list-inside space-y-1">
          {content.whyUse.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* كيفية الاستخدام */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {language === 'ar' ? 'كيفية الاستخدام' :
           language === 'fr' ? 'Comment utiliser' :
           language === 'de' ? 'Verwendung' :
           language === 'es' ? 'Cómo usar' :
           'How to Use'}
        </h2>
        <ol className="list-decimal list-inside space-y-1">
          {content.howUse.map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {language === 'ar' ? 'الأسئلة الشائعة' :
           language === 'fr' ? 'FAQ' :
           language === 'de' ? 'Häufig gestellte Fragen' :
           language === 'es' ? 'Preguntas frecuentes' :
           'FAQ'}
        </h2>
        <div className="space-y-4">
          {content.faq.map((item: { q: string; a: string }, idx: number) => (
            <div key={idx} className="border-b pb-2">
              <h3 className="font-bold">{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* هنا يمكنك وضع واجهة الأداة الفعلية (محرر Markdown، المعاينة...) */}
      <div className="mt-12 p-4 bg-gray-100 rounded">
        <p className="text-center text-gray-600">
          {language === 'ar' ? 'سيتم وضع واجهة الأداة هنا قريباً' : 
           'Tool interface will be placed here soon'}
        </p>
      </div>
    </div>
  );
}