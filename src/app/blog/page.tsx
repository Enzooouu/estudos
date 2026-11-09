import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogCover } from '@/components/blog/BlogCover';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { formatDate, getPosts } from '@/lib/blog';
import { site } from '@/content/site';

const title = 'Blog · JEL Box';
const description = 'Dicas, normas e cuidados para escolher, instalar e manter box de banheiro, janelas, espelhos, guarda-corpos e coberturas de vidro.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog/' },
  openGraph: { type: 'website', locale: 'pt_BR', url: '/blog/', siteName: site.name, title, description },
};

/** Página do blog: o artigo mais recente em destaque e os outros em lista, com a data. */
export default function BlogPage() {
  const [featured, ...rest] = getPosts();

  return (
    <>
      <Header />
      <main id="conteudo" className="px-page pt-[calc(72px+clamp(48px,7vw,104px))] pb-[var(--gap)]">
        <SectionHead
          id="blog-h"
          label="Blog"
          title="Vidro, alumínio e obra, sem complicação"
          aside={<p>Dicas, normas e cuidados para escolher e manter box, janelas, espelhos e guarda-corpos.</p>}
        />

        {!featured && <p className="text-muted mt-14">Nenhum artigo publicado ainda.</p>}

        {featured && (
          <Reveal className="mt-12 lg:mt-16">
            <Link
              href={`/blog/${featured.slug}/`}
              className="group bg-ice grid gap-[var(--pad)] rounded-[calc(var(--r)+var(--pad))] p-[var(--pad)] [--pad:clamp(14px,1.6vw,24px)] lg:grid-cols-12 lg:items-stretch"
            >
              <div className="aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
                <BlogCover src={featured.cover} className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]" />
              </div>
              <div className="flex flex-col justify-between gap-8 py-2 lg:col-span-5 lg:py-4 lg:pr-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="bg-bronze text-ink-dark rounded-[var(--r-sm)] px-2.5 py-1.5 text-[11.5px] leading-none font-semibold tracking-[0.12em] uppercase">
                    Mais recente
                  </span>
                  <time dateTime={featured.date} className="text-muted text-small">
                    {formatDate(featured.date)} · {featured.minutes} min de leitura
                  </time>
                </div>
                <div>
                  <h2 className="font-title text-[clamp(26px,2.6vw,40px)] leading-[1.1] font-medium tracking-[-0.03em]">{featured.title}</h2>
                  <p className="text-muted mt-4 max-w-[46ch]">{featured.description}</p>
                </div>
                <span className="btn btn-deep justify-self-start self-start">
                  <Icon name="ret" /> Ler artigo
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <ul className="mt-16 lg:mt-24">
            {rest.map((p) => (
              <Reveal as="li" key={p.slug} className="border-line border-t last:border-b">
                <Link href={`/blog/${p.slug}/`} className="group grid gap-x-6 gap-y-2 py-7 lg:grid-cols-12 lg:items-baseline lg:py-9">
                  <time dateTime={p.date} className="text-muted text-small lg:col-span-3">
                    {formatDate(p.date)}
                  </time>
                  <div className="lg:col-span-8">
                    <h2 className="font-title text-h3 group-hover:text-glass leading-[1.15] font-medium tracking-[-0.02em] transition-colors">{p.title}</h2>
                    <p className="text-muted mt-2 max-w-[60ch]">{p.description}</p>
                  </div>
                  <span className="text-glass hidden justify-self-end transition-transform duration-300 group-hover:translate-x-1 lg:col-span-1 lg:block">
                    <Icon name="ret" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
