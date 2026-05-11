import { Metadata } from 'next';
import ToolClient from './ToolClient';
import toolsData from '@/data/tools.json';

// دالة مساعدة لاستخراج معلومات الأداة حسب اللغة
function getToolMetadata(toolId: string, locale: string) {
  const tool = toolsData.tools.find(t => t.id === toolId);
  if (!tool) return null;
  
  const name = (locale === 'ar' ? tool.nameAr : tool.name) || tool.name;
  const desc = (locale === 'ar' ? tool.description : tool.descriptionEn) || tool.description;
  const keywords = `${name}, ${desc}, online text tool, free tool, ${locale === 'ar' ? 'أداة نصوص أونلاين' : 'text utilities'}`;
  
  return { name, description: desc, keywords };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; toolId: string }> }): Promise<Metadata> {
  const { locale, toolId } = await params;
  const meta = getToolMetadata(toolId, locale);
  
  if (!meta) {
    return {
      title: 'Tool not found | ToolKit ProAI',
      description: 'The requested tool does not exist.',
    };
  }
  
  const title = `${meta.name} - ${meta.description} | ToolKit ProAI`;
  const description = `Use the ${meta.name} tool online for free. ${meta.description}. Fast, secure, and supports 5 languages.`;
  
  return {
    title,
    description,
    keywords: meta.keywords,
    openGraph: {
      title,
      description,
      url: `https://toolkitpro-ai.vercel.app/${locale}/tools/${toolId}`,
      siteName: 'ToolKit ProAI',
      images: [
        {
          url: 'https://toolkitpro-ai.vercel.app/og-default.jpg', // يمكنك تغيير الصورة لاحقاً
          width: 1200,
          height: 630,
          alt: meta.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://toolkitpro-ai.vercel.app/og-default.jpg'],
    },
    alternates: {
      canonical: `https://toolkitpro-ai.vercel.app/${locale}/tools/${toolId}`,
    },
  };
}

export default function ToolPage({ params }: { params: { locale: string; toolId: string } }) {
  return <ToolClient params={params} />;
}