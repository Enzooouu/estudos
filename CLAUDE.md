# Regras do projeto (site da JEL Box)

## Nome da marca
Sempre **JEL BOX**, em maiúsculas, em todo texto do site (rótulos, títulos, botões, mensagens de
WhatsApp, títulos das páginas). Exceção: avaliações de clientes, que ficam como foram escritas.

## Rótulos
Os rótulos acima dos títulos ficam em texto normal (16 px, sem maiúsculas nem espaçamento
extra), não em caixa-alta espaçada.

## Cores
A paleta é de cinzas, bege e branco, com o bronze só nos botões de ação e destaques. **Não usar
azul.** Use sempre os tokens de `src/app/globals.css` (`deep`, `graphite`, `glass`, `muted`,
`ice`, `frost`, `bronze`) em vez de cores soltas.

## Cantos arredondados
Nada no site fica com canto vivo. Todo elemento com fundo, borda ou imagem leva pelo menos um
arredondado mínimo, usando os tokens de `src/app/globals.css`:

- `--r-sm` (4 px): botões, etiquetas, controles, amostras de cor
- `--r` (8 px): fotos, vídeos, quadros, cartões, mapas, espaços reservados
- painéis com elementos arredondados dentro: pela regra abaixo

### Cantos concêntricos: raio externo = raio interno + respiro
Quando um elemento arredondado fica dentro de outro (botão dentro de painel, botões dentro de um
seletor), o raio de fora é o raio de dentro somado à distância entre as bordas:
`raio externo = raio interno + padding`. Assim as curvas ficam paralelas. Calcule com `calc()` a
partir dos tokens, por exemplo `rounded-[calc(var(--r-sm)+20px)]` num painel com `p-5` que tem
botões de `--r-sm`. No site:

- menu do topo: botão 4 px + respiro 20 px = 24 px
- painel do rodapé: botão 4 px + respiro 32 px = 36 px
- seletor 3D/Desenho: botões 3 px + respiro 4 px = 7 px; quadro do box: 7 px + respiro do quadro
- chamada emoldurada: botões 4 px + respiro do quadro

Se o elemento de dentro não encosta no canto (fica no meio do bloco), a regra não se aplica.

Exceções: elementos que ocupam a largura toda da tela (foto do topo, faixas de seção, rodapé) e
linhas finas.

## Commits
Os commits saem em nome do Enzo, com o Claude como coautor.
