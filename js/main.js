/* JEL Box — interações do site */
(() => {
  'use strict';

  // Dados de contato: troque aqui e o site inteiro acompanha.
  const JEL = {
    whatsapp: '5500000000000',          // DDI + DDD + número, só dígitos
    email: 'contato@jelbox.com.br',
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const waLink = (msg) => `https://wa.me/${JEL.whatsapp}?text=${encodeURIComponent(msg)}`;

  // Links de WhatsApp com mensagem pronta
  const setWhats = (a) => { a.href = waLink(a.dataset.msg || 'Olá, JEL Box!'); };
  $$('.js-whats').forEach((a) => { setWhats(a); a.target = '_blank'; a.rel = 'noopener'; });

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Menu no celular ---------- */
  const nav = $('.nav');
  const toggle = $('.nav__toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav__links a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Abas de produtos ---------- */
  const tabs = $$('[role="tab"]');
  const quote = $('.js-product-quote');
  const selectTab = (tab, focus) => {
    const id = tab.dataset.tab;
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $$('.panel').forEach((p) => {
      const on = p.dataset.panel === id;
      p.hidden = !on;
      p.classList.toggle('is-in', on && !reduce);
    });
    $$('.products__plate .drawing').forEach((d) => {
      const on = d.dataset.panel === id;
      d.toggleAttribute('hidden', !on);   // SVG não tem a propriedade .hidden
      d.classList.toggle('is-in', on && !reduce);
    });
    if (quote) {
      quote.dataset.msg = `Olá, JEL Box! Gostaria de um orçamento de ${tab.textContent.trim().toLowerCase()}.`;
      setWhats(quote);
    }
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in keys) {
        e.preventDefault();
        selectTab(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
      } else if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0], true); }
      else if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
    });
  });

  /* ---------- Monte seu box ---------- */
  const form = $('#builder');
  const elev = $('#box-elev');
  const plan = $('#box-plan');
  const MODELOS = {
    correr: 'Box frontal de correr',
    canto: 'Box de canto',
    abrir: 'Box de abrir',
    teto: 'Box até o teto',
  };
  const VIDRO = {
    incolor: ['rgba(59,110,165,.16)', 'rgba(59,110,165,.28)'],
    'fumê': ['rgba(58,68,76,.55)', 'rgba(58,68,76,.66)'],
    bronze: ['rgba(140,104,68,.45)', 'rgba(140,104,68,.56)'],
    jateado: ['rgba(248,252,253,.94)', 'rgba(240,247,250,.98)'],
  };
  const PERFIL = { preto: '#1B1F24', branco: '#FFFFFF', natural: '#AEB5BB', dourado: '#C9A45C' };

  const largura = $('#largura');
  const lado = $('#lado');
  const altura = $('#altura');
  const fieldLado = $('#field-lado');

  const read = () => {
    const fd = new FormData(form);
    return {
      modelo: fd.get('modelo'),
      w: +largura.value,
      b: +lado.value,
      h: +altura.value,
      vidro: fd.get('vidro'),
      perfil: fd.get('perfil'),
    };
  };

  // marca de cota: traço a 45°
  const tick = (x, y) => `M${x - 5} ${y + 5}l10-10`;

  const drawElevation = (c) => {
    const s = 1.5;               // px por cm
    const floor = 455;
    const W = c.w * s;
    const H = c.h * s;
    const x0 = (420 - W) / 2 + 12;
    const x1 = x0 + W;
    const top = floor - H;
    const [gBack, gFront] = VIDRO[c.vidro];
    const prof = PERFIL[c.perfil];
    const profStroke = c.perfil === 'branco' ? ' stroke="#12344D" stroke-width="1"' : '';
    const glass = (x, y, w, h, fill) =>
      `<rect class="dw-glass" x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${fill}"/>`;
    let out = '';

    // paredes
    const wallTop = c.modelo === 'teto' ? top - 16 : Math.min(top - 40, 30);
    out += `<rect class="dw-wall" x="${x0 - 22}" y="${wallTop}" width="22" height="${floor - wallTop}"/>`;
    if (c.modelo !== 'canto') {
      out += `<rect class="dw-wall" x="${x1}" y="${wallTop}" width="22" height="${floor - wallTop}"/>`;
    }
    if (c.modelo === 'teto') {
      out += `<rect class="dw-wall" x="${x0 - 22}" y="${top - 16}" width="${W + 44}" height="16"/>`;
    }
    out += `<path class="dw-line" d="M${x0 - 44} ${floor}H${x1 + 44}"/>`;

    if (c.modelo === 'abrir') {
      const fixW = W * 0.42;
      const doorX = x0 + fixW + 3;
      out += `<rect x="${x0}" y="${top}" width="4" height="${H}" fill="${prof}"${profStroke}/>`;
      out += `<rect x="${x1 - 4}" y="${top}" width="4" height="${H}" fill="${prof}"${profStroke}/>`;
      out += glass(x0 + 4, top, fixW - 4, H - 4, gBack);
      out += glass(doorX, top + 2, x1 - 6 - doorX, H - 8, gFront);
      // dobradiças e puxador
      out += `<rect x="${doorX - 4}" y="${top + 24}" width="10" height="22" fill="${prof}"${profStroke}/>`;
      out += `<rect x="${doorX - 4}" y="${floor - 52}" width="10" height="22" fill="${prof}"${profStroke}/>`;
      out += `<path d="M${x1 - 24} ${top + H * 0.42}v${H * 0.2}" stroke="${prof}" stroke-width="5"/>`;
    } else {
      // trilho superior
      const half = W / 2;
      out += `<rect x="${x0}" y="${top}" width="${W}" height="7" fill="${prof}"${profStroke}/>`;
      out += glass(x0 + 4, top + 7, half + 6, H - 11, gBack);
      out += glass(x0 + half - 6, top + 9, half + 2, H - 13, gFront);
      out += `<path d="M${x0 + half + 10} ${top + H * 0.4}v${Math.min(70, H * 0.22)}" stroke="${prof}" stroke-width="5"/>`;
      out += `<rect x="${x0}" y="${floor - 4}" width="${W}" height="4" fill="${prof}"${profStroke}/>`;
    }

    // cotas
    const dy = Math.max(top - 26, 14);
    out += `<path class="dw-dim" d="M${x0} ${dy}H${x1}${tick(x0, dy)}${tick(x1, dy)}M${x0} ${dy - 7}v14M${x1} ${dy - 7}v14"/>`;
    out += `<text class="dw-text" x="${(x0 + x1) / 2}" y="${dy - 10}" text-anchor="middle">${c.w} cm</text>`;
    const dx = x0 - 44;
    out += `<path class="dw-dim" d="M${dx} ${top}V${floor}${tick(dx, top)}${tick(dx, floor)}"/>`;
    out += `<text class="dw-text" transform="translate(${dx - 10} ${(top + floor) / 2}) rotate(-90)" text-anchor="middle">${c.h} cm</text>`;
    if (c.modelo === 'canto') {
      out += `<text class="dw-text" x="${x1 + 12}" y="${floor - 12}">lado ${c.b} cm →</text>`;
    }
    elev.innerHTML = out;
  };

  const drawPlan = (c) => {
    const s = 0.9;
    const W = c.w * s;
    const D = (c.modelo === 'canto' ? c.b : 90) * s;
    const x0 = (420 - W) / 2 + 12;
    const x1 = x0 + W;
    const y0 = 18;              // face da parede do fundo
    const yf = y0 + D;          // linha do vidro
    const prof = PERFIL[c.perfil] === '#FFFFFF' ? '#12344D' : PERFIL[c.perfil];
    let out = '';
    out += `<rect class="dw-wall" x="${x0 - 14}" y="${y0 - 12}" width="${W + (c.modelo === 'canto' ? 14 : 28)}" height="12"/>`;
    out += `<rect class="dw-wall" x="${x0 - 14}" y="${y0}" width="14" height="${D + 10}"/>`;
    if (c.modelo !== 'canto') {
      out += `<rect class="dw-wall" x="${x1}" y="${y0}" width="14" height="${D + 10}"/>`;
    }
    out += `<circle class="dw-line" cx="${(x0 + x1) / 2}" cy="${y0 + D / 2}" r="4"/>`;

    if (c.modelo === 'abrir') {
      const fix = x0 + W * 0.42;
      const r = x1 - fix;
      out += `<path d="M${x0} ${yf}H${fix}" stroke="${prof}" stroke-width="3"/>`;
      out += `<path d="M${fix} ${yf}V${yf + r}" stroke="${prof}" stroke-width="3"/>`;
      out += `<path class="dw-dim" d="M${fix} ${yf + r}A${r} ${r} 0 0 0 ${x1} ${yf}" stroke-dasharray="4 4"/>`;
    } else if (c.modelo === 'canto') {
      const half = W / 2;
      out += `<path d="M${x0} ${yf}H${x0 + half + 6}" stroke="${prof}" stroke-width="3"/>`;
      out += `<path d="M${x0 + half - 6} ${yf + 5}H${x1}" stroke="${prof}" stroke-width="3"/>`;
      out += `<path d="M${x1} ${y0}V${yf + 5}" stroke="${prof}" stroke-width="3"/>`;
    } else {
      const half = W / 2;
      out += `<path d="M${x0} ${yf}H${x0 + half + 6}" stroke="${prof}" stroke-width="3"/>`;
      out += `<path d="M${x0 + half - 6} ${yf + 5}H${x1}" stroke="${prof}" stroke-width="3"/>`;
    }
    plan.setAttribute('viewBox', `0 0 420 ${c.modelo === 'abrir' ? Math.max(150, yf + (x1 - (x0 + W * 0.42)) + 10) : Math.max(110, yf + 20)}`);
    plan.innerHTML = out;
  };

  const describe = (c) => {
    const medidas = c.modelo === 'canto' ? `${c.w} × ${c.b} × ${c.h} cm` : `${c.w} × ${c.h} cm`;
    return `${MODELOS[c.modelo]} · ${medidas} · vidro ${c.vidro} · perfil ${c.perfil}`;
  };
  const message = (c) => {
    const medidas = c.modelo === 'canto'
      ? `${c.w} cm (frente) × ${c.b} cm (lado) × ${c.h} cm (altura)`
      : `${c.w} cm (largura) × ${c.h} cm (altura)`;
    return [
      'Olá, JEL Box! Montei um box no site:',
      `• Modelo: ${MODELOS[c.modelo]}`,
      `• Medidas do vão: ${medidas}`,
      `• Vidro: temperado 8 mm ${c.vidro}`,
      `• Perfil: alumínio ${c.perfil}`,
      'Gostaria de um orçamento.',
    ].join('\n');
  };

  const update = () => {
    const c = read();
    const teto = c.modelo === 'teto';
    // até o teto: a altura é a do pé-direito
    const [min, max] = teto ? [230, 270] : [180, 220];
    if (+altura.min !== min) {
      altura.min = min; altura.max = max;
      altura.value = teto ? 250 : 190;
      c.h = +altura.value;
    }
    fieldLado.hidden = c.modelo !== 'canto';
    $('label[for="altura"]').firstChild.textContent = teto ? 'Pé-direito ' : 'Altura ';
    $('#largura-out').textContent = `${c.w} cm`;
    $('#lado-out').textContent = `${c.b} cm`;
    $('#altura-out').textContent = `${c.h} cm`;
    drawElevation(c);
    drawPlan(c);
    elev.setAttribute('aria-label', `Vista frontal: ${describe(c)}`);
    $('#summary').textContent = describe(c);
    const send = $('#send-whats');
    send.href = waLink(message(c));
    send.target = '_blank';
    send.rel = 'noopener';
  };

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const c = read();
    window.location.href = `mailto:${JEL.email}?subject=${encodeURIComponent(`Orçamento: ${MODELOS[c.modelo]}`)}&body=${encodeURIComponent(message(c))}`;
  });
  update();

  /* ---------- Entradas ---------- */
  const revealed = $$('[data-reveal]');
  revealed.forEach((el) => {
    const group = el.closest('section, footer') || document.body;
    const items = $$('[data-reveal]', group);
    el.style.setProperty('--d', `${Math.min(items.indexOf(el), 4) * 80}ms`);
  });
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealed.forEach((el) => io.observe(el));
  } else {
    revealed.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Rolagem: o vidro corre sobre o nome ---------- */
  if (!reduce) {
    const hero = $('.hero');
    const stage = hero;
    const footer = $('.footer');
    let ticking = false;
    const onScroll = () => {
      ticking = false;
      const vh = window.innerHeight;
      const p = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
      stage.style.setProperty('--p', p.toFixed(4));
      const r = footer.getBoundingClientRect();
      const f = Math.min(Math.max((vh - r.top) / r.height, 0), 1);
      footer.style.setProperty('--f', f.toFixed(4));
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }
})();
