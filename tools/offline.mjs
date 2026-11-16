// Gera uma cópia do site que abre com dois cliques no index.html, sem servidor.
// Uso: npm run offline  →  cria a pasta abrir-o-site/ a partir do build em out/.
//
// O Next.js aponta tudo para a raiz ("/_next/...", "/media/...", "/blog/"). Aqui cada página
// ganha caminhos relativos à própria pasta, os links internos passam a apontar para os arquivos
// index.html, e a navegação do Next (que busca dados por fetch, bloqueado em file://) é trocada
// por navegação comum.
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'out';
const DEST = 'abrir-o-site';
fs.rmSync(DEST, { recursive: true, force: true });
fs.cpSync(SRC, DEST, { recursive: true });

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

for (const file of walk(DEST).filter((f) => f.endsWith('.html'))) {
  const depth = path.relative(DEST, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const rel = depth ? '../'.repeat(depth) : './';
  let html = fs.readFileSync(file, 'utf8');

  // links internos: "/" → index.html, "/blog/" → blog/index.html, "/#sec" → index.html#sec
  html = html.replace(/href="\/([^"#?]*)(#[^"]*)?"/g, (m, p, hash = '') => {
    if (p.startsWith('/') || /^[a-z]+:/i.test(p)) return m;
    const target = p === '' ? 'index.html' : /\.[a-z0-9]+$/i.test(p) ? p : `${p.replace(/\/?$/, '/')}index.html`;
    return `href="${rel}${target}${hash}"`;
  });
  // arquivos: /_next/, /media/, ícones, inclusive dentro dos dados do Next (aspas escapadas) e srcset
  html = html.replace(/(["'(,\s]|\\")\/(_next|media)\//g, (m, pre, dir) => `${pre}${rel}${dir}/`);
  html = html.replace(/(href|src)="\/((?:favicon\.ico|icon\.svg|apple-icon\.png)[^"]*)"/g, `$1="${rel}$2"`);

  const boot = `<script>
var R=${JSON.stringify(rel)},TURBOPACK_CHUNK_BASE_PATH=R+'_next/';
// navegação comum para links internos (o roteador do Next não funciona sem servidor)
addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank'||e.ctrlKey||e.metaKey||e.shiftKey)return;var h=a.getAttribute('href');if(!h||h.charAt(0)==='#'||/^[a-z]+:/i.test(h))return;if(h.charAt(0)==='/'){var q=h.slice(1),k=q.search(/[#?]/),p=k<0?q:q.slice(0,k),r=k<0?'':q.slice(k);h=R+(p===''?'index.html':(p.slice(-1)==='/'?p:p+'/')+'index.html')+r}var u=new URL(h,location.href);if(u.pathname===location.pathname&&u.hash){if(a.getAttribute('href')!==h){e.stopPropagation();e.preventDefault();location.hash=u.hash}return}e.stopPropagation();e.preventDefault();location.href=u.href},true);
</script>`;
  html = html.replace('<head>', `<head>${boot}`);
  fs.writeFileSync(file, html);
}

// fontes embutidas no próprio CSS
for (const css of walk(DEST).filter((f) => f.endsWith('.css'))) {
  const dir = path.dirname(css);
  let txt = fs.readFileSync(css, 'utf8');
  txt = txt.replace(/url\((\.\.\/media\/[^)]+\.woff2)\)/g, (m, u) => {
    const f = path.join(dir, u);
    return fs.existsSync(f) ? `url(data:font/woff2;base64,${fs.readFileSync(f).toString('base64')})` : m;
  });
  fs.writeFileSync(css, txt);
}
for (const file of walk(DEST).filter((f) => f.endsWith('.html'))) {
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace(/<link rel="preload"[^>]*\.woff2"[^>]*\/?>/g, ''));
}

// arquivos de dados do Next (.txt) e o 404 não servem fora de um servidor
for (const f of walk(DEST)) if (f.endsWith('.txt') && path.basename(f).startsWith('__next')) fs.rmSync(f);

fs.writeFileSync(
  path.join(DEST, 'LEIA-ME.txt'),
  'Para abrir o site, de dois cliques em index.html (de preferencia no Chrome ou no Edge).\n' +
    'Esta pasta e gerada pelo comando "npm run offline". Nao edite os arquivos aqui dentro.\n',
);
console.log(`Pronto: ${DEST}/index.html`);
