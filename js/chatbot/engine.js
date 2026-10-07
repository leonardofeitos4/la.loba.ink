/* ═══════════════════════════════════
   ENGINE — Motor do Chatbot
   Depende de: config.js, flows.js
═══════════════════════════════════ */

let botStarted = false;

/* Código curto do visitante, pra agrupar os alertas da mesma pessoa */
const visitante = Math.random().toString(36).slice(2, 6).toUpperCase();

/* Registra a interação no Google Analytics e envia alerta para o WhatsApp (via api/notify.js) */
function track(acao) {
  if (typeof gtag === 'function') gtag('event', 'chatbot', { acao });
  if (!CONFIG.NOTIFY_URL) return;
  const body = JSON.stringify({ visitante, acao, pagina: location.pathname });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon(CONFIG.NOTIFY_URL, body);
    else fetch(CONFIG.NOTIFY_URL, { method: 'POST', body, keepalive: true });
  } catch (e) { /* alerta nunca pode quebrar a página */ }
}

/* Renderiza chips inline abaixo da mensagem */
function showChips(chips, area) {
  if (!chips) return;
  const wrap = document.createElement('div');
  wrap.className = 'inline-chips';

  let html = chips.map(c => {
    if (c.wa)   return `<a class="qrb qrb-wa js-wa" data-msg="${c.wa}" href="${waLink(c.wa)}" target="_blank" rel="noopener">${c.l}</a>`;
    if (c.href) {
      const ext = c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      return `<a class="qrb" href="${c.href}"${ext} onclick="closeBot(); track('🔗 Abriu: ${c.l.replace(/'/g, "\\'")}')">${c.l}</a>`;
    }
    return `<button class="qrb" onclick="runFlow('${c.f}','${c.l.replace(/'/g, "\\'")}')">${c.l}</button>`;
  }).join('');

  if (!chips.some(c => c.f === 'inicio')) {
    html += `<button class="qrb qrb-back" onclick="runFlow('inicio','↩ Menu principal')">↩ Início</button>`;
  }

  wrap.innerHTML = html;
  area.appendChild(wrap);
  area.scrollTop = area.scrollHeight;
}

/* Desativa chips anteriores quando o usuário escolhe uma opção */
function disableChips() {
  document.querySelectorAll('.inline-chips').forEach(el => {
    el.style.opacity = '.35';
    el.style.pointerEvents = 'none';
  });
}

/* Navega para um flow, exibindo a mensagem do usuário e a resposta do bot */
function runFlow(id, label) {
  const f = flows[id];
  if (!f) return;
  disableChips();
  if (label) { userMsg(label); track(`Escolheu: ${label}`); }
  botMsg(f.msg, f.chips);
}

/* Mensagem de boas-vindas ao abrir o chat */
function startChat() {
  setTimeout(() => botMsg(
    `Olá! Eu sou a <strong>${CONFIG.BOT_NAME}</strong>, assistente da <strong>La Loba Ink</strong>. 🐺<br><br>${flows.inicio.msg}`,
    flows.inicio.chips
  ), 350);
}

/* Renderiza mensagem do bot com indicador de digitação */
function botMsg(html, chips) {
  const a = document.getElementById('chat-area');
  if (!a) return;

  const td = document.createElement('div');
  td.className = 'typing-dot';
  td.innerHTML = `<span></span><span></span><span></span>`;
  a.appendChild(td);
  a.scrollTop = a.scrollHeight;

  const delay = CONFIG.typingDelayMin + Math.random() * CONFIG.typingDelayRandom;

  setTimeout(() => {
    td.remove();

    const lbl = document.createElement('div');
    lbl.className = 'mlbl';
    lbl.innerHTML = `<span class="bot-ava mlbl-ava">L</span>${CONFIG.BOT_NAME} · La Loba Ink`;
    a.appendChild(lbl);

    const msg = document.createElement('div');
    msg.className = 'msg bot';
    msg.innerHTML = html;
    a.appendChild(msg);

    if (chips !== undefined) showChips(chips, a);
    a.scrollTop = a.scrollHeight;
  }, delay);
}

/* Renderiza mensagem do usuário */
function userMsg(t) {
  const a = document.getElementById('chat-area');
  if (!a) return;
  const lbl = document.createElement('div');
  lbl.className = 'mlbl u';
  lbl.textContent = 'Tu';
  const msg = document.createElement('div');
  msg.className = 'msg user';
  msg.textContent = t;
  a.appendChild(lbl);
  a.appendChild(msg);
  a.scrollTop = a.scrollHeight;
}

/* ── Controle do widget (abrir / fechar) ── */
function openBot() {
  document.getElementById('bot-panel').classList.add('open');
  document.getElementById('bot-launcher').classList.add('hidden');
  if (!botStarted) { startChat(); botStarted = true; track('👋 Abriu o chat'); }
}

function closeBot() {
  document.getElementById('bot-panel').classList.remove('open');
  document.getElementById('bot-launcher').classList.remove('hidden');
}

/* Monta o botão flutuante e a janela do chat (igual em todas as páginas) */
function mountBot() {
  document.body.insertAdjacentHTML('beforeend', `
    <a class="wa-float js-wa" data-msg="quero mais informações." href="#" aria-label="WhatsApp">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
    <button id="bot-launcher" class="bot-launcher" onclick="openBot()" aria-label="Falar com a ${CONFIG.BOT_NAME}">
      <span class="bot-ava" aria-hidden="true">L</span>
      <span class="bot-badge">1</span>
    </button>
    <div id="bot-panel" class="bot-panel" role="dialog" aria-label="Chat com a ${CONFIG.BOT_NAME}">
      <div class="bot-head">
        <div class="bot-head-ava"><span class="bot-ava" aria-hidden="true">L</span></div>
        <div class="bot-head-info">
          <div class="bot-head-name"><span class="bot-online-dot"></span>${CONFIG.BOT_NAME}</div>
          <div class="bot-head-sub">Assistente da La Loba Ink · Online</div>
        </div>
        <button class="bot-close" onclick="closeBot()" aria-label="Fechar">&times;</button>
      </div>
      <div class="bot-handoff">
        <div class="bot-handoff-txt">Preferes falar diretamente com a Marta?</div>
        <a class="bot-handoff-btn js-wa" data-msg="quero falar com a Marta." href="#">💬 WhatsApp</a>
      </div>
      <div class="chat-area" id="chat-area"></div>
    </div>`);
}
