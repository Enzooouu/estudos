/**
 * Cadastro de todas as mídias do site.
 *
 * Para trocar um placeholder pela mídia definitiva:
 *   1. coloque o arquivo em public/media/ com o nome do id (ex.: public/media/hero-principal.mp4);
 *   2. preencha `src` (e `poster`, `sources` ou `alt`, quando houver) na entrada abaixo.
 * Nenhuma seção precisa ser alterada: o componente <Media> passa a mostrar o arquivo.
 *
 * Formatos recomendados: fotos em AVIF ou WebP (com JPG de reserva), até 2400 px no lado maior;
 * vídeos em MP4 (H.264) e WebM, sem áudio, 10 a 20 s, até ~4 MB, com um poster em AVIF/WebP.
 */

export type MediaKind = 'foto' | 'video' | 'produto' | 'modelo3d';

export type MediaEntry = {
  kind: MediaKind;
  /** rótulo discreto mostrado no placeholder */
  label: string;
  /** o que deve ser fotografado ou filmado */
  description: string;
  /** proporção final da mídia, ex. '16 / 9' */
  ratio: string;
  /** arquivo definitivo em /public, ex. '/media/hero-principal.mp4' */
  src?: string;
  /** versões modernas da foto, na ordem de preferência */
  sources?: { avif?: string; webp?: string };
  /** quadro de capa do vídeo */
  poster?: string;
  /** texto alternativo da foto definitiva */
  alt?: string;
};

export const media = {
  /* ---------- Topo ---------- */
  'hero-principal': {
    // Fundo do topo: banheiro com box de vidro fixo e perfil preto, bancada e espelhos com moldura.
    // Foto: Rodrigo Aguiar (@rodsph). Arquivos com 2560 px de largura, em proporção 4:3, para o
    // celular poder mostrar o box (corte à esquerda) e o computador o conjunto (corte central).
    // Para vídeo, use kind: 'video' e src .mp4.
    kind: 'foto',
    label: 'Fotografia principal',
    description:
      'Foto horizontal de um ambiente com espelho, box ou esquadria, com área livre à esquerda para o texto. Ideal: 2400 px ou mais.',
    ratio: '16 / 9',
    src: '/media/hero-principal.jpg',
    sources: { avif: '/media/hero-principal.avif', webp: '/media/hero-principal.webp' },
    alt: '',
  },

  /* ---------- Produtos (uma imagem por linha de produto) ---------- */
  'servico-box-banheiro': {
    kind: 'produto',
    label: 'Imagem do produto',
    description: 'Box de banheiro instalado, de frente, mostrando o perfil e o puxador.',
    ratio: '3 / 2',
  },
  'servico-esquadrias': {
    kind: 'produto',
    label: 'Imagem do produto',
    description: 'Janela ou porta de correr em alumínio instalada, vista de dentro do ambiente.',
    ratio: '3 / 2',
  },
  'servico-espelhos': {
    kind: 'produto',
    label: 'Imagem do produto',
    description: 'Espelho instalado: reto, lapidado, camarim ou com LED, de preferência sobre bancada.',
    ratio: '3 / 2',
  },
  'servico-divisorias': {
    kind: 'produto',
    label: 'Imagem do produto',
    description: 'Divisória de vidro instalada, de preferência jateada ou com faixas tipo persiana.',
    ratio: '3 / 2',
  },

  /* ---------- Obras executadas ---------- */
  'projeto-box-banheiro-01': {
    kind: 'foto',
    label: 'Fotografia do projeto',
    description: 'Box de banheiro executado: foto vertical do ambiente completo.',
    ratio: '4 / 5',
  },
  'projeto-esquadria-01': {
    kind: 'foto',
    label: 'Fotografia do projeto',
    description: 'Janela de alumínio executada: lavanderia, quarto ou sala.',
    ratio: '3 / 2',
  },
  'projeto-espelho-01': {
    kind: 'foto',
    label: 'Fotografia do projeto',
    description: 'Espelho com LED ou de camarim executado: foto vertical do ambiente.',
    ratio: '4 / 5',
  },
  'projeto-divisoria-01': {
    kind: 'foto',
    label: 'Fotografia do projeto',
    description: 'Divisória de vidro executada, separando cozinha, lavanderia ou escritório.',
    ratio: '1 / 1',
  },
  'projeto-janela-vidro-01': {
    kind: 'foto',
    label: 'Fotografia do projeto',
    description: 'Janela de vidro executada, vista de dentro do ambiente.',
    ratio: '3 / 2',
  },

  /* ---------- Institucional ---------- */
  'video-institucional': {
    kind: 'video',
    label: 'Vídeo institucional',
    description:
      'Vídeo de 20 a 40 s da oficina: corte e lapidação do vidro, montagem dos perfis e equipe em instalação.',
    ratio: '16 / 9',
  },
  'empresa-equipe': {
    kind: 'foto',
    label: 'Fotografia da equipe',
    description: 'Equipe da JEL Box em obra ou na oficina, com uniforme.',
    ratio: '4 / 5',
  },
  'empresa-oficina': {
    kind: 'foto',
    label: 'Fotografia da empresa',
    description: 'Fachada da loja ou interior da oficina com vidros e perfis.',
    ratio: '3 / 2',
  },

  /* ---------- 3D ---------- */
  'modelo-3d-esquadria': {
    kind: 'modelo3d',
    label: 'Modelo 3D',
    description:
      'Modelo .glb do kit de box ou esquadria fornecido pelo fabricante dos perfis (até ~1,5 MB, comprimido com Draco). Enquanto não houver, o site gera um modelo ilustrativo a partir das medidas escolhidas.',
    ratio: '4 / 5',
  },
} satisfies Record<string, MediaEntry>;

export type MediaId = keyof typeof media;

export const getMedia = (id: MediaId): MediaEntry => media[id];
