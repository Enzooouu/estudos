import { site } from '@/content/site';
import { Icon, type IconName } from './Icon';
import { Reveal } from './Reveal';

const facts: { icon: IconName; title: string; text: string }[] = [
  { icon: 'ruler', title: 'Medição no local', text: 'Antes de qualquer corte' },
  { icon: 'clock', title: site.hours[0], text: site.hours[1] },
  { icon: 'phone', title: site.phoneDisplay, text: 'Telefone e WhatsApp' },
];

/** O respiro da página: uma frase grande, centralizada, e um botão pequeno. */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-h" className="px-page py-section bg-ice text-center">
      <Reveal>
        <h2 id="sobre-h" className="label">
          Sobre a JEL Box
        </h2>
      </Reveal>
      <Reveal order={1}>
        <p className="font-title mx-auto mt-8 max-w-[20ch] text-[clamp(24px,3.7vw,56px)] leading-[1.08] font-medium tracking-[-0.035em]">
          O box que fecha sem pingar e a janela que corre leve.
        </p>
      </Reveal>
      <Reveal order={2}>
        <p className="text-muted mx-auto mt-8 max-w-[52ch]">
          Trabalhamos com vidro, alumínio e aço. Cada peça é desenhada para o vão de verdade, com folga calculada e ferragem escolhida pelo peso do vidro, e o guarda-corpo protege sem tirar a vista.
        </p>
        <a href="#processo" className="btn btn-deep mt-8">
          <Icon name="ret" /> Como trabalhamos
        </a>
      </Reveal>
      <Reveal order={3}>
        <ul className="border-deep/15 mx-auto mt-16 grid max-w-[880px] gap-6 border-t pt-8 text-left sm:grid-cols-3">
          {facts.map((f) => (
            <li key={f.title} className="text-small text-muted flex gap-3.5">
              <Icon name={f.icon} className="text-glass" />
              <span>
                <strong className="text-deep block text-base font-semibold">{f.title}</strong>
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
