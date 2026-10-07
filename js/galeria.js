/* ═══════════════════════════════════
   GALERIA — estilos da La Loba Ink

   Para colocar as fotos:
   1. Salve as imagens em assets/estilos/<id>/  (ex: assets/estilos/fineline/1.jpg)
   2. Liste os nomes em "fotos" do estilo:     fotos: ['1.jpg', '2.jpg', '3.jpg']
   Enquanto "fotos" estiver vazio, aparecem os quadros "colocar foto ainda".
═══════════════════════════════════ */
const ESTILOS = [
  {
    id: 'microrealismo',
    nome: 'Microrealismo',
    desc: 'Retratos, animais e objetos com detalhe de fotografia, em tamanho pequeno.',
    fotos: [],
  },
  {
    id: 'fineline',
    nome: 'Fineline',
    desc: 'Traço fino e delicado, para tattoos discretas e elegantes.',
    fotos: [],
  },
  {
    id: 'floral-fineline',
    nome: 'Floral fineline',
    desc: 'Flores e folhagens em traço fino, que acompanham o desenho do corpo.',
    fotos: [],
  },
  {
    id: 'realismo',
    nome: 'Realismo',
    desc: 'Peças maiores, com sombra e volume, fiéis à referência.',
    fotos: [],
  },
  {
    id: 'lettering',
    nome: 'Lettering',
    desc: 'Nomes, datas e frases com letra pensada para você.',
    fotos: [],
  },
];

const PLACEHOLDERS = 3;

function renderEstilo(id) {
  const e = ESTILOS.find(x => x.id === id) || ESTILOS[0];

  document.querySelectorAll('.tab').forEach(t => {
    const on = t.dataset.id === e.id;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on);
  });

  document.getElementById('estilo-info').innerHTML =
    `<p>${e.desc}</p>
     <a class="link-wa js-wa" data-msg="quero um orçamento de tattoo em ${e.nome}." href="${waLink(`quero um orçamento de tattoo em ${e.nome}.`)}" target="_blank" rel="noopener">
       <i class="fa-brands fa-whatsapp"></i> Quero uma tattoo em ${e.nome}
     </a>`;

  const g = document.getElementById('galeria');
  g.innerHTML = e.fotos.length
    ? e.fotos.map(f =>
        `<figure class="foto"><img src="assets/estilos/${e.id}/${f}" alt="Tattoo ${e.nome}" loading="lazy"></figure>`
      ).join('')
    : Array.from({ length: PLACEHOLDERS }, () =>
        `<figure class="foto foto-vazia"><i class="fa-regular fa-image"></i><span>colocar foto ainda</span></figure>`
      ).join('');
}

function initGaleria() {
  document.getElementById('tabs').innerHTML = ESTILOS.map(e =>
    `<button class="tab" role="tab" data-id="${e.id}">${e.nome}</button>`
  ).join('');
  document.querySelectorAll('.tab').forEach(t =>
    t.addEventListener('click', () => {
      renderEstilo(t.dataset.id);
      track(`Viu o estilo: ${t.textContent}`);
    })
  );
  renderEstilo(ESTILOS[0].id);
}
