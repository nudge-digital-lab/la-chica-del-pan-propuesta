/* Productos tomados de las fotos y etiquetas que mandó Katia (nov. 2026).
   Precios y presentaciones: a confirmar por la clienta. No inventar.
   Claims (devolución del 19/11): keto, low carb y proteico van SOLO en los productos que ella indique en su
   planilla, y la proteína en gramos. Hasta tenerla, ningún producto lleva etiqueta. Nada de «sin gluten»
   (no están certificadas Sin TACC) ni «sin harinas refinadas». */
window.LCDP_PRODUCTS = [
  { slug: 'pan-de-almendras', name: 'Pan de almendras', cat: 'panes', tags: [], img: 'pan-de-almendras', tall: true },
  { slug: 'pan-blanco', name: 'Pan blanco', cat: 'panes', tags: [], img: 'pan-blanco', tall: true },
  { slug: 'pan-de-chipa', name: 'Pan de chipá', cat: 'panes', tags: [], img: 'pan-de-chipa' },
  { slug: 'chipa', name: 'Chipá', cat: 'salados', tags: [], img: 'chipa' },
  { slug: 'cookies-pistacho', name: 'Cookies pistacho', cat: 'cookies', tags: [], img: 'cookies-pistacho' },
  { slug: 'cookies-clasicas', name: 'Cookies clásicas', cat: 'cookies', tags: [], img: 'cookies-clasicas' },
  { slug: 'cookies-chocolate', name: 'Cookies chocolate', cat: 'cookies', tags: [], img: 'cookies-chocolate' },
  { slug: 'cookie-ny-clasica', name: 'Cookie NY clásica', cat: 'trufas', tags: [], img: 'cookie-ny-clasica' },
  { slug: 'cookie-ny-chocolate', name: 'Cookie NY chocolate', cat: 'trufas', tags: [], img: 'cookie-ny-chocolate' },
  { slug: 'cookie-ny-pistacho', name: 'Cookie NY pistacho', cat: 'trufas', tags: [], img: 'cookie-ny-pistacho' },
  { slug: 'matcha-protein-balls', name: 'Matcha protein balls', cat: 'trufas', tags: [], img: 'matcha-protein-balls' },
  { slug: 'chocolate-protein-balls', name: 'Chocolate protein balls', cat: 'trufas', tags: [], img: 'chocolate-protein-balls' },
  { slug: 'coco-protein-balls', name: 'Coco protein balls', cat: 'trufas', tags: [], img: 'coco-protein-balls' },
  { slug: 'alfajor-chocolate', name: 'Alfajor chocolate', cat: 'alfajores', tags: [], img: 'alfajor-chocolate', tall: true },
  { slug: 'alfajor-matcha', name: 'Alfajor matcha', cat: 'alfajores', tags: [], img: 'alfajor-matcha', tall: true },
  { slug: 'alfajor-frutos-rojos', name: 'Alfajor frutos rojos', cat: 'alfajores', tags: [], img: 'alfajor-frutos-rojos', tall: true },
  { slug: 'mini-alfajores-almendras', name: 'Mini alfajores de almendras', cat: 'alfajores', tags: [], img: 'mini-alfajores-almendras' },
  { slug: 'datiles-pistacho', name: 'Dátiles pistacho', cat: 'datiles', tags: [], img: 'datiles-pistacho' },
  { slug: 'datiles-caju', name: 'Dátiles cajú', cat: 'datiles', tags: [], img: 'datiles-caju' },
  { slug: 'datiles-chocolate', name: 'Dátiles chocolate', cat: 'datiles', tags: [], img: 'datiles-chocolate' },
  { slug: 'datiles-mani', name: 'Dátiles maní', cat: 'datiles', tags: [], img: 'datiles-mani' },
  { slug: 'mini-cake-pistacho', name: 'Mini cake pistacho', cat: 'bocaditos', tags: [], img: 'mini-cake-pistacho' },
  { slug: 'mini-cake-chocolate', name: 'Mini cake chocolate', cat: 'bocaditos', tags: [], img: 'mini-cake-chocolate' },
  { slug: 'mini-cake-snicker', name: 'Mini cake snicker', cat: 'bocaditos', tags: [], img: 'mini-cake-snicker' },
  { slug: 'mini-bocadito-pistacho', name: 'Mini bocadito pistacho', cat: 'bocaditos', tags: [], img: 'mini-bocadito-pistacho' },
  { slug: 'mini-bocadito-caju', name: 'Mini bocadito cajú', cat: 'bocaditos', tags: [], img: 'mini-bocadito-caju' },
  { slug: 'bites-snicker', name: 'Bites de snicker', cat: 'bocaditos', tags: [], img: 'bites-snicker' },
  { slug: 'bites-snicker-white', name: 'Bites de snicker white', cat: 'bocaditos', tags: [], img: 'bites-snicker-white' },
  { slug: 'crackers-salados', name: 'Crackers salados', cat: 'salados', tags: [], img: 'crackers-salados' },
  { slug: 'bizcochitos-salados', name: 'Bizcochitos salados', cat: 'salados', tags: [], img: 'bizcochitos-salados' },
  { slug: 'granola-energy', name: 'Granola energy', cat: 'granolas', tags: [], img: 'granola-energy', tall: true },
  { slug: 'granola-proteica', name: 'Granola proteica', cat: 'granolas', tags: [], img: 'granola-proteica', tall: true }
];

window.LCDP_TAGS = {
  keto: 'Keto',
  lowcarb: 'Low carb',
  proteico: 'Proteico'
};

/* Nombres de las categorías (provisorios hasta la planilla). */
window.LCDP_CATS = {
  panes: 'Panes', cookies: 'Cookies', trufas: 'Trufas y cookies NY', alfajores: 'Alfajores',
  datiles: 'Dátiles rellenos', bocaditos: 'Mini cakes y bocaditos', salados: 'Salados', granolas: 'Granolas'
};

/* Calendario de entregas. En la tienda esto se cambia desde el panel: el día y la hora del corte, y los
   viernes sin entrega (feriados o semanas sin producción), en formato 'AAAA-MM-DD'. */
window.LCDP_CALENDARIO = {
  diaEntrega: 5,        // viernes
  diasAntesCorte: 2,    // miércoles
  horaCorte: 18,        // a las 18
  sinEntrega: []        // por ejemplo ['2026-12-25']
};

/* WhatsApp de la marca: lo pasa Katia. Vacío, los enlaces avisan que falta el número. */
window.LCDP_WHATSAPP = '';
