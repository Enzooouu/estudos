# Referência: fluid.glass

Estudo do site da Fluid Glass (vidraçaria estrutural no Reino Unido), feito em novembro de 2026
abrindo o site num navegador real, rolando cada página e medindo os estilos aplicados.
Site de destaque do dia no Awwwards em 30/03/2026, feito pelo estúdio Exo Ape.

O objetivo é aprender os padrões, não copiar: textos, fotos, logotipo e a fonte (Aeonik, licença
paga) são deles. A JEL Box mantém as cores e fontes do próprio manual.

## Tecnologia

- **Nuxt (Vue)** com conteúdo vindo do CMS **Storyblok**; imagens servidas pelo CDN do Storyblok
  já redimensionadas para cada tamanho de tela.
- **three.js** carregado (efeitos 3D/vidro) e rolagem suave própria: a página não rola pelo
  documento, e sim por um contêiner animado.
- Vídeos do Vimeo no topo e no showroom; mapa do Google; avaliações do Google.
- Tipografia fluida: todos os tamanhos derivam de `--font-s: calc(100vw / 1600 * 10)`, então a
  página inteira escala com a largura da tela.

## Sistema visual medido

| Item | Valor |
| --- | --- |
| Fonte de texto e títulos | Aeonik Pro 400 (quase tudo em peso regular) |
| Fonte de rótulos | Aeonik Mono 500, 10,8 px, MAIÚSCULAS, espaçamento 0,08 em |
| Título principal | 57,6 px, entrelinha 1,0, espaçamento −0,03 em, centralizado |
| Títulos de bloco | 36 px e 28,8 px, espaçamento −0,02 em |
| Texto corrido | 14,4 px, entrelinha 1,3 |
| Cores | preto `#0B1012`, grafite `#212325`, creme `#F3F0EC`, taupe `#D4CEC6`, amarelo `#F1A400` (só nas estrelas) |
| Cantos | retos em tudo; só as etiquetas de produto são arredondadas (18 px) |
| Vidro | `backdrop-filter: blur(18px)` com preto a 80% (barra e menu) ou branco a 20% (botão sobre foto) |
| Curvas | `ease-out-quart`, `ease-in-out-quart`, `ease-out-cubic` |

## Padrões que fazem o site

1. **Topo mínimo.** Só o nome centralizado e, à direita, "Get a quote" com uma seta de retorno (↳).
   Nada de lista de links no topo.
2. **Barra flutuante de vidro embaixo, no centro.** 248 × 45 px, vidro escuro: ícone da marca à
   esquerda, o nome da seção atual no meio (muda conforme a rolagem) e o botão de menu à direita.
   O menu abre um painel de vidro com links grandes, contatos e o botão de orçamento.
3. **Rótulo de seção + linha fina.** Cada seção abre com uma linha fina de ponta a ponta, um
   losango pequeno e um rótulo curto em maiúsculas ("◆ Glazing specialists"). Do lado direito,
   um parágrafo curto.
4. **Faixas alternadas escuro / creme.** O ritmo da página vem da troca de fundo inteiro, não de
   cartões.
5. **Frase grande centralizada.** "We bring architecture to life…" em quatro linhas, centralizada,
   com um botão pequeno embaixo. É o momento de respiro da página.
6. **Coleção em colagem.** Fotos de tamanhos diferentes espalhadas no grid, com o nome da categoria
   (Doors, Windows, Structural) escrito em branco sobre a foto.
7. **Lista de projetos.** Linhas com o nome do projeto, etiquetas dos produtos usados e uma seta.
   As linhas ficam esmaecidas e escurecem no hover; as fotos aparecem logo abaixo.
8. **Prova social real.** Carrossel de avaliações do Google (5,0 / 59 avaliações).
9. **Chamada emoldurada.** "Every great build begins with understanding" dentro de uma caixa de
   linha fina, com linhas diagonais desenhando um painel em perspectiva no canto.
10. **Rodapé em foto cheia.** O nome gigante translúcido atrás, e o painel de vidro do menu aberto
    no centro, com contatos e botão.
11. **Botões pequenos e retos.** Fundo escuro, texto em maiúsculas pequenas com espaçamento, ícone
    de seta de retorno (↳). Variação de vidro (branco 20% + desfoque) sobre fotos.
12. **Páginas de projeto.** Título centralizado, ficha técnica em tabela (categoria, produto,
    catálogo em PDF), pares de fotos de tamanhos diferentes e texto em duas colunas (título à
    esquerda, texto à direita).

## O que foi aplicado na JEL Box

- Topo mínimo com o nome no centro e "Pedir orçamento" à direita.
- Barra flutuante de vidro com a seção atual e o menu em painel de vidro.
- Rótulos de seção com quadrado (forma geométrica do manual, no lugar do losango) e linha fina.
- Botões retos e compactos com a seta de retorno, em âmbar (ação) e azul profundo.
- Produtos em lista de linhas com etiquetas, no lugar das abas.
- "Sobre" como frase grande centralizada.
- Chamada emoldurada com linhas arquitetônicas em perspectiva.
- Rodapé com o nome gigante translúcido e o painel de vidro do menu no centro.
- Rolagem suave com Lenis (desligada quando o sistema pede menos movimento).

## O que depende da JEL Box

- **Fotos e vídeo das obras.** É o que mais pesa no site deles: foto ou vídeo em tela cheia no
  topo, colagem na coleção, foto cheia no rodapé. Com fotos reais, os desenhos técnicos passam a
  ser o complemento e não o conteúdo principal.
- **Avaliações reais do Google**, para uma seção de depoimentos.
- **Páginas de obras** com ficha técnica, no modelo das páginas de projeto deles.
