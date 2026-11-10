import { site, waLink } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/** O e-mail (ou, sem e-mail cadastrado, o telefone) como tipo de exibição. */
export function Contact() {
  const [user, domain] = site.email ? site.email.split('@') : ['', ''];
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
          <a className="btn btn-bronze" href={waLink('Olá, JEL Box! Gostaria de agendar uma medição.')} target="_blank" rel="noopener">
            <Icon name="ret" /> Chamar no WhatsApp
          </a>
        }
      />
      <Reveal order={2} className="self-end">
        {site.email ? (
          <a
            href={`mailto:${site.email}`}
            className="font-title hover:text-glass block text-[9.4vw] leading-none font-medium tracking-[-0.055em] transition-colors duration-300 lg:text-[7.4vw] lg:whitespace-nowrap"
          >
            <span className="block lg:inline">{user}@</span>
            <span className="block lg:inline">{domain}</span>
          </a>
        ) : (
          <a
            href={waLink('Olá, JEL Box! Gostaria de um orçamento.')}
            target="_blank"
            rel="noopener"
            aria-label={`WhatsApp ${site.phoneDisplay}`}
            className="font-title hover:text-glass block text-[13vw] leading-none font-medium tracking-[-0.055em] transition-colors duration-300 sm:text-[9vw] lg:text-[9vw]"
          >
            {/* no celular, o DDD numa linha e o número na outra */}
            <span className="block sm:inline">{site.phoneDisplay.split(' ')[0]} </span>
            <span className="block whitespace-nowrap sm:inline">{site.phoneDisplay.split(' ').slice(1).join(' ')}</span>
          </a>
        )}
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
        <p className="flex items-center gap-2.5">
          <Icon name="facebook" className="text-glass" />
          <a href={site.facebook.url} rel="noopener" className="border-line border-b hover:border-current">
            Facebook
          </a>
        </p>
      </div>
    </section>
  );
}
