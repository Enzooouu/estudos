# Imagem do topo (render)

`HeroRender.tsx` é a cena three.js de uma porta de correr
em alumínio e vidro, ilustrativa, sobre o azul profundo da marca. Hoje não está em uso no site (o topo usa uma foto); fica aqui para gerar imagens ilustrativas quando precisar.

Para gerar de novo (por exemplo, mudando a cor do perfil):

1. Crie `src/app/render-hero/page.tsx` com:
   ```tsx
   'use client';
   import dynamic from 'next/dynamic';
   const HeroRender = dynamic(() => import('../../../tools/render-hero/HeroRender'), { ssr: false });
   export default function Page() { return <HeroRender />; }
   ```
2. `npm run build`, sirva a pasta `out/` e capture `/render-hero/` numa janela de 1400 × 1640.
3. Salve como AVIF, WebP e JPG em `public/media/`, cadastre em `src/content/media.ts` e apague `src/app/render-hero/`.
