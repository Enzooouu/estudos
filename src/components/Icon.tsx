/** Ícones outline: todos em grade 24×24, traço 1.5, pontas retas. */
const paths = {
  whats: (
    <>
      <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9a4.6 4.6 0 0 1-2.8-2.8l.9-1-1-2z" />
    </>
  ),
  phone: <path d="M5 4h4l1.5 4.5-2.3 1.4a10 10 0 0 0 5.9 5.9l1.4-2.3L20 15v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />,
  mail: (
    <>
      <path d="M3 5h18v14H3z" />
      <path d="M3 5l9 8 9-8" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  clock: (
    <>
      <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 15L15 3l6 6L9 21z" />
      <path d="M7 11l2 2M10 8l2 2M13 5l2 2" />
    </>
  ),
  insta: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
      <path d="M16.5 7h.01" />
    </>
  ),
  ret: (
    <>
      <path d="M6 4v9h13" />
      <path d="M15 9l4 4-4 4" />
    </>
  ),
  menu: <path d="M4 8h16M4 12h16M4 16h16" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
} as const;

export type IconName = keyof typeof paths;

export function IconSprite() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      {Object.entries(paths).map(([name, d]) => (
        <symbol key={name} id={`i-${name}`} viewBox="0 0 24 24">
          {d}
        </symbol>
      ))}
    </svg>
  );
}

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg className={`icon ${className}`} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
