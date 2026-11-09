'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { BoxConfig, Perfil, Vidro } from '@/lib/box';

/**
 * Box de banheiro gerado a partir das medidas escolhidas (em metros).
 * É um modelo ilustrativo: proporções e acabamentos corretos, sem ser o desenho de um
 * fabricante específico. O modelo definitivo entra pelo cadastro de mídias (modelo-3d-esquadria).
 */

const GLASS = 0.008; // vidro temperado de 8 mm
const GAP = 0.022; // distância entre as folhas de correr

/** Vidro: transmissão física com IOR 1.52 e leve cor de borda, como o vidro real. */
function glassParams(v: Vidro): THREE.MeshPhysicalMaterialParameters {
  const base = {
    transmission: 1,
    thickness: 0.02,
    ior: 1.52,
    roughness: 0.02,
    metalness: 0,
    envMapIntensity: 2.2,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    specularIntensity: 1,
    attenuationDistance: 1.2,
    side: THREE.DoubleSide,
  };
  switch (v) {
    case 'fumê':
      return { ...base, color: '#a3acb3', attenuationColor: '#5f6a72', attenuationDistance: 1.6 };
    case 'bronze':
      return { ...base, color: '#c3a17a', attenuationColor: '#8a6a45', attenuationDistance: 0.9 };
    case 'jateado':
      return { ...base, color: '#f4f8f9', roughness: 0.55, transmission: 0.92, attenuationColor: '#ffffff' };
    default:
      return { ...base, color: '#f2f9fa', attenuationColor: '#cfe9e2' };
  }
}

/** Alumínio: metal anodizado ou pintado conforme o acabamento. */
function profileParams(p: Perfil): THREE.MeshStandardMaterialParameters {
  switch (p) {
    case 'preto':
      return { color: '#1d2125', metalness: 0.55, roughness: 0.42 };
    case 'branco':
      return { color: '#f1f2f0', metalness: 0.1, roughness: 0.5 };
    case 'dourado':
      return { color: '#c9a45c', metalness: 1, roughness: 0.28 };
    default:
      return { color: '#c3c9ce', metalness: 1, roughness: 0.3 };
  }
}

type Props = {
  c: BoxConfig;
  /** 0 = fechado, 1 = aberto */
  open: boolean;
  instant?: boolean;
};

export function BoxModel({ c, open, instant }: Props) {
  const W = c.w / 100;
  const H = c.h / 100;
  const B = c.b / 100;
  const isCanto = c.modelo === 'canto';
  const isAbrir = c.modelo === 'abrir';
  const isTeto = c.modelo === 'teto';
  const depth = isCanto ? B : 0.9;

  const glass = useMemo(() => new THREE.MeshPhysicalMaterial(glassParams(c.vidro)), [c.vidro]);
  const profile = useMemo(() => new THREE.MeshStandardMaterial(profileParams(c.perfil)), [c.perfil]);
  const wall = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f3f9fb', roughness: 0.95, envMapIntensity: 0.6 }), []);
  useEffect(() => () => glass.dispose(), [glass]);
  useEffect(() => () => profile.dispose(), [profile]);
  useEffect(() => () => wall.dispose(), [wall]);

  // folha móvel: desliza (correr, canto, teto) ou gira (abrir)
  const leaf = useRef<THREE.Group>(null);
  const progress = useRef(open ? 1 : 0);
  const { invalidate } = useThree();
  useEffect(() => invalidate(), [open, invalidate]);

  const slide = W / 2 - 0.08;
  const fixW = W * 0.42;
  const doorW = W - fixW - 0.012;

  useFrame((_, dt) => {
    const target = open ? 1 : 0;
    const d = target - progress.current;
    if (Math.abs(d) < 0.0005) {
      progress.current = target;
    } else {
      progress.current += instant ? d : d * (1 - Math.exp(-dt * 5));
      invalidate();
    }
    const g = leaf.current;
    if (!g) return;
    if (isAbrir) g.rotation.y = -progress.current * 1.25;
    else g.position.x = W / 4 - 0.01 - progress.current * slide;
  });

  const panelH = H - 0.06;
  const wallH = isTeto ? H : H + 0.35;

  return (
    <group position={[0, 0, 0]}>
      {/* paredes e piso: tom gelo, foscos, só para dar contexto à luz */}
      <mesh material={wall} position={[-W / 2 - 0.05, wallH / 2, -depth / 2]} receiveShadow>
        <boxGeometry args={[0.1, wallH, depth + 0.1]} />
      </mesh>
      {!isCanto && (
        <mesh material={wall} position={[W / 2 + 0.05, wallH / 2, -depth / 2]}>
          <boxGeometry args={[0.1, wallH, depth + 0.1]} />
        </mesh>
      )}
      <mesh material={wall} position={[0, wallH / 2, -depth - 0.05]}>
        <boxGeometry args={[W + (isCanto ? 0.6 : 0.2), wallH, 0.1]} />
      </mesh>
      {isTeto && (
        <mesh material={wall} position={[0, H + 0.04, -depth / 2]}>
          <boxGeometry args={[W + 0.2, 0.08, depth + 0.4]} />
        </mesh>
      )}

      {isAbrir ? (
        <>
          {/* perfis U nas paredes */}
          <mesh material={profile} position={[-W / 2 + 0.01, H / 2, 0]}>
            <boxGeometry args={[0.02, H, 0.03]} />
          </mesh>
          <mesh material={profile} position={[W / 2 - 0.01, H / 2, 0]}>
            <boxGeometry args={[0.02, H, 0.03]} />
          </mesh>
          {/* folha fixa */}
          <mesh material={glass} position={[-W / 2 + fixW / 2 + 0.01, H / 2, 0]}>
            <boxGeometry args={[fixW - 0.02, H - 0.02, GLASS]} />
          </mesh>
          {/* porta, girando na dobradiça junto à folha fixa */}
          <group ref={leaf} position={[-W / 2 + fixW + 0.006, 0, 0]}>
            <mesh material={glass} position={[doorW / 2, H / 2, 0]}>
              <boxGeometry args={[doorW - 0.02, H - 0.03, GLASS]} />
            </mesh>
            {[0.22, H - 0.22].map((y) => (
              <mesh key={y} material={profile} position={[0.01, y, 0]}>
                <boxGeometry args={[0.05, 0.07, 0.03]} />
              </mesh>
            ))}
            <Handle material={profile} x={doorW - 0.09} y={H * 0.48} />
          </group>
        </>
      ) : (
        <>
          {/* trilho superior e guia inferior */}
          <mesh material={profile} position={[0, H - 0.0225, 0]}>
            <boxGeometry args={[W, 0.045, 0.065]} />
          </mesh>
          <mesh material={profile} position={[0, 0.006, 0]}>
            <boxGeometry args={[W, 0.012, 0.05]} />
          </mesh>
          {/* folha fixa (de trás) */}
          <mesh material={glass} position={[-W / 4 + 0.01, panelH / 2 + 0.012, -GAP / 2]}>
            <boxGeometry args={[W / 2 + 0.03, panelH - 0.012, GLASS]} />
          </mesh>
          {/* folha de correr (da frente) */}
          <group ref={leaf} position={[W / 4 - 0.01, 0, GAP / 2]}>
            <mesh material={glass} position={[0, panelH / 2 + 0.012, 0]}>
              <boxGeometry args={[W / 2 + 0.03, panelH - 0.012, GLASS]} />
            </mesh>
            {/* roldanas aparentes no trilho */}
            {[-W / 4 + 0.08, W / 4 - 0.08].map((x) => (
              <mesh key={x} material={profile} position={[x, H - 0.07, 0]}>
                <boxGeometry args={[0.07, 0.05, 0.02]} />
              </mesh>
            ))}
            <Handle material={profile} x={-W / 4 + 0.05} y={H * 0.48} />
          </group>
          {/* box de canto: lado fixo voltado para a parede do fundo */}
          {isCanto && (
            <>
              <mesh material={glass} position={[W / 2, panelH / 2 + 0.012, -B / 2]}>
                <boxGeometry args={[GLASS, panelH - 0.012, B - 0.02]} />
              </mesh>
              <mesh material={profile} position={[W / 2, H - 0.0225, -B / 2]}>
                <boxGeometry args={[0.065, 0.045, B]} />
              </mesh>
              <mesh material={profile} position={[W / 2, H / 2, 0]}>
                <boxGeometry args={[0.03, H, 0.03]} />
              </mesh>
            </>
          )}
        </>
      )}
    </group>
  );
}

/** Puxador tubular vertical com dois apoios. */
function Handle({ material, x, y }: { material: THREE.Material; x: number; y: number }) {
  const len = 0.34;
  return (
    <group position={[x, y, 0]}>
      <mesh material={material} position={[0, 0, 0.045]}>
        <cylinderGeometry args={[0.0095, 0.0095, len, 20]} />
      </mesh>
      {[-len / 2 + 0.03, len / 2 - 0.03].map((dy) => (
        <mesh key={dy} material={material} position={[0, dy, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.042, 12]} />
        </mesh>
      ))}
    </group>
  );
}
