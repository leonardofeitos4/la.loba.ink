/* ═══════════════════════════════════
   GALERIA — La Loba Ink

   Para colocar as fotos:
   1. Salve as imagens na pasta indicada em cada lista
      (ex: assets/estilos/fineline/1.jpg, assets/disponiveis/1.jpg, assets/feedback/1.jpg)
   2. Liste os nomes dos arquivos:  fotos: ['1.jpg', '2.jpg', '3.jpg']
   Enquanto a lista estiver vazia, aparecem os quadros "colocar foto ainda".
═══════════════════════════════════ */

/* Estilos — os três primeiros são os da bio do Instagram */
const ESTILOS = [
  {
    id: 'fineline',
    nome: 'Fineline',
    desc: 'Traço fino e delicado, para tattoos discretas e elegantes.',
    fotos: [],
  },
  {
    id: 'floral-fineline',
    nome: 'Floral Fineline',
    desc: 'Flores e folhagens em traço fino, desenhadas para acompanhar o movimento do corpo.',
    fotos: [],
  },
  {
    id: 'microrealismo',
    nome: 'Microrealismo',
    desc: 'Retratos, animais e objetos com detalhe de fotografia, em tamanho pequeno.',
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
    desc: 'Nomes, datas e frases, com uma letra pensada para ti.',
    fotos: [],
  },
];

/* Desenhos disponíveis (flash) — pasta assets/disponiveis/ */
const DISPONIVEIS = [];

/* Feedback de clientes (prints ou fotos) — pasta assets/feedback/ */
const FEEDBACKS = [];

const PLACEHOLDERS = 5;

function vazios(n, texto) {
  return Array.from({ length: n }, () =>
    `<figure class="foto foto-vazia"><i class="fa-regular fa-image"></i><span>${texto}</span></figure>`
  ).join('');
}

function fotos(pasta, lista, alt) {
  return lista.map(f =>
    `<figure class="foto"><img src="assets/${pasta}/${f}" alt="${alt}" loading="lazy"></figure>`
  ).join('');
}

function renderEstilo(id) {
  const e = ESTILOS.find(x => x.id === id) || ESTILOS[0];

  document.querySelectorAll('.tab').forEach(t => {
    const on = t.dataset.id === e.id;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on);
  });

  const msg = `quero um orçamento de tattoo em ${e.nome}.`;
  document.getElementById('estilo-info').innerHTML =
    `<p>${e.desc}</p>
     <a class="link-wa js-wa" data-msg="${msg}" href="${waLink(msg)}" target="_blank" rel="noopener">
       <i class="fa-brands fa-whatsapp"></i> Quero uma tattoo em ${e.nome}
     </a>`;

  document.getElementById('galeria').innerHTML = e.fotos.length
    ? fotos(`estilos/${e.id}`, e.fotos, `Tattoo ${e.nome} – La Loba Ink`)
    : vazios(PLACEHOLDERS, 'colocar foto ainda');
}

/* Monta só as galerias que existem na página atual */
function initGaleria() {
  const tabs = document.getElementById('tabs');
  if (tabs) {
    tabs.innerHTML = ESTILOS.map(e =>
      `<button class="tab" role="tab" data-id="${e.id}">${e.nome}</button>`
    ).join('');
    tabs.querySelectorAll('.tab').forEach(t =>
      t.addEventListener('click', () => {
        renderEstilo(t.dataset.id);
        history.replaceState(null, '', `?estilo=${t.dataset.id}`);
        track(`Viu o estilo: ${t.textContent}`);
      })
    );
    // trabalhos.html?estilo=fineline abre direto nesse estilo
    const inicial = new URLSearchParams(location.search).get('estilo');
    renderEstilo(inicial || ESTILOS[0].id);
    const ativa = tabs.querySelector('.tab.active');
    if (ativa) tabs.scrollLeft = ativa.offsetLeft - 16;
  }

  const disp = document.getElementById('galeria-disponiveis');
  if (disp) {
    disp.innerHTML = DISPONIVEIS.length
      ? fotos('disponiveis', DISPONIVEIS, 'Desenho disponível – La Loba Ink')
      : vazios(6, 'colocar desenho ainda');
  }

  const fb = document.getElementById('feedbacks');
  if (fb) {
    fb.innerHTML = FEEDBACKS.length
      ? fotos('feedback', FEEDBACKS, 'Feedback de cliente – La Loba Ink')
      : vazios(4, 'colocar feedback ainda');
  }
}
