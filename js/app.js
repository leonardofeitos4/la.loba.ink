/* ═══════════════════════════════════
   APP — Google Analytics, chat, links do WhatsApp e galerias
   Depende de: config.js, galeria.js, flows.js, engine.js
   (usado em todas as páginas)
═══════════════════════════════════ */

/* Google Analytics (só carrega se CONFIG.GA_ID estiver preenchido) */
if (CONFIG.GA_ID) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', CONFIG.GA_ID);
}

/* Chat da Luna + botão flutuante do WhatsApp */
mountBot();

/* Links de WhatsApp fixos da página: montados a partir de data-msg */
document.querySelectorAll('.js-wa').forEach(a => {
  a.href = waLink(a.dataset.msg);
  a.target = '_blank';
  a.rel = 'noopener';
});

/* Todo clique pro WhatsApp (página, galeria ou bot) gera evento + alerta */
document.addEventListener('click', e => {
  const a = e.target.closest('.js-wa');
  if (a) track(`💬 Foi pro WhatsApp: ${a.dataset.msg}`);
});

/* Botões que abrem a Luna (ex: "Tirar dúvidas com a Luna") */
document.querySelectorAll('.js-bot').forEach(b =>
  b.addEventListener('click', e => { e.preventDefault(); openBot(); })
);

/* Galerias: cada página só tem as partes dela; initGaleria monta o que existir */
initGaleria();
