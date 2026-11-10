import type { ProductId } from '@/content/site';

type D = { viewBox: string; label: string; body: React.ReactNode };

export const productDrawings: Record<ProductId, D> = {
  box: {
    viewBox: '0 0 400 400',
    label: 'Desenho técnico de um box de banheiro frontal de correr, 120 por 190 centímetros',
    body: (
      <>
      <rect className="dw-wall" x="36" y="40" width="22" height="310"/>
      <rect className="dw-wall" x="342" y="40" width="22" height="310"/>
      <path className="dw-line" d="M24 350h352"/>
      <rect className="dw-profile" x="58" y="96" width="284" height="7"/>
      <rect className="dw-glass" x="62" y="103" width="142" height="243"/>
      <rect className="dw-glass dw-glass-front" x="196" y="105" width="142" height="241"/>
      <path className="dw-line dw-thick" d="M212 196v62"/>
      <path className="dw-dim" d="M58 374h284M54 378l8-8M338 378l8-8M58 366v14M342 366v14"/>
      <text className="dw-text" x="200" y="394" textAnchor="middle">120 cm</text>
      <path className="dw-dim" d="M16 103v243M12 107l8-8M12 350l8-8"/>
      <text className="dw-text" x="0" y="0" transform="translate(10 226) rotate(-90)" textAnchor="middle">190 cm</text>
      </>
    ),
  },
  janelas: {
    viewBox: '0 0 400 400',
    label: 'Desenho técnico de uma janela de correr de quatro folhas em vão de alvenaria',
    body: (
      <>
      <rect className="dw-wall" x="20" y="40" width="360" height="54"/>
      <rect className="dw-wall" x="20" y="300" width="360" height="60"/>
      <rect className="dw-wall" x="20" y="94" width="40" height="206"/>
      <rect className="dw-wall" x="340" y="94" width="40" height="206"/>
      <rect className="dw-profile-o" x="60" y="94" width="280" height="206"/>
      <rect className="dw-glass" x="68" y="102" width="70" height="190"/>
      <rect className="dw-glass dw-glass-front" x="132" y="104" width="70" height="186"/>
      <rect className="dw-glass dw-glass-front" x="198" y="104" width="70" height="186"/>
      <rect className="dw-glass" x="262" y="102" width="70" height="190"/>
      <path className="dw-line dw-thick" d="M196 180v28M204 180v28"/>
      <path className="dw-line" d="M52 300h296v10H52z"/>
      <path className="dw-dim" d="M60 330h280M56 334l8-8M336 334l8-8"/>
      <text className="dw-text" x="200" y="350" textAnchor="middle">200 cm</text>
      </>
    ),
  },
  espelhos: {
    viewBox: '0 0 400 400',
    label: 'Desenho de um espelho retangular sobre uma bancada com cuba',
    body: (
      <>
      <rect className="dw-glass dw-mirror" x="90" y="50" width="220" height="180"/>
      <path className="dw-line dw-thin" d="M120 200l70-120M150 200l50-86M250 120l30-50"/>
      <rect className="dw-wall" x="40" y="270" width="320" height="22"/>
      <path className="dw-line" d="M150 270c0 40 100 40 100 0"/>
      <path className="dw-line dw-thick" d="M200 246v24M188 246h24"/>
      <path className="dw-dim" d="M90 34h220M86 38l8-8M306 38l8-8"/>
      <text className="dw-text" x="200" y="24" textAnchor="middle">90 cm</text>
      <path className="dw-dim" d="M330 50v180M326 54l8-8M326 234l8-8"/>
      <text className="dw-text" x="0" y="0" transform="translate(348 140) rotate(-90)" textAnchor="middle">70 cm</text>
      </>
    ),
  },
  divisorias: {
    viewBox: '0 0 400 400',
    label: 'Desenho técnico de divisória de vidro com faixas jateadas tipo persiana entre duas paredes',
    body: (
      <>
      <rect className="dw-wall" x="20" y="40" width="34" height="300"/>
      <rect className="dw-wall" x="346" y="40" width="34" height="300"/>
      <path className="dw-line" d="M20 340h360"/>
      <rect className="dw-profile" x="54" y="70" width="292" height="8"/>
      <rect className="dw-glass" x="60" y="78" width="146" height="258"/>
      <rect className="dw-glass dw-glass-front" x="194" y="80" width="146" height="256"/>
      <path className="dw-line dw-thin" d="M60 110h280M60 140h280M60 170h280M60 200h280M60 230h280M60 260h280M60 290h280"/>
      <path className="dw-line dw-thick" d="M208 190v40"/>
      <path className="dw-dim" d="M54 364h292M50 368l8-8M342 368l8-8"/>
      <text className="dw-text" x="200" y="386" textAnchor="middle">160 cm</text>
      </>
    ),
  },
};

export const stepDrawings: Record<string, D> = {
  medir: {
    viewBox: '0 0 400 300',
    label: 'Vão de parede com cotas de largura em três alturas',
    body: (
      <>
      <rect className="dw-wall" x="30" y="20" width="60" height="260"/>
      <rect className="dw-wall" x="310" y="20" width="60" height="260"/>
      <path className="dw-dim" d="M90 70h220M90 150h220M90 230h220M86 74l8-8M306 74l8-8M86 154l8-8M306 154l8-8M86 234l8-8M306 234l8-8"/>
      <text className="dw-text" x="200" y="62" textAnchor="middle">121,5</text>
      <text className="dw-text" x="200" y="142" textAnchor="middle">121,0</text>
      <text className="dw-text" x="200" y="222" textAnchor="middle">120,8</text>
      </>
    ),
  },
  projetar: {
    viewBox: '0 0 400 300',
    label: 'Corte de um perfil de alumínio em U segurando a borda de um vidro',
    body: (
      <>
      <path className="dw-profile-o" d="M140 40v200h120V40h-20v180h-80V40z"/>
      <rect className="dw-glass" x="186" y="10" width="28" height="200"/>
      <path className="dw-line dw-thin" d="M160 210h26M214 210h26"/>
      <path className="dw-dim" d="M186 262h28M182 266l8-8M210 266l8-8"/>
      <text className="dw-text" x="200" y="286" textAnchor="middle">8 mm</text>
      </>
    ),
  },
  produzir: {
    viewBox: '0 0 400 300',
    label: 'Chapa de vidro com linha de corte e furos marcados',
    body: (
      <>
      <rect className="dw-glass" x="40" y="40" width="320" height="220"/>
      <path className="dw-line dw-dash" d="M250 40v220"/>
      <circle className="dw-line" cx="80" cy="150" r="9"/>
      <circle className="dw-line" cx="220" cy="150" r="9"/>
      <path className="dw-line dw-thin" d="M60 70l40-20M60 100l70-36"/>
      </>
    ),
  },
  instalar: {
    viewBox: '0 0 400 300',
    label: 'Box instalado com nível de bolha sobre o trilho',
    body: (
      <>
      <rect className="dw-wall" x="30" y="20" width="30" height="260"/>
      <rect className="dw-wall" x="340" y="20" width="30" height="260"/>
      <path className="dw-line" d="M20 280h360"/>
      <rect className="dw-profile" x="60" y="70" width="280" height="7"/>
      <rect className="dw-glass" x="64" y="77" width="142" height="199"/>
      <rect className="dw-glass dw-glass-front" x="196" y="79" width="142" height="197"/>
      <rect className="dw-line" x="140" y="44" width="120" height="16"/>
      <rect className="dw-bronze" x="192" y="48" width="16" height="8"/>
      </>
    ),
  },
};
export function Drawing({ d, className = '' }: { d: D; className?: string }) {
  return (
    <svg viewBox={d.viewBox} role="img" aria-label={d.label} className={`block h-auto w-full overflow-visible ${className}`}>
      {d.body}
    </svg>
  );
}
