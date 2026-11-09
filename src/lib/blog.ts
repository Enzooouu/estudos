import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import type { ProductId } from '@/content/site';

/**
 * Artigos do blog: um arquivo .md por artigo em src/content/blog/.
 * O nome do arquivo vira o endereço (ex.: vidro-temperado-ou-laminado.md → /blog/vidro-temperado-ou-laminado/).
 *
 * Cabeçalho de cada arquivo, entre linhas com ---:
 *   titulo: Título do artigo
 *   descricao: Uma ou duas frases para a lista e para o Google
 *   data: 2026-11-09 (ou 2026-11-09T10:00 para ordenar artigos do mesmo dia)
 *   capa: /media/blog/arquivo.jpg   (opcional)
 *   produto: box | janelas | guarda | espelhos | coberturas | serralheria   (opcional)
 *   rascunho: sim   (opcional: não aparece no site)
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  product?: ProductId;
  minutes: number;
  html: string;
};

const DIR = path.join(process.cwd(), 'src/content/blog');

function parse(file: string): (Post & { draft: boolean }) | null {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const meta: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = m[2].trim();
  const words = body.split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ''),
    title: meta.titulo ?? '',
    description: meta.descricao ?? '',
    date: meta.data ?? '',
    cover: meta.capa || undefined,
    product: (meta.produto || undefined) as ProductId | undefined,
    minutes: Math.max(1, Math.round(words / 200)),
    html: marked.parse(body, { async: false }) as string,
    draft: /^(sim|true)$/i.test(meta.rascunho ?? ''),
  };
}

/** Artigos publicados, do mais novo para o mais antigo. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parse)
    .filter((p): p is Post & { draft: boolean } => !!p && !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ draft: _draft, ...p }) => p);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

/** "9 de novembro de 2026" */
export function formatDate(iso: string) {
  const [y, mo, d] = iso.slice(0, 10).split('-').map(Number);
  return `${d} de ${months[mo - 1]} de ${y}`;
}
