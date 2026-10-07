/* ═══════════════════════════════════
   CONFIG — La Loba Ink
   Tudo o que muda de um biolink para outro fica aqui.
═══════════════════════════════════ */
const CONFIG = {
  WA: '351912572305',           // WhatsApp da Kamila (Portugal)
  // Início de toda mensagem enviada ao WhatsApp (botões da página e do bot)
  WA_PREFIX: 'Olá! Vim do biolink da La Loba Ink e',
  BOT_NAME: 'Luna',
  // Google Analytics: cole aqui o ID (G-XXXXXXXXXX). Vazio = desligado.
  GA_ID: '',
  // Alerta de interação no WhatsApp (api/notify.js na Vercel). Vazio = desligado.
  NOTIFY_URL: '',
  typingDelayMin: 1400,
  typingDelayRandom: 500,
};

function waLink(msg) {
  return `https://wa.me/${CONFIG.WA}?text=${encodeURIComponent(`${CONFIG.WA_PREFIX} ${msg}`)}`;
}
