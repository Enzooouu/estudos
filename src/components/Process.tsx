import { steps } from '@/content/site';
import { Drawing, stepDrawings } from './drawings/drawings';
import { Reveal } from './Reveal';

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
      <Reveal>
        <h2 id="processo-h" className="font-title text-h2 px-page max-w-[24ch] pb-10 leading-[1.1] font-medium tracking-[-0.03em] md:pb-14">
          Do vão medido ao vidro instalado
        </h2>
      </Reveal>

      {steps.map((s, i) => {
        const t = tone[order[i]];
        return (
          <article
            key={s.id}
            aria-labelledby={`step-${s.id}`}
            style={t.vars as React.CSSProperties}
            className={`${t.section} px-page grid items-center gap-10 py-[clamp(72px,9vw,128px)] md:min-h-[66svh] md:grid-cols-[1.1fr_1fr] md:gap-[clamp(32px,5vw,96px)]`}
          >
            <Reveal className="flex flex-col justify-between gap-10 self-stretch">
              <h3
                id={`step-${s.id}`}
                className="font-title text-[17vw] leading-[0.9] font-bold tracking-[-0.06em] md:sticky md:top-[18vh] md:text-[clamp(56px,9.6vw,168px)]"
              >
                {s.verb}
              </h3>
              <p className="max-w-[38ch]">{s.text}</p>
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
