import { getMedia, type MediaEntry, type MediaId } from '@/content/media';
import { Icon, type IconName } from '../Icon';

/** título do espaço reservado, enquanto a mídia não chega */
const soon: Record<MediaEntry['kind'], string> = {
  foto: 'Foto em breve',
  produto: 'Foto em breve',
  video: 'Vídeo em breve',
  modelo3d: 'Modelo 3D em breve',
};

const kindIcon: Record<MediaEntry['kind'], IconName> = {
  foto: 'camera',
  video: 'video',
  produto: 'frame',
  modelo3d: 'cube',
};

type Props = {
  id: MediaId;
  /** 'light' sobre fundos claros, 'dark' sobre o grafite */
  tone?: 'light' | 'dark';
  /** ocupa o contêiner inteiro (fundo de seção) em vez de usar a proporção */
  fill?: boolean;
  /** carrega já, sem esperar a rolagem (só para o topo) */
  priority?: boolean;
  /** esconde a descrição longa do placeholder (espaços pequenos) */
  compact?: boolean;
  /** posição do selo do placeholder quando `fill` */
  tagClassName?: string;
  className?: string;
  sizes?: string;
};

/**
 * Mostra a mídia definitiva quando ela existe no cadastro (src preenchido);
 * enquanto não existe, mostra um placeholder com a mesma proporção e o conteúdo esperado.
 */
export function Media({ id, tone = 'light', fill, priority, compact, tagClassName, className = '', sizes = '100vw' }: Props) {
  const m = getMedia(id);
  const box = fill ? 'absolute inset-0' : 'relative w-full rounded-[var(--r)]';
  const style = fill ? undefined : { aspectRatio: m.ratio };

  if (m.src && m.kind === 'video') {
    return (
      <div className={`${box} overflow-hidden ${className}`} style={style}>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          poster={m.poster}
          aria-label={m.alt ?? m.description}
        >
          {m.src.endsWith('.mp4') && <source src={m.src.replace(/\.mp4$/, '.webm')} type="video/webm" />}
          <source src={m.src} />
        </video>
      </div>
    );
  }

  if (m.src) {
    return (
      <div className={`${box} overflow-hidden ${className}`} style={style}>
        <picture className="block h-full w-full">
          {m.sources?.avif && <source srcSet={m.sources.avif} type="image/avif" sizes={sizes} />}
          {m.sources?.webp && <source srcSet={m.sources.webp} type="image/webp" sizes={sizes} />}
          <img
            src={m.src}
            alt={m.alt ?? ''}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>
    );
  }

  return <Placeholder id={id} m={m} tone={tone} fill={fill} compact={compact} tagClassName={tagClassName} className={className} />;
}

/** Placeholder na linguagem da marca: superfície de vidro, moldura aberta e o que deve entrar ali. */
function Placeholder({
  id,
  m,
  tone,
  fill,
  compact,
  tagClassName,
  className,
}: {
  id: MediaId;
  m: MediaEntry;
  tone: 'light' | 'dark';
  fill?: boolean;
  compact?: boolean;
  tagClassName?: string;
  className: string;
}) {
  const dark = tone === 'dark';
  const surface = dark ? 'bg-[#2A2B2D] text-ice' : 'bg-ice text-deep';
  const line = dark ? 'rgb(237 232 225 / .16)' : 'rgb(31 32 34 / .14)';

  const tag = (
    <figcaption className={`grid max-w-[34ch] gap-2 ${dark ? 'text-ice' : 'text-deep'}`}>
      <span className="inline-flex items-center gap-2 text-[13px] leading-none font-semibold tracking-[0.1em] uppercase">
        <Icon name={kindIcon[m.kind]} className="text-bronze !h-[18px] !w-[18px]" />
        {soon[m.kind]}
      </span>
      <span className={`text-[14px] leading-snug ${compact ? 'line-clamp-2' : ''} ${dark ? 'text-ice/80' : 'text-muted'}`}>
        {m.description}
      </span>
    </figcaption>
  );

  if (fill) {
    // fundo de seção: a superfície e um selo discreto, posicionado pela seção
    return (
      <figure data-placeholder={id} className={`absolute inset-0 m-0 ${surface} ${className}`}>
        <Reflections line={line} />
        <div className={`absolute ${tagClassName ?? 'bottom-6 left-[var(--m)]'}`}>{tag}</div>
      </figure>
    );
  }

  return (
    <figure
      data-placeholder={id}
      className={`frame-open relative m-0 flex h-full w-full flex-col justify-end overflow-hidden rounded-[var(--r)] p-[clamp(26px,3.6vw,48px)] ${surface} ${className}`}
      style={{
        aspectRatio: m.ratio,
        ['--frame-color' as string]: dark ? 'rgb(237 232 225 / .35)' : 'rgb(107 103 96 / .55)',
      }}
    >
      <Reflections line={line} />
      <div className="relative">{tag}</div>
    </figure>
  );
}

/** Reflexos diagonais finos, como luz batendo num vidro. */
function Reflections({ line }: { line: string }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d="M58 -5L28 105M70 -5L40 105M86 -5L70 105" stroke={line} strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
    </svg>
  );
}
