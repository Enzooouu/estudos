import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex, pageCount, pageHref } from '@/components/blog/BlogIndex';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const dynamicParams = false;

/** Páginas 2, 3, … do blog. Sem artigos para a página 2, gera só uma página vazia que dá 404. */
export function generateStaticParams() {
  const total = pageCount();
  const pages = Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ n: String(i + 2) }));
  // a exportação estática exige ao menos um endereço
  return pages.length ? pages : [{ n: '2' }];
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const n = Number((await params).n);
  return {
    title: `Blog · página ${n} · JEL BOX`,
    description: 'Artigos anteriores do blog da JEL BOX sobre vidro, alumínio e obra.',
    alternates: { canonical: pageHref(n) },
    robots: n > pageCount() ? { index: false } : undefined,
  };
}

export default async function BlogPageN({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  if (!Number.isInteger(n) || n < 2 || n > pageCount()) notFound();
  return (
    <>
      <Header />
      <BlogIndex page={n} />
      <Footer />
    </>
  );
}
