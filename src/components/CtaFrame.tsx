import { waLink } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

/** Chamada emoldurada: caixa de linha fina com uma folha de vidro desenhada em perspectiva. */
export function CtaFrame() {
  return (
    <section aria-labelledby="cta-h" className="px-page pb-[var(--gap)]">
      <Reveal className="border-line relative grid overflow-hidden rounded-[calc(var(--r-sm)+var(--pad))] border [--pad:clamp(28px,4vw,56px)] lg:min-h-[420px] lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col justify-between gap-10 p-[var(--pad)]">
          <p className="label">Medição no local</p>
          <div className="grid gap-8">
          <h2 id="cta-h" className="font-title max-w-[18ch] text-[clamp(28px,3.2vw,48px)] leading-[1.08] font-medium tracking-[-0.035em]">
            Comece por uma boa medida
          </h2>
          <div className="flex flex-wrap gap-2">
            <a href="#monte" className="btn btn-deep">
              <Icon name="ret" /> Monte seu box
            </a>
            <a className="btn btn-text" href={waLink('Olá, JEL BOX! Gostaria de agendar uma medição.')} target="_blank" rel="noopener">
              <Icon name="ret" /> Agendar medição
            </a>
          </div>
          </div>
        </div>
        {/* folha de vidro aberta em perspectiva: as linhas arquitetônicas do manual */}
        <svg viewBox="0 0 400 420" preserveAspectRatio="xMaxYMid meet" aria-hidden="true" className="hidden h-full w-full lg:block">
          <g fill="none" stroke="var(--color-deep)" strokeWidth="1" opacity=".55" vectorEffect="non-scaling-stroke">
            <path d="M80 0v420M80 60h320M80 380h320" />
            <path d="M80 60L230 20v400L80 380" />
            <path d="M230 20L400 0M230 420L400 420" />
            <path d="M120 70L190 52M120 95L170 82" stroke="var(--color-glass)" />
          </g>
          <path d="M80 60L230 20v400L80 380z" fill="rgb(107 103 96 / .1)" />
          <path d="M205 190v60" stroke="var(--color-bronze)" strokeWidth="3" />
        </svg>
      </Reveal>
    </section>
  );
}
