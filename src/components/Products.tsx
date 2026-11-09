'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { productMedia, products, waLink, type ProductId } from '@/content/site';
import { Media } from './media/Media';
import { Drawing, productDrawings } from './drawings/drawings';
import { PRODUCT_EVENT } from './Header';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

const ease = [0.165, 0.84, 0.44, 1] as const;

/**
 * Produtos em lista de linhas: nome, etiquetas e seta.
 * A linha ativa fica em tinta cheia e o desenho técnico dela aparece na placa.
 */
export function Products() {
  const [active, setActive] = useState<ProductId>('box');
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const current = products.find((p) => p.id === active)!;

  // a barra do topo pede um produto: abre ele aqui
  useEffect(() => {
    const onPick = (e: Event) => setActive((e as CustomEvent<ProductId>).detail);
    window.addEventListener(PRODUCT_EVENT, onPick);
    return () => window.removeEventListener(PRODUCT_EVENT, onPick);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next: number | null = null;
    if (step) next = (i + step + products.length) % products.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = products.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(products[next].id);
    rows.current[next]?.focus();
  };

  return (
    <section id="produtos" aria-labelledby="produtos-h" className="px-page py-section">
      <SectionHead
        id="produtos-h"
        label="Linhas de produto"
        title="O que fazemos"
        aside={<p>Vidro temperado, laminado, alumínio e aço, sempre sob medida para o vão.</p>}
      />

      <div id="produtos-lista" className="mt-14 grid items-start gap-[clamp(32px,5vw,96px)] lg:mt-20 lg:grid-cols-2">
        <Reveal className="bg-ice aspect-square rounded-[var(--r)] w-full max-w-[640px] p-[clamp(28px,4vw,56px)] lg:sticky lg:top-24 lg:max-w-none">
          <div className="frame-open h-full p-[clamp(20px,3vw,40px)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="h-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45, ease }}
              >
                <Drawing d={productDrawings[active]} className="!h-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div>
          <Reveal role="tablist" aria-label="Produtos" aria-orientation="vertical" className="border-line border-b">
            {products.map((p, i) => {
              const on = p.id === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  role="tab"
                  id={`t-${p.id}`}
                  aria-controls={on ? `p-${p.id}` : undefined}
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(p.id)}
                  onMouseEnter={() => setActive(p.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group border-line grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-4 border-t py-4 text-left transition-colors duration-300 sm:grid-cols-[minmax(0,1fr)_auto_24px] ${on ? 'text-deep' : 'text-muted hover:text-deep'}`}
                >
                  <span className="font-title text-[clamp(19px,1.6vw,24px)] leading-tight font-medium tracking-[-0.02em]">{p.name}</span>
                  <span className="hidden gap-1.5 sm:flex">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className={`rounded-[var(--r-sm)] border px-2 py-1 text-[13px] leading-none font-medium transition-colors ${on ? 'border-deep/40' : 'border-line'}`}
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                  <Icon
                    name="ret"
                    className={`justify-self-end transition-transform duration-300 ${on ? 'text-bronze translate-x-0' : '-translate-x-1 opacity-60'}`}
                  />
                </button>
              );
            })}
          </Reveal>

          <Reveal order={1} className="mt-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                role="tabpanel"
                id={`p-${current.id}`}
                aria-labelledby={`t-${current.id}`}
                className="max-w-[560px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <Media id={productMedia[current.id]} compact sizes="(min-width:1024px) 40vw, 100vw" className="mb-7" />
                <p className="max-w-[48ch]">{current.text}</p>
                <ul className="mt-6 grid gap-2.5">
                  {current.specs.map((s) => (
                    <li key={s} className="flex items-baseline gap-3.5">
                      <span aria-hidden="true" className="bg-glass h-0.5 w-3.5 flex-none -translate-y-1" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex flex-wrap gap-2">
              <a
                className="btn btn-deep"
                href={waLink(`Olá, JEL Box! Gostaria de um orçamento de ${current.name.toLowerCase()}.`)}
                target="_blank"
                rel="noopener"
              >
                <Icon name="ret" /> Orçar {current.name.toLowerCase()}
              </a>
              <a className="btn btn-text" href="#duvidas">
                <Icon name="ret" /> Dúvidas comuns
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
