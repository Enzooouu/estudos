import { projects } from '@/content/site';
import { Media } from './media/Media';
import { MediaReveal } from './media/MediaReveal';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/**
 * Obras executadas em colagem: fotos de tamanhos e alturas diferentes no grid,
 * cada uma deslizando num ritmo próprio com a rolagem.
 */
const layout = [
  { col: 'lg:col-span-5 lg:col-start-1', mt: '', parallax: 3, sizes: '(min-width:1024px) 40vw, 100vw' },
  { col: 'lg:col-span-6 lg:col-start-7', mt: 'lg:mt-[18vh]', parallax: 2.5, sizes: '(min-width:1024px) 50vw, 100vw' },
  { col: 'lg:col-span-4 lg:col-start-2', mt: 'lg:-mt-[6vh]', parallax: 3.5, sizes: '(min-width:1024px) 33vw, 100vw' },
  { col: 'lg:col-span-4 lg:col-start-8', mt: 'lg:mt-[10vh]', parallax: 4, sizes: '(min-width:1024px) 33vw, 100vw' },
  { col: 'lg:col-span-7 lg:col-start-3', mt: 'lg:mt-[4vh]', parallax: 3, sizes: '(min-width:1024px) 58vw, 100vw' },
];
const phone = ['w-full', 'ml-auto w-[82%]', 'w-[78%]', 'ml-auto w-[70%]', 'w-full'];

export function Projects() {
  return (
    <section id="obras" aria-labelledby="obras-h" className="px-page pb-[var(--gap)]">
      <SectionHead
        id="obras-h"
        label="Obras"
        title="Projetos executados"
        aside={<p>Box, espelhos, janelas e divisórias instalados pela nossa equipe.</p>}
      />
      <ul className="mt-14 grid gap-y-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
        {projects.map((p, i) => (
          <li key={p.media} className={`${layout[i].col} ${layout[i].mt} ${phone[i]} lg:w-auto lg:ml-0`}>
            <MediaReveal parallax={layout[i].parallax}>
              <Media id={p.media} sizes={layout[i].sizes} />
            </MediaReveal>
            <Reveal className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-title text-[clamp(18px,1.5vw,22px)] font-medium tracking-[-0.02em]">{p.titulo ?? p.categoria}</p>
              <p className="text-small text-muted">{[p.titulo && p.categoria, p.local, p.ano].filter(Boolean).join(' · ')}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
