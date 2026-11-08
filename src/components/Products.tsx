'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { products, waLink, type ProductId } from '@/content/site';
import { Drawing, productDrawings } from './drawings/drawings';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

export function Products() {
  const [active, setActive] = useState<ProductId>('box');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = products.find((p) => p.id === active)!;

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let next: number | null = null;
    if (step) next = (i + step + products.length) % products.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = products.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(products[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="produtos"
      aria-labelledby="produtos-h"
      className="px-page py-section grid items-stretch gap-[clamp(32px,5vw,96px)] lg:min-h-[88svh] lg:grid-cols-2"
    >
      <Reveal className="bg-ice aspect-square w-full max-w-[640px] self-center p-[clamp(28px,4vw,56px)] lg:max-w-none">
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

      <div className="flex flex-col justify-between gap-10 py-2">
        <Reveal>
          <h2 id="produtos-h" className="font-title text-h2 leading-[1.1] font-medium tracking-[-0.03em]">
            O que fazemos
          </h2>
        </Reveal>

        <Reveal order={1} role="tablist" aria-label="Produtos" className="mt-7 flex flex-wrap gap-x-[26px] gap-y-1.5">
          {products.map((p, i) => {
            const on = p.id === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`t-${p.id}`}
                aria-controls={on ? `p-${p.id}` : undefined}
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(p.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative cursor-pointer py-2 font-medium transition-colors hover:text-deep ${on ? 'text-deep' : 'text-muted'}`}
              >
                {p.name}
                <span
                  className={`bg-amber absolute inset-x-0 bottom-0.5 h-0.5 origin-left transition-transform duration-400 ease-[var(--ease-out-expo)] ${on ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </button>
            );
          })}
        </Reveal>

        <Reveal order={2} className="flex flex-1 items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              role="tabpanel"
              id={`p-${current.id}`}
              aria-labelledby={`t-${current.id}`}
              className="max-w-[46ch]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
            >
              <h3 className="font-title text-h3 leading-[1.15] font-medium tracking-[-0.02em]">{current.name}</h3>
              <p className="mt-6">{current.text}</p>
              <ul className="mt-7 grid gap-2.5">
                {current.specs.map((s) => (
                  <li key={s} className="flex items-baseline gap-3.5">
                    <span aria-hidden="true" className="bg-glass h-0.5 w-3.5 flex-none -translate-y-1" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <Reveal order={3} className="grid gap-1.5 md:grid-cols-2 md:gap-0">
          <a
            href={waLink(`Olá, JEL Box! Gostaria de um orçamento de ${current.name.toLowerCase()}.`)}
            target="_blank"
            rel="noopener"
            className="group bg-deep text-frost flex min-h-[60px] items-center justify-between px-6 font-semibold transition-colors hover:bg-[#0c2638] md:min-h-[76px]"
          >
            <span>Orçar este produto</span>
            <Icon name="arrow" className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
          <a
            href="#duvidas"
            className="group bg-ice hover:bg-ice-strong flex min-h-[60px] items-center justify-between px-6 font-semibold transition-colors md:min-h-[76px]"
          >
            <span>Ver dúvidas comuns</span>
            <Icon name="arrow" className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
