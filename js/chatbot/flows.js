/* ═══════════════════════════════════
   FLOWS — Luna · Assistente da La Loba Ink
   (português de Portugal, tratamento por "tu", como na bio da Marta)

   Estrutura de cada flow:
   {
     msg: string (HTML permitido),
     chips: [
       { l: 'Label', f: 'flow_id' }    → navega para outro flow
       { l: 'Label', wa: 'mensagem' }  → abre WhatsApp (recebe CONFIG.WA_PREFIX na frente)
       { l: 'Label', href: '#id' }     → leva a uma parte da página
     ]
   }
═══════════════════════════════════ */

const flows = {

  /* ── MENU PRINCIPAL ── */
  inicio: {
    msg: `Em que te posso ajudar? 🖤`,
    chips: [
      { l: '✒️ Quero fazer uma tattoo', f: 'tattoo' },
      { l: '🌿 Conhecer os estilos', f: 'estilos' },
      { l: '🎨 Desenhos disponíveis', f: 'disponiveis' },
      { l: '🐺 Primeira tattoo', f: 'primeira' },
      { l: '🎓 Workshops', f: 'workshops' },
      { l: '📅 Agenda e eventos', f: 'agenda' },
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
    msg: `A Marta é especialista em <strong>Fineline</strong>, <strong>Floral Fineline</strong> e <strong>Microrealismo</strong>, e também faz Realismo e Lettering. Qual combina mais contigo?`,
    chips: [
      { l: 'Fineline', f: 'est_fineline' },
      { l: 'Floral Fineline', f: 'est_floral' },
      { l: 'Microrealismo', f: 'est_microrealismo' },
      { l: 'Realismo', f: 'est_realismo' },
      { l: 'Lettering', f: 'est_lettering' },
    ]
  },
  est_fineline: {
    msg: `<strong>Fineline</strong> é o traço fino e delicado. Perfeito para tattoos discretas, símbolos e desenhos minimalistas. ✒️`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Fineline.' },
      { l: '🖼️ Ver trabalhos', href: '#estilos' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_floral: {
    msg: `<strong>Floral Fineline</strong> são flores e folhagens em traço fino, desenhadas para acompanhar o movimento do corpo. 🌿<br><br>É uma das especialidades da Marta.`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Floral Fineline.' },
      { l: '🖼️ Ver trabalhos', href: '#estilos' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_microrealismo: {
    msg: `<strong>Microrealismo</strong> é detalhe de fotografia em tamanho pequeno: retratos, animais, objetos com significado. 🔍<br><br>Funciona melhor a partir de uns 5 cm, para o detalhe durar com o tempo.`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Microrealismo.' },
      { l: '🖼️ Ver trabalhos', href: '#estilos' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_realismo: {
    msg: `<strong>Realismo</strong> são peças maiores, com sombra e volume, fiéis à referência. 🖤<br><br>Projetos grandes podem ser feitos em mais de uma sessão.`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Realismo.' },
      { l: '🖼️ Ver trabalhos', href: '#estilos' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_lettering: {
    msg: `<strong>Lettering</strong> é escrita com estilo: nomes, datas, frases. A letra é pensada para ti e para o local do corpo. ✍️`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Lettering.' },
      { l: '🖼️ Ver trabalhos', href: '#estilos' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },

  /* ── DESENHOS DISPONÍVEIS ── */
  disponiveis: {
    msg: `A Marta tem <strong>desenhos disponíveis</strong>: criações dela, prontas a tatuar, e cada uma é feita uma só vez. 🎨<br><br>Queres ver?`,
    chips: [
      { l: '🖼️ Ver desenhos', href: '#disponiveis' },
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

  /* ── WORKSHOPS ── */
  workshops: {
    msg: `A Marta vai abrir <strong>workshops de tatuagem</strong>! 🎓<br><br>As datas e o local ainda estão a ser definidos. Queres entrar na lista para receber as novidades primeiro?`,
    chips: [
      { l: '✅ Quero entrar na lista', wa: 'quero entrar na lista dos workshops de tatuagem.' },
      { l: '↩ Menu principal', f: 'inicio' },
    ]
  },

  /* ── AGENDA / GUEST / EVENTOS ── */
  agenda: {
    msg: `A Marta também faz <strong>guest spots</strong> e participa em <strong>eventos</strong> de tatuagem. 📅<br><br>Para saber onde ela vai estar e as próximas datas livres, fala com ela diretamente.`,
    chips: [
      { l: '💬 Ver próximas datas', wa: 'quero saber das próximas datas e eventos.' },
      { l: '📸 Ver no Instagram', href: 'https://www.instagram.com/la.loba.ink/' },
    ]
  },

  /* ── SOBRE ── */
  sobre: {
    msg: `A <strong>Marta Loba</strong> é a artista por trás da La Loba Ink. 🐺<br><br><em>"A tua história, a minha arte."</em><br><br>Trabalha com traço fino, flores e microrealismo, sempre com desenho exclusivo, pensado para o corpo e a história de cada pessoa.`,
    chips: [
      { l: '🌿 Ver os estilos', f: 'estilos' },
      { l: '💬 Falar com a Marta', wa: 'quero falar com a Marta sobre uma tattoo.' },
    ]
  },

};
