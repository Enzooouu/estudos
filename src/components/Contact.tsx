import { site, waLink } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/** O e-mail como tipo de exibição. */
export function Contact() {
  const [user, domain] = site.email.split('@');
  return (
    <section
      id="contato"
      aria-labelledby="contato-h"
      className="bg-ice px-page grid grid-rows-[auto_1fr_auto] gap-12 lg:min-h-[72svh] pt-[clamp(40px,5vw,72px)] pb-10"
    >
      <SectionHead
        id="contato-h"
        label="Contato"
        title="Peça sua visita técnica"
        aside={
          <a className="btn btn-amber" href={waLink('Olá, JEL Box! Gostaria de agendar uma medição.')} target="_blank" rel="noopener">
            <Icon name="ret" /> Chamar no WhatsApp
          </a>
        }
      />
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
