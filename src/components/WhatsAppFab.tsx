'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { waLink } from '@/content/site';

const ease = [0.165, 0.84, 0.44, 1] as const;

/** Balão do WhatsApp com o telefone dentro, cheio, para ser reconhecido de longe. */
function WhatsGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M16 3.2C8.94 3.2 3.2 8.92 3.2 15.96c0 2.25.6 4.45 1.72 6.38L3.1 28.8l6.62-1.73a12.8 12.8 0 0 0 6.27 1.62h.01c7.06 0 12.8-5.72 12.8-12.76S23.06 3.2 16 3.2Zm0 23.33h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.93 1.03 1.05-3.83-.25-.4a10.53 10.53 0 0 1-1.62-5.66C5.45 10.15 10.18 5.4 16 5.4c2.82 0 5.47 1.1 7.46 3.09a10.47 10.47 0 0 1 3.09 7.47c0 5.82-4.74 10.57-10.55 10.57Zm5.79-7.91c-.32-.16-1.88-.92-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"
      />
    </svg>
  );
}

/**
 * Botão flutuante de WhatsApp, em bronze (a cor de ação do site), no canto inferior direito.
 * Aparece depois do topo e some no rodapé, que já têm botão de orçamento. Ao surgir, dá um
 * pulso discreto uma vez para ser notado. No computador mostra o texto; no celular, só o ícone.
 */
export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const footer = document.querySelector('footer');
    let atFooter = false;
    const update = () => {
      const hero = document.getElementById('topo');
      const past = hero ? window.scrollY > hero.offsetHeight * 0.6 : window.scrollY > 200;
      setShow(past && !atFooter);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        atFooter = e.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    if (footer) io.observe(footer);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="fab"
          href={waLink('Olá, JEL BOX! Gostaria de um orçamento.')}
          target="_blank"
          rel="noopener"
          aria-label="Pedir orçamento pelo WhatsApp"
          className="group bg-bronze text-ink-dark hover:bg-bronze-hover fixed right-[var(--m)] bottom-[calc(var(--m)+env(safe-area-inset-bottom))] z-40 flex h-14 items-center gap-3 rounded-full pr-6 pl-4 shadow-[0_12px_32px_-10px_rgb(31_32_34/0.55)] transition-colors focus-visible:outline-offset-4 max-sm:w-14 max-sm:justify-center max-sm:p-0"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          whileHover={reduced ? undefined : { y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.35, ease }}
        >
          {/* pulso discreto, duas vezes, quando o botão aparece */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="border-bronze pointer-events-none absolute inset-0 rounded-full border-2"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.35 }}
              transition={{ duration: 1.4, ease: 'easeOut', repeat: 1, repeatDelay: 0.6, delay: 0.4 }}
            />
          )}
          <WhatsGlyph className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:rotate-[-8deg]" />
          <span className="grid leading-tight max-sm:hidden">
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase">Pedir orçamento</span>
            <span className="text-ink-dark/70 text-[12px] font-medium">pelo WhatsApp</span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
