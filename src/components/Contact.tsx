import { site, waLink } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

/** O e-mail como tipo de exibição. */
export function Contact() {
  const [user, domain] = site.email.split('@');
  return (
    <section
      id="contato"
      aria-labelledby="contato-h"
      className="bg-ice px-page grid min-h-[72svh] grid-rows-[auto_1fr_auto] gap-12 pt-[clamp(56px,8vw,112px)] pb-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-8">
        <Reveal>
          <h2 id="contato-h" className="font-title text-h2 max-w-[20ch] leading-[1.12] font-medium tracking-[-0.03em]">
            Peça sua visita técnica
          </h2>
        </Reveal>
        <Reveal order={1}>
          <a className="btn btn-amber" href={waLink('Olá, JEL Box! Gostaria de agendar uma medição.')} target="_blank" rel="noopener">
            <Icon name="whats" /> Chamar no WhatsApp
          </a>
        </Reveal>
      </div>
      <Reveal order={2} className="self-end">
        <a
          href={`mailto:${site.email}`}
          className="font-title hover:text-glass block text-[9.4vw] leading-none font-medium tracking-[-0.055em] transition-colors duration-300 lg:text-[7.4vw] lg:whitespace-nowrap"
        >
          <span className="block lg:inline">{user}@</span>
          <span className="block lg:inline">{domain}</span>
        </a>
      </Reveal>
      <div className="flex flex-col justify-between gap-3 text-base sm:flex-row">
        <p className="flex items-center gap-2.5">
          <Icon name="phone" className="text-glass" />
          <a href={site.phoneHref} className="border-line border-b hover:border-current">
            {site.phoneDisplay}
          </a>
        </p>
        <p className="flex items-center gap-2.5">
          <Icon name="insta" className="text-glass" />
          <a href={site.instagram.url} rel="noopener" className="border-line border-b hover:border-current">
            {site.instagram.handle}
          </a>
        </p>
      </div>
    </section>
  );
}
