'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/** Rolagem suave (Lenis). Fica desligada quando o sistema pede menos movimento. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
    document.documentElement.style.scrollBehavior = 'auto';
    return () => lenis.destroy();
  }, []);
  return null;
}
