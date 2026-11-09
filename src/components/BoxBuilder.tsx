'use client';

import { useRef, useState } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { site, waLink } from '@/content/site';
import {
  ALTURA,
  INITIAL,
  MODELO_CURTO,
  PERFIL,
  VIDRO,
  describe,
  message,
  type BoxConfig,
  type Modelo,
  type Perfil,
  type Vidro,
} from '@/lib/box';
import { BoxViewer } from './BoxViewer';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

function Choices<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: string; swatch?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3.5 text-base font-semibold">{legend}</legend>
      <div className="grid grid-cols-2 gap-1.5">
        {options.map((o) => (
          <label key={o.value} className="group relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
            />
            <span className="bg-ice group-hover:bg-ice-strong peer-checked:bg-frost peer-checked:border-deep peer-focus-visible:outline-bronze flex min-h-[52px] items-center gap-3 border-2 border-transparent px-4 text-base font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
              {o.swatch && (
                <i aria-hidden="true" className="h-[18px] w-[18px] flex-none border border-deep/35" style={{ background: o.swatch }} />
              )}
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Range({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-3.5 flex w-full justify-between text-base font-semibold">
        {label}
        <output htmlFor={id} className="text-glass font-medium tabular-nums">
          {value} cm
        </output>
      </label>
      <input
        id={id}
        name={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
}

/** A coisa viva da página: escolha o box e veja-o desenhado em escala. */
export function BoxBuilder() {
  const [c, setC] = useState<BoxConfig>(INITIAL);
  // a cena gira levemente enquanto a seção atravessa a tela
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const yaw = useTransform(scrollYProgress, [0, 1], [-0.42, 0.32]);
  const set = (patch: Partial<BoxConfig>) => setC((prev) => ({ ...prev, ...patch }));

  const setModelo = (modelo: Modelo) =>
    setC((prev) => {
      const wasTeto = prev.modelo === 'teto';
      const isTeto = modelo === 'teto';
      // até o teto: a altura passa a ser o pé-direito
      const h = wasTeto === isTeto ? prev.h : (isTeto ? ALTURA.teto : ALTURA.normal).start;
      return { ...prev, modelo, h };
    });

  const alt = c.modelo === 'teto' ? ALTURA.teto : ALTURA.normal;
  const summary = describe(c);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Orçamento: ${summary.split(' · ')[0]}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message(c))}`;
  };

  return (
    <section ref={section} id="monte" aria-labelledby="monte-h" className="px-page pt-[var(--gap)]">
      <div className="mb-14 lg:mb-20">
        <SectionHead
          id="monte-h"
          label="Monte seu box"
          title="Desenhe o seu, em escala"
          aside={
            <p>Escolha o modelo e as medidas do vão. A especificação vai pronta para o nosso WhatsApp.</p>
          }
        />
      </div>

      <form
        action={`mailto:${site.email}`}
        method="post"
        encType="text/plain"
        onSubmit={onSubmit}
        className="grid items-start gap-[clamp(32px,5vw,96px)] lg:grid-cols-[5fr_7fr]"
      >
        <Reveal className="grid gap-9">
          <Choices<Modelo>
            legend="Modelo"
            name="modelo"
            value={c.modelo}
            onChange={setModelo}
            options={(Object.keys(MODELO_CURTO) as Modelo[]).map((m) => ({ value: m, label: MODELO_CURTO[m] }))}
          />
          <Range id="largura" label="Largura do vão" value={c.w} min={60} max={200} onChange={(w) => set({ w })} />
          {c.modelo === 'canto' && (
            <Range id="lado" label="Lado do canto" value={c.b} min={60} max={140} onChange={(b) => set({ b })} />
          )}
          <Range
            id="altura"
            label={c.modelo === 'teto' ? 'Pé-direito' : 'Altura'}
            value={c.h}
            min={alt.min}
            max={alt.max}
            onChange={(h) => set({ h })}
          />
          <Choices<Vidro>
            legend="Vidro temperado 8 mm"
            name="vidro"
            value={c.vidro}
            onChange={(vidro) => set({ vidro })}
            options={(Object.keys(VIDRO) as Vidro[]).map((v) => ({
              value: v,
              label: v[0].toUpperCase() + v.slice(1),
              swatch: VIDRO[v].swatch,
            }))}
          />
          <Choices<Perfil>
            legend="Perfil de alumínio"
            name="perfil"
            value={c.perfil}
            onChange={(perfil) => set({ perfil })}
            options={(Object.keys(PERFIL) as Perfil[]).map((p) => ({
              value: p,
              label: p[0].toUpperCase() + p.slice(1),
              swatch: PERFIL[p],
            }))}
          />
        </Reveal>

        <Reveal order={1} className="grid gap-7">
          <BoxViewer c={c} summary={summary} yaw={yaw} />
          <div className="grid gap-5">
            <p aria-live="polite" className="font-title text-h3 max-w-[30ch] leading-[1.25] font-medium tracking-[-0.02em]">
              {summary}
            </p>
            <div className="flex flex-wrap gap-2">
              <a className="btn btn-bronze" href={waLink(message(c))} target="_blank" rel="noopener">
                <Icon name="ret" /> Enviar pelo WhatsApp
              </a>
              <button type="submit" className="btn btn-ice">
                <Icon name="ret" /> Enviar por e-mail
              </button>
            </div>
            <p className="text-small text-muted">Medidas aproximadas: o valor final sai depois da medição no local.</p>
          </div>
        </Reveal>
      </form>
    </section>
  );
}
