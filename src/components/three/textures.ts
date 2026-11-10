import * as THREE from 'three';

/**
 * Texturas geradas no próprio navegador (sem baixar imagens): porcelanato marmorizado com
 * rejunte fino. Cada textura é uma peça; o `repeat` de cada parede define quantas peças cabem.
 */

/** Gerador de números previsível, para os veios saírem iguais a cada visita. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type TileOptions = {
  /** tamanho da peça em metros */
  w: number;
  h: number;
  base: string;
  /** tom mais claro e mais escuro do fundo, para a variação sutil */
  light: string;
  dark: string;
  vein: string;
  grout: string;
  veins: number;
  seed: number;
};

export function tileTexture(o: TileOptions) {
  const ppm = 700; // pixels por metro
  const cw = Math.round(o.w * ppm);
  const ch = Math.round(o.h * ppm);
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d')!;
  const r = rng(o.seed);

  // fundo com variação suave de tom
  const g = ctx.createLinearGradient(0, 0, cw, ch);
  g.addColorStop(0, o.light);
  g.addColorStop(0.5, o.base);
  g.addColorStop(1, o.dark);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, cw, ch);

  // nuvens claras e escuras, bem difusas
  ctx.filter = 'blur(40px)';
  for (let i = 0; i < 9; i++) {
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = r() > 0.5 ? o.light : o.dark;
    ctx.beginPath();
    ctx.ellipse(r() * cw, r() * ch, 60 + r() * 220, 40 + r() * 160, r() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // veios: linhas quebradas em diagonal, que se ramificam e somem, como no mármore
  const vein = (x: number, y: number, ang: number, len: number, width: number, alpha: number, depth: number) => {
    let px = x;
    let py = y;
    const steps = 18;
    const pts: [number, number][] = [[px, py]];
    for (let i = 0; i < steps; i++) {
      ang += (r() - 0.5) * 0.7;
      px += Math.cos(ang) * (len / steps);
      py += Math.sin(ang) * (len / steps);
      pts.push([px, py]);
    }
    for (const [blur, w, a] of [
      [5, width * 5, alpha * 0.25],
      [0, width, alpha],
    ] as const) {
      ctx.filter = blur ? `blur(${blur}px)` : 'none';
      ctx.globalAlpha = a;
      ctx.strokeStyle = o.vein;
      ctx.lineWidth = w;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.beginPath();
      pts.forEach(([x2, y2], i) => (i ? ctx.lineTo(x2, y2) : ctx.moveTo(x2, y2)));
      ctx.stroke();
    }
    // um ramo mais fino a partir do meio
    if (depth > 0) {
      const [bx, by] = pts[Math.floor(steps * (0.3 + r() * 0.4))];
      vein(bx, by, ang + (r() > 0.5 ? 0.9 : -0.9), len * 0.45, width * 0.6, alpha * 0.8, depth - 1);
    }
  };
  for (let i = 0; i < o.veins; i++) {
    const fromTop = r() > 0.5;
    vein(r() * cw, fromTop ? -30 : r() * ch, fromTop ? Math.PI / 2 + (r() - 0.5) * 1.2 : (r() - 0.5) * 1.4, Math.max(cw, ch) * (0.6 + r() * 0.6), 0.8 + r() * 1.6, 0.18 + r() * 0.2, 2);
  }
  ctx.filter = 'none';
  ctx.globalAlpha = 1;

  // rejunte de 2 mm na borda da peça
  ctx.strokeStyle = o.grout;
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, cw - 3, ch - 3);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

/** Cópia da textura com quantas peças cabem numa superfície de `w` × `h` metros. */
export function tiled(tex: THREE.Texture, tileW: number, tileH: number, w: number, h: number) {
  const t = tex.clone();
  t.repeat.set(w / tileW, h / tileH);
  t.needsUpdate = true;
  return t;
}
