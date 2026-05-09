import { MetadataRoute } from 'next';
import toolsData from '@/data/tools.json';

const baseUrl = 'https://toolkitpro-ai.com';
const locales = ['en', 'ar', 'de', 'fr', 'es'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/tools', '/about', '/contact', '/faq', '/privacy', '/terms'
  ];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }
    
    for (const tool of toolsData.tools) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/tools/${tool.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }
  
  return sitemapEntries;
}