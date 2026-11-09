# Mídias, placeholders e 3D

## Como trocar um placeholder pela mídia definitiva

Todas as fotos, vídeos e modelos 3D do site estão cadastrados em `src/content/media.ts`.
Cada entrada tem um id, o tipo, a proporção e a descrição do que deve ser fotografado.

1. Salve o arquivo em `public/media/` com o nome do id.
2. Preencha `src` na entrada (e `poster`, `sources` e `alt`, quando houver).
3. Rode `npm run build`. Nenhuma seção precisa ser alterada.

Exemplo de foto:

```ts
'projeto-box-banheiro-01': {
  ...,
  src: '/media/projeto-box-banheiro-01.jpg',
  sources: { avif: '/media/projeto-box-banheiro-01.avif', webp: '/media/projeto-box-banheiro-01.webp' },
  alt: 'Box de correr com perfil preto em banheiro com revestimento cinza',
},
```

Exemplo de vídeo (o site procura também `hero-principal.webm` ao lado do MP4):

```ts
'hero-principal': { ..., src: '/media/hero-principal.mp4', poster: '/media/hero-principal.avif' },
```

Para as obras, preencha também `titulo`, `local` e `ano` na lista `projects` de `src/content/site.ts`.

## Lista de mídias a fornecer

| Id | Tipo | Proporção | Onde aparece | Conteúdo esperado |
| --- | --- | --- | --- | --- |
| `hero-principal` | Vídeo | 16:9 | Fundo do topo, sob a sobreposição azul | 10 a 15 s em loop: folha de vidro deslizando num box ou porta instalada, luz natural, câmera parada |
| `servico-box-banheiro` | Imagem do produto | 3:2 | Produtos | Box instalado, de frente, com perfil e puxador |
| `servico-esquadrias` | Imagem do produto | 3:2 | Produtos | Janela ou porta de correr instalada, vista de dentro |
| `servico-guarda-corpos` | Imagem do produto | 3:2 | Produtos | Guarda-corpo em sacada ou escada, perfil de base visível |
| `servico-espelhos` | Imagem do produto | 3:2 | Produtos | Espelho lapidado ou bisotado sobre bancada |
| `servico-coberturas` | Imagem do produto | 3:2 | Produtos | Cobertura de vidro vista de baixo, com estrutura |
| `servico-serralheria` | Imagem do produto | 3:2 | Produtos | Portão ou estrutura metálica pintada |
| `projeto-box-banheiro-01` | Foto do projeto | 4:5 | Obras | Box executado, ambiente completo, vertical |
| `projeto-esquadria-01` | Foto do projeto | 3:2 | Obras | Fachada ou sala com portas de correr |
| `projeto-guarda-corpo-01` | Foto do projeto | 4:5 | Obras | Guarda-corpo em sacada, escada ou mezanino |
| `projeto-cobertura-01` | Foto do projeto | 1:1 | Obras | Cobertura de vidro vista de baixo |
| `projeto-serralheria-01` | Foto do projeto | 3:2 | Obras | Portão ou estrutura vista da rua |
| `video-institucional` | Vídeo | 16:9 | A JEL Box por dentro | 20 a 40 s: corte, lapidação, montagem e instalação |
| `empresa-equipe` | Foto da equipe | 4:5 | A JEL Box por dentro | Equipe uniformizada em obra ou na oficina |
| `empresa-oficina` | Foto da empresa | 3:2 | A JEL Box por dentro | Fachada da loja ou interior da oficina |
| `modelo-3d-esquadria` | Modelo 3D (.glb) | 4:5 | Monte seu box | Modelo do kit de box ou esquadria do fabricante dos perfis |

## Formatos e peso

- **Fotos:** AVIF ou WebP, com JPG de reserva; até 2400 px no lado maior; 150 a 400 KB cada.
- **Vídeos:** MP4 (H.264) e WebM, sem áudio, 1920 × 1080, até ~4 MB; poster em AVIF/WebP.
  O vídeo do topo é o único que carrega de imediato; os demais carregam só os metadados.
- **Modelo 3D:** `.glb` com compressão Draco, até ~1,5 MB, texturas de no máximo 1024 px,
  unidades em metros e origem no centro do piso.

## A experiência 3D

Arquivos em `src/components/three/` e `src/components/BoxViewer.tsx`.

- **O quê:** o box escolhido no "Monte seu box", em 3D, com vidro de transmissão física
  (índice de refração 1,52), perfil metálico na cor escolhida, reflexos de um estúdio de luz
  gerado no navegador (sem baixar HDR) e sombra de contato.
- **Interação:** arrastar para girar (computador), folha que abre e fecha, troca de modelo,
  medidas, vidro e perfil em tempo real. A cena gira levemente com a rolagem da seção.
- **Desempenho:**
  - three.js, React Three Fiber e drei (~286 KB comprimidos) só são baixados quando a seção chega
    a 400 px da tela;
  - a cena só desenha quadros quando algo muda (`frameloop="demand"`), então parada ou fora da
    tela não usa a GPU;
  - densidade de pixels limitada a 1,75 e sombra calculada uma vez por mudança;
  - enquanto carrega, aparece o desenho técnico no mesmo espaço;
  - sem WebGL, com economia de dados ligada ou com até 2 GB de memória, o site mostra o desenho
    técnico.
- **Toque:** em celulares, arrastar o dedo rola a página normalmente; o modelo gira com a rolagem.
- **Movimento reduzido:** sem giro pela rolagem e sem animação da folha.
- **Modelo definitivo:** preencha `src` em `modelo-3d-esquadria`; o visualizador carrega o `.glb`
  no lugar do modelo gerado pelas medidas.
