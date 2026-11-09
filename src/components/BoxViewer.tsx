'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useReducedMotion, type MotionValue } from 'motion/react';
import { getMedia } from '@/content/media';
import type { BoxConfig } from '@/lib/box';
import { BoxElevation, BoxPlan } from './BoxDrawing';
import { Icon } from './Icon';

// three.js, R3F e drei só são baixados quando a seção se aproxima da tela
const BoxScene = dynamic(() => import('./three/BoxScene'), { ssr: false });

type View = '3d' | '2d';

function canUse3D() {
  try {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return false;
    if (nav.deviceMemory && nav.deviceMemory <= 2) return false;
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Visualização do box: 3D (padrão quando o aparelho aguenta) ou desenho técnico.
 * O desenho é também o que aparece enquanto o 3D carrega e o recuo sem WebGL.
 */
export function BoxViewer({ c, summary, yaw }: { c: BoxConfig; summary: string; yaw: MotionValue<number> }) {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [view, setView] = useState<View>('2d');
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [touch, setTouch] = useState(false);
  const opened = useRef(false);
  const model = getMedia('modelo-3d-esquadria');

  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches);
    const ok = canUse3D();
    setSupported(ok);
    if (ok) setView('3d');
  }, []);

  // monta o 3D só perto da tela; abre a folha uma vez quando a cena aparece
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        if (e.intersectionRatio > 0.55 && !opened.current && ready) {
          opened.current = true;
          setTimeout(() => setOpen(true), reduced ? 0 : 450);
        }
      },
      { rootMargin: '400px 0px', threshold: [0, 0.55] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready, reduced]);

  const show3D = view === '3d' && supported && near;
  const leafLabel = c.modelo === 'abrir' ? (open ? 'Fechar porta' : 'Abrir porta') : open ? 'Fechar folha' : 'Abrir folha';

  return (
    <div ref={ref} className="frame-open bg-ice rounded-[var(--frame-r)] p-[var(--pad)] [--frame-color:var(--color-deep)] [--frame-r:calc(7px+var(--pad))] [--pad:clamp(18px,2.6vw,40px)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Visualização" className="bg-frost inline-flex rounded-[7px] p-1">
          {(
            [
              ['3d', '3D'],
              ['2d', 'Desenho técnico'],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              disabled={v === '3d' && supported === false}
              onClick={() => setView(v)}
              className={`min-h-9 cursor-pointer rounded-[3px] px-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${view === v ? 'bg-deep text-frost' : 'text-deep hover:bg-ice'}`}
            >
              {label}
            </button>
          ))}
        </div>
        {view === '3d' && supported && (
          <button type="button" onClick={() => setOpen((o) => !o)} className="btn btn-deep !min-h-9 !px-3.5">
            <Icon name="ret" /> {leafLabel}
          </button>
        )}
      </div>

      <div className="relative aspect-[5/6] w-full">
        <AnimatePresence initial={false}>
          {(!show3D || !ready) && (
            <motion.div
              key="drawing"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-small text-muted mb-1 font-semibold">Vista frontal</p>
              <div className="min-h-0 flex-1">
                <BoxElevation c={c} label={`Vista frontal: ${summary}`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {show3D && (
          <motion.div
            className={`absolute inset-0 ${touch ? '' : 'cursor-grab active:cursor-grabbing'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            role="img"
            aria-label={`Modelo 3D ilustrativo: ${summary}.`}
          >
            <BoxScene c={c} open={open} yaw={yaw} reduced={reduced} interactive={!touch} modelUrl={model.src} onReady={() => setReady(true)} />
          </motion.div>
        )}

        {show3D && ready && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 text-[13px]">
            <span className="glass-deep text-ice inline-flex items-center gap-2 px-3 py-2">
              <Icon name="cube" className="text-bronze !h-4 !w-4" />
              {model.src ? 'Modelo 3D do produto' : 'Modelo ilustrativo, gerado pelas medidas'}
            </span>
            <span className="text-muted inline-flex items-center gap-1.5 px-1 py-2">
              <Icon name="rotate" className="!h-4 !w-4" /> {touch ? 'Gira com a rolagem' : 'Arraste para girar'}
            </span>
          </div>
        )}
      </div>

      {view === '2d' && (
        <div className="mt-4">
          <p className="text-small text-muted mb-2 font-semibold">Planta</p>
          <BoxPlan c={c} />
        </div>
      )}
      {supported === false && (
        <p className="text-small text-muted mt-3">Este aparelho mostra o desenho técnico; a visualização 3D precisa de WebGL.</p>
      )}
    </div>
  );
}
