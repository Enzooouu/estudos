'use client';

import { useEffect, useId, useRef, useState } from 'react';

/** Filtros que o painel aplica ao que está atrás dele, depois da lente. */
const TINT = 'blur(3px) brightness(0.55) saturate(0.9)';

/** quanto o vidro amplia o que está atrás (0,1 = 10%) */
const ZOOM = 0.1;
/** largura da faixa da borda que entorta mais forte, em px */
const BEVEL = 18;
/** deslocamento extra na borda, em px */
const BEVEL_PULL = 22;

/**
 * Lente de vidro: amplia o que está atrás do painel, como um vidro grosso de verdade.
 * Vai dentro do painel (que precisa de `isolate`) e age sobre o elemento pai.
 *
 * - Chromium (Chrome, Edge, Samsung Internet, Android): `backdrop-filter: url(#filtro)` com um
 *   mapa de deslocamento, que amplia qualquer coisa atrás e entorta mais forte nas bordas.
 * - Safari e Firefox não aplicam esse filtro. Neles, uma cópia ampliada das seções que estão
 *   atrás do painel, alinhada com as originais, faz o papel da lente (`PageLens`), com foto,
 *   textos e botões. A borda não entorta mais forte, só a ampliação.
 * - Com "reduzir transparência" no sistema, nenhuma lente.
 */
export function GlassLens() {
  const [mode, setMode] = useState<'filtro' | 'pagina' | null>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-transparency: reduce)').matches) return;
    const ua = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData;
    setMode(ua?.brands.some((b) => /Chromium/.test(b.brand)) ? 'filtro' : 'pagina');
  }, []);

  if (mode === 'filtro') return <FilterLens />;
  if (mode === 'pagina') return <PageLens />;
  return null;
}

/** Lente por filtro SVG no que está atrás do painel (só Chromium). */
function FilterLens() {
  const id = `lente-${useId().replace(/:/g, '')}`;
  const probe = useRef<HTMLSpanElement>(null);
  const [map, setMap] = useState<{ w: number; h: number; href: string; scale: number } | null>(null);

  useEffect(() => {
    const el = probe.current?.parentElement;
    if (!el) return;

    const build = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (!w || !h) return;
      setMap(lensMap(w, h));
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => {
      ro.disconnect();
      el.style.removeProperty('backdrop-filter');
    };
  }, []);

  // aplica a lente no painel quando o mapa está pronto
  useEffect(() => {
    const el = probe.current?.parentElement;
    if (el && map) el.style.setProperty('backdrop-filter', `url(#${id}) ${TINT}`);
  }, [map, id]);

  return (
    <span ref={probe} aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      {map && (
        <svg width="0" height="0">
          <filter
            id={id}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage href={map.href} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="mapa" />
            <feDisplacementMap in="SourceGraphic" in2="mapa" scale={map.scale} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}
    </span>
  );
}

/**
 * Lente por cópia da página (Safari e Firefox): copia as seções que estão atrás do painel
 * (foto, títulos, textos e botões), coloca cada cópia no mesmo lugar e tamanho da original e
 * amplia o conjunto a partir do centro do painel, com o mesmo tom da película.
 * Acompanha a rolagem e as animações quadro a quadro enquanto o menu está aberto.
 */
function PageLens() {
  const layer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = layer.current;
    const root = stage.current;
    const panel = box?.parentElement;
    if (!box || !root || !panel) return;

    // fundo da página, para as partes transparentes das seções
    root.style.backgroundColor = getComputedStyle(document.body).backgroundColor;

    const sources = [
      document.getElementById('topo'),
      ...Array.from(document.querySelectorAll<HTMLElement>('main > *')),
      document.querySelector<HTMLElement>('body > footer, footer'),
    ].filter((el): el is HTMLElement => !!el);

    type Copy = { el: HTMLElement; pairs: [HTMLElement, HTMLElement][] };
    const copies = new Map<HTMLElement, Copy>();

    const makeCopy = (src: HTMLElement): Copy => {
      const el = src.cloneNode(true) as HTMLElement;
      // sem ids repetidos, sem foco e invisível para leitores de tela
      el.removeAttribute('id');
      el.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
      Object.assign(el.style, { position: 'absolute', top: '0', left: '0', margin: '0' });
      // pares original → cópia dos elementos animados (estilo inline), para acompanhar as animações
      const a = [src, ...Array.from(src.querySelectorAll<HTMLElement>('*'))];
      const b = [el, ...Array.from(el.querySelectorAll<HTMLElement>('*'))];
      const pairs: [HTMLElement, HTMLElement][] = [];
      a.forEach((n, i) => {
        if (i > 0 && b[i] && n.hasAttribute('style')) pairs.push([n, b[i]]);
      });
      root.appendChild(el);
      return { el, pairs };
    };

    let raf = 0;
    const tick = () => {
      const p = panel.getBoundingClientRect();
      // o painel pode estar no meio da animação de entrada (escala): converte para medidas locais
      const kx = p.width / panel.offsetWidth || 1;
      const ky = p.height / panel.offsetHeight || 1;
      let any = false;
      for (const src of sources) {
        const r = src.getBoundingClientRect();
        const over = r.bottom > p.top && r.top < p.bottom && r.right > p.left && r.left < p.right;
        let copy = copies.get(src);
        if (over && !copy) copies.set(src, (copy = makeCopy(src)));
        if (!copy) continue;
        copy.el.style.display = over ? '' : 'none';
        if (!over) continue;
        any = true;
        copy.el.style.width = `${src.offsetWidth}px`;
        copy.el.style.height = `${src.offsetHeight}px`;
        copy.el.style.transform = `translate(${(r.left - p.left) / kx}px, ${(r.top - p.top) / ky}px)`;
        for (const [o, c] of copy.pairs) {
          const css = o.style.cssText;
          if (c.style.cssText !== css) c.style.cssText = css;
        }
      }
      box.style.visibility = any ? 'visible' : 'hidden';
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      root.replaceChildren();
    };
  }, []);

  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none invisible absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={stage}
        className="font-text text-deep absolute inset-0 text-[length:var(--text-body)] leading-[1.55]"
        style={{ transform: `scale(${1 + ZOOM})`, filter: TINT }}
      />
      <div className="glass-tint-face absolute inset-0" />
    </div>
  );
}

/**
 * Mapa de deslocamento: vermelho = deslocamento horizontal, verde = vertical (0,5 = parado).
 * Cada ponto do painel mostra um ponto mais perto do centro (o que amplia), e a faixa da
 * borda puxa ainda mais para dentro, como a curva da aresta de um vidro grosso.
 */
function lensMap(w: number, h: number) {
  const max = (ZOOM * Math.max(w, h)) / 2 + BEVEL_PULL;
  const scale = Math.ceil(max * 2);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  const d = img.data;

  const shift = (p: number, size: number) => {
    const half = size / 2;
    const u = (p + 0.5 - half) / half; // -1 na borda de início, 1 na de fim
    const edge = Math.min(p + 0.5, size - p - 0.5);
    const t = Math.max(0, 1 - edge / BEVEL);
    const pull = ZOOM * Math.abs(u) * half + t * t * BEVEL_PULL;
    return -Math.sign(u) * pull;
  };

  const xs = Array.from({ length: w }, (_, x) => Math.round((0.5 + shift(x, w) / scale) * 255));
  const ys = Array.from({ length: h }, (_, y) => Math.round((0.5 + shift(y, h) / scale) * 255));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      d[i] = xs[x];
      d[i + 1] = ys[y];
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return { w, h, href: canvas.toDataURL(), scale };
}
