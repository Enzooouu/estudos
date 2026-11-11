/** Regras do "Monte seu box": modelos, cores e textos da especificação. */

export type Modelo = 'correr' | 'canto' | 'abrir' | 'teto';
export type Vidro = 'incolor' | 'fumê' | 'bronze' | 'jateado';
export type Perfil = 'preto' | 'branco' | 'natural' | 'dourado';

export type BoxConfig = {
  modelo: Modelo;
  w: number; // largura do vão (cm)
  b: number; // lado, no box de canto (cm)
  h: number; // altura, ou pé-direito no box até o teto (cm)
  vidro: Vidro;
  perfil: Perfil;
};

export const MODELOS: Record<Modelo, string> = {
  correr: 'Box frontal de correr',
  canto: 'Box de canto',
  abrir: 'Box de abrir',
  teto: 'Box até o teto',
};
export const MODELO_CURTO: Record<Modelo, string> = {
  correr: 'Frontal de correr',
  canto: 'De canto',
  abrir: 'De abrir',
  teto: 'Até o teto',
};

/** cor do vidro: [folha de trás, folha da frente] */
export const VIDRO: Record<Vidro, { swatch: string; fill: [string, string] }> = {
  incolor: { swatch: '#EEEAE4', fill: ['rgba(120,128,124,.18)', 'rgba(120,128,124,.30)'] },
  'fumê': { swatch: '#5E5E5C', fill: ['rgba(60,60,58,.55)', 'rgba(60,60,58,.66)'] },
  bronze: { swatch: '#9A7A58', fill: ['rgba(140,104,68,.45)', 'rgba(140,104,68,.56)'] },
  jateado: { swatch: '#F5F3EF', fill: ['rgba(250,248,245,.94)', 'rgba(244,241,236,.98)'] },
};

export const PERFIL: Record<Perfil, string> = {
  preto: '#1B1F24',
  branco: '#FFFFFF',
  natural: '#B4B4B0',
  dourado: '#C9A45C',
};

export const ALTURA = {
  normal: { min: 180, max: 220, start: 190 },
  teto: { min: 230, max: 270, start: 250 },
};

export const INITIAL: BoxConfig = {
  modelo: 'correr',
  w: 120,
  b: 90,
  h: 190,
  vidro: 'incolor',
  perfil: 'preto',
};

const medidas = (c: BoxConfig) =>
  c.modelo === 'canto' ? `${c.w} × ${c.b} × ${c.h} cm` : `${c.w} × ${c.h} cm`;

export const describe = (c: BoxConfig) =>
  `${MODELOS[c.modelo]} · ${medidas(c)} · vidro ${c.vidro} · perfil ${c.perfil}`;

export const message = (c: BoxConfig) =>
  [
    'Olá, JEL BOX! Montei um box no site:',
    `• Modelo: ${MODELOS[c.modelo]}`,
    `• Medidas do vão: ${
      c.modelo === 'canto'
        ? `${c.w} cm (frente) × ${c.b} cm (lado) × ${c.h} cm (altura)`
        : `${c.w} cm (largura) × ${c.h} cm (${c.modelo === 'teto' ? 'pé-direito' : 'altura'})`
    }`,
    `• Vidro: temperado 8 mm ${c.vidro}`,
    `• Perfil: alumínio ${c.perfil}`,
    'Gostaria de um orçamento.',
  ].join('\n');
