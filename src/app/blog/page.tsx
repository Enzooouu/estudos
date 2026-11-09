import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { site } from '@/content/site';

const title = 'Blog · JEL Box';
const description = 'Dicas, normas e cuidados para escolher, instalar e manter box de banheiro, janelas, espelhos, guarda-corpos e coberturas de vidro.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog/' },
  openGraph: { type: 'website', locale: 'pt_BR', url: '/blog/', siteName: site.name, title, description },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <BlogIndex page={1} />
      <Footer />
    </>
  );
}
