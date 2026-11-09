# Imagem do topo (render)

`HeroRender.tsx` é a cena three.js que gera `public/media/hero-principal.*`: uma porta de correr
em alumínio e vidro, ilustrativa, sobre o azul profundo da marca.

Para gerar de novo (por exemplo, mudando a cor do perfil):

1. Crie `src/app/render-hero/page.tsx` com:
   ```tsx
   'use client';
   import dynamic from 'next/dynamic';
   const HeroRender = dynamic(() => import('../../../tools/render-hero/HeroRender'), { ssr: false });
   export default function Page() { return <HeroRender />; }
   ```
2. `npm run build`, sirva a pasta `out/` e capture `/render-hero/` numa janela de 1400 × 1640.
3. Salve como AVIF, WebP e JPG em `public/media/` e apague `src/app/render-hero/`.

Quando houver foto ou vídeo real para o topo, troque os arquivos e o texto alternativo em
`src/content/media.ts` (entrada `hero-principal`).
