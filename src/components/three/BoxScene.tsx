'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei';
import type { MotionValue } from 'motion/react';
import * as THREE from 'three';
import type { BoxConfig } from '@/lib/box';
import { BoxModel } from './BoxModel';

type Props = {
  c: BoxConfig;
  open: boolean;
  /** giro sutil ligado à rolagem da seção (radianos) */
  yaw?: MotionValue<number>;
  reduced: boolean;
  /** arrastar para girar (desligado em telas de toque, para não prender a rolagem) */
  interactive: boolean;
  /** modelo definitivo (.glb), quando existir no cadastro de mídias */
  modelUrl?: string;
  onReady?: () => void;
};

/**
 * Cena do "Monte seu box". Só desenha quadros quando algo muda (frameloop="demand"):
 * fora da tela ou parada, a GPU fica livre.
 */
export default function BoxScene({ c, open, yaw, reduced, interactive, modelUrl, onReady }: Props) {
  const H = c.h / 100;
  const span = Math.max(c.w / 100, H);
  const dist = span * 1.55 + 1.6;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 30, near: 0.1, far: 40, position: [dist * 0.42, H * 0.62 + 0.25, dist] }}
      onCreated={({ gl }) => {
        // tom neutro: preserva as cores reais do vidro e do perfil
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.toneMappingExposure = 1.1;
        onReady?.();
      }}
      aria-hidden="true"
    >
      <Fit dist={dist} h={H} />
      <Rig yaw={yaw} reduced={reduced}>
        {modelUrl ? (
          <Suspense fallback={null}>
            <GltfModel url={modelUrl} />
          </Suspense>
        ) : (
          <BoxModel c={c} open={open} instant={reduced} />
        )}
      </Rig>

      {/* sombra de contato estática: calculada uma vez por mudança, não a cada quadro */}
      <ContactShadows position={[0, 0.001, -0.35]} scale={6} blur={2.4} opacity={0.42} far={2.6} frames={1} resolution={512} color="#12344d" />

      {/* estúdio de luz gerado no próprio navegador: sem baixar HDR */}
      <Environment resolution={256} frames={1}>
        {/* softbox de teto: reflexo largo e suave no vidro */}
        <Lightformer form="rect" intensity={2.6} position={[0, 4.5, 1.5]} rotation-x={Math.PI / 2} scale={[7, 2.5, 1]} />
        {/* faixas verticais atrás da câmera: as linhas de luz refletidas no vidro e no alumínio */}
        <Lightformer form="rect" intensity={5} position={[-1.4, 1.8, 4.5]} rotation-y={Math.PI} scale={[0.35, 6, 1]} />
        <Lightformer form="rect" intensity={3.5} position={[0.9, 1.8, 4.8]} rotation-y={Math.PI} scale={[0.14, 6, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-3.2, 1.6, 1.5]} rotation-y={Math.PI / 2.4} scale={[0.4, 5, 1]} />
        {/* luz âmbar baixa e discreta, a cor de ação da marca refletida no perfil */}
        <Lightformer form="rect" intensity={0.7} color="#f5a623" position={[1.5, 0.3, 3.5]} scale={[2.5, 0.2, 1]} />
        {/* fundo azul-gelo envolvendo a cena */}
        <Lightformer form="ring" intensity={0.5} color="#d6eef7" position={[0, 2, -6]} scale={8} />
      </Environment>
      <ambientLight intensity={0.9} color="#eef7fb" />
      <directionalLight position={[2.5, 4, 3]} intensity={1.4} />
      <directionalLight position={[-3, 2, 2]} intensity={0.5} color="#d6eef7" />

      {interactive && (
      <OrbitControls
        makeDefault
        target={[0, H * 0.48, -0.3]}
        enablePan={false}
        enableZoom={false}
        enableDamping={!reduced}
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.5}
        minAzimuthAngle={-0.9}
        maxAzimuthAngle={0.9}
        rotateSpeed={0.6}
      />
      )}
    </Canvas>
  );
}

/** Reenquadra a câmera quando as medidas mudam. */
function Fit({ dist, h }: { dist: number; h: number }) {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    camera.position.set(dist * 0.42, h * 0.62 + 0.25, dist);
    camera.lookAt(0, h * 0.48, -0.3);
    invalidate();
  }, [camera, dist, h, invalidate]);
  return null;
}

/** Aplica o giro da rolagem ao grupo e pede um novo quadro só quando ele muda. */
function Rig({ yaw, reduced, children }: { yaw?: MotionValue<number>; reduced: boolean; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  useEffect(() => {
    if (!yaw || reduced) return;
    const apply = (v: number) => {
      if (group.current) group.current.rotation.y = v;
      invalidate();
    };
    apply(yaw.get());
    return yaw.on('change', apply);
  }, [yaw, reduced, invalidate]);
  return <group ref={group}>{children}</group>;
}

function GltfModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
