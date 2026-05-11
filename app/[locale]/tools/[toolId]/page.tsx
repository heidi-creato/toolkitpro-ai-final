import { Metadata } from 'next';
import ToolClient from './ToolClient';
import toolsData from '@/data/tools.json';

// دالة مساعدة لاستخراج معلومات الأداة حسب اللغة
function getToolMetadata(toolId: string, locale: string) {
  const tool = toolsData.tools.find(t => t.id === toolId);
  if (!tool) return null;
  
  const name = (locale === 'ar' ? tool.nameAr : tool.name) || tool.name;
  const desc = (locale === 'ar' ? tool.description : tool.descriptionEn) || tool.description;
  
  // إنشاء كلمات مفتاحية ديناميكية حسب اللغة
  let keywords = '';
  switch (locale) {
    case 'ar':
      keywords = `${name}, ${desc}, أداة أونلاين, معالجة نصوص, أدوات مجانية`;
      break;
    case 'en':
      keywords = `${name}, ${desc}, online text tool, free utility, developer tools`;
      break;
    case 'de':
      keywords = `${name}, ${desc}, Online-Textwerkzeug, kostenloses Dienstprogramm, Entwicklertools`;
      break;
    case 'fr':
      keywords = `${name}, ${desc}, outil de texte en ligne, utilitaire gratuit, outils de développement`;
      break;
    case 'es':
      keywords = `${name}, ${desc}, herramienta de texto en línea, utilidad gratuita, herramientas de desarrollo`;
      break;
    default:
      keywords = `${name}, ${desc}, online tool, text processing, free`;
  }
  
  return { name, description: desc, keywords };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; toolId: string }> }): Promise<Metadata> {
  const { locale, toolId } = await params;
  const meta = getToolMetadata(toolId, locale);
  
  if (!meta) {
    const defaultTitle = locale === 'ar' ? 'الأداة غير موجودة | ToolKit ProAI' : 'Tool not found | ToolKit ProAI';
    return { title: defaultTitle };
  }
  
  const title = `${meta.name} - ${meta.description} | ToolKit ProAI`;
  const description = `Use the ${meta.name} tool online for free. ${meta.description}. Fast, secure, and supports 5 languages.`;
  
  // بناء عنوان URL للصورة حسب اللغة (يمكنك استخدام صورة افتراضية)
  const imageUrl = 'https://toolkitpro-ai.vercel.app/og-default.jpg';
  
  return {
    title,
    description,
    keywords: meta.keywords,
    openGraph: {
      title,
      description,
      url: `https://toolkitpro-ai.vercel.app/${locale}/tools/${toolId}`,
      siteName: 'ToolKit ProAI',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: meta.name }],
      type: 'website',
      locale: locale === 'ar' ? 'ar_AR' : locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@toolkitproai',
    },
    alternates: {
      canonical: `https://toolkitpro-ai.vercel.app/${locale}/tools/${toolId}`,
      languages: {
        'en': `https://toolkitpro-ai.vercel.app/en/tools/${toolId}`,
        'ar': `https://toolkitpro-ai.vercel.app/ar/tools/${toolId}`,
        'de': `https://toolkitpro-ai.vercel.app/de/tools/${toolId}`,
        'fr': `https://toolkitpro-ai.vercel.app/fr/tools/${toolId}`,
        'es': `https://toolkitpro-ai.vercel.app/es/tools/${toolId}`,
      },
    },
  };
}

export default function ToolPage({ params }: { params: { locale: string; toolId: string } }) {
  return <ToolClient params={params} />;
}