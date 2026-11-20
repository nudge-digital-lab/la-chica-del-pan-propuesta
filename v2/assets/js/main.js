/* La Chica del Pan · propuesta visual. Comportamiento de demo: el carrito vive solo en este navegador. */
(function () {
  'use strict';
  var P = window.LCDP_PRODUCTS || [];
  var TAGS = window.LCDP_TAGS || {};
  var CATS = window.LCDP_CATS || {};
  var CAL = window.LCDP_CALENDARIO || { diaEntrega: 5, diasAntesCorte: 2, horaCorte: 18, sinEntrega: [] };
  var bySlug = {};
  P.forEach(function (p) { bySlug[p.slug] = p; });
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Fechas: entrega los viernes, corte el miércoles anterior a las 18 ----------
     Sale de LCDP_CALENDARIO (en la tienda, del panel). Se saltean los viernes sin entrega. */
  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function nextDelivery(now) {
    var d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (var i = 0; i < 70; i++) {
      var f = new Date(d); f.setDate(d.getDate() + i);
      if (f.getDay() !== CAL.diaEntrega || (CAL.sinEntrega || []).indexOf(iso(f)) !== -1) continue;
      var cut = new Date(f); cut.setDate(f.getDate() - CAL.diasAntesCorte); cut.setHours(CAL.horaCorte, 0, 0, 0);
      if (now < cut) return { friday: f, cutoff: cut };
    }
  }
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  function fmt(d) { return DIAS[d.getDay()] + ' ' + d.getDate() + '/' + (d.getMonth() + 1); }
  var nd = nextDelivery(new Date());
  window.LCDP_nextDelivery = nextDelivery;
  if (nd) {
    $$('[data-friday]').forEach(function (el) { el.textContent = fmt(nd.friday); });
    $$('[data-cutoff]').forEach(function (el) { el.textContent = fmt(nd.cutoff) + ' a las ' + CAL.horaCorte; });
    $$('[data-cutoff-day]').forEach(function (el) { el.textContent = DIAS[nd.cutoff.getDay()]; });
  }

  /* ---------- Encabezado ---------- */
  var header = $('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var toast = $('.toast'), toastT;

  /* ---------- Paneles (menú y carrito) ---------- */
  var backdrop = $('.drawer-backdrop');
  var openDrawer = null, lastFocus = null;
  function open(id) {
    var d = document.getElementById(id); if (!d) return;
    close();
    lastFocus = document.activeElement;
    if (toast) toast.classList.remove('show'); // que el aviso no tape el botón de pagar
    d.classList.add('open'); d.removeAttribute('inert'); d.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('open'); document.body.style.overflow = 'hidden';
    $$('[aria-controls="' + id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    openDrawer = d;
    var f = d.querySelector('button, a'); if (f) f.focus();
  }
  function close() {
    if (!openDrawer) return;
    var id = openDrawer.id;
    openDrawer.classList.remove('open'); openDrawer.setAttribute('inert', ''); openDrawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('open'); document.body.style.overflow = '';
    $$('[aria-controls="' + id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    openDrawer = null;
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-open]').forEach(function (b) { b.addEventListener('click', function () { open(b.getAttribute('data-open')); }); });
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', close); });
  if (backdrop) backdrop.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  $$('.mobile-nav a').forEach(function (a) { a.addEventListener('click', close); });

  /* ---------- Carrito (demo) ---------- */
  var KEY = 'lcdp-cart';
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { cart = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  function count() { return Object.keys(cart).reduce(function (n, k) { return n + cart[k]; }, 0); }
  function renderCart(bump) {
    var n = count();
    $$('.cart-count').forEach(function (c) {
      c.textContent = n; c.classList.toggle('has-items', n > 0);
      if (bump) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
    });
    var list = $('.cart-items'); if (!list) return;
    var keys = Object.keys(cart).filter(function (k) { return bySlug[k]; });
    $('.cart-empty').hidden = keys.length > 0;
    $('.cart-foot').hidden = keys.length === 0;
    list.innerHTML = keys.map(function (k) {
      var p = bySlug[k];
      return '<li class="cart-item"><img src="assets/img/' + p.img + '-640.webp" alt="" width="64" height="64">' +
        '<div><h3>' + p.name + '</h3><p>' + cart[k] + ' × precio a confirmar</p></div>' +
        '<button class="icon-btn" data-remove="' + k + '" aria-label="Quitar ' + p.name + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></li>';
    }).join('');
    $('.cart-total-qty').textContent = n + (n === 1 ? ' producto' : ' productos');
  }
  document.addEventListener('click', function (e) {
    var r = e.target.closest('[data-remove]');
    if (r) { delete cart[r.getAttribute('data-remove')]; save(); renderCart(); }
  });
  function showToast(msg, sinBoton) {
    if (!toast) return;
    $('.toast-msg', toast).textContent = msg;
    $('button', toast).hidden = !!sinBoton;
    toast.classList.add('show'); clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }
  function add(slug, qty) {
    cart[slug] = (cart[slug] || 0) + qty; save(); renderCart(true);
    showToast('¡Adentro! ' + bySlug[slug].name + (qty > 1 ? ' ×' + qty : '') + ' ya está en tu pedido.');
  }
  window.LCDP_add = add;
  if (toast) $('button', toast).addEventListener('click', function () { toast.classList.remove('show'); open('cart'); });

  /* ---------- Tarjetas de producto ---------- */
  function tagHTML(t) { return '<span class="tag tag-' + t + '">' + TAGS[t] + '</span>'; }
  function card(p) {
    var href = 'producto.html';
    return '<article class="prod-card">' +
      '<a class="media" href="' + href + '" tabindex="-1" aria-hidden="true">' +
      '<img src="assets/img/' + p.img + '-640.webp" alt="' + p.name + ' en su envase" loading="lazy" width="640" height="' + (p.tall ? 853 : 640) + '">' +
      '<span class="tags">' + p.tags.map(tagHTML).join('') + '</span></a>' +
      '<h3><a href="' + href + '">' + p.name + '</a></h3>' +
      '<p class="meta">' + (p.note || CATS[p.cat] || '') + '</p>' +
      '<div class="row"><span class="price tbd" title="Precio a confirmar">$ —</span>' +
      '<button class="quick-add" type="button" data-add="' + p.slug + '" aria-label="Agregar ' + p.name + ' al carrito">Agregar</button></div>' +
      '</article>';
  }
  $$('[data-products]').forEach(function (grid) {
    var slugs = grid.getAttribute('data-products').split(',');
    grid.innerHTML = slugs.map(function (s) { return bySlug[s.trim()]; }).filter(Boolean).map(card).join('');
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]'); if (!b) return;
    add(b.getAttribute('data-add'), 1);
    b.classList.add('added'); b.textContent = 'Agregado';
    setTimeout(function () { b.classList.remove('added'); b.textContent = 'Agregar'; }, 1600);
  });

  /* ---------- Galería de la ficha ---------- */
  var gm = $('.gallery-main');
  if (gm) {
    var slides = $$('figure', gm), thumbs = $$('.thumbs button'), dots = $$('.gallery-dots span');
    function mark(i) {
      thumbs.forEach(function (t, j) { t.setAttribute('aria-current', j === i ? 'true' : 'false'); });
      dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
    }
    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { gm.scrollTo({ left: slides[i].offsetLeft - gm.offsetLeft, behavior: 'smooth' }); mark(i); });
    });
    var st;
    gm.addEventListener('scroll', function () {
      clearTimeout(st);
      st = setTimeout(function () { mark(Math.round(gm.scrollLeft / gm.clientWidth)); }, 60);
    }, { passive: true });
    mark(0);
  }

  /* ---------- Cantidad y agregar ---------- */
  var qtyOut = $('.qty output');
  if (qtyOut) {
    var q = 1, minus = $('[data-qty="-1"]'), plus = $('[data-qty="1"]');
    function setQ(v) { q = Math.max(1, Math.min(20, v)); qtyOut.value = q; qtyOut.textContent = q; minus.disabled = q <= 1; plus.disabled = q >= 20; }
    minus.addEventListener('click', function () { setQ(q - 1); });
    plus.addEventListener('click', function () { setQ(q + 1); });
    setQ(1);
    $$('[data-add-pdp]').forEach(function (b) {
      b.addEventListener('click', function () { add(b.getAttribute('data-add-pdp'), q); });
    });
    var mainBtn = $('.buy-row .btn'), sticky = $('.sticky-buy');
    if (sticky && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        sticky.classList.toggle('show', !en[0].isIntersecting);
      }).observe(mainBtn);
    }
  }

  /* ---------- Formulario mayorista (demo) ---------- */
  var wf = $('.ws-form');
  if (wf) {
    wf.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('input[required]', wf).forEach(function (i) {
        var bad = !i.value.trim(); i.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad && ok) { i.focus(); ok = false; }
      });
      if (!ok) return;
      wf.hidden = true;
      $('.form-ok').classList.add('show');
    });
  }

  /* ---------- WhatsApp (sin burbuja flotante: enlaces en el pie, la ficha y mayoristas) ---------- */
  var WA = (window.LCDP_WHATSAPP || '').replace(/[^0-9]/g, '');
  $$('[data-wa]').forEach(function (a) {
    var texto = a.getAttribute('data-wa') || '';
    if (WA) {
      a.href = 'https://wa.me/' + WA + (texto ? '?text=' + encodeURIComponent(texto) : '');
      a.target = '_blank'; a.rel = 'noopener';
    } else {
      a.href = '#';
      a.addEventListener('click', function (e) { e.preventDefault(); showToast('El número de WhatsApp lo sumamos cuando nos lo pases.', true); });
    }
  });

  /* ---------- Aviso de propuesta ---------- */
  var pill = $('.proposal-pill');
  if (pill) {
    try { if (sessionStorage.getItem('lcdp-pill') === '0') pill.classList.add('hide'); } catch (e) {}
    $('button', pill).addEventListener('click', function () {
      pill.classList.add('hide'); try { sessionStorage.setItem('lcdp-pill', '0'); } catch (e) {}
    });
  }

  renderCart(false);
})();
