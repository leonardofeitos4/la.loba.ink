/* ═══════════════════════════════════
   GALERIA — La Loba Ink

   Para colocar as fotos:
   1. Salve as imagens na pasta indicada em cada lista
      (ex: assets/estilos/fineline/1.jpg, assets/disponiveis/1.jpg, assets/feedback/1.jpg)
   2. Liste os nomes dos arquivos:  fotos: ['1.jpg', '2.jpg', '3.jpg']
   Enquanto a lista estiver vazia, aparecem os quadros "colocar foto ainda".
   As fotos são 4:5 (1080x1350, formato do Instagram).
═══════════════════════════════════ */

/* Estilos — os três primeiros são os da bio do Instagram; Floral Fineline abre primeiro (pedido da Marta) */
const ESTILOS = [
  {
    id: 'floral-fineline',
    nome: 'Floral Fineline',
    desc: 'Flores e folhagens em traço fino, desenhadas para acompanhar o movimento do corpo.',
    fotos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  },
  {
    id: 'fineline',
    nome: 'Fineline',
    desc: 'Traço fino e delicado, para tattoos discretas e elegantes.',
    fotos: ['1.jpg', '2.jpg', '3.jpg'],
  },
  {
    id: 'microrealismo',
    nome: 'Microrealismo',
    desc: 'Retratos, animais e objetos com detalhe de fotografia, em tamanho pequeno.',
    fotos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  },
  {
    id: 'realismo',
    nome: 'Realismo',
    desc: 'Peças maiores, com sombra e volume, fiéis à referência.',
    fotos: ['1.jpg'],
  },
  {
    id: 'lettering',
    nome: 'Lettering',
    desc: 'Nomes, datas e frases, com uma letra pensada para ti.',
    fotos: ['1.jpg', '2.jpg', '3.jpg'],
  },
];

/* Desenhos disponíveis (flash) — pasta assets/disponiveis/ */
const DISPONIVEIS = [];

/* Feedback de clientes (prints ou fotos) — pasta assets/feedback/ */
const FEEDBACKS = [];

/* Vídeos (verticais, 720x1280) — pasta assets/videos/, com capa .jpg do mesmo nome */
const VIDEOS = [
  { id: 'historia', titulo: 'A minha história' },
  { id: 'bastidores', titulo: 'Bastidores' },
];

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

function videos(lista) {
  return lista.map(v =>
    `<figure class="video">
       <video src="assets/videos/${v.id}.mp4" poster="assets/videos/${v.id}.jpg" controls playsinline preload="none" data-titulo="${v.titulo}"></video>
       <figcaption>${v.titulo}</figcaption>
     </figure>`
  ).join('');
}

/* Foto em ecrã inteiro ao tocar, com setas para as outras fotos da mesma galeria */
function initVer() {
  const ver = document.createElement('div');
  ver.className = 'ver';
  ver.hidden = true;
  ver.innerHTML =
    `<button class="ver-fechar" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
     <button class="ver-seta ver-ant" aria-label="Foto anterior"><i class="fa-solid fa-chevron-left"></i></button>
     <img alt="">
     <button class="ver-seta ver-seg" aria-label="Foto seguinte"><i class="fa-solid fa-chevron-right"></i></button>`;
  document.body.appendChild(ver);
  const img = ver.querySelector('img');
  let lista = [], i = 0;

  const mostrar = n => {
    i = (n + lista.length) % lista.length;
    img.src = lista[i].src;
    img.alt = lista[i].alt;
    ver.classList.toggle('ver-uma', lista.length < 2);
  };
  const fechar = () => { ver.hidden = true; document.body.style.overflow = ''; };

  document.addEventListener('click', e => {
    const f = e.target.closest('.galeria .foto img, .galeria-3 .foto img, .feedbacks .foto img, .bot-fotos img');
    if (!f) return;
    lista = [...f.closest('.galeria, .galeria-3, .feedbacks, .bot-fotos').querySelectorAll('img')];
    mostrar(lista.indexOf(f));
    ver.hidden = false;
    document.body.style.overflow = 'hidden';
  });
  ver.querySelector('.ver-ant').addEventListener('click', () => mostrar(i - 1));
  ver.querySelector('.ver-seg').addEventListener('click', () => mostrar(i + 1));
  ver.querySelector('.ver-fechar').addEventListener('click', fechar);
  ver.addEventListener('click', e => { if (e.target === ver) fechar(); });
  document.addEventListener('keydown', e => {
    if (ver.hidden) return;
    if (e.key === 'Escape') fechar();
    if (e.key === 'ArrowLeft') mostrar(i - 1);
    if (e.key === 'ArrowRight') mostrar(i + 1);
  });

  // Deslizar o dedo para o lado troca de foto
  let x0 = null;
  ver.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  ver.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) mostrar(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
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

  // Na página inicial (data-limite="3") mostra só as principais de cada estilo
  const g = document.getElementById('galeria');
  const limite = Number(g.dataset.limite) || Infinity;
  g.innerHTML = e.fotos.length
    ? fotos(`estilos/${e.id}`, e.fotos.slice(0, limite), `Tattoo ${e.nome} – La Loba Ink`)
    : vazios(Math.min(PLACEHOLDERS, limite), 'colocar foto ainda');

  const todos = document.getElementById('ver-todos');
  if (todos) todos.href = `trabalhos.html?estilo=${e.id}`;
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
        if (location.pathname.endsWith('trabalhos.html')) history.replaceState(null, '', `?estilo=${t.dataset.id}`);
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

  // Feedback a passar na página inicial: a lista vai duas vezes para o loop não ter "salto"
  const mq = document.getElementById('feedback-marquee');
  if (mq) {
    const itens = FEEDBACKS.length
      ? fotos('feedback', FEEDBACKS, 'Feedback de cliente – La Loba Ink')
      : vazios(5, 'colocar feedback ainda');
    mq.innerHTML = itens + itens;
    mq.querySelectorAll('.foto').forEach((f, i) => { if (i >= mq.children.length / 2) f.setAttribute('aria-hidden', 'true'); });
  }

  // Vídeos: data-videos="historia" mostra só esse; sem valor mostra todos
  const vid = document.getElementById('videos');
  if (vid) {
    const so = vid.dataset.videos;
    vid.innerHTML = videos(so ? VIDEOS.filter(v => so.split(',').includes(v.id)) : VIDEOS);
    // Só um vídeo a tocar de cada vez
    vid.querySelectorAll('video').forEach(v => v.addEventListener('play', () => {
      vid.querySelectorAll('video').forEach(o => { if (o !== v) o.pause(); });
      track(`Viu o vídeo: ${v.dataset.titulo}`);
    }));
  }

  initVer();
}
