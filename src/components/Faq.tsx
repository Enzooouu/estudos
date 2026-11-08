import { faq } from '@/content/site';
import { Reveal } from './Reveal';

/** Perguntas grandes, respostas ao lado, todas abertas. */
export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-h" className="px-page pb-[var(--gap)]">
      <Reveal className="pb-9 lg:pb-11">
        <h2 id="duvidas-h" className="font-title text-h3 text-glass leading-[1.15] font-medium tracking-[-0.02em]">
          Dúvidas comuns
        </h2>
      </Reveal>
      <dl>
        {faq.map((item) => (
          <Reveal key={item.q} className="border-line grid gap-x-6 border-t py-9 lg:grid-cols-12 lg:items-baseline lg:py-11">
            <dt className="font-title text-h3 leading-[1.15] font-medium tracking-[-0.02em] lg:col-span-6">{item.q}</dt>
            <dd className="mt-3.5 max-w-[42ch] lg:col-span-5 lg:col-start-8 lg:mt-0">{item.a}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
