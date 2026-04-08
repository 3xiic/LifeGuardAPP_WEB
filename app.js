const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('mainNav');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
}

const phoneSlidesData = [
  {
    title: 'Inicio y estado general',
    description: 'Resumen de módulos importantes para actuar rápido.',
    image: 'images/lucyMain.png',
    alt: 'Lucy en la pantalla principal de LifeGuardAPP'
  },
  {
    title: 'Alertas y recomendaciones',
    description: 'Notificaciones verificadas para reducir incertidumbre.',
    image: 'images/LucyRiesgos.png',
    alt: 'Lucy explicando alertas dentro de la aplicación'
  },
  {
    title: 'Asistencia guiada',
    description: 'Consejos prácticos para antes, durante y después.',
    image: 'images/LucySentada.png',
    alt: 'Lucy como guía de asistencia en emergencias'
  },
  {
    title: 'Chat de apoyo',
    description: 'Respuestas rápidas a preguntas frecuentes del usuario.',
    image: 'images/lucyActually.png',
    alt: 'Lucy como asistente conversacional'
  }
];

const phoneCarousel = document.getElementById('phoneCarousel');
const phoneDots = document.getElementById('phoneDots');
let currentSlide = 0;
let autoSlideTimer;

function renderCarousel() {
  if (!phoneCarousel || !phoneDots) return;

  phoneCarousel.innerHTML = phoneSlidesData
    .map(
      (slide, index) => `
      <article class="phone-slide ${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}">
        <img src="${slide.image}" alt="${slide.alt}" />
        <h4>${slide.title}</h4>
        <p>${slide.description}</p>
      </article>`
    )
    .join('');

  phoneDots.innerHTML = phoneSlidesData
    .map(
      (_, index) =>
        `<button class="phone-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ver slide ${index + 1}"></button>`
    )
    .join('');

  phoneDots.querySelectorAll('.phone-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.index));
      restartAutoSlide();
    });
  });
}

function showSlide(index) {
  if (!phoneCarousel || !phoneDots) return;
  const slides = phoneCarousel.querySelectorAll('.phone-slide');
  const dots = phoneDots.querySelectorAll('.phone-dot');

  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % phoneSlidesData.length;
  showSlide(next);
}

function restartAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextSlide, 4200);
}

renderCarousel();
restartAutoSlide();

const chatMessages = document.getElementById('chatMessages');
const chatQuickActions = document.getElementById('chatQuickActions');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

const quickQuestions = [
  '¿Qué es LifeGuardAPP?',
  '¿Cómo funciona?',
  '¿Funciona sin internet?',
  '¿Cómo descargarla?',
  '¿Cómo ayudan las alertas?',
  '¿Cómo contactar soporte?'
];

const faqMap = [
  {
    patterns: ['qué es', 'que es', 'qué hace', 'que hace', 'lifeguardapp'],
    answer:
      'LifeGuardAPP es una app de apoyo en emergencias. Combina comunicación P2P, geolocalización, alertas y orientación para ayudar a personas, familias y comunidades.'
  },
  {
    patterns: ['cómo funciona', 'como funciona', 'funcionamiento'],
    answer:
      'Funciona integrando módulos de comunicación entre dispositivos cercanos, ubicación compartida y guías de acción. El objetivo es facilitar decisiones rápidas durante una emergencia.'
  },
  {
    patterns: ['descargar', 'descarga', 'apk', 'instalar'],
    answer:
      'Puedes descargar la versión APK desde la sección “Descarga” de esta página. Allí también puedes consultar instrucciones básicas de instalación.'
  },
  {
    patterns: ['alerta', 'alertas', 'sos', 'botón'],
    answer:
      'El botón SOS y las alertas permiten enviar avisos rápidos con contexto útil para contactos de confianza y equipos de respuesta.'
  },
  {
    patterns: ['geolocalización', 'geolocalizacion', 'ubicación', 'ubicacion', 'mapa'],
    answer:
      'La geolocalización ayuda a compartir ubicación para coordinar apoyo, búsqueda y seguimiento en tiempo real cuando sea posible.'
  },
  {
    patterns: ['p2p', 'mesh', 'comunicación', 'comunicacion'],
    answer:
      'La comunicación P2P / mesh permite conectar dispositivos cercanos y disminuir la dependencia de redes centrales saturadas.'
  },
  {
    patterns: ['quiénes', 'quienes', 'quién puede', 'usuarios', 'familias', 'comunidad'],
    answer:
      'LifeGuardAPP está pensada para usuarios individuales, familias, comunidades, instituciones educativas y equipos de emergencia.'
  },
  {
    patterns: ['beneficio', 'ventaja', 'por qué usar', 'porque usar'],
    answer:
      'Entre sus beneficios están: más coordinación, mejor orientación, menor incertidumbre y mayor cultura de prevención.'
  },
  {
    patterns: ['emergencia', 'desastre', 'crítico', 'critico'],
    answer:
      'En una emergencia, la app prioriza comunicación rápida, ubicación compartida y acceso a recomendaciones claras para reducir tiempos de respuesta.'
  },
  {
    patterns: ['sin internet', 'offline', 'sin conexión', 'sin conexion'],
    answer:
      'Algunas capacidades están pensadas para contextos de conectividad limitada, especialmente la comunicación cercana y la última ubicación disponible.'
  },
  {
    patterns: ['soporte', 'contacto', 'ayuda', 'correo'],
    answer:
      'Para soporte, usa el formulario o canales oficiales del proyecto. En esta landing puedes iniciar contacto desde la sección final.'
  }
];

function createMessage(text, role = 'bot') {
  if (!chatMessages) return;
  const message = document.createElement('div');
  message.className = `message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function findFaqAnswer(question) {
  const normalized = question.toLowerCase().trim();
  const item = faqMap.find(({ patterns }) => patterns.some((pattern) => normalized.includes(pattern)));

  if (item) return item.answer;

  return 'Puedo ayudarte con dudas sobre qué es LifeGuardAPP, descargas, alertas, geolocalización, P2P, uso sin internet, beneficios y soporte.';
}

function handleUserQuestion(question) {
  if (!question.trim()) return;

  createMessage(question, 'user');
  const answer = findFaqAnswer(question);

  setTimeout(() => {
    createMessage(answer, 'bot');
  }, 280);
}

function renderQuickActions() {
  if (!chatQuickActions) return;

  chatQuickActions.innerHTML = quickQuestions
    .map((question) => `<button type="button" class="quick-btn">${question}</button>`)
    .join('');

  chatQuickActions.querySelectorAll('.quick-btn').forEach((button) => {
    button.addEventListener('click', () => handleUserQuestion(button.textContent ?? ''));
  });
}

if (chatForm && chatInput && chatMessages) {
  createMessage('¡Hola! Soy Lucy 👋 ¿En qué te ayudo hoy sobre LifeGuardAPP?', 'bot');
  renderQuickActions();

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleUserQuestion(chatInput.value);
    chatInput.value = '';
    chatInput.focus();
  });
}
