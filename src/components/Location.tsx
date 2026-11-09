import { site } from '@/content/site';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/** Endereço, horários e mapa da loja. */
export function Location() {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  return (
    <section id="localizacao" aria-labelledby="localizacao-h" className="px-page pb-[var(--gap)]">
      <div className="pb-10 lg:pb-14">
        <SectionHead id="localizacao-h" label="Localização" title="Venha conhecer a loja" />
      </div>

      <div className="grid gap-x-6 gap-y-8 lg:grid-cols-12">
        <Reveal className="grid content-start gap-6 lg:col-span-4">
          <div>
            <p className="label mb-2.5">Endereço</p>
            <p className="flex items-start gap-2.5 text-[clamp(17px,1.3vw,20px)]">
              <Icon name="pin" className="text-glass mt-0.5 shrink-0" />
              {site.address}
            </p>
          </div>
          <div>
            <p className="label mb-2.5">Horários</p>
            <ul className="grid gap-1">
              {site.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <a className="btn btn-bronze justify-self-start" href={directions} target="_blank" rel="noopener">
            <Icon name="ret" /> Como chegar
          </a>
        </Reveal>

        <Reveal order={1} className="lg:col-span-8">
          {site.mapEmbed ? (
            <iframe
              src={site.mapEmbed}
              title={`Mapa: ${site.name}`}
              className="bg-ice aspect-[16/10] w-full rounded-[var(--r)] border-0 grayscale-[0.4]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="bg-ice text-deep grid aspect-[16/10] rounded-[var(--r)] w-full place-items-center p-6 text-center">
              <div className="grid justify-items-center gap-2">
                <Icon name="pin" className="text-bronze !h-7 !w-7" />
                <p className="font-semibold">Mapa da loja</p>
                <p className="text-muted max-w-[40ch] text-[14px]">
                  Cole o endereço do mapa do Google (Compartilhar › Incorporar um mapa) em <code>mapEmbed</code>, em{' '}
                  <code>src/content/site.ts</code>.
                </p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
