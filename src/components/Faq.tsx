import { faq } from '@/content/site';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/** Perguntas grandes, respostas ao lado, todas abertas. */
export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-h" className="px-page py-section">
      <div className="pb-10 lg:pb-14">
        <SectionHead id="duvidas-h" label="Dúvidas" title="Perguntas frequentes" />
      </div>
      <dl>
        {faq.map((item) => (
          <Reveal key={item.q} className="border-line grid gap-x-6 border-t py-8 lg:grid-cols-12 lg:items-baseline lg:py-10">
            <dt className="font-title text-h3 leading-[1.15] font-medium tracking-[-0.02em] lg:col-span-5 lg:col-start-5">{item.q}</dt>
            <dd className="mt-3.5 max-w-[42ch] lg:col-span-3 lg:col-start-10 lg:mt-0">{item.a}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
