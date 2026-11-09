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
  guarda: {
    viewBox: '0 0 400 400',
    label: 'Desenho técnico de guarda-corpo de vidro laminado com perfil de base e corrimão',
    body: (
      <>
      <rect className="dw-wall" x="20" y="290" width="360" height="40"/>
      <path className="dw-line" d="M20 290h360"/>
      <rect className="dw-profile" x="40" y="270" width="320" height="20"/>
      <rect className="dw-glass" x="46" y="120" width="98" height="150"/>
      <rect className="dw-glass" x="151" y="120" width="98" height="150"/>
      <rect className="dw-glass" x="256" y="120" width="98" height="150"/>
      <rect className="dw-profile" x="36" y="108" width="328" height="12"/>
      <path className="dw-dim" d="M384 108v182M380 112l8-8M380 294l8-8"/>
      <text className="dw-text" x="0" y="0" transform="translate(396 200) rotate(-90)" textAnchor="middle">110 cm</text>
      <path className="dw-line dw-thin" d="M70 140l30-14M175 140l30-14M280 140l30-14"/>
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
  coberturas: {
    viewBox: '0 0 400 400',
    label: 'Corte de cobertura de vidro laminado inclinada sobre vigas metálicas',
    body: (
      <>
      <rect className="dw-wall" x="20" y="60" width="36" height="290"/>
      <path className="dw-line" d="M20 350h360"/>
      <path className="dw-glass" d="M56 110L370 160v8L56 118z"/>
      <path className="dw-profile" d="M56 120L360 168v10L56 130z"/>
      <rect className="dw-profile" x="330" y="172" width="12" height="178"/>
      <path className="dw-line dw-thin" d="M120 132v-10M190 144v-10M260 155v-10"/>
      <path className="dw-dim" d="M90 92l230 37"/>
      <text className="dw-text" x="200" y="96" textAnchor="middle" transform="rotate(9 200 96)">inclinação mín. 10%</text>
      </>
    ),
  },
  serralheria: {
    viewBox: '0 0 400 400',
    label: 'Desenho técnico de portão de correr em aço com frisos verticais',
    body: (
      <>
      <rect className="dw-wall" x="20" y="60" width="34" height="270"/>
      <rect className="dw-wall" x="346" y="60" width="34" height="270"/>
      <path className="dw-line" d="M20 330h360"/>
      <rect className="dw-profile-o" x="60" y="90" width="280" height="232"/>
      <path className="dw-line" d="M82 98v216M104 98v216M126 98v216M148 98v216M170 98v216M192 98v216M214 98v216M236 98v216M258 98v216M280 98v216M302 98v216M324 98v216"/>
      <circle className="dw-line" cx="100" cy="328" r="6"/>
      <circle className="dw-line" cx="300" cy="328" r="6"/>
      <path className="dw-dim" d="M60 356h280M56 360l8-8M336 360l8-8"/>
      <text className="dw-text" x="200" y="378" textAnchor="middle">350 cm</text>
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
