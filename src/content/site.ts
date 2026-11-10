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
  address: 'R. Angatuba, 18 - Rochdale, Osasco - SP, 06223-080',
  /** endereço em partes, para os dados estruturados do Google */
  addressParts: { street: 'R. Angatuba, 18', district: 'Rochdale', city: 'Osasco', state: 'SP', zip: '06223-080' },
  hours: ['Seg a sex, 8h às 11h e 13h às 18h', 'Sábado e domingo, fechado'],
  /** horários para os dados estruturados do Google (seg a sex, com pausa para o almoço) */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '11:00' },
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '18:00' },
  ],
  /** página da JEL Box no Google (avaliações e mapa) */
  googleUrl: '', // EXEMPLO: link do perfil da empresa no Google
  /** endereço do mapa incorporado (Google Maps > Compartilhar > Incorporar um mapa > src do iframe) */
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent('R. Angatuba, 18 - Rochdale, Osasco - SP, 06223-080')}&output=embed`,
} as const;

/**
 * Avaliações reais do Google. Copie o texto como está, com o nome que o cliente usa no Google.
 * `count`: quantas avaliações a pessoa já fez no Google; `guide`: se ela é Local Guide.
 * `photo`: foto de perfil do cliente no Google, salva em public/media/avaliacoes/ (opcional;
 * sem foto, aparecem as iniciais do nome).
 * A primeira metade da lista vai para a faixa de cima e a segunda para a de baixo (18 → 9 + 9).
 * Enquanto a lista estiver vazia, a seção mostra um espaço reservado (nunca invente avaliações).
 */
export const reviews: {
  name: string;
  text: string;
  stars: 1 | 2 | 3 | 4 | 5;
  when?: string;
  count?: number;
  guide?: boolean;
  photo?: string;
}[] = [
  {
    name: 'Priscila Silva',
    count: 10,
    stars: 5,
    when: 'há 3 meses',
    text: 'Serviço perfeito, já é o segundo apto que contrato o Jel Box para colocação de box nos banheiros, e novamente o serviço foi impecável, desde o atendimento até a finalização da instalação. São rápidos na entrega, eficientes, instalação sem sujeira e produtos muito bons. Recomendo de olhos fechados.',
  },
  {
    name: 'PH Rodrigues',
    count: 8,
    stars: 5,
    when: 'há 2 meses',
    text: 'Sr. Marcelo é muito atencioso, realizei 2 pedidos em 2 datas distintas e sempre entregou antes do prazo. Entregou serviços com ótima qualidade e preço justo.',
  },
  {
    name: 'Tulio Formentin',
    count: 2,
    stars: 5,
    when: 'há 4 meses',
    text: 'Jel Box empresa seria e competente, o Marcelo entendeu minha necessidade e foi fantástico por isso recomendo pra quem busca honestidade e eficiência!',
  },
  {
    name: 'Clínica Joyce Quinas Podologia Saúde e Bem Estar.',
    guide: true,
    count: 17,
    stars: 5,
    when: 'há 4 meses',
    text: 'Atendimento impecável, serviço de qualidade recomendo muito.\nDo início da compra até o pós venda perfeito precisando de box e janelas pede fechar com eles.',
  },
  {
    name: 'Edu Silva',
    count: 7,
    stars: 5,
    when: 'há 2 semanas',
    text: 'Muito bom mesmo.\nInstalação rápida e con equipe competente e educada.\nEncontrei preço e qualidade no apto do edifício\nOasis Dialogo Guilhermina.\nArrisquei com anuncio em carro parado e fiquei positivamente surpreso.',
  },
  {
    name: 'Rita Marques',
    guide: true,
    count: 69,
    stars: 5,
    when: 'há 2 meses',
    text: 'Fizemos umas portas de alumínio com eles e ficaram impecáveis! Acabamento de primeira, bem emoldurada, com fecho e fechadura de ótima qualidade. O prazo de entrega foi antecipado e o preço foi o melhor do mercado. Recomendo!!!',
  },
  {
    name: 'Kaio Lima',
    count: 5,
    stars: 5,
    when: 'há 9 meses',
    text: 'Empresa séria, que demonstra zelo pela qualidade dos serviços prestados. Realizei a instalação de uma folha de vidro na minha sacada no início de fevereiro e o profissional que veio ao apartamento foi extremamente atencioso e cuidadoso durante todo o processo de instalação. Destaco também o excelente atendimento do funcionário Marcelo, que foi muito prestativo.',
  },
  {
    name: 'erika Vieira',
    count: 8,
    stars: 5,
    when: 'há 8 meses',
    text: 'Contratei a compra e colocação de uma janela para lavanderia. Excelente trabalho pontuais. Melhor preço super recomendo',
  },
  {
    name: 'Norbert kouwenberg',
    guide: true,
    count: 40,
    stars: 5,
    when: 'há 1 mês',
    text: 'Hoje, a Jel-box instalou as janelas de vidro (boxes) em 3 banheiros da nossa casa. Que profissionalismo e qualidade por um preço muito razoável! Entregaram e instalaram rapidamente. Estamos muito satisfeitos e recomendamos muito a empresa.',
  },
  {
    name: 'Gisele Osanai',
    guide: true,
    count: 19,
    stars: 5,
    when: 'há 10 meses',
    text: 'Serviço executado com excelência pela Jel Box, demonstrando alto nível de profissionalismo, responsabilidade e rigor no cumprimento dos prazos, com acabamento impecável.\n\nSuper indico...',
  },
  {
    name: 'Júlio Farias',
    count: 7,
    stars: 5,
    when: 'há 11 meses',
    text: 'Desde o primeiro atendimento as instruções foram claras, os prazos de entrega rigorosamente cumpridos e os valores justos. Sem contar a qualidade indiscutível do material e o capricho na montagem! A janela ficou linda!',
  },
  {
    name: 'Thiago Guerra',
    count: 5,
    stars: 5,
    when: 'há 11 meses',
    text: 'Atendimento de primeira. O Marcelo é muito profissional e explica tudo! O pessoal da montagem é gente boa e tirou todas as minhas dúvidas. Também é oferecido facilidade no pagamento.',
  },
  {
    name: 'Rebeca Silva',
    count: 5,
    stars: 5,
    when: 'há 1 ano',
    text: 'Fiquei muito satisfeita com o serviço prestado pela Jel Box! O Marcelo foi extremamente atencioso e profissional durante toda a instalação do espelho. Fez um trabalho impecável, com muito capricho e pontualidade. Atendimento excelente do início ao fim. Recomendo de olhos fechados!',
  },
  {
    name: 'Douglas Melo',
    guide: true,
    count: 13,
    stars: 5,
    when: 'há 2 anos',
    text: 'Serviço agil e impecável. A Jel Box já me auxiliou em 3 studios em diferentes momentos e espero hoje retribuir com uma avaliação a altura.\nMarcelo é cuidadoso, o serviço é alpha pois ele participa com sugestões com base em vasta e valiosa experiência.\nProjetos foram executados de forma consistente antes dos prazos, com excelente qualidade.',
  },
  {
    name: 'Vera Lucia',
    count: 11,
    stars: 5,
    when: 'há 5 meses',
    text: 'Agradeço ao senhor Marcelo da JEL BOX, pelo excelente atendimento desde a solicitação de orçamento até a instalação das janelas.\nCertamente, vou fechar tb a instalação dos boxes nos banheiros.\nGratidão!\nRecomendo!',
  },
  {
    name: 'Débora Madureira',
    count: 4,
    stars: 5,
    when: 'há 5 meses',
    text: 'Excelente atendimento, transparência, seguindo os padrões e normas. Cumpriu o prazo combinado. Preço justo e trabalhos muito bem executados. Com certeza será uma empresa que compraremos novamente e indicamos.',
  },
  {
    name: 'Helena Okamoto',
    count: 8,
    stars: 5,
    when: 'há 3 meses',
    text: 'Um ótimo atendimento, entregou no prazo e a instalação, impecável! Recomendo tranquilamente!\nParabéns a família Jel Box!',
  },
  {
    name: 'Cláudia Gomes',
    count: 13,
    stars: 5,
    when: 'há 2 anos',
    text: 'Atendimento de primeira, minha janela da lavanderia ficou linda e super bem colocada, com muita qualidade. Recomendo muito o trabalho deles, atendimento humano com profissionais qualificados. Instalação rápida e limpa.',
  },
];
/** nota média e total de avaliações no Google, quando houver */
export const reviewsSummary: { rating: number; count: number } | null = { rating: 5, count: 603 };

export const waLink = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

/** Seções da página, usadas nos menus. */
export const sections = [
  { id: 'topo', label: 'Início' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'obras', label: 'Obras' },
  { id: 'processo', label: 'Como trabalhamos' },
  { id: 'monte', label: 'Monte seu box' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'oficina', label: 'A JEL Box por dentro' },
  { id: 'duvidas', label: 'Dúvidas' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'localizacao', label: 'Localização' },
  { id: 'contato', label: 'Contato' },
] as const;

export const nav = sections.slice(1);

/** Itens do menu do topo, nesta ordem. */
export const menu: { id: (typeof sections)[number]['id']; label: string }[] = [
  { id: 'sobre', label: 'Sobre nós' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'duvidas', label: 'Dúvidas' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'localizacao', label: 'Localização' },
];

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
