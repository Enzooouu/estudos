import { LineGrow } from './LineGrow';
import { Reveal } from './Reveal';
import { RevealWords } from './RevealWords';

/**
 * Abertura de seção: linha fina que se desenha, rótulo à esquerda,
 * título que sobe palavra por palavra e, opcionalmente, um parágrafo curto à direita.
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
  title: string;
  aside?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div>
      <LineGrow dark={dark} />
      <div className="grid gap-x-6 gap-y-6 pt-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className={`label ${dark ? 'text-ice' : ''}`}>{label}</p>
        </Reveal>
        <div className="lg:col-span-5">
          <RevealWords id={id} text={title} className="font-title text-h2 leading-[1.1] font-medium tracking-[-0.03em]" />
        </div>
        {aside && (
          <Reveal order={2} className="max-w-[40ch] lg:col-span-3">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}
