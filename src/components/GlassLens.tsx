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
 * - Safari e Firefox não aplicam esse filtro. Neles, enquanto o painel está sobre a foto do
 *   topo, uma cópia ampliada da foto, alinhada com a original, faz o papel da lente
 *   (`PhotoLens`). Fora da foto, fica o vidro fumê da classe `.glass-tint`.
 * - Com "reduzir transparência" no sistema, nenhuma lente.
 */
export function GlassLens() {
  const [mode, setMode] = useState<'filtro' | 'foto' | null>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-transparency: reduce)').matches) return;
    const ua = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData;
    setMode(ua?.brands.some((b) => /Chromium/.test(b.brand)) ? 'filtro' : 'foto');
  }, []);

  if (mode === 'filtro') return <FilterLens />;
  if (mode === 'foto') return <PhotoLens />;
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
 * Lente por cópia da foto do topo (Safari e Firefox): a mesma foto, no mesmo lugar e tamanho
 * da original, ampliada a partir do centro do painel e com o mesmo tom da película.
 * Acompanha a rolagem quadro a quadro enquanto o menu está aberto.
 */
function PhotoLens() {
  const layer = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const box = layer.current;
    const img = copy.current;
    const panel = box?.parentElement;
    const src = document.querySelector<HTMLImageElement>('#topo img');
    if (!box || !img || !panel || !src) return;
    img.src = src.currentSrc || src.src;

    let raf = 0;
    const tick = () => {
      const p = panel.getBoundingClientRect();
      const s = src.getBoundingClientRect();
      // o painel pode estar no meio da animação de entrada (escala): converte para medidas locais
      const kx = p.width / panel.offsetWidth || 1;
      const ky = p.height / panel.offsetHeight || 1;
      const over = s.bottom > p.top && s.top < p.bottom && s.right > p.left && s.left < p.right;
      box.style.visibility = over ? 'visible' : 'hidden';
      if (over) {
        img.style.width = `${s.width / kx}px`;
        img.style.height = `${s.height / ky}px`;
        img.style.transform = `translate(${(s.left - p.left) / kx}px, ${(s.top - p.top) / ky}px)`;
        img.style.objectPosition = getComputedStyle(src).objectPosition;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none invisible absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `scale(${1 + ZOOM})`, filter: TINT }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={copy} alt="" className="absolute top-0 left-0 max-w-none object-cover" />
        {/* o mesmo escurecimento que a foto tem no topo */}
        <div className="absolute inset-0 bg-black/45" />
      </div>
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
