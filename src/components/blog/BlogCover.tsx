/**
 * Capa do artigo: a foto, quando o artigo tem `capa`; sem foto, uma folha de vidro desenhada
 * em perspectiva (a mesma linguagem da chamada emoldurada).
 */
export function BlogCover({ src, alt = '', className = '' }: { src?: string; alt?: string; className?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full rounded-[var(--r)] object-cover ${className}`} />
    );
  }
  return (
    <div aria-hidden="true" className={`bg-deep relative h-full w-full overflow-hidden rounded-[var(--r)] ${className}`}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <g fill="none" stroke="rgb(237 232 225 / .35)" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <path d="M150 0v400M150 70h490M150 340h490" />
          <path d="M150 70L360 30v370L150 340" />
          <path d="M360 30L640 0M360 400L640 400" />
        </g>
        <path d="M150 70L360 30v370L150 340z" fill="rgb(107 103 96 / .28)" />
        <g stroke="rgb(237 232 225 / .5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <path d="M200 92L300 70M200 122L270 106" />
        </g>
        <path d="M330 180v70" stroke="var(--color-bronze)" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
