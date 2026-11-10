import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { formatDate, getPosts, type Post } from '@/lib/blog';
import { BlogCover } from './BlogCover';

/** Artigos por página na grade (3 colunas × 4 linhas). */
export const PER_PAGE = 12;

/** Os artigos que vão para a grade: todos menos o mais recente, que fica em destaque. */
const olderPosts = () => getPosts().slice(1);

export const pageCount = () => Math.max(1, Math.ceil(olderPosts().length / PER_PAGE));

export const pageHref = (n: number) => (n <= 1 ? '/blog/' : `/blog/pagina/${n}/`);

/**
 * Página do blog. Na primeira, o artigo mais recente em destaque; em todas, os artigos
 * anteriores numa grade de 3 colunas, 12 por página, com a numeração das páginas embaixo.
 */
export function BlogIndex({ page }: { page: number }) {
  const [featured] = getPosts();
  const older = olderPosts().slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const total = pageCount();

  return (
    <main id="conteudo" className="px-page pt-[calc(72px+clamp(48px,7vw,104px))] pb-[var(--gap)]">
      <SectionHead
        id="blog-h"
        label={page > 1 ? `Blog · página ${page}` : 'Blog'}
        title="Vidro, alumínio e obra, sem complicação"
        aside={<p>Dicas, normas e cuidados para escolher box, espelhos, janelas e divisórias de vidro.</p>}
      />

      {!featured && <p className="text-muted mt-14">Nenhum artigo publicado ainda.</p>}

      {featured && page === 1 && <Featured post={featured} />}

      {older.length > 0 && (
        <section aria-labelledby="anteriores-h" className="mt-16 lg:mt-24">
          <h2 id="anteriores-h" className="label">
            Artigos anteriores
          </h2>
          <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {older.map((p, i) => (
              <Reveal as="li" order={i % 3} key={p.slug}>
                <Card post={p} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {total > 1 && <Pagination page={page} total={total} />}
    </main>
  );
}

function Featured({ post }: { post: Post }) {
  return (
    <Reveal className="mt-12 lg:mt-16">
      {/* capa de 8 px a P da borda → raio externo de 8 px + P */}
      <Link
        href={`/blog/${post.slug}/`}
        className="group bg-ice grid gap-[var(--pad)] rounded-[calc(var(--r)+var(--pad))] p-[var(--pad)] [--pad:clamp(14px,1.6vw,24px)] lg:grid-cols-12 lg:items-stretch"
      >
        <div className="aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
          <BlogCover src={post.cover} className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]" />
        </div>
        <div className="flex flex-col justify-between gap-8 py-2 lg:col-span-5 lg:py-4 lg:pr-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="bg-bronze text-ink-dark rounded-[var(--r-sm)] px-2.5 py-1.5 text-[11.5px] leading-none font-semibold tracking-[0.12em] uppercase">
              Mais recente
            </span>
            <time dateTime={post.date} className="text-muted text-small">
              {formatDate(post.date)} · {post.minutes} min de leitura
            </time>
          </div>
          <div>
            <h2 className="font-title text-[clamp(26px,2.6vw,40px)] leading-[1.1] font-medium tracking-[-0.03em]">{post.title}</h2>
            <p className="text-muted mt-4 max-w-[46ch]">{post.description}</p>
          </div>
          <span className="btn btn-deep self-start">
            <Icon name="ret" /> Ler artigo
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function Card({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group grid gap-5">
      <div className="aspect-[16/10] overflow-hidden rounded-[var(--r)]">
        <BlogCover src={post.cover} className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" />
      </div>
      <div className="grid gap-2.5">
        <time dateTime={post.date} className="text-muted text-small">
          {formatDate(post.date)} · {post.minutes} min
        </time>
        <h3 className="font-title group-hover:text-glass text-[clamp(19px,1.5vw,22px)] leading-[1.2] font-medium tracking-[-0.02em] transition-colors">{post.title}</h3>
        <p className="text-muted line-clamp-3">{post.description}</p>
      </div>
    </Link>
  );
}

/** Numeração das páginas: ‹ 1 2 3 … › */
function Pagination({ page, total }: { page: number; total: number }) {
  // mostra a primeira, a última e as vizinhas da atual; o resto vira "…"
  const show = (n: number) => n === 1 || n === total || Math.abs(n - page) <= 1;
  const items: (number | '…')[] = [];
  for (let n = 1; n <= total; n++) {
    if (show(n)) items.push(n);
    else if (items[items.length - 1] !== '…') items.push('…');
  }
  const chip = 'grid h-11 min-w-11 place-items-center rounded-[var(--r-sm)] px-3 text-[15px] font-semibold tabular-nums transition-colors';

  return (
    <nav aria-label="Páginas do blog" className="border-line mt-16 flex flex-wrap items-center justify-center gap-1.5 border-t pt-10 lg:mt-20">
      {page > 1 ? (
        <Link href={pageHref(page - 1)} rel="prev" aria-label="Página anterior" className={`${chip} hover:bg-ice`}>
          <Icon name="chev" className="!h-[18px] !w-[18px] -scale-x-100" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${chip} opacity-30`}>
          <Icon name="chev" className="!h-[18px] !w-[18px] -scale-x-100" />
        </span>
      )}

      {items.map((n, i) =>
        n === '…' ? (
          <span key={`e${i}`} aria-hidden="true" className="text-muted px-1">
            …
          </span>
        ) : n === page ? (
          <span key={n} aria-current="page" className={`${chip} bg-deep text-frost`}>
            {n}
          </span>
        ) : (
          <Link key={n} href={pageHref(n)} aria-label={`Página ${n}`} className={`${chip} hover:bg-ice`}>
            {n}
          </Link>
        ),
      )}

      {page < total ? (
        <Link href={pageHref(page + 1)} rel="next" aria-label="Próxima página" className={`${chip} hover:bg-ice`}>
          <Icon name="chev" className="!h-[18px] !w-[18px]" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${chip} opacity-30`}>
          <Icon name="chev" className="!h-[18px] !w-[18px]" />
        </span>
      )}
    </nav>
  );
}
