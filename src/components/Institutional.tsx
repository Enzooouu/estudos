import { site } from '@/content/site';
import { Icon } from './Icon';
import { Media } from './media/Media';
import { MediaReveal } from './media/MediaReveal';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/** Faixa escura com o vídeo institucional e as fotos da equipe e da empresa. */
export function Institutional() {
  return (
    <section id="oficina" aria-labelledby="oficina-h" className="bg-deep text-frost px-page py-section">
      <SectionHead
        dark
        id="oficina-h"
        label="A JEL Box por dentro"
        title="Da oficina à obra"
        aside={<p className="text-ice">O vidro cortado, lapidado e montado pela mesma equipe que instala.</p>}
      />

      <MediaReveal className="mt-14 lg:mt-20" parallax={2.5}>
        <Media id="video-institucional" tone="dark" sizes="100vw" />
      </MediaReveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <MediaReveal className="lg:col-span-4" parallax={3}>
          <Media id="empresa-equipe" tone="dark" sizes="(min-width:1024px) 33vw, 100vw" />
        </MediaReveal>
        <div className="flex flex-col justify-between gap-10 lg:col-span-8">
          <MediaReveal parallax={2} delay={0.1}>
            <Media id="empresa-oficina" tone="dark" sizes="(min-width:1024px) 66vw, 100vw" />
          </MediaReveal>
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="text-ice grid gap-1">
              <p className="text-frost font-semibold">{site.address}</p>
              <p>{site.hours.join(' · ')}</p>
            </div>
            <a href="#contato" className="btn btn-bronze justify-self-start">
              <Icon name="ret" /> Agendar uma visita
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
