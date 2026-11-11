'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { waLink } from '@/content/site';
import { Icon } from './Icon';

const ease = [0.165, 0.84, 0.44, 1] as const;

/**
 * Botão flutuante de WhatsApp no canto inferior direito.
 * Aparece depois que a pessoa passa do topo (que já tem o botão de orçamento) e some no rodapé,
 * que tem o próprio botão. No computador, mostra "Pedir orçamento" ao lado do ícone.
 */
export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    let atFooter = false;
    const io = new IntersectionObserver(([e]) => {
      atFooter = e.isIntersecting;
      update();
    }, { threshold: 0.15 });
    if (footer) io.observe(footer);
    function update() {
      const hero = document.getElementById('topo');
      const past = hero ? window.scrollY > hero.offsetHeight * 0.6 : window.scrollY > 200;
      setShow(past && !atFooter);
    }
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
          href={waLink('Olá, JEL Box! Gostaria de um orçamento.')}
          target="_blank"
          rel="noopener"
          aria-label="Pedir orçamento pelo WhatsApp"
          className="group bg-deep text-frost fixed right-[var(--m)] bottom-[calc(var(--m)+env(safe-area-inset-bottom))] z-40 flex h-14 items-center gap-2.5 rounded-full pr-5 pl-4 shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45),inset_0_0_0_1px_rgb(255_255_255/0.12)] transition-colors hover:bg-[#2E2F31] max-sm:w-14 max-sm:justify-center max-sm:p-0"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease }}
        >
          <span className="relative grid place-items-center">
            <Icon name="whats" className="!h-[26px] !w-[26px]" />
            {/* ponto verde: atendimento pelo WhatsApp */}
            <span aria-hidden="true" className="ring-deep absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#4FCB6B] ring-2" />
          </span>
          <span className="text-[13px] font-semibold tracking-[0.08em] uppercase max-sm:hidden">Pedir orçamento</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
