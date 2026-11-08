'use client';

import { useEffect, useState } from 'react';
import { nav } from '@/content/site';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav aria-label="Principal" className="px-page relative z-40 flex items-center justify-between py-[22px]">
      <a href="#topo" aria-label="JEL Box, início" className="font-title inline-flex items-center gap-3 text-[17px] leading-none font-medium tracking-[-0.01em]">
        <BrandMark className="h-7 w-7 text-amber" />
        <span>JEL Box</span>
      </a>

      <button
        type="button"
        className="inline-flex items-center gap-2 py-2 font-medium md:hidden"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'close' : 'menu'} />
        <span>{open ? 'Fechar' : 'Menu'}</span>
      </button>

      <ul
        id="nav-links"
        className={`${open ? 'flex' : 'hidden'} bg-deep px-page absolute inset-x-0 top-full flex-col border-t border-ice/25 pt-2 pb-6 md:static md:flex md:flex-row md:items-center md:gap-[clamp(18px,2.4vw,36px)] md:border-0 md:bg-transparent md:p-0`}
      >
        {[...nav, { href: '#contato', label: 'Contato' }].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={() => setOpen(false)}
              className={`link-grow block py-3 text-xl font-medium md:py-2 md:text-base ${item.href === '#contato' ? 'text-amber' : ''}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
