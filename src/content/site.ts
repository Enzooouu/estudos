import type { MediaId } from './media';

/**
 * Dados da JEL Box em um só lugar.
 * Os valores marcados com "EXEMPLO" precisam ser trocados antes de publicar.
 */
export const site = {
  name: 'JEL Box',
  description:
    'Box de banheiro, janelas, portas, guarda-corpos, espelhos e serralheria em vidro temperado e alumínio, medidos no local e instalados pela nossa equipe.',
  url: 'https://www.jelbox.com.br', // EXEMPLO
  whatsapp: '5500000000000', // EXEMPLO: DDI + DDD + número, só dígitos
  phoneDisplay: '(00) 00000-0000', // EXEMPLO
  phoneHref: 'tel:+5500000000000', // EXEMPLO
  email: 'contato@jelbox.com.br', // EXEMPLO
  instagram: { handle: '@jelbox', url: 'https://instagram.com/' }, // EXEMPLO
  address: 'Endereço da loja', // EXEMPLO
  hours: ['Seg a sex, 8h às 18h', 'Sábado, 8h às 12h'], // EXEMPLO
} as const;

export const waLink = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

/** Seções da página: o menu usa todas; a barra flutuante mostra a seção atual. */
export const sections = [
  { id: 'topo', label: 'Início' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'obras', label: 'Obras' },
  { id: 'processo', label: 'Como trabalhamos' },
  { id: 'monte', label: 'Monte seu box' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'oficina', label: 'A JEL Box por dentro' },
  { id: 'duvidas', label: 'Dúvidas' },
  { id: 'contato', label: 'Contato' },
] as const;

export const nav = sections.slice(1);

export type ProductId = 'box' | 'janelas' | 'guarda' | 'espelhos' | 'coberturas' | 'serralheria';

/** Imagem de cada linha de produto no cadastro de mídias. */
export const productMedia: Record<ProductId, MediaId> = {
  box: 'servico-box-banheiro',
  janelas: 'servico-esquadrias',
  guarda: 'servico-guarda-corpos',
  espelhos: 'servico-espelhos',
  coberturas: 'servico-coberturas',
  serralheria: 'servico-serralheria',
};

/**
 * Obras executadas. Preencha `titulo` e `local` quando houver fotos reais;
 * enquanto vazios, a legenda mostra só a categoria.
 */
export const projects: { media: MediaId; categoria: string; titulo?: string; local?: string; ano?: string }[] = [
  { media: 'projeto-box-banheiro-01', categoria: 'Box de banheiro' },
  { media: 'projeto-esquadria-01', categoria: 'Esquadrias de alumínio' },
  { media: 'projeto-guarda-corpo-01', categoria: 'Guarda-corpo' },
  { media: 'projeto-cobertura-01', categoria: 'Cobertura de vidro' },
  { media: 'projeto-serralheria-01', categoria: 'Serralheria' },
];

export const products: {
  id: ProductId;
  name: string;
  text: string;
  specs: [string, string];
  /** etiquetas curtas mostradas na lista */
  tags: string[];
}[] = [
  {
    id: 'box',
    tags: ['Temperado 8 mm', 'Correr · abrir · canto'],
    name: 'Box de banheiro',
    text: 'Vidro temperado de 8 mm em kit de correr, de abrir ou de canto, com perfis de alumínio na cor que combinar com os metais do banheiro. Também fazemos o box até o teto, que segura o vapor dentro.',
    specs: ['Incolor, fumê, bronze ou jateado', 'Perfil preto, branco, natural ou dourado'],
  },
  {
    id: 'janelas',
    tags: ['Alumínio', 'Correr · maxim-ar'],
    name: 'Janelas e portas',
    text: 'Esquadrias de alumínio de correr, maxim-ar, camarão e pivotantes, com vidro comum, temperado ou laminado. Cada folha é feita para o vão medido, sem ajuste com massa.',
    specs: ['Linhas residenciais e linha suprema', 'Vedação com escovas e borrachas EPDM'],
  },
  {
    id: 'guarda',
    tags: ['Laminado', 'Sacadas · escadas'],
    name: 'Guarda-corpos',
    text: 'Para sacadas, escadas e mezaninos: vidro laminado temperado fixado em perfil de base ou em botões, com ou sem corrimão. Proteção que não tira a vista.',
    specs: ['Altura mínima de 1,10 m em sacadas', 'Corrimão em alumínio ou aço inox'],
  },
  {
    id: 'espelhos',
    tags: ['Lapidado', 'Bisotado'],
    name: 'Espelhos',
    text: 'Espelhos lapidados ou bisotados para banheiro, sala e academia, com recortes para tomadas e fixação por cola neutra ou presilhas.',
    specs: ['Espessuras de 3 e 4 mm', 'Com ou sem moldura de alumínio'],
  },
  {
    id: 'coberturas',
    tags: ['Laminado', 'Estrutura metálica'],
    name: 'Coberturas',
    text: 'Coberturas de vidro laminado para varandas, entradas e áreas de serviço, sobre estrutura metálica pintada, com a inclinação certa para a água correr.',
    specs: ['Vidro laminado, que não se solta se trincar', 'Calhas e rufos inclusos no projeto'],
  },
  {
    id: 'serralheria',
    tags: ['Aço', 'Portões · grades'],
    name: 'Serralheria',
    text: 'Portões, grades, escadas e estruturas em aço e alumínio, soldadas na oficina e pintadas antes de chegar à obra. Preparamos para motor quando o portão pede.',
    specs: ['Portões de correr, de giro e basculantes', 'Pintura eletrostática'],
  },
];

export const steps = [
  {
    id: 'medir',
    verb: 'Medir',
    text: 'Vamos até a obra e medimos o vão em três pontos de largura e de altura. Parede fora de esquadro aparece aqui, não no dia da instalação.',
  },
  {
    id: 'projetar',
    verb: 'Projetar',
    text: 'Com as medidas, desenhamos a peça: folgas, sobreposição das folhas, furos de ferragem e o perfil certo para o peso do vidro.',
  },
  {
    id: 'produzir',
    verb: 'Produzir',
    text: 'O vidro é cortado, lapidado e furado antes da têmpera, porque depois de temperado ele não aceita mais corte. Perfis e ferragens são separados por obra.',
  },
  {
    id: 'instalar',
    verb: 'Instalar',
    text: 'A mesma equipe que mediu instala, nivela, veda com silicone neutro e só sai depois de abrir e fechar cada folha com você.',
  },
] as const;

export const faq = [
  {
    q: 'Qual a espessura do vidro do box?',
    a: '8 mm de vidro temperado, que é o que a norma de box de banheiro (ABNT NBR 14207) pede. Se quebrar, ele se desfaz em pedaços pequenos, sem pontas cortantes.',
  },
  {
    q: 'Temperado ou laminado: qual a diferença?',
    a: 'O temperado é mais resistente a impacto e esfarela ao quebrar. O laminado tem uma película entre duas lâminas que segura os cacos no lugar, por isso vai em guarda-corpos e coberturas.',
  },
  {
    q: 'Posso mandar a medida eu mesmo?',
    a: 'Pode, para um orçamento inicial. Meça a largura em cima, no meio e embaixo, e a altura dos dois lados. Antes de produzir, nossa equipe confere tudo no local.',
  },
  {
    q: 'Quanto tempo leva da medição à instalação?',
    a: 'Depende da têmpera do vidro e do acabamento do perfil. Informamos o prazo junto com o orçamento, já contando a data da instalação.',
  },
  {
    q: 'Box até o teto vale a pena?',
    a: 'Ele segura o vapor dentro da área do banho, então o espelho e o resto do banheiro embaçam bem menos. Pede um exaustor ou uma janela na área do chuveiro.',
  },
  {
    q: 'Vocês fazem manutenção?',
    a: 'Sim: troca de roldanas, borrachas e puxadores, regulagem de portas e janelas que pararam de correr, e troca de vidro trincado.',
  },
] as const;
