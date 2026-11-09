import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { pageCount, pageHref } from '@/components/blog/BlogIndex';
import { getPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  return [
    { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/blog/`, lastModified: posts[0]?.date, changeFrequency: 'weekly', priority: 0.8 },
    ...Array.from({ length: pageCount() - 1 }, (_, i) => ({ url: `${site.url}${pageHref(i + 2)}`, changeFrequency: 'weekly' as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date, changeFrequency: 'yearly' as const, priority: 0.7 })),
  ];
}
