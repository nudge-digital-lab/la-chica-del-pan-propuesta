/* La Chica del Pan · opción 3. Usa los datos de ../assets/js/data.js (productos, categorías, calendario y WhatsApp).
   Textos de cada producto: nuestros, sin claims (nada de keto, low carb, proteico, «sin gluten» ni «saludable»
   hasta que Katia diga en qué productos van). Precios: no se muestran hasta tener la planilla. */
(function () {
  var P = window.LCDP_PRODUCTS || [], CATS = window.LCDP_CATS || {}, CAL = window.LCDP_CALENDARIO, WA = window.LCDP_WHATSAPP || '';
  /* Categorías como las pidió Katia (25/11): las cookies NY van con las cookies, las trufas solas y «Snacks salados». */
  P.forEach(function (p) { if (/^cookie-ny-/.test(p.slug)) p.cat = 'cookies'; });
  CATS = Object.assign({}, CATS, { trufas: 'Trufas', salados: 'Snacks salados' });
  /* «Proteicos» (pedido de Katia, 25/11 19:48): junta productos de otras categorías; cada uno sigue también en la suya. */
  var PROTEICOS = ['granola-proteica', 'matcha-protein-balls', 'chocolate-protein-balls', 'coco-protein-balls', 'cookie-ny-clasica', 'cookie-ny-chocolate', 'cookie-ny-pistacho'];
  CATS.proteicos = 'Proteicos';
  var bySlug = {}; P.forEach(function (p) { bySlug[p.slug] = p; });
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var IMG = '../assets/img/';

  /* Una línea por producto, para vender sin prometer lo que no sabemos. */
  var LINEAS = {
    'pan-de-almendras': 'El de las tostadas de todos los días. Con palta, con queso o con lo que haya.',
    'pan-blanco': 'Miga blanda y tostado parejo. Para el sándwich de siempre.',
    'pan-de-chipa': 'El chipá, pero en formato pan. Sí, existe, y sí, se tuesta.',
    'chipa': 'Un ratito de horno y la merienda está resuelta. El mate lo ponés vos.',
    'cookies-pistacho': 'Las que se terminan primero. Avisada estás.',
    'cookies-clasicas': 'Las de toda la vida, para mojar en el café.',
    'cookies-chocolate': 'Para cuando el antojo pide chocolate y no acepta un no.',
    'cookie-ny-clasica': 'Gordita y blandita en el medio. Estilo Nueva York, hecha a mano.',
    'cookie-ny-chocolate': 'La NY para las fans del chocolate. Partila al medio y vas a entender.',
    'cookie-ny-pistacho': 'Gordita, con pistacho y muy difícil de compartir.',
    'matcha-protein-balls': 'Bocaditos de matcha para la cartera, el gym o la reunión eterna.',
    'chocolate-protein-balls': 'Un bocado de chocolate para el bajón de las cinco de la tarde.',
    'coco-protein-balls': 'Coco y cero vueltas. Para el bolso o el escritorio.',
    'alfajor-chocolate': 'El alfajor que no tiene que pedir perdón.',
    'alfajor-matcha': 'Para las que le ponen matcha a todo. Ahora también al alfajor.',
    'alfajor-frutos-rojos': 'Frutos rojos y tapitas tiernas. El más fotogénico de la caja.',
    'mini-alfajores-almendras': 'Chiquitos. De a uno no se puede, ya te avisamos.',
    'datiles-pistacho': 'Dátil, pistacho y listo. El postre de un martes cualquiera.',
    'datiles-caju': 'Dátil relleno de cajú: cremoso y para picar sin parar.',
    'datiles-chocolate': 'Dátil con chocolate: el postre más corto del mundo.',
    'datiles-mani': 'Dátil con maní. Dulce, saladito y peligroso.',
    'mini-cake-pistacho': 'Una torta en miniatura, para vos sola.',
    'mini-cake-chocolate': 'Chocolate en formato torta chiquita. Cuchara y listo.',
    'mini-cake-snicker': 'El clásico de maní y chocolate, en torta chiquita.',
    'mini-bocadito-pistacho': 'Un bocado, mucho pistacho.',
    'mini-bocadito-caju': 'Un bocado de cajú para el café de la tarde.',
    'bites-snicker': 'Maní y chocolate en bocaditos. Ojo que se van rápido.',
    'bites-snicker-white': 'La versión con chocolate blanco. Igual de peligrosa.',
    'crackers-salados': 'Para la picada, el dip o el vinito en la vereda.',
    'bizcochitos-salados': 'Los del mate. No hace falta decir más.',
    'granola-energy': 'Al yogur, a la fruta o directo del paquete (no juzgamos).',
    'granola-proteica': 'Para el desayuno largo o el después del entrenamiento.'
  };
  /* Momentos sugeridos (nuestros, no son claims ni ventas). */
  var MOMENTO = {
    'pan-de-almendras': 'Para el desayuno', 'chipa': 'Para el mate', 'alfajor-matcha': 'Para la merienda',
    'crackers-salados': 'Para la picada', 'mini-alfajores-almendras': 'Para regalar', 'datiles-pistacho': 'Para el postre',
    'cookie-ny-chocolate': 'Para el antojo', 'granola-energy': 'Para el desayuno', 'bizcochitos-salados': 'Para el mate'
  };
  /* Colores por categoría: fondo y texto (combinaciones con contraste suficiente). */
  var COLOR = {
    panes: ['#E24724', '#1B2016'], cookies: ['#D7C943', '#6F0315'], trufas: ['#4AA5BE', '#1B2016'], alfajores: ['#FDB8CC', '#6F0315'],
    datiles: ['#C7CD54', '#1B2016'], bocaditos: ['#2559BF', '#FFFFFF'], salados: ['#6F0315', '#FDB8CC'], granolas: ['#CB2C5C', '#FFFFFF'],
    proteicos: ['#1B2016', '#C7CD54']
  };
  var CAT_IMG = Object.assign({}, window.LCDP_CAT_IMG || {}, { proteicos: 'granola-proteica' });
  var CORTO = { datiles: 'Dátiles', bocaditos: 'Bocaditos' };
  var CAT_LINEA = {
    panes: 'Para tostar, para el sándwich, para todo', cookies: 'Clásicas, de chocolate, de pistacho y estilo NY', trufas: 'De matcha, de chocolate y de coco',
    alfajores: 'De chocolate, matcha y frutos rojos', datiles: 'Rellenos de pistacho, cajú, chocolate y maní', bocaditos: 'Mini cakes y bites para darte un gusto',
    salados: 'Chipá, crackers y bizcochitos', granolas: 'Para el yogur o directo del paquete',
    proteicos: 'Granola proteica, trufas y cookies NY'
  };
  /* Orden de «Todo»: arranca con los que elegimos para mostrar (hasta saber cuáles venden más) y mezcla categorías. */
  var ORDEN = ['pan-de-almendras', 'cookies-pistacho', 'alfajor-matcha', 'datiles-pistacho', 'chipa', 'mini-cake-pistacho', 'cookie-ny-chocolate', 'bites-snicker',
    'crackers-salados', 'granola-energy', 'alfajor-frutos-rojos', 'matcha-protein-balls'];
  var ordenTodo = ORDEN.concat(P.map(function (p) { return p.slug; }).filter(function (s) { return ORDEN.indexOf(s) === -1; }));

  /* ---------- Megamenú de «Tienda» (compu) ---------- */
  var ARRANQUE = ['pan-de-almendras', 'cookies-pistacho', 'alfajor-matcha'];
  var mega = $('[data-mega]');
  if (mega) {
    mega.innerHTML = '<div class="wrap mega-in">' +
      '<div class="mega-cats"><p class="eyebrow">Categorías</p><ul class="mega-grid">' +
      Object.keys(CATS).map(function (k) {
        return '<li><a href="index.html?cat=' + k + '#tienda" data-cat="' + k + '" style="--c:' + COLOR[k][0] + ';--t:' + COLOR[k][1] + '">' +
          '<span class="mega-foto"><img src="' + IMG + CAT_IMG[k] + '-640.webp" alt="" loading="lazy" width="56" height="56"></span>' +
          '<b>' + (CORTO[k] || CATS[k]) + '</b><small>' + CAT_LINEA[k] + '</small></a></li>';
      }).join('') +
      '</ul><a class="link" href="index.html#tienda" data-cat="todo">Ver los ' + P.length + ' productos</a></div>' +
      '<div class="mega-arranque"><p class="eyebrow">Para arrancar</p>' +
      ARRANQUE.map(function (s) {
        var p = bySlug[s]; if (!p) return '';
        return '<a class="mega-prod" href="' + (s === 'pan-de-almendras' ? 'producto.html' : 'producto.html?ejemplo=' + s) + '">' +
          '<img src="' + IMG + p.img + '-640.webp" alt="" loading="lazy" width="72" height="72"><span><b>' + p.name + '</b><small>' + LINEAS[s] + '</small></span></a>';
      }).join('') + '</div>' +
      '<div class="mega-entrega"><p class="eyebrow">Próxima entrega</p><p class="mega-fecha" data-viernes>el viernes</p>' +
      '<p>Pedí hasta el <strong data-corte>miércoles a las 18</strong> y lo horneamos para esa tanda.</p>' +
      '<a class="btn btn-rosa" href="index.html#tienda" data-cat="todo">Armar mi pedido</a>' +
      '<a class="mega-mayo" href="index.html#mayoristas">¿Tenés un café o una dietética? Pedí la lista mayorista →</a></div>' +
      '</div>';
  }

  /* ---------- Fechas: entrega los viernes, corte el miércoles anterior a las 18 ---------- */
  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function proxima(now) {
    var d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (var i = 0; i < 70; i++) {
      var f = new Date(d); f.setDate(d.getDate() + i);
      if (f.getDay() !== CAL.diaEntrega || (CAL.sinEntrega || []).indexOf(iso(f)) !== -1) continue;
      var c = new Date(f); c.setDate(f.getDate() - CAL.diasAntesCorte); c.setHours(CAL.horaCorte, 0, 0, 0);
      if (now < c) return { viernes: f, corte: c };
    }
  }
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  function dm(d) { return d.getDate() + '/' + (d.getMonth() + 1); }
  var nd = proxima(new Date());
  if (nd) {
    $$('[data-viernes]').forEach(function (el) { el.textContent = 'viernes ' + dm(nd.viernes); });
    $$('[data-viernes-corto]').forEach(function (el) { el.textContent = dm(nd.viernes); });
    $$('[data-corte]').forEach(function (el) { el.textContent = DIAS[nd.corte.getDay()] + ' ' + dm(nd.corte) + ' a las ' + CAL.horaCorte; });
  }

  /* ---------- WhatsApp ---------- */
  $$('[data-wa]').forEach(function (a) {
    a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(a.getAttribute('data-wa'));
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Cajones (carrito y menú) ---------- */
  var capa = $('.capa'), abierto = null, volverA = null;
  function abrir(id) {
    var c = document.getElementById(id); if (!c) return;
    if (abierto) cerrar(true);
    volverA = document.activeElement; abierto = c;
    if (aviso) aviso.classList.remove('visible');   /* que el aviso no tape «Finalizar pedido» */
    c.classList.add('abierto'); c.removeAttribute('inert'); c.setAttribute('aria-hidden', 'false');
    capa.classList.add('abierta'); document.body.style.overflow = 'hidden';
    $$('[aria-controls="' + id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    setTimeout(function () { var f = $('.cerrar', c); if (f) f.focus(); }, 60);
  }
  function cerrar(sinFoco) {
    if (!abierto) return;
    var id = abierto.id;
    abierto.classList.remove('abierto'); abierto.setAttribute('inert', ''); abierto.setAttribute('aria-hidden', 'true');
    capa.classList.remove('abierta'); document.body.style.overflow = '';
    $$('[aria-controls="' + id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    abierto = null;
    if (!sinFoco && volverA) volverA.focus();
  }
  $$('[data-abrir]').forEach(function (b) { b.addEventListener('click', function () { abrir(b.getAttribute('data-abrir')); }); });
  $$('[data-cerrar]').forEach(function (b) { b.addEventListener('click', function () { cerrar(); }); });
  if (capa) capa.addEventListener('click', function () { cerrar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
  $$('.menu-movil a').forEach(function (a) { a.addEventListener('click', function () { cerrar(true); }); });

  /* Categorías del menú del celular, con foto */
  $$('[data-menu-cats]').forEach(function (box) {
    box.innerHTML = Object.keys(CATS).map(function (k) {
      return '<a href="index.html?cat=' + k + '#tienda" data-cat="' + k + '" style="--c:' + COLOR[k][0] + ';--t:' + COLOR[k][1] + '">' +
        '<img src="' + IMG + CAT_IMG[k] + '-640.webp" alt="" loading="lazy" width="44" height="44"><span>' + (CORTO[k] || CATS[k]) + '</span></a>';
    }).join('');
  });

  /* Abrir y cerrar el megamenú: con el mouse (con una demora para no abrirse de pasada), con clic o con Enter;
     se cierra con Escape, al salir con el mouse, con un clic afuera o al elegir algo. */
  var megaBtn = $('[data-mega-btn]');
  if (mega && megaBtn) {
    var tAbrir, tCerrar;
    var abrirMega = function () { clearTimeout(tCerrar); mega.hidden = false; megaBtn.setAttribute('aria-expanded', 'true'); };
    var cerrarMega = function (volver) {
      clearTimeout(tAbrir); if (mega.hidden) return;
      mega.hidden = true; megaBtn.setAttribute('aria-expanded', 'false'); if (volver) megaBtn.focus();
    };
    megaBtn.addEventListener('click', function () { if (mega.hidden) abrirMega(); else cerrarMega(); });
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      [megaBtn, mega].forEach(function (el) {
        el.addEventListener('mouseenter', function () { clearTimeout(tCerrar); tAbrir = setTimeout(abrirMega, 140); });
        el.addEventListener('mouseleave', function () { clearTimeout(tAbrir); tCerrar = setTimeout(cerrarMega, 240); });
      });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mega.hidden) cerrarMega(true); });
    document.addEventListener('click', function (e) { if (!mega.hidden && !mega.contains(e.target) && !megaBtn.contains(e.target)) cerrarMega(); });
    mega.addEventListener('click', function (e) { if (e.target.closest('a')) cerrarMega(); });
    mega.addEventListener('focusout', function (e) { if (e.relatedTarget && !mega.contains(e.relatedTarget) && e.relatedTarget !== megaBtn) cerrarMega(); });
    window.addEventListener('resize', function () { if (window.innerWidth <= 1100) cerrarMega(); });
  }

  /* ---------- Pedido (carrito de muestra, queda en el navegador) ---------- */
  var KEY = 'lcdp-o3-pedido', ped = {};
  try { ped = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { ped = {}; }
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(ped)); } catch (e) {} }
  function total() { return Object.keys(ped).reduce(function (n, k) { return n + (bySlug[k] ? ped[k] : 0); }, 0); }
  function pintarPedido(salto) {
    var n = total();
    $$('.contador').forEach(function (c) {
      c.textContent = n;
      if (salto) { c.classList.remove('salta'); void c.offsetWidth; c.classList.add('salta'); }
    });
    $$('.carrito-btn').forEach(function (b) { b.setAttribute('aria-label', 'Ver tu pedido: ' + n + (n === 1 ? ' producto' : ' productos')); });
    $$('[data-ctrl]').forEach(function (c) { c.innerHTML = control(c.getAttribute('data-ctrl')); });
    var items = $('#pedido .items'), pie = $('#pedido .cajon-pie'), envio = $('[data-envio]');
    if (!items) return;
    var ks = Object.keys(ped).filter(function (k) { return bySlug[k] && ped[k] > 0; });
    if (!ks.length) {
      items.innerHTML = '<div class="vacio"><p>Todavía no sumaste nada.</p><p>Arrancá por el pan de almendras: no falla.</p></div>';
      pie.hidden = true; if (envio) envio.hidden = true; return;
    }
    pie.hidden = false; if (envio) envio.hidden = false;
    items.innerHTML = ks.map(function (k) {
      var p = bySlug[k];
      return '<div class="item"><img src="' + IMG + p.img + '-640.webp" alt="" width="64" height="64">' +
        '<div><b>' + p.name + '</b><div class="cant" role="group" aria-label="Cantidad de ' + p.name + '">' +
        '<button type="button" data-mas="' + k + '" data-n="-1" aria-label="Restar uno">−</button><output>' + ped[k] + '</output>' +
        '<button type="button" data-mas="' + k + '" data-n="1" aria-label="Sumar uno">+</button></div></div>' +
        '<button type="button" class="quitar" data-quitar="' + k + '">Quitar</button></div>';
    }).join('') + '<p class="mas-de-uno">¿Querés llevar 2, 3 o más? Sumalos con el <b>+</b> de cada producto.</p>';
  }
  /* Control de cada tarjeta: «+» si todavía no está en el pedido; contador − n + si ya está. */
  function control(slug) {
    var p = bySlug[slug], n = ped[slug] || 0;
    if (!p) return '';
    if (!n) return '<button type="button" class="sumar" data-sumar="' + slug + '" aria-label="Sumar ' + p.name + ' al pedido">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>';
    return '<span class="paso" role="group" aria-label="' + p.name + ' en tu pedido">' +
      '<button type="button" data-mas="' + slug + '" data-n="-1" aria-label="Restar un ' + p.name.toLowerCase() + '">−</button>' +
      '<output aria-live="polite">' + n + '</output>' +
      '<button type="button" data-mas="' + slug + '" data-n="1" aria-label="Sumar otro ' + p.name.toLowerCase() + '">+</button></span>';
  }
  function sumar(slug, n) {
    ped[slug] = (ped[slug] || 0) + (n || 1);
    if (ped[slug] <= 0) delete ped[slug];
    guardar(); pintarPedido(true);
  }
  var aviso = $('.aviso'), tAviso;
  function avisar(txt, conBoton) {
    if (!aviso) return;
    $('span', aviso).textContent = txt;
    $('button', aviso).hidden = !conBoton;
    aviso.classList.add('visible');
    clearTimeout(tAviso); tAviso = setTimeout(function () { aviso.classList.remove('visible'); }, 3400);
  }
  if (aviso) $('button', aviso).addEventListener('click', function () { aviso.classList.remove('visible'); abrir('pedido'); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-sumar]');
    if (b) {
      var s = b.getAttribute('data-sumar'), caja = b.closest('[data-ctrl]'); sumar(s, 1);
      if (caja) { var otro = $('[data-n="1"]', caja); if (otro) otro.focus(); }
      avisar('Sumaste ' + bySlug[s].name + '. Con el + llevás más.', true); return;
    }
    var m = e.target.closest('[data-mas]');
    if (m) { sumar(m.getAttribute('data-mas'), +m.getAttribute('data-n')); return; }
    var q = e.target.closest('[data-quitar]');
    if (q) { delete ped[q.getAttribute('data-quitar')]; guardar(); pintarPedido(); return; }
    if (e.target.closest('[data-finalizar]')) {
      avisar('En la tienda, acá sigue el pago con Mercado Pago o transferencia.', false); return;
    }
  });
  pintarPedido();

  /* ---------- Envío por código postal (zonas de MUESTRA hasta tener las de Katia) ----------
     En la tienda esto sale de las zonas de envío de WooCommerce, con sus tarifas. */
  var ZONAS = [
    { nombre: 'CABA', es: function (cp) { return cp >= 1000 && cp <= 1499; } },
    { nombre: 'Zona Norte', es: function (cp) { return (cp >= 1600 && cp <= 1649) || (cp >= 1660 && cp <= 1670); } }
  ];
  var KEY_CP = 'lcdp-o3-cp';
  var formEnvio = $('[data-envio]');
  function opcion(valor, titulo, detalle, marcada) {
    return '<label class="opcion"><input type="radio" name="entrega" value="' + valor + '"' + (marcada ? ' checked' : '') + '>' +
      '<span><b>' + titulo + '</b><small>' + detalle + '</small></span></label>';
  }
  function calcularEnvio(texto, sinFoco) {
    var err = $('.envio-error', formEnvio), ops = $('.envio-opciones', formEnvio);
    var m = String(texto || '').toUpperCase().replace(/\s/g, '').match(/^[A-Z]?(\d{4})([A-Z]{3})?$/);
    if (!m) {
      ops.hidden = true; err.hidden = false;
      err.textContent = 'Poné los 4 números de tu código postal, por ejemplo 1636.';
      if (!sinFoco) $('#cp').focus();
      return;
    }
    err.hidden = true;
    var cp = +m[1], zona = ZONAS.filter(function (z) { return z.es(cp); })[0];
    var viernes = nd ? 'viernes ' + dm(nd.viernes) : 'el viernes';
    var leg = '<legend class="sr-only">Cómo lo recibís</legend>';
    var retiro = opcion('retiro', 'Retiro por nuestro taller', 'Sin cargo · ' + viernes, !zona);
    if (zona) {
      ops.innerHTML = leg + opcion('envio', 'Envío a domicilio · ' + zona.nombre, 'Llega el ' + viernes + ' · costo a confirmar', true) + retiro;
    } else {
      ops.innerHTML = leg + '<p class="fuera">Por ahora no llegamos al ' + m[1] + '. Podés pasarlo a buscar por nuestro taller o <a href="#" data-wa-cp>escribirnos por WhatsApp</a>.</p>' + retiro;
      var a = $('[data-wa-cp]', ops);
      a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('¡Hola! ¿Llegan con envíos al código postal ' + m[1] + '?');
      a.target = '_blank'; a.rel = 'noopener';
    }
    ops.hidden = false;
    try { localStorage.setItem(KEY_CP, m[1]); } catch (e) {}
  }
  if (formEnvio) {
    formEnvio.addEventListener('submit', function (e) { e.preventDefault(); calcularEnvio($('#cp').value); });
    var cpGuardado = null;
    try { cpGuardado = localStorage.getItem(KEY_CP); } catch (e) {}
    if (cpGuardado) { $('#cp').value = cpGuardado; calcularEnvio(cpGuardado, true); }
  }

  /* ---------- Tarjetas y carril de la tienda ---------- */
  function tarjeta(p) {
    var mom = MOMENTO[p.slug] ? '<span class="flag">' + MOMENTO[p.slug] + '</span>' : '';
    var link = p.slug === 'pan-de-almendras' ? 'producto.html' : 'producto.html?ejemplo=' + p.slug;
    return '<article class="card">' +
      '<div class="card-foto">' + mom +
      '<a href="' + link + '" tabindex="-1" aria-hidden="true"><img src="' + IMG + p.img + '-640.webp" alt="' + p.name + '" loading="lazy" width="640" height="' + (p.tall ? 853 : 640) + '"></a>' +
      '<span class="ctrl" data-ctrl="' + p.slug + '">' + control(p.slug) + '</span></div>' +
      '<h3><a href="' + link + '">' + p.name + '</a></h3><p>' + (LINEAS[p.slug] || '') + '</p></article>';
  }
  var carril = $('#carril'), chips = $$('.chip');
  function filtrar(cat) {
    if (!carril) return;
    var lista = cat === 'todo' ? ordenTodo.map(function (s) { return bySlug[s]; }).filter(Boolean)
      : cat === 'proteicos' ? PROTEICOS.map(function (s) { return bySlug[s]; }).filter(Boolean)
      : P.filter(function (p) { return p.cat === cat; });
    carril.innerHTML = lista.map(tarjeta).join('');
    carril.scrollLeft = 0;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-filtro') === cat)); });
    var cuenta = $('#cuenta'); if (cuenta) cuenta.textContent = lista.length + (lista.length === 1 ? ' producto' : ' productos');
    actualizarFlechas();
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { filtrar(c.getAttribute('data-filtro')); }); });
  /* Las bandas de categorías y el menú filtran la tienda y bajan hasta ella. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cat]');
    if (!a || !carril) return;
    e.preventDefault(); cerrar(true); filtrar(a.getAttribute('data-cat'));
    $('#tienda').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  var izq = $('[data-flecha="-1"]'), der = $('[data-flecha="1"]');
  function actualizarFlechas() {
    if (!carril || !izq) return;
    izq.disabled = carril.scrollLeft < 8;
    der.disabled = carril.scrollLeft + carril.clientWidth >= carril.scrollWidth - 8;
  }
  $$('[data-flecha]').forEach(function (b) {
    b.addEventListener('click', function () { carril.scrollBy({ left: +b.getAttribute('data-flecha') * carril.clientWidth * .9, behavior: 'smooth' }); });
  });
  if (carril) {
    carril.addEventListener('scroll', actualizarFlechas, { passive: true }); window.addEventListener('resize', actualizarFlechas);
    /* Si se llega desde el megamenú o el menú de otra página (index.html?cat=…), se abre filtrada. */
    var catUrl = (location.search.match(/[?&]cat=([\w-]+)/) || [])[1];
    filtrar(catUrl && CATS[catUrl] ? catUrl : 'todo');
  }

  /* Otros carriles fijos (ficha: «Va bien con») */
  $$('[data-productos]').forEach(function (box) {
    box.innerHTML = box.getAttribute('data-productos').split(',').map(function (s) { return bySlug[s.trim()]; }).filter(Boolean).map(tarjeta).join('');
  });

  /* Bandas: color y foto de cada categoría */
  $$('.banda[data-cat]').forEach(function (b) {
    var k = b.getAttribute('data-cat'); if (!COLOR[k]) return;
    b.style.setProperty('--c', COLOR[k][0]); b.style.setProperty('--t', COLOR[k][1]);
    b.innerHTML = '<b>' + (CORTO[k] || CATS[k]) + '</b><small>' + CAT_LINEA[k] + '</small>' +
      '<span class="mini"><img src="' + IMG + CAT_IMG[k] + '-640.webp" alt="" loading="lazy" width="92" height="92"></span>';
  });

  /* ---------- Ficha de producto ---------- */
  var cant = $('[data-cant]');
  if (cant) {
    var n = 1, out = $('output', cant);
    $$('button', cant).forEach(function (b) {
      b.addEventListener('click', function () { n = Math.max(1, Math.min(20, n + +b.getAttribute('data-n'))); out.textContent = n; });
    });
    $$('[data-sumar-ficha]').forEach(function (b) {
      b.addEventListener('click', function () {
        var s = b.getAttribute('data-sumar-ficha'); sumar(s, n);
        avisar('Sumaste ' + n + ' ' + bySlug[s].name.toLowerCase() + ' a tu pedido', true);
      });
    });
  }
  $$('.miniaturas button').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = $('.galeria-main img');
      img.src = b.getAttribute('data-src'); img.alt = b.getAttribute('data-alt');
      $$('.miniaturas button').forEach(function (x) { x.setAttribute('aria-current', String(x === b)); });
    });
  });
  var barra = $('.barra-compra'), ancla = $('.compra');
  /* La barra fija aparece cuando el botón de compra quedó arriba, fuera de la pantalla (también si se salta de golpe). */
  if (barra && ancla) {
    var pend = false;
    var revisar = function () { pend = false; barra.classList.toggle('visible', ancla.getBoundingClientRect().bottom < 0); };
    window.addEventListener('scroll', function () { if (!pend) { pend = true; requestAnimationFrame(revisar); } }, { passive: true });
    window.addEventListener('resize', revisar);
    revisar();
  }
  /* Ficha de ejemplo: si se entra desde otro producto, se avisa que es la del pan de almendras. */
  if (/ejemplo=/.test(location.search) && $('.pdp')) {
    var s = (location.search.match(/ejemplo=([\w-]+)/) || [])[1];
    if (bySlug[s]) setTimeout(function () { avisar('Ficha de muestra: en la tienda, cada producto tiene la suya (' + bySlug[s].name + ').', false); }, 400);
  }

  /* Cinta de propuesta */
  var cinta = $('.cinta-prop');
  if (cinta) $('button', cinta).addEventListener('click', function () { cinta.remove(); });
})();
