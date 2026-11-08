# JEL Box — site

Site estático (HTML, CSS e JS puros) da JEL Box, vidraçaria e serralheria, seguindo o manual
de identidade visual (cores, Unbounded + Onest, linhas arquitetônicas, transparências em azul,
formas retas e ícones outline).

Abra `index.html` no navegador; não há etapa de build.

## Estrutura

- `index.html` — conteúdo e desenhos técnicos (SVG) de cada produto
- `css/style.css` — tokens da marca em `:root` e todos os estilos
- `js/main.js` — menu, abas de produtos, "Monte seu box", animações de rolagem
- `assets/favicon.svg` — marca (moldura parcialmente aberta)

## Antes de publicar

Troque os dados de exemplo:

- WhatsApp e e-mail: objeto `JEL` no topo de `js/main.js` (e o `mailto:`/`tel:` em `index.html`)
- Telefone `(00) 00000-0000`, `@jelbox`, "Endereço da loja" e horários em `index.html`
- Confira os textos técnicos (normas ABNT citadas, cores de perfil e tipos de vidro oferecidos)

## Fotos

O site usa desenhos técnicos no lugar de fotos. Quando houver fotos reais de obras da JEL Box,
elas podem entrar no lugar dos desenhos da seção "O que fazemos" e das etapas de "Como trabalhamos".
