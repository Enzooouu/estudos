import { steps } from '@/content/site';
import { Drawing, stepDrawings } from './drawings/drawings';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

const tone = {
  frost: { section: 'bg-frost', vars: {} },
  ice: { section: 'bg-ice', vars: { '--dw-wall': 'var(--color-frost)' } },
  deep: {
    section: 'bg-deep text-frost',
    vars: {
      '--dw-ink': 'var(--color-ice)',
      '--dw-wall': '#1d4866',
      '--dw-glass': 'rgb(214 238 247 / .14)',
      '--dw-glass-front': 'rgb(214 238 247 / .24)',
    },
  },
} as const;
const order: (keyof typeof tone)[] = ['frost', 'ice', 'frost', 'deep'];

/** Um verbo de cada vez: Medir, Projetar, Produzir, Instalar. */
export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-h">
      <div className="px-page pb-12 lg:pb-16">
        <SectionHead
          id="processo-h"
          label="Como trabalhamos"
          title="Do vão medido ao vidro instalado"
          aside={<p>Quatro etapas, a mesma equipe do começo ao fim.</p>}
        />
      </div>

      {steps.map((s, i) => {
        const t = tone[order[i]];
        return (
          <article
            key={s.id}
            aria-labelledby={`step-${s.id}`}
            style={t.vars as React.CSSProperties}
            className={`${t.section} px-page grid items-center gap-10 py-[clamp(72px,9vw,128px)] md:min-h-[66svh] md:grid-cols-[1.1fr_1fr] md:gap-[clamp(32px,5vw,96px)]`}
          >
            <Reveal className="self-stretch">
              {/* verbo e texto seguem juntos, presos no topo enquanto o desenho passa */}
              <div className="grid gap-8 md:sticky md:top-[16vh]">
                <h3
                  id={`step-${s.id}`}
                  className="font-title text-[17vw] leading-[0.9] font-bold tracking-[-0.06em] md:text-[clamp(56px,9.6vw,168px)]"
                >
                  {s.verb}
                </h3>
                <p className="max-w-[38ch]">{s.text}</p>
              </div>
            </Reveal>
            <Reveal order={1} className="w-full max-w-[560px] md:justify-self-end">
              <Drawing d={stepDrawings[s.id]} />
            </Reveal>
          </article>
        );
      })}
    </section>
  );
}
