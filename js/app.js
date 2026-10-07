/* ═══════════════════════════════════
   APP — Google Analytics, links do WhatsApp e galeria
   Depende de: config.js, galeria.js, engine.js
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

initGaleria();
