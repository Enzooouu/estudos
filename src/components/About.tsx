import { site } from '@/content/site';
import { BrandMark } from './BrandMark';
import { Icon, type IconName } from './Icon';
import { Reveal } from './Reveal';

const facts: { icon: IconName; title: string; text: string }[] = [
  { icon: 'ruler', title: 'Medição no local', text: 'Antes de qualquer corte' },
  { icon: 'clock', title: site.hours[0], text: site.hours[1] },
  { icon: 'phone', title: site.phoneDisplay, text: 'Telefone e WhatsApp' },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-h" className="px-page py-section grid grid-cols-12 gap-x-6">
      <h2 id="sobre-h" className="sr-only">
        Sobre a JEL Box
      </h2>
      <Reveal className="order-2 col-span-12 mt-12 lg:order-none lg:col-span-3 lg:mt-0 lg:pt-2">
        <ul className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-7">
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
      <Reveal order={1} className="col-span-12 grid gap-[1.2em] lg:col-span-9">
        <p className="text-big max-w-[36ch] leading-[1.3] tracking-[-0.01em]">
          <span className="bg-ice text-glass float-left mt-[0.2em] mr-[0.55em] block h-[3.6em] w-[3.6em] p-[0.55em]">
            <BrandMark className="h-full w-full [&_path]:[stroke-width:1.4]" />
          </span>
          <strong className="font-semibold">A JEL Box</strong> faz o box que fecha sem pingar, a janela que corre sem esforço e o guarda-corpo que protege sem tirar a vista.
        </p>
        <p className="max-w-[52ch]">
          Trabalhamos com vidro, alumínio e aço. Cada peça é desenhada para o vão de verdade, com folga calculada e ferragem escolhida pelo peso do vidro. Por isso a gente mede antes de orçar.
        </p>
      </Reveal>
    </section>
  );
}
