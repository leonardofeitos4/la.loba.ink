/* ═══════════════════════════════════
   FLOWS — Luna · Assistente da La Loba Ink
   (português de Portugal, tratamento por "tu", como na bio da Marta)

   Estrutura de cada flow:
   {
     msg: string (HTML permitido),
     chips: [
       { l: 'Label', f: 'flow_id' }    → navega para outro flow
       { l: 'Label', wa: 'mensagem' }  → abre WhatsApp (recebe CONFIG.WA_PREFIX na frente)
       { l: 'Label', href: 'pagina.html' } → abre outra página (ou link externo)
     ]
   }
═══════════════════════════════════ */

/* Miniaturas reais de um estilo dentro do chat (as fotos vêm de ESTILOS, em galeria.js).
   Tocar numa abre a foto em ecrã inteiro. */
function fotosDoEstilo(id) {
  const e = ESTILOS.find(x => x.id === id);
  if (!e || !e.fotos.length) return '';
  return `<div class="bot-fotos">${e.fotos.slice(0, 3).map(f =>
    `<img src="assets/estilos/${id}/${f}" alt="Tattoo ${e.nome} – La Loba Ink" loading="lazy">`
  ).join('')}</div>`;
}

const flows = {

  /* ── MENU PRINCIPAL ── */
  inicio: {
    msg: `Em que te posso ajudar? 🖤`,
    chips: [
      { l: '✒️ Quero fazer uma tattoo', f: 'tattoo' },
      { l: '🌿 Conhecer os estilos', f: 'estilos' },
      { l: '🎨 Desenhos disponíveis', f: 'disponiveis' },
      { l: '🐺 Primeira tattoo', f: 'primeira' },
      { l: '🎬 Ver vídeos', f: 'videos' },
      { l: '📍 Guest spots', f: 'guest' },
      { l: '🖤 Quem é a Marta?', f: 'sobre' },
    ]
  },

  /* ── QUERO TATUAR ── */
  tattoo: {
    msg: `Que bom! ✨ Para a Marta preparar o teu orçamento, tem à mão:<br><br>
          • a tua <strong>ideia</strong> ou uma referência<br>
          • o <strong>local do corpo</strong><br>
          • o <strong>tamanho aproximado</strong> (em cm)<br><br>
          Já sabes o estilo que queres?`,
    chips: [
      { l: 'Sim, já sei o estilo', f: 'estilos' },
      { l: 'Ainda não, quero ajuda', wa: 'tenho uma ideia de tattoo mas ainda não sei o estilo. Podes ajudar-me?' },
      { l: '💬 Pedir orçamento', wa: 'quero um orçamento de tattoo.' },
    ]
  },

  /* ── ESTILOS ── */
  estilos: {
    msg: `A Marta é especialista em <strong>Floral Fineline</strong>, <strong>Fineline</strong> e <strong>Microrealismo</strong>, e também faz Realismo e Lettering. Qual combina mais contigo?`,
    chips: [
      { l: 'Floral Fineline', f: 'est_floral' },
      { l: 'Fineline', f: 'est_fineline' },
      { l: 'Microrealismo', f: 'est_microrealismo' },
      { l: 'Realismo', f: 'est_realismo' },
      { l: 'Lettering', f: 'est_lettering' },
    ]
  },
  est_fineline: {
    msg: `<strong>Fineline</strong> é o traço fino e delicado. Perfeito para tattoos discretas: libélulas, ramos, símbolos e desenhos minimalistas. ✒️<br><br>Alguns trabalhos da Marta:${fotosDoEstilo('fineline')}`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Fineline.' },
      { l: '🖼️ Ver trabalhos', href: 'trabalhos.html?estilo=fineline' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_floral: {
    msg: `<strong>Floral Fineline</strong> são flores e folhagens em traço fino, desenhadas para acompanhar o movimento do corpo. 🌿<br><br>É uma das especialidades da Marta: peças que acompanham a anca, o antebraço ou até descer pela mão, com flores, folhas e ramos.${fotosDoEstilo('floral-fineline')}`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Floral Fineline.' },
      { l: '🖼️ Ver trabalhos', href: 'trabalhos.html?estilo=floral-fineline' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_microrealismo: {
    msg: `<strong>Microrealismo</strong> é detalhe de fotografia em tamanho pequeno: retratos, animais, objetos com significado. 🔍<br><br>A Marta já fez retratos de pessoas queridas, bebés, animais de estimação e peças com caveira e flores.${fotosDoEstilo('microrealismo')}Funciona melhor a partir de uns 5 cm, para o detalhe durar com o tempo.`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Microrealismo.' },
      { l: '🖼️ Ver trabalhos', href: 'trabalhos.html?estilo=microrealismo' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_realismo: {
    msg: `<strong>Realismo</strong> são peças maiores, com sombra e volume, fiéis à referência. 🖤<br><br>Projetos grandes podem ser feitos em mais de uma sessão.${fotosDoEstilo('realismo')}`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Realismo.' },
      { l: '🖼️ Ver trabalhos', href: 'trabalhos.html?estilo=realismo' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_lettering: {
    msg: `<strong>Lettering</strong> é escrita com estilo: nomes, datas, frases. A letra é pensada para ti e para o local do corpo, e pode levar detalhes como uma coroa, uma data ou um pequeno símbolo. ✍️${fotosDoEstilo('lettering')}`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Lettering.' },
      { l: '🖼️ Ver trabalhos', href: 'trabalhos.html?estilo=lettering' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },

  /* ── DESENHOS DISPONÍVEIS ── */
  disponiveis: {
    msg: `A Marta tem <strong>desenhos disponíveis</strong>: criações dela, prontas a tatuar, e cada uma é feita uma só vez. 🎨<br><br>Queres ver?`,
    chips: [
      { l: '🖼️ Ver desenhos', href: 'disponiveis.html' },
      { l: '💬 Gostei de um', wa: 'gostei de um dos desenhos disponíveis.' },
    ]
  },

  /* ── PRIMEIRA TATTOO ── */
  primeira: {
    msg: `A primeira tattoo é especial! 🐺 O que queres saber?`,
    chips: [
      { l: 'Dói muito?', f: 'dor' },
      { l: 'Como me preparo?', f: 'preparo' },
      { l: 'Como cuido depois?', f: 'cuidados' },
    ]
  },
  dor: {
    msg: `Depende do local e da sensibilidade de cada pessoa. Braço, coxa e antebraço costumam ser mais tranquilos; costelas, pés e mãos incomodam mais.<br><br>O traço fino (fineline) costuma ser mais leve. 😉`,
    chips: [
      { l: 'Como me preparo?', f: 'preparo' },
      { l: '💬 Quero marcar', wa: 'quero marcar a minha primeira tattoo.' },
    ]
  },
  preparo: {
    msg: `Para o dia da tattoo:<br><br>
          • dorme bem e come antes de vir<br>
          • bebe bastante água nos dias anteriores<br>
          • evita álcool nas 24h antes<br>
          • vem com roupa confortável que deixe o local livre`,
    chips: [
      { l: 'Como cuido depois?', f: 'cuidados' },
      { l: '💬 Quero marcar', wa: 'quero marcar a minha primeira tattoo.' },
    ]
  },
  cuidados: {
    msg: `Os cuidados são simples, e a Marta explica tudo no dia:<br><br>
          • lavar com sabonete neutro e secar com toques leves<br>
          • hidratar com a pomada indicada<br>
          • nada de sol, piscina ou mar nas primeiras semanas<br>
          • não coçar nem arrancar as crostas`,
    chips: [
      { l: '💬 Tenho outra dúvida', wa: 'tenho uma dúvida sobre os cuidados com a tattoo.' },
      { l: '💬 Quero marcar', wa: 'quero marcar a minha primeira tattoo.' },
    ]
  },

  /* ── VÍDEOS ── */
  videos: {
    msg: `Há dois vídeos da Marta: 🎬<br><br>
          • <strong>A minha história</strong>: como a Marta desenha e cria cada peça, do papel à pele<br>
          • <strong>Bastidores</strong>: a Marta a tatuar no estúdio<br><br>
          Estão na página inicial e na página Sobre.`,
    chips: [
      { l: '🎬 Ver os vídeos', href: 'index.html#em-video' },
      { l: '🖤 Quem é a Marta?', f: 'sobre' },
    ]
  },

  /* ── GUEST SPOTS ── */
  guest: {
    msg: `A Marta também tatua como <strong>guest</strong>, convidada noutros estúdios e cidades. 📍<br><br>As vagas de cada guest são poucas. Queres saber as próximas datas?`,
    chips: [
      { l: '📍 Ver datas', href: 'guest.html' },
      { l: '💬 Reservar vaga', wa: 'quero saber das próximas datas de guest.' },
    ]
  },

  /* ── SOBRE ── */
  sobre: {
    msg: `A <strong>Marta Loba</strong> é a artista por trás da La Loba Ink. 🐺<br><br><em>"A tua história, a minha arte."</em><br><br>Trabalha com traço fino, flores e microrealismo, e também com realismo e lettering, sempre com desenho exclusivo, pensado para o corpo e a história de cada pessoa. Cada peça começa no papel ou no tablet, desenhada por ela.`,
    chips: [
      { l: '🎬 Ver a história dela', href: 'sobre.html' },
      { l: '🌿 Ver os estilos', f: 'estilos' },
      { l: '💬 Falar com a Marta', wa: 'quero falar com a Marta sobre uma tattoo.' },
    ]
  },

};
