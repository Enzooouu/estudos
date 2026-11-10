'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { BoxConfig, Perfil, Vidro } from '@/lib/box';
import { tileTexture, tiled } from './textures';

/**
 * Box de banheiro gerado a partir das medidas escolhidas (em metros), dentro de um banheiro
 * de verdade: porcelanato nas paredes e no piso, chuveiro, registro e ralo linear.
 * É um modelo ilustrativo: proporções, ferragens e acabamentos corretos, sem ser o desenho de
 * um fabricante específico. O modelo definitivo entra pelo cadastro de mídias.
 */

const GLASS = 0.008; // vidro temperado de 8 mm
const GAP = 0.024; // distância entre as folhas de correr
const R_GLASS = 0.0032; // aresta lapidada do vidro
const WALL_TILE: [number, number] = [0.6, 1.2]; // porcelanato 60 × 120
const FLOOR_TILE: [number, number] = [0.6, 0.6];

/** Vidro: transmissão física com IOR 1,52 e a leve cor esverdeada da borda do vidro real. */
function glassParams(v: Vidro): THREE.MeshPhysicalMaterialParameters {
  const base = {
    transmission: 1,
    thickness: GLASS * 2.5,
    ior: 1.52,
    roughness: 0.015,
    metalness: 0,
    envMapIntensity: 2.4,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    specularIntensity: 1,
    attenuationDistance: 0.9,
    side: THREE.DoubleSide,
  };
  switch (v) {
    case 'fumê':
      return { ...base, color: '#b4b4b0', attenuationColor: '#76766f', attenuationDistance: 1.4 };
    case 'bronze':
      return { ...base, color: '#bdb3a7', attenuationColor: '#7f7367', attenuationDistance: 1.2 };
    case 'jateado':
      return { ...base, color: '#F5F4F1', roughness: 0.5, transmission: 0.9, attenuationColor: '#ffffff', clearcoat: 0 };
    default:
      return { ...base, color: '#F7F7F4', attenuationColor: '#cfe3da' };
  }
}

/** Alumínio: anodizado (natural e dourado) ou pintado (preto e branco). */
function profileParams(p: Perfil): THREE.MeshPhysicalMaterialParameters {
  switch (p) {
    case 'preto':
      return { color: '#1b1c1e', metalness: 0.35, roughness: 0.38, clearcoat: 0.4, clearcoatRoughness: 0.35, envMapIntensity: 1.2 };
    case 'branco':
      return { color: '#f2f1ee', metalness: 0.05, roughness: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.3 };
    case 'dourado':
      return { color: '#d1aa62', metalness: 1, roughness: 0.22, envMapIntensity: 1.4 };
    default:
      return { color: '#cfd0ce', metalness: 1, roughness: 0.24, envMapIntensity: 1.4 };
  }
}

/** Metais do chuveiro e do registro: acompanham o perfil (preto, dourado ou cromado). */
function fixtureParams(p: Perfil): THREE.MeshPhysicalMaterialParameters {
  if (p === 'preto') return { color: '#18191b', metalness: 0.4, roughness: 0.35, clearcoat: 0.6 };
  if (p === 'dourado') return { color: '#d1aa62', metalness: 1, roughness: 0.18, envMapIntensity: 1.4 };
  return { color: '#e9e9e7', metalness: 1, roughness: 0.08, envMapIntensity: 1.6 };
}

type Props = {
  c: BoxConfig;
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
  const depth = isCanto ? B : 0.95;
  const wallH = isTeto ? H : Math.max(H + 0.42, 2.4);
  const front = 0.03; // as paredes laterais terminam junto ao box
  const backW = W + (isCanto ? 0.7 : 0);

  // materiais
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial(glassParams(c.vidro)), [c.vidro]);
  const profile = useMemo(() => new THREE.MeshPhysicalMaterial(profileParams(c.perfil)), [c.perfil]);
  const fixture = useMemo(() => new THREE.MeshPhysicalMaterial(fixtureParams(c.perfil)), [c.perfil]);
  const steel = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d9d9d6', metalness: 1, roughness: 0.3 }), []);

  // porcelanato: parede marmorizada clara, piso em bege acinzentado
  const wallTex = useMemo(
    () =>
      tileTexture({
        w: WALL_TILE[0], h: WALL_TILE[1], base: '#EEE9E2', light: '#F7F4EF', dark: '#E4DED5',
        vein: '#B9AE9E', grout: '#D9D2C8', veins: 5, seed: 7,
      }),
    [],
  );
  const floorTex = useMemo(
    () =>
      tileTexture({
        w: FLOOR_TILE[0], h: FLOOR_TILE[1], base: '#CFC7BB', light: '#D9D2C7', dark: '#C2B9AC',
        vein: '#A79C8C', grout: '#B5AB9D', veins: 2, seed: 21,
      }),
    [],
  );
  const tileMat = (tex: THREE.Texture, w: number, h: number, tile: [number, number], rough = 0.32) =>
    new THREE.MeshPhysicalMaterial({ map: tiled(tex, tile[0], tile[1], w, h), roughness: rough, clearcoat: 0.25, clearcoatRoughness: 0.4, envMapIntensity: 0.7 });

  const backMat = useMemo(() => tileMat(wallTex, backW, wallH, WALL_TILE), [wallTex, backW, wallH]); // eslint-disable-line react-hooks/exhaustive-deps
  const sideMat = useMemo(() => tileMat(wallTex, depth + front, wallH, WALL_TILE), [wallTex, depth, wallH]); // eslint-disable-line react-hooks/exhaustive-deps
  const floorMat = useMemo(() => tileMat(floorTex, backW + 0.6, depth + 1.2, FLOOR_TILE, 0.45), [floorTex, backW, depth]); // eslint-disable-line react-hooks/exhaustive-deps
  const ceilMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#F6F4F0', roughness: 0.9 }), []);

  useEffect(() => () => [glass, profile, fixture, steel, ceilMat].forEach((m) => m.dispose()), [glass, profile, fixture, steel, ceilMat]);
  useEffect(() => () => [backMat, sideMat, floorMat].forEach((m) => (m.map?.dispose(), m.dispose())), [backMat, sideMat, floorMat]);
  useEffect(() => () => (wallTex.dispose(), floorTex.dispose()), [wallTex, floorTex]);

  // folha móvel: desliza (correr, canto, teto) ou gira (abrir)
  const leaf = useRef<THREE.Group>(null);
  const progress = useRef(open ? 1 : 0);
  const { invalidate } = useThree();
  useEffect(() => invalidate(), [open, invalidate, c]);

  const leafW = W / 2 + 0.035; // cada folha passa um pouco da metade, para sobrepor
  const slide = W / 2 - 0.1;
  const fixW = W * 0.42;
  const doorW = W - fixW - 0.008;

  useFrame((_, dt) => {
    const target = open ? 1 : 0;
    const d = target - progress.current;
    if (Math.abs(d) < 0.0005) progress.current = target;
    else {
      progress.current += instant ? d : d * (1 - Math.exp(-dt * 4.2));
      invalidate();
    }
    const g = leaf.current;
    if (!g) return;
    // curva suave: arranca devagar, desliza e assenta
    const p = progress.current;
    if (isAbrir) g.rotation.y = -p * 1.2;
    else g.position.x = W / 4 - p * slide;
  });

  const railY = H - 0.024; // centro do trilho superior
  const panelBottom = 0.012;
  const panelTop = isTeto ? H - 0.05 : H - 0.04;
  const panelH = panelTop - panelBottom;
  const panelY = panelBottom + panelH / 2;
  const showerX = isCanto ? -W * 0.22 : -W * 0.25;

  return (
    <group>
      {/* ---------- banheiro ---------- */}
      {/* parede do fundo */}
      <mesh material={backMat} position={[(backW - W) / 2, wallH / 2, -depth]} receiveShadow>
        <planeGeometry args={[backW, wallH]} />
      </mesh>
      {/* parede esquerda */}
      <mesh material={sideMat} position={[-W / 2, wallH / 2, (front - depth) / 2]} rotation-y={Math.PI / 2} receiveShadow>
        <planeGeometry args={[depth + front, wallH]} />
      </mesh>
      {/* parede direita (no box de canto o lado direito é de vidro) */}
      {!isCanto && (
        <>
          <mesh material={sideMat} position={[W / 2, wallH / 2, (front - depth) / 2]} rotation-y={-Math.PI / 2} receiveShadow>
            <planeGeometry args={[depth + front, wallH]} />
          </mesh>
        </>
      )}
      {/* piso: área do banho e o banheiro na frente */}
      <mesh material={floorMat} position={[(backW - W) / 2, 0, (1.2 - depth) / 2]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[backW + 0.6, depth + 1.2]} />
      </mesh>
      {/* teto, no box até o teto */}
      {isTeto && (
        <mesh material={ceilMat} position={[(backW - W) / 2, H, (front - depth) / 2]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[backW + 0.2, depth + front]} />
        </mesh>
      )}

      {/* ralo linear junto à parede do fundo */}
      <RoundedBox args={[Math.min(W * 0.7, 0.8), 0.004, 0.065]} radius={0.0015} smoothness={2} material={steel} position={[showerX + W * 0.2, 0.002, -depth + 0.1]} receiveShadow />
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={i} position={[showerX + W * 0.2 - Math.min(W * 0.7, 0.8) / 2 + 0.03 + i * ((Math.min(W * 0.7, 0.8) - 0.06) / 13), 0.0042, -depth + 0.1]}>
          <boxGeometry args={[0.006, 0.0005, 0.045]} />
          <meshStandardMaterial color="#8d8c88" metalness={1} roughness={0.4} />
        </mesh>
      ))}

      {/* chuveiro quadrado de parede e registro */}
      <Shower x={showerX} z={-depth} y={Math.min(wallH - 0.12, 2.15)} material={fixture} ceiling={isTeto ? H : undefined} />
      <Valve x={showerX} z={-depth} y={1.1} material={fixture} />

      {/* ---------- box ---------- */}
      {isAbrir ? (
        <>
          {/* perfil U na parede e no piso da folha fixa */}
          <RoundedBox args={[0.02, H - 0.02, 0.026]} radius={0.004} smoothness={3} material={profile} position={[-W / 2 + 0.01, H / 2, 0]} castShadow />
          <RoundedBox args={[fixW, 0.02, 0.026]} radius={0.004} smoothness={3} material={profile} position={[-W / 2 + fixW / 2, 0.01, 0]} castShadow />
          {/* perfil de vedação com ímã na parede da direita */}
          <RoundedBox args={[0.018, H - 0.02, 0.022]} radius={0.004} smoothness={3} material={profile} position={[W / 2 - 0.009, H / 2, 0]} castShadow />
          {/* folha fixa */}
          <RoundedBox args={[fixW - 0.012, H - 0.03, GLASS]} radius={R_GLASS} smoothness={3} material={glass} position={[-W / 2 + fixW / 2 + 0.006, H / 2 + 0.008, 0]} />
          {/* barra de sustentação: do topo da folha fixa até a parede do fundo */}
          <mesh material={profile} position={[-W / 2 + fixW - 0.12, H - 0.06, -depth / 2]} rotation-x={Math.PI / 2} castShadow>
            <cylinderGeometry args={[0.0095, 0.0095, depth, 24]} />
          </mesh>
          <RoundedBox args={[0.04, 0.035, 0.03]} radius={0.006} smoothness={3} material={profile} position={[-W / 2 + fixW - 0.12, H - 0.06, 0]} castShadow />
          <mesh material={profile} position={[-W / 2 + fixW - 0.12, H - 0.06, -depth + 0.006]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.028, 0.028, 0.012, 32]} />
          </mesh>
          {/* porta, girando nas dobradiças junto à folha fixa */}
          <group ref={leaf} position={[-W / 2 + fixW + 0.002, 0, 0]}>
            <RoundedBox args={[doorW - 0.016, H - 0.04, GLASS]} radius={R_GLASS} smoothness={3} material={glass} position={[doorW / 2, H / 2 + 0.012, 0]} />
            <Handle material={profile} x={doorW - 0.1} y={H * 0.5} />
          </group>
          {/* dobradiças vidro-vidro: ficam fixas, abraçando as duas folhas */}
          {[0.28, H - 0.3].map((y) => (
            <RoundedBox key={y} args={[0.13, 0.06, 0.024]} radius={0.007} smoothness={3} material={profile} position={[-W / 2 + fixW + 0.002, y, 0]} castShadow />
          ))}
        </>
      ) : (
        <>
          {/* trilho superior com a frente arredondada e guia inferior */}
          <RoundedBox args={[isCanto ? W + 0.012 : W, 0.048, 0.064]} radius={0.008} smoothness={4} material={profile} position={[isCanto ? 0.006 : 0, railY, 0]} castShadow />
          <RoundedBox args={[W, 0.014, 0.046]} radius={0.004} smoothness={3} material={profile} position={[0, 0.007, 0]} castShadow />
          {/* perfis U nas paredes */}
          <RoundedBox args={[0.02, H - 0.06, 0.03]} radius={0.004} smoothness={3} material={profile} position={[-W / 2 + 0.01, H / 2, -GAP / 2]} castShadow />
          {!isCanto && <RoundedBox args={[0.02, H - 0.06, 0.03]} radius={0.004} smoothness={3} material={profile} position={[W / 2 - 0.01, H / 2, GAP / 2]} castShadow />}
          {/* tope de fim de curso no trilho */}
          <RoundedBox args={[0.022, 0.03, 0.03]} radius={0.005} smoothness={3} material={profile} position={[-W / 2 + 0.07, railY - 0.04, GAP / 2]} />

          {/* folha fixa (de trás) */}
          <RoundedBox args={[leafW, panelH, GLASS]} radius={R_GLASS} smoothness={3} material={glass} position={[-W / 2 + 0.006 + leafW / 2, panelY, -GAP / 2]} />

          {/* folha de correr (da frente) com roldanas aparentes e puxador */}
          <group ref={leaf} position={[W / 4, 0, GAP / 2]}>
            <RoundedBox args={[leafW, panelH, GLASS]} radius={R_GLASS} smoothness={3} material={glass} position={[W / 4 - 0.006 - leafW / 2, panelY, 0]} />
            {[-leafW / 2 + 0.13, leafW / 2 - 0.09].map((x) => (
              <Roller key={x} x={x} y={railY - 0.045} material={profile} />
            ))}
            <Handle material={profile} x={-leafW / 2 + 0.08} y={H * 0.5} />
          </group>

          {/* box de canto: lado fixo de vidro até a parede do fundo e a cantoneira */}
          {isCanto && (
            <>
              <RoundedBox args={[GLASS, panelH, B - 0.04]} radius={R_GLASS} smoothness={3} material={glass} position={[W / 2, panelY, -B / 2 - 0.01]} />
              <RoundedBox args={[0.064, 0.048, B]} radius={0.008} smoothness={4} material={profile} position={[W / 2, railY, -B / 2]} castShadow />
              <RoundedBox args={[0.046, 0.014, B]} radius={0.004} smoothness={3} material={profile} position={[W / 2, 0.007, -B / 2]} castShadow />
              <RoundedBox args={[0.03, H, 0.03]} radius={0.006} smoothness={3} material={profile} position={[W / 2, H / 2, 0]} castShadow />
              <RoundedBox args={[0.03, H - 0.06, 0.02]} radius={0.004} smoothness={3} material={profile} position={[W / 2, H / 2, -B + 0.01]} castShadow />
            </>
          )}
        </>
      )}
    </group>
  );
}

/** Roldana aparente: placa arredondada dos dois lados do vidro, com a tampa do parafuso. */
function Roller({ x, y, material }: { x: number; y: number; material: THREE.Material }) {
  return (
    <group position={[x, y, 0]}>
      {[1, -1].map((s) => (
        <group key={s} position={[0, 0, s * (GLASS / 2 + 0.004)]}>
          <RoundedBox args={[0.085, 0.058, 0.008]} radius={0.0035} smoothness={3} material={material} castShadow />
          <mesh material={material} position={[0, 0.002, s * 0.006]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.012, 0.012, 0.006, 32]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Puxador H: dois tubos, um de cada lado do vidro, unidos por pinos que atravessam a folha. */
function Handle({ material, x, y }: { material: THREE.Material; x: number; y: number }) {
  const len = 0.42;
  const off = 0.042;
  return (
    <group position={[x, y, 0]}>
      {[1, -1].map((s) => (
        <group key={s}>
          <mesh material={material} position={[0, 0, s * off]} castShadow>
            <cylinderGeometry args={[0.0105, 0.0105, len, 32]} />
          </mesh>
          {/* tampas arredondadas nas pontas */}
          {[len / 2, -len / 2].map((dy) => (
            <mesh key={dy} material={material} position={[0, dy, s * off]}>
              <sphereGeometry args={[0.0105, 24, 12]} />
            </mesh>
          ))}
        </group>
      ))}
      {[-len / 2 + 0.05, len / 2 - 0.05].map((dy) => (
        <mesh key={dy} material={material} position={[0, dy, 0]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.007, 0.007, off * 2, 16]} />
        </mesh>
      ))}
    </group>
  );
}

/** Chuveiro quadrado: braço saindo da parede (ou do teto) e a ducha de 25 cm. */
function Shower({ x, y, z, material, ceiling }: { x: number; y: number; z: number; material: THREE.Material; ceiling?: number }) {
  const arm = 0.34;
  const headY = ceiling ? ceiling - 0.32 : y - 0.04;
  return (
    <group>
      {ceiling ? (
        <mesh material={material} position={[x, ceiling - 0.15, z + arm]} castShadow>
          <cylinderGeometry args={[0.011, 0.011, 0.3, 24]} />
        </mesh>
      ) : (
        <>
          <mesh material={material} position={[x, y, z + 0.008]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.03, 0.03, 0.016, 32]} />
          </mesh>
          <mesh material={material} position={[x, y, z + arm / 2]} rotation-x={Math.PI / 2} castShadow>
            <cylinderGeometry args={[0.011, 0.011, arm, 24]} />
          </mesh>
          <mesh material={material} position={[x, y - 0.02, z + arm]} castShadow>
            <cylinderGeometry args={[0.011, 0.011, 0.04, 24]} />
          </mesh>
        </>
      )}
      <RoundedBox args={[0.25, 0.012, 0.25]} radius={0.004} smoothness={3} material={material} position={[x, headY, z + arm]} castShadow />
    </group>
  );
}

/** Registro: espelho redondo na parede e a alavanca. */
function Valve({ x, y, z, material }: { x: number; y: number; z: number; material: THREE.Material }) {
  return (
    <group position={[x, y, z]}>
      <mesh material={material} position={[0, 0, 0.006]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.045, 0.045, 0.012, 48]} />
      </mesh>
      <mesh material={material} position={[0, 0, 0.03]} rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.016, 0.018, 0.04, 32]} />
      </mesh>
      <RoundedBox args={[0.09, 0.014, 0.014]} radius={0.006} smoothness={3} material={material} position={[0.035, 0, 0.05]} castShadow />
    </group>
  );
}
