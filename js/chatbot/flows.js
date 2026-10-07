/* ═══════════════════════════════════
   FLOWS — Luna · Assistente da La Loba Ink

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
    msg: `Como posso ajudar? 🖤`,
    chips: [
      { l: '✒️ Quero fazer uma tattoo', f: 'tattoo' },
      { l: '🌿 Conhecer os estilos', f: 'estilos' },
      { l: '🐺 Primeira tattoo', f: 'primeira' },
      { l: '🎓 Workshops', f: 'workshops' },
      { l: '🖤 Quem é a Kamila?', f: 'sobre' },
    ]
  },

  /* ── SOBRE ── */
  sobre: {
    msg: `A <strong>Kamila Urbano</strong> é a tatuadora por trás da La Loba Ink. 🐺<br><br>Trabalha com traço fino, flores, microrealismo, realismo e lettering, sempre com desenho exclusivo, pensado para o corpo e a história de cada pessoa.`,
    chips: [
      { l: '🌿 Ver os estilos', f: 'estilos' },
      { l: '💬 Falar com ela', wa: 'quero falar com a Kamila sobre uma tattoo.' },
    ]
  },

  /* ── QUERO TATUAR ── */
  tattoo: {
    msg: `Que bom! ✨ Para a Kamila preparar o seu orçamento, tenha em mãos:<br><br>
          • a <strong>ideia</strong> ou uma referência<br>
          • o <strong>local do corpo</strong><br>
          • o <strong>tamanho aproximado</strong> (em cm)<br><br>
          Já sabe o estilo que quer?`,
    chips: [
      { l: 'Sim, já sei o estilo', f: 'estilos' },
      { l: 'Ainda não, quero ajuda', wa: 'tenho uma ideia de tattoo mas ainda não sei o estilo. Pode me ajudar?' },
      { l: '💬 Pedir orçamento', wa: 'quero um orçamento de tattoo.' },
    ]
  },

  /* ── ESTILOS ── */
  estilos: {
    msg: `A Kamila trabalha com estes estilos. Qual combina mais com você?`,
    chips: [
      { l: 'Microrealismo', f: 'est_microrealismo' },
      { l: 'Fineline', f: 'est_fineline' },
      { l: 'Floral fineline', f: 'est_floral' },
      { l: 'Realismo', f: 'est_realismo' },
      { l: 'Lettering', f: 'est_lettering' },
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
  est_fineline: {
    msg: `<strong>Fineline</strong> é o traço fino e delicado. Perfeito para tattoos discretas, símbolos e desenhos minimalistas. ✒️`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Fineline.' },
      { l: '🖼️ Ver trabalhos', href: '#estilos' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },
  est_floral: {
    msg: `<strong>Floral fineline</strong> são flores e folhagens em traço fino, desenhadas para acompanhar o movimento do corpo. 🌿<br><br>É uma das especialidades da Kamila.`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Floral fineline.' },
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
    msg: `<strong>Lettering</strong> é escrita com estilo: nomes, datas, frases. A letra é pensada para você e para o local do corpo. ✍️`,
    chips: [
      { l: '💬 Quero orçamento', wa: 'quero um orçamento de tattoo em Lettering.' },
      { l: '🖼️ Ver trabalhos', href: '#estilos' },
      { l: 'Outros estilos', f: 'estilos' },
    ]
  },

  /* ── PRIMEIRA TATTOO ── */
  primeira: {
    msg: `Primeira tattoo é especial! 🐺 O que quer saber?`,
    chips: [
      { l: 'Dói muito?', f: 'dor' },
      { l: 'Como me preparo?', f: 'preparo' },
      { l: 'Como cuido depois?', f: 'cuidados' },
    ]
  },
  dor: {
    msg: `Depende do local e da sensibilidade de cada pessoa. Braço, coxa e antebraço costumam ser mais tranquilos; costelas, pés e mãos incomodam mais.<br><br>Traço fino (fineline) costuma ser mais leve. 😉`,
    chips: [
      { l: 'Como me preparo?', f: 'preparo' },
      { l: '💬 Quero marcar', wa: 'quero marcar a minha primeira tattoo.' },
    ]
  },
  preparo: {
    msg: `Para o dia da tattoo:<br><br>
          • durma bem e coma antes de vir<br>
          • beba bastante água nos dias anteriores<br>
          • evite álcool nas 24h antes<br>
          • venha com roupa confortável que deixe o local livre`,
    chips: [
      { l: 'Como cuido depois?', f: 'cuidados' },
      { l: '💬 Quero marcar', wa: 'quero marcar a minha primeira tattoo.' },
    ]
  },
  cuidados: {
    msg: `Os cuidados são simples, e a Kamila explica tudo no dia:<br><br>
          • lavar com sabonete neutro e secar com toque leve<br>
          • hidratar com a pomada indicada<br>
          • nada de sol, piscina ou mar nas primeiras semanas<br>
          • não coçar nem arrancar as casquinhas`,
    chips: [
      { l: '💬 Tenho outra dúvida', wa: 'tenho uma dúvida sobre cuidados com a tattoo.' },
      { l: '💬 Quero marcar', wa: 'quero marcar a minha primeira tattoo.' },
    ]
  },

  /* ── WORKSHOPS ── */
  workshops: {
    msg: `A Kamila vai abrir <strong>workshops de tatuagem</strong>! 🎓<br><br>Datas e local ainda estão a ser definidos. Quer entrar na lista para receber as novidades primeiro?`,
    chips: [
      { l: '✅ Quero entrar na lista', wa: 'quero entrar na lista dos workshops de tatuagem.' },
      { l: '↩ Menu principal', f: 'inicio' },
    ]
  },

};
