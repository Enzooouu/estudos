import { reviews, reviewsSummary, site } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

const Stars = ({ n }: { n: number }) => (
  <span className="text-bronze inline-flex gap-0.5" aria-label={`${n} de 5 estrelas`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Icon key={i} name="star" className={`!h-4 !w-4 ${i < n ? '!fill-current' : 'opacity-35'}`} />
    ))}
  </span>
);

/**
 * Avaliações reais do Google. Enquanto `reviews` estiver vazia, mostra um espaço reservado
 * explicando o que entra ali.
 */
export function Reviews() {
  const link = site.googleUrl ? (
    <a className="btn btn-text" href={site.googleUrl} target="_blank" rel="noopener">
      <Icon name="ret" /> Ver no Google
    </a>
  ) : null;

  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-h" className="px-page pb-[var(--gap)]">
      <div className="pb-10 lg:pb-14">
        <SectionHead
          id="avaliacoes-h"
          label="Avaliações"
          title="O que dizem os nossos clientes"
          aside={
            reviewsSummary ? (
              <p className="flex flex-wrap items-center gap-3">
                <span className="font-title text-h3 font-medium">{reviewsSummary.rating.toFixed(1).replace('.', ',')}</span>
                <Stars n={Math.round(reviewsSummary.rating)} />
                <span className="text-muted text-small">{reviewsSummary.count} avaliações no Google</span>
              </p>
            ) : (
              link
            )
          }
        />
      </div>

      {reviews.length > 0 ? (
        <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="li" order={i} key={r.name + i} className="border-line grid content-start gap-4 border-t pt-6">
              <Stars n={r.stars} />
              <blockquote className="text-[clamp(17px,1.3vw,20px)] leading-[1.45]">“{r.text}”</blockquote>
              <p className="text-muted text-small">
                {r.name}
                {r.when ? ` · ${r.when}` : ''}
              </p>
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal className="border-line grid place-items-center gap-3 rounded-[var(--r)] border border-dashed px-6 py-16 text-center">
          <Stars n={5} />
          <p className="font-title text-h3 font-medium tracking-[-0.02em]">Avaliações do Google</p>
          <p className="text-muted max-w-[46ch]">
            Aqui entram as avaliações reais dos clientes no Google, com nome, nota e texto. Cadastre em{' '}
            <code className="text-[0.9em]">src/content/site.ts</code>.
          </p>
        </Reveal>
      )}
    </section>
  );
}
