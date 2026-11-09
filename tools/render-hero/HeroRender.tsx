'use client';

/**
 * Página temporária só para gerar a imagem do topo (não é publicada).
 * Uma porta de correr em alumínio e vidro, em ângulo, sobre o azul profundo.
 */
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

const W = 1.5; // largura do vão (m)
const H = 2.5;
const P = 0.055; // perfil do marco
const L = 0.04; // perfil da folha
const GLASS = 0.01;

const alu = new THREE.MeshStandardMaterial({ color: '#2a3036', metalness: 0.9, roughness: 0.26, envMapIntensity: 1.6 });
const glass = new THREE.MeshPhysicalMaterial({
  transmission: 1,
  thickness: 0.02,
  ior: 1.52,
  roughness: 0.02,
  color: '#eef8fb',
  attenuationColor: '#bfe3dc',
  attenuationDistance: 1.5,
  envMapIntensity: 2.6,
  clearcoat: 1,
  clearcoatRoughness: 0.03,
});

function Bar({ args, position }: { args: [number, number, number]; position: [number, number, number] }) {
  return (
    <mesh material={alu} position={position}>
      <boxGeometry args={args} />
    </mesh>
  );
}

function Leaf({ x, z }: { x: number; z: number }) {
  const w = W / 2 + 0.04;
  const h = H - 2 * P - 0.01;
  return (
    <group position={[x, P + h / 2 + 0.005, z]}>
      <Bar args={[w, L, 0.05]} position={[0, h / 2 - L / 2, 0]} />
      <Bar args={[w, L * 1.6, 0.05]} position={[0, -h / 2 + L * 0.8, 0]} />
      <Bar args={[L, h, 0.05]} position={[-w / 2 + L / 2, 0, 0]} />
      <Bar args={[L, h, 0.05]} position={[w / 2 - L / 2, 0, 0]} />
      {/* travessa no terço: o desenho de esquadria "linha fina" */}
      <Bar args={[w - 2 * L, 0.022, 0.03]} position={[0, h * 0.18, 0]} />
      <mesh material={glass}>
        <boxGeometry args={[w - 2 * L, h - 2.6 * L, GLASS]} />
      </mesh>
    </group>
  );
}

function SlidingDoor() {
  return (
    <group rotation={[0, -0.52, 0]} position={[0.2, 0, 0]}>
      {/* marco */}
      <Bar args={[W + 2 * P, P, 0.12]} position={[0, H - P / 2, 0]} />
      <Bar args={[W + 2 * P, P, 0.12]} position={[0, P / 2, 0]} />
      <Bar args={[P, H, 0.12]} position={[-W / 2 - P / 2, H / 2, 0]} />
      <Bar args={[P, H, 0.12]} position={[W / 2 + P / 2, H / 2, 0]} />
      {/* folha fixa atrás e folha de correr na frente, entreaberta */}
      <Leaf x={W / 4 - 0.01} z={-0.028} />
      <Leaf x={-W / 4 + 0.01 + 0.34} z={0.028} />
      {/* puxador âmbar discreto: a cor de ação da marca */}
      <mesh position={[-W / 4 + 0.35 - W / 4 + 0.07, H * 0.48, 0.07]}>
        <boxGeometry args={[0.018, 0.42, 0.018]} />
        <meshStandardMaterial color="#f5a623" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

/** Mancha de luz com queda suave (textura gerada no navegador). */
function glow() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const r = g.createRadialGradient(256, 256, 10, 256, 256, 256);
  r.addColorStop(0, '#c4e2f0');
  r.addColorStop(0.3, '#6f9fc2');
  r.addColorStop(0.7, '#21496a');
  r.addColorStop(1, '#12344d');
  g.fillStyle = r;
  g.fillRect(0, 0, 512, 512);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function HeroRender() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#12344d' }}>
      <Canvas
        dpr={1}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        camera={{ fov: 24, position: [1.4, 1.0, 7.4] }}
        onCreated={({ gl, camera, scene }) => {
          gl.toneMapping = THREE.NeutralToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.background = new THREE.Color('#12344d');
          // névoa na cor do fundo: o piso some no horizonte, sem linha dura
          scene.fog = new THREE.Fog("#12344d", 6.5, 13);
          camera.lookAt(0, 1.15, 0);
        }}
      >
        <SlidingDoor />
        {/* piso escuro que espelha a esquadria, como pedra polida */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[30, 30]} />
          <MeshReflectorMaterial
            blur={[400, 120]}
            resolution={1024}
            mixBlur={1}
            mixStrength={3}
            roughness={0.85}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color="#0d2a40"
            metalness={0.4}
            mirror={0.6}
          />
        </mesh>
        {/* claridade suave atrás da esquadria, como luz do dia entrando: o vidro aparece contra ela */}
        <mesh position={[-0.4, 1.7, -3.8]} rotation={[0, -0.3, 0]}>
          <planeGeometry args={[10.5, 8.5]} />
          <meshBasicMaterial map={glow()} toneMapped={false} fog={false} />
        </mesh>
        <Environment resolution={512} frames={1}>
          <Lightformer form="rect" intensity={6} position={[-1.6, 2, 5]} rotation-y={Math.PI} scale={[0.4, 7, 1]} />
          <Lightformer form="rect" intensity={4} position={[1.2, 2, 5.5]} rotation-y={Math.PI} scale={[0.18, 7, 1]} />
          <Lightformer form="rect" intensity={2.5} position={[0, 5, 1]} rotation-x={Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#d6eef7" position={[-4, 1.5, 0]} rotation-y={Math.PI / 2} scale={[3, 5, 1]} />
          <Lightformer form="rect" intensity={0.8} color="#f5a623" position={[3, 0.3, 3]} rotation-y={-Math.PI / 3} scale={[2, 0.3, 1]} />
        </Environment>
        <ambientLight intensity={0.25} />
        <directionalLight position={[-3, 5, 4]} intensity={1.2} />
      </Canvas>
    </div>
  );
}
