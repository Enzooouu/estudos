import { reviews, reviewsSummary, site } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

type Review = (typeof reviews)[number];

const Stars = ({ n, size = '!h-4 !w-4' }: { n: number; size?: string }) => (
  <span className="text-bronze inline-flex gap-0.5" aria-label={`${n} de 5 estrelas`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Icon key={i} name="star" className={`${size} ${i < n ? '!fill-current' : 'opacity-35'}`} />
    ))}
  </span>
);

/** Repete a lista até ter cartões suficientes para cobrir a tela inteira em cada volta. */
const fill = <T,>(list: T[], min = 8) => {
  if (!list.length) return list;
  const out = [...list];
  while (out.length < min) out.push(...list);
  return out;
};

/**
 * Avaliações reais do Google em duas faixas que andam sem parar, como no fluid.glass:
 * a de cima para a direita, a de baixo para a esquerda. Passar o mouse pausa a faixa.
 * Enquanto `reviews` estiver vazia, as faixas mostram cartões vazios (sem texto inventado).
 */
export function Reviews() {
  const has = reviews.length > 0;
  // primeira metade da lista na faixa de cima, segunda metade na de baixo (18 → 9 + 9);
  // com poucas avaliações, as duas faixas usam todas (a de baixo em outra ordem)
  const half = Math.ceil(reviews.length / 2);
  const top = has ? (reviews.length >= 6 ? reviews.slice(0, half) : reviews) : [];
  const bottom = has ? (reviews.length >= 6 ? reviews.slice(half) : [...reviews].reverse()) : [];

  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-h" className="pb-[var(--gap)]">
      <div className="px-page pb-10 lg:pb-14">
        <SectionHead
          id="avaliacoes-h"
          label="Avaliações"
          title="O que dizem os nossos clientes"
          aside={
            reviewsSummary ? (
              <div className="grid gap-2">
                <p className="flex flex-wrap items-center gap-3">
                  <span className="font-title text-h3 font-medium">{reviewsSummary.rating.toFixed(1).replace('.', ',')}</span>
                  <Stars n={Math.round(reviewsSummary.rating)} />
                </p>
                <p className="text-muted text-small">{reviewsSummary.count} avaliações no Google</p>
                {site.googleUrl && (
                  <a className="btn btn-text !px-0" href={site.googleUrl} target="_blank" rel="noopener">
                    <Icon name="ret" /> Ver no Google
                  </a>
                )}
              </div>
            ) : (
              <p>Avaliações reais de clientes no Google.</p>
            )
          }
        />
      </div>

      <Reveal className="relative grid gap-4">
        <Row items={has ? fill(top) : Array(8).fill(null)} dir="right" />
        <Row items={has ? fill(bottom) : Array(8).fill(null)} dir="left" />

        {!has && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center px-6">
            <p className="bg-frost/90 border-line max-w-[44ch] rounded-[var(--r)] border px-5 py-4 text-center text-[14px] leading-snug shadow-[0_10px_30px_-12px_rgb(31_32_34/0.25)]">
              <strong className="font-semibold">Avaliações do Google</strong>
              <br />
              Os cartões passam a mostrar as avaliações reais dos clientes assim que forem cadastradas em{' '}
              <code className="text-[0.92em]">src/content/site.ts</code>.
            </p>
          </div>
        )}
      </Reveal>
    </section>
  );
}

/** Uma faixa: a lista duas vezes seguidas; a animação desloca metade da faixa e recomeça. */
function Row({ items, dir }: { items: (Review | null)[]; dir: 'left' | 'right' }) {
  return (
    <div className="marquee">
      <ul className="marquee-track" data-dir={dir} style={{ ['--dur' as string]: `${items.length * 7}s` }}>
        {[0, 1].map((copy) =>
          items.map((r, i) => (
            <li key={`${copy}-${i}`} aria-hidden={copy === 1 || !r || undefined} className="pr-4">
              {r ? <Card review={r} /> : <Blank />}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

const cardBox = 'flex h-full w-[clamp(280px,27vw,380px)] flex-col gap-4 rounded-[var(--r)] border border-line bg-white/70 p-6';

/** Iniciais do nome, para quando o cliente não tem foto de perfil. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

/** Cartão: foto e nome em cima, estrelas embaixo deles, o texto e, no fim, quando foi feita. */
function Card({ review }: { review: Review }) {
  return (
    <figure className={cardBox}>
      <figcaption className="flex items-center gap-3">
        {review.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.photo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="bg-ice text-deep grid h-11 w-11 shrink-0 place-items-center rounded-full text-[15px] font-semibold">
            {initials(review.name)}
          </span>
        )}
        <span className="grid min-w-0 gap-0.5 leading-tight">
          <span className="text-deep truncate font-semibold">{review.name}</span>
          {review.count != null && (
            <span className="text-muted text-[13px]">
              {review.guide ? 'Local Guide · ' : ''}
              {review.count} {review.count === 1 ? 'avaliação' : 'avaliações'}
            </span>
          )}
        </span>
      </figcaption>
      <Stars n={review.stars} />
      <blockquote className="line-clamp-[9] flex-1 text-[16px] leading-[1.55] whitespace-pre-line">“{review.text}”</blockquote>
      {/* quando foi feita: embaixo, à direita, como antes */}
      <p className="text-muted text-right text-[13.5px]">{review.when ? `${review.when} · Google` : 'Google'}</p>
    </figure>
  );
}

/** Cartão vazio enquanto não há avaliações: só a forma, sem texto. */
function Blank() {
  return (
    <div className={`${cardBox} min-h-[220px]`}>
      <div className="flex items-center gap-3">
        <span className="bg-line h-11 w-11 shrink-0 rounded-full" />
        <span className="grid gap-2">
          <span className="bg-line h-2.5 w-28 rounded-full" />
          <span className="bg-line h-2 w-16 rounded-full" />
        </span>
      </div>
      <Stars n={5} />
      <div className="grid flex-1 content-start gap-2.5 pt-1">
        <span className="bg-line h-2.5 w-full rounded-full" />
        <span className="bg-line h-2.5 w-[92%] rounded-full" />
        <span className="bg-line h-2.5 w-[70%] rounded-full" />
      </div>
      <span className="bg-line h-2 w-24 self-end rounded-full" />
    </div>
  );
}
