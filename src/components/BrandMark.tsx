/** Marca: moldura de esquadria aberta num canto, com montante central. */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M20 3H3v26h26V12" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <path d="M16 3v26" fill="none" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  );
}
