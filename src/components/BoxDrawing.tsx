import { PERFIL, VIDRO, type BoxConfig } from '@/lib/box';

/** traço de cota a 45° */
const tick = (x: number, y: number) => `M${x - 5} ${y + 5}l10-10`;

/** Vista frontal em escala fixa (1,5 px por cm): mudar a medida muda o desenho. */
export function BoxElevation({ c, label }: { c: BoxConfig; label: string }) {
  const s = 1.5;
  const floor = 455;
  const W = c.w * s;
  const H = c.h * s;
  const x0 = (420 - W) / 2 + 12;
  const x1 = x0 + W;
  const top = floor - H;
  const [gBack, gFront] = VIDRO[c.vidro].fill;
  const prof = PERFIL[c.perfil];
  const profStroke = c.perfil === 'branco' ? { stroke: '#12344D', strokeWidth: 1 } : {};
  const wallTop = c.modelo === 'teto' ? top - 16 : Math.min(top - 40, 30);
  const dy = Math.max(top - 26, 14);
  const dx = x0 - 44;

  return (
    <svg viewBox="0 0 420 470" role="img" aria-label={label} className="mx-auto mb-6 block h-auto max-h-[64vh] w-full overflow-visible">
      <rect className="dw-wall" x={x0 - 22} y={wallTop} width={22} height={floor - wallTop} />
      {c.modelo !== 'canto' && <rect className="dw-wall" x={x1} y={wallTop} width={22} height={floor - wallTop} />}
      {c.modelo === 'teto' && <rect className="dw-wall" x={x0 - 22} y={top - 16} width={W + 44} height={16} />}
      <path className="dw-line" d={`M${x0 - 44} ${floor}H${x1 + 44}`} />

      {c.modelo === 'abrir' ? (
        (() => {
          const fixW = W * 0.42;
          const doorX = x0 + fixW + 3;
          return (
            <>
              <rect x={x0} y={top} width={4} height={H} fill={prof} {...profStroke} />
              <rect x={x1 - 4} y={top} width={4} height={H} fill={prof} {...profStroke} />
              <rect className="dw-glass" x={x0 + 4} y={top} width={fixW - 4} height={H - 4} style={{ fill: gBack }} />
              <rect className="dw-glass" x={doorX} y={top + 2} width={x1 - 6 - doorX} height={H - 8} style={{ fill: gFront }} />
              <rect x={doorX - 4} y={top + 24} width={10} height={22} fill={prof} {...profStroke} />
              <rect x={doorX - 4} y={floor - 52} width={10} height={22} fill={prof} {...profStroke} />
              <path d={`M${x1 - 24} ${top + H * 0.42}v${H * 0.2}`} stroke={prof} strokeWidth={5} />
            </>
          );
        })()
      ) : (
        <>
          <rect x={x0} y={top} width={W} height={7} fill={prof} {...profStroke} />
          <rect className="dw-glass" x={x0 + 4} y={top + 7} width={W / 2 + 6} height={H - 11} style={{ fill: gBack }} />
          <rect className="dw-glass" x={x0 + W / 2 - 6} y={top + 9} width={W / 2 + 2} height={H - 13} style={{ fill: gFront }} />
          <path d={`M${x0 + W / 2 + 10} ${top + H * 0.4}v${Math.min(70, H * 0.22)}`} stroke={prof} strokeWidth={5} />
          <rect x={x0} y={floor - 4} width={W} height={4} fill={prof} {...profStroke} />
        </>
      )}

      <path className="dw-dim" d={`M${x0} ${dy}H${x1}${tick(x0, dy)}${tick(x1, dy)}M${x0} ${dy - 7}v14M${x1} ${dy - 7}v14`} />
      <text className="dw-text" x={(x0 + x1) / 2} y={dy - 10} textAnchor="middle">
        {c.w} cm
      </text>
      <path className="dw-dim" d={`M${dx} ${top}V${floor}${tick(dx, top)}${tick(dx, floor)}`} />
      <text className="dw-text" transform={`translate(${dx - 10} ${(top + floor) / 2}) rotate(-90)`} textAnchor="middle">
        {c.h} cm
      </text>
      {c.modelo === 'canto' && (
        <text className="dw-text" x={x1 + 12} y={floor - 12}>
          lado {c.b} cm →
        </text>
      )}
    </svg>
  );
}

/** Planta (vista de cima), com o ralo no centro e o giro da porta no box de abrir. */
export function BoxPlan({ c }: { c: BoxConfig }) {
  const s = 0.9;
  const W = c.w * s;
  const D = (c.modelo === 'canto' ? c.b : 90) * s;
  const x0 = (420 - W) / 2 + 12;
  const x1 = x0 + W;
  const y0 = 18;
  const yf = y0 + D;
  const prof = c.perfil === 'branco' ? '#12344D' : PERFIL[c.perfil];
  const fix = x0 + W * 0.42;
  const r = x1 - fix;
  const height = c.modelo === 'abrir' ? Math.max(150, yf + r + 10) : Math.max(110, yf + 20);
  const half = W / 2;

  return (
    <svg viewBox={`0 0 420 ${height}`} role="img" aria-label="Planta do box escolhido" className="block h-auto max-h-[150px] w-full overflow-visible">
      <rect className="dw-wall" x={x0 - 14} y={y0 - 12} width={W + (c.modelo === 'canto' ? 14 : 28)} height={12} />
      <rect className="dw-wall" x={x0 - 14} y={y0} width={14} height={D + 10} />
      {c.modelo !== 'canto' && <rect className="dw-wall" x={x1} y={y0} width={14} height={D + 10} />}
      <circle className="dw-line" cx={(x0 + x1) / 2} cy={y0 + D / 2} r={4} />
      {c.modelo === 'abrir' ? (
        <>
          <path d={`M${x0} ${yf}H${fix}`} stroke={prof} strokeWidth={3} />
          <path d={`M${fix} ${yf}V${yf + r}`} stroke={prof} strokeWidth={3} />
          <path className="dw-dim" d={`M${fix} ${yf + r}A${r} ${r} 0 0 0 ${x1} ${yf}`} strokeDasharray="4 4" />
        </>
      ) : (
        <>
          <path d={`M${x0} ${yf}H${x0 + half + 6}`} stroke={prof} strokeWidth={3} />
          <path d={`M${x0 + half - 6} ${yf + 5}H${x1}`} stroke={prof} strokeWidth={3} />
          {c.modelo === 'canto' && <path d={`M${x1} ${y0}V${yf + 5}`} stroke={prof} strokeWidth={3} />}
        </>
      )}
    </svg>
  );
}
