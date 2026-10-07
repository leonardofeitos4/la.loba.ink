/* ═══════════════════════════════════
   ALERTA DE INTERAÇÃO — Luna (La Loba Ink)
   Função serverless da Vercel: recebe cada interação do chatbot
   e manda um aviso no WhatsApp via CallMeBot (gratuito).

   Variáveis de ambiente (Vercel → Settings → Environment Variables):
     CALLMEBOT_PHONE   número que recebe os alertas, ex: +558396666285
     CALLMEBOT_APIKEY  chave que o CallMeBot manda ao ativar o número
═══════════════════════════════════ */

const limpa = (v, max) => String(v || '').replace(/[\r\n]+/g, ' ').slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { CALLMEBOT_PHONE, CALLMEBOT_APIKEY } = process.env;
  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) {
    return res.status(500).json({ ok: false, erro: 'CALLMEBOT_PHONE/CALLMEBOT_APIKEY não configurados' });
  }

  // sendBeacon envia como texto, então o corpo pode chegar como string
  let data = req.body || {};
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch (e) { data = {}; }
  }
  const visitante = limpa(data.visitante, 8);
  const acao = limpa(data.acao, 120);
  if (!acao) return res.status(400).json({ ok: false });

  // Localização aproximada pelo IP (cabeçalhos da própria Vercel)
  const h = req.headers;
  const cidade = h['x-vercel-ip-city'] ? decodeURIComponent(h['x-vercel-ip-city']) : 'cidade ?';
  const uf = h['x-vercel-ip-country-region'] ? `/${h['x-vercel-ip-country-region']}` : '';
  const aparelho = /mobile|android|iphone/i.test(h['user-agent'] || '') ? '📱 Celular' : '💻 Computador';
  const hora = new Date().toLocaleTimeString('pt-BR', {
    timeZone: process.env.ALERT_TZ || 'America/Fortaleza', hour: '2-digit', minute: '2-digit',
  });

  const texto =
    `🐺 *Luna · La Loba Ink* · visitante #${visitante}\n` +
    `${acao}\n` +
    `📍 ${cidade}${uf} · ${aparelho} · ${hora}`;

  const url = 'https://api.callmebot.com/whatsapp.php'
    + `?phone=${encodeURIComponent(CALLMEBOT_PHONE)}`
    + `&text=${encodeURIComponent(texto)}`
    + `&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`;

  try {
    const r = await fetch(url);
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch (e) {
    return res.status(502).json({ ok: false });
  }
};
