import { Reveal } from './Reveal';

/**
 * Abertura de seção: linha fina de ponta a ponta, rótulo à esquerda,
 * título e, opcionalmente, um parágrafo curto à direita.
 */
export function SectionHead({
  id,
  label,
  title,
  aside,
  dark = false,
}: {
  id: string;
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`border-t pt-5 ${dark ? 'border-ice/25' : 'border-line'}`}>
      <div className="grid gap-x-6 gap-y-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className={`label ${dark ? 'text-ice' : ''}`}>{label}</p>
        </Reveal>
        <Reveal order={1} className="lg:col-span-5">
          <h2 id={id} className="font-title text-h2 leading-[1.1] font-medium tracking-[-0.03em]">
            {title}
          </h2>
        </Reveal>
        {aside && (
          <Reveal order={2} className="max-w-[40ch] lg:col-span-3">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}
