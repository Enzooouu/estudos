'use client';

import { useState } from 'react';
import { faq, waLink } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/**
 * Dúvidas: à esquerda, as perguntas que abrem e fecham (a primeira já aberta); à direita, um quadro
 * que acompanha a rolagem para tirar outras dúvidas no WhatsApp.
 * O quadro tem botão de 46 px (raio 23) a 28 px da borda → raio de 51 px (no computador, 32 px → 55 px).
 */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="duvidas" aria-labelledby="duvidas-h" className="px-page py-section">
      <div className="pb-10 lg:pb-14">
        <SectionHead id="duvidas-h" label="Dúvidas" title="Perguntas frequentes" />
      </div>
      <div className="grid gap-x-6 gap-y-10 lg:grid-cols-12">
        <ul className="lg:col-span-8">
          {faq.map((item, i) => {
            const on = open === i;
            return (
              <li key={item.q} className="border-line border-t last:border-b">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-title text-[19px] leading-[1.2] font-medium tracking-[-0.02em] lg:text-h3 lg:leading-[1.15]">{item.q}</span>
                  <span className={`bg-ice grid h-10 w-10 shrink-0 place-items-center rounded-full text-[22px] leading-none transition-transform duration-300 ${on ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-400 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <p className="max-w-[60ch] overflow-hidden text-[clamp(17px,1.2vw,19px)] transition-[padding] duration-400" style={{ paddingBottom: on ? 28 : 0 }}>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <Reveal className="lg:col-span-4">
          <div className="bg-deep text-frost grid gap-5 rounded-[calc(23px+28px)] p-7 lg:rounded-[calc(23px+32px)] lg:sticky lg:top-28 lg:min-h-[436px] lg:grid-rows-[auto_auto_1fr] lg:p-8">
            <p className="font-title text-h3 leading-[1.15] font-medium tracking-[-0.02em]">Ficou com outra dúvida?</p>
            <p className="text-ice/85">Mande uma foto do vão pelo WhatsApp. Respondemos com as medidas que precisamos e um orçamento inicial.</p>
            <a className="btn btn-bronze self-end justify-self-start" href={waLink('Olá, JEL BOX! Tenho uma dúvida.')} target="_blank" rel="noopener">
              <Icon name="ret" /> Perguntar no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
