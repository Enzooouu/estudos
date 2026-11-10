# JEL Box — site

Site da JEL Box, vidraçaria e serralheria, seguindo o manual de identidade visual
(Unbounded + Onest, linhas arquitetônicas, paleta de cinzas, bege e branco com bronze nas ações,
cantos arredondados e
ícones outline).

## Stack

- **Next.js 16** (App Router) com **React 19** e **TypeScript**
- **Tailwind CSS 4**: tokens da marca em `@theme` (`src/app/globals.css`)
- **Motion** (`motion/react`, antigo Framer Motion) para entradas e efeitos de rolagem
- **Lenis** para a rolagem suave
- **three.js + React Three Fiber + drei** para o box em 3D do "Monte seu box", carregados sob demanda
- Exportação estática (`output: 'export'`): o build gera HTML pronto em `out/`, que pode ser
  hospedado em qualquer servidor estático (Vercel, Netlify, Cloudflare Pages, hospedagem comum)

## Comandos

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # gera o site estático em out/
npm run typecheck  # checagem de tipos
```

## Estrutura

```
src/
  app/
    layout.tsx       fontes (next/font), metadados, SEO
    page.tsx         página + dados estruturados (JSON-LD)
    globals.css      tokens da marca e estilos dos desenhos técnicos
    sitemap.ts, robots.ts, icon.svg
  components/        Hero, TopBar, Products, Process, BoxBuilder,
                     About, Faq, CtaFrame, Contact, Footer…
    drawings/        desenhos técnicos (SVG) dos produtos e das etapas
  content/site.ts    textos, produtos, dúvidas e dados de contato
  lib/box.ts         regras do "Monte seu box"
```

## Referência de design

O estudo do site fluid.glass (tecnologia verificada no código, medidas, padrões e decisões)
está em `docs/referencia-fluid-glass.md`.

## Mídias e 3D

Fotos, vídeos e o modelo 3D ficam cadastrados em `src/content/media.ts`. Enquanto um arquivo não
existe, o site mostra um placeholder com a proporção certa e a descrição do que deve entrar ali.
O passo a passo para trocar, a lista completa e os formatos estão em `docs/midias-e-3d.md`.

## Efeito de vidro

O `expo-glass-effect` não é usado: ele depende de `expo` e `react-native`, e fora do iOS seu
`GlassView` é só uma `View` sem efeito. No lugar, o vidro é feito em CSS (`.glass-pane`):
`backdrop-filter` com desfoque e tom cinza translúcido, com recuo para cinza sólido quando o
navegador não suporta desfoque ou quando o usuário pede menos transparência.

## Acessibilidade e movimento

- Abas de produtos com teclado (setas, Home, End) e papéis ARIA
- "Reduzir movimento" do sistema desliga entradas e efeitos de rolagem
- Sem JavaScript, todo o conteúdo continua visível

## Antes de publicar

Troque os dados marcados como `EXEMPLO` em `src/content/site.ts`: endereço do site, WhatsApp,
telefone, e-mail, Instagram, endereço da loja e horários. Confira também os textos técnicos
(normas ABNT citadas, cores de perfil e tipos de vidro oferecidos).


## Blog

A página `/blog/` mostra o artigo mais recente em destaque no topo e os anteriores numa grade de
3 colunas, 12 por página; com mais de 12, aparecem as páginas 1, 2, 3… (`/blog/pagina/2/`, …). Cada artigo é um arquivo Markdown em `src/content/blog/`, e o nome do arquivo
vira o endereço (`como-medir-o-vao-do-box.md` → `/blog/como-medir-o-vao-do-box/`).

Para publicar um artigo, crie o arquivo com este cabeçalho e rode `npm run build`:

```md
---
titulo: Título do artigo
descricao: Uma ou duas frases, usadas na lista e no Google
data: 2026-11-09
capa: /media/blog/nome-da-foto.jpg   (opcional)
produto: box   (opcional: box, espelhos, janelas ou divisorias)
rascunho: sim   (opcional: o artigo não aparece no site)
---

Texto do artigo em Markdown: ## para subtítulos, **negrito**, listas com - e tabelas.
```

Cada artigo ganha título e descrição próprios no Google, dados estruturados de artigo
(`BlogPosting`) e entra sozinho no `sitemap.xml`.
