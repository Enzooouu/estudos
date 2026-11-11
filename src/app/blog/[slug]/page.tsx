import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogCover } from '@/components/blog/BlogCover';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Icon } from '@/components/Icon';
import { formatDate, getPost, getPosts } from '@/lib/blog';
import { products, site, waLink } from '@/content/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: `${post.title} · JEL BOX`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url,
      siteName: site.name,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const product = products.find((p) => p.id === post.product);
  const others = getPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    ...(post.cover ? { image: `${site.url}${post.cover}` } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="conteudo" className="px-page pt-[calc(72px+clamp(40px,6vw,88px))] pb-[var(--gap)]">
        <article>
          <header className="mx-auto max-w-[920px]">
            <Link href="/blog/" className="btn btn-text !px-0">
              <Icon name="ret" /> Todos os artigos
            </Link>
            <p className="text-muted text-small mt-8">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min de leitura
            </p>
            <h1 className="font-title mt-4 text-[clamp(32px,4.2vw,60px)] leading-[1.05] font-medium tracking-[-0.035em]">{post.title}</h1>
            <p className="text-muted mt-6 max-w-[60ch] text-[clamp(18px,1.4vw,21px)] leading-[1.5]">{post.description}</p>
          </header>

          <div className="mx-auto mt-10 aspect-[16/8] max-w-[1200px] lg:mt-14">
            <BlogCover src={post.cover} alt="" />
          </div>

          <div className="prose-jel mx-auto mt-12 max-w-[68ch] lg:mt-16" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* chamada final: botão em pílula (23 px) a 28 px da borda → raio de 51 px */}
          <aside className="bg-ice mx-auto mt-16 grid max-w-[920px] gap-6 rounded-[51px] p-7 sm:grid-cols-[1fr_auto] sm:items-center lg:mt-20">
            <div>
              <p className="font-title text-h3 leading-[1.15] font-medium tracking-[-0.02em]">Precisa de um orçamento?</p>
              <p className="text-muted mt-2">Medimos no local, fabricamos sob medida e instalamos com a nossa equipe.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="btn btn-bronze" href={waLink(`Olá, JEL BOX! Li o artigo "${post.title}" e gostaria de um orçamento.`)} target="_blank" rel="noopener">
                <Icon name="ret" /> Pedir orçamento
              </a>
              {product && (
                <a className="btn btn-text" href="/#produtos">
                  <Icon name="ret" /> Ver {product.name.toLowerCase()}
                </a>
              )}
            </div>
          </aside>
        </article>

        {others.length > 0 && (
          <section aria-labelledby="mais-h" className="mx-auto mt-[var(--gap)] max-w-[920px]">
            <p id="mais-h" className="label">Leia também</p>
            <ul className="mt-6">
              {others.map((p) => (
                <li key={p.slug} className="border-line border-t last:border-b">
                  <Link href={`/blog/${p.slug}/`} className="group grid gap-1 py-6">
                    <time dateTime={p.date} className="text-muted text-small">{formatDate(p.date)}</time>
                    <span className="font-title text-h3 group-hover:text-glass leading-[1.15] font-medium tracking-[-0.02em] transition-colors">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
