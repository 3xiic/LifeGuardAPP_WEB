const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const quickButtons = document.querySelectorAll('.quick-question');
const phoneCarousel = document.getElementById('phoneCarousel');
const phoneIndicators = document.getElementById('phoneIndicators');
const phonePrev = document.getElementById('phonePrev');
const phoneNext = document.getElementById('phoneNext');
const phoneSlides = phoneCarousel ? Array.from(phoneCarousel.querySelectorAll('.phone-slide')) : [];
let phoneCurrent = 0;
let phoneTimer;

function addMessage(text, type = 'bot') {
  if (!chatMessages) return;
  const message = document.createElement('div');
  message.className = `chat-message ${type === 'user' ? 'chat-message-user' : 'chat-message-bot'}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getLucyResponse(question) {
  const q = question.toLowerCase();

  if (q.includes('qué es') || q.includes('que es') || q.includes('qué hace') || q.includes('que hace')) {
    return 'LifeGuardAPP es una aplicación móvil pensada para apoyar la comunicación, la localización y la orientación en situaciones de emergencia, antes, durante y después de un evento crítico.';
  }
  if (q.includes('cómo funciona') || q.includes('como funciona') || q.includes('funciona')) {
    return 'LifeGuardAPP combina comunicación descentralizada, geolocalización, alertas verificadas y contenido educativo para ayudar a usuarios, familias y comunidades a actuar con mayor claridad y coordinación.';
  }
  if (q.includes('descargar') || q.includes('descarga') || q.includes('apk') || q.includes('instalar') || q.includes('descargo')) {
    return 'En esta página puedes agregar un botón de descarga directa por APK. También puedes incluir instrucciones de instalación y, más adelante, enlaces oficiales a tiendas móviles.';
  }
  if (q.includes('alerta') || q.includes('alertas')) {
    return 'La app contempla alertas con información validada para reducir desinformación y orientar mejor a las personas en momentos críticos.';
  }
  if (q.includes('ubicación') || q.includes('ubicacion') || q.includes('geolocalización') || q.includes('geolocalizacion')) {
    return 'LifeGuardAPP contempla funciones de geolocalización para compartir ubicación útil y apoyar la coordinación con contactos o equipos de ayuda.';
  }
  if (q.includes('p2p') || q.includes('comunicación') || q.includes('comunicacion')) {
    return 'Una de las ideas clave del proyecto es la comunicación descentralizada entre dispositivos cercanos, para disminuir la dependencia de redes tradicionales.';
  }
  if (q.includes('sin internet') || q.includes('offline') || q.includes('sin conexión') || q.includes('sin conexion')) {
    return 'LifeGuardAPP está pensada para mantener funciones útiles incluso cuando hay conectividad limitada. La comunicación P2P y la información almacenada localmente ayudan a operar en escenarios sin Internet estable.';
  }
  if (q.includes('quién') || q.includes('quien') || q.includes('para quién') || q.includes('para quien') || q.includes('usuarios')) {
    return 'La app puede ser utilizada por personas, familias, comunidades y también por equipos de apoyo que necesiten mejor coordinación durante emergencias.';
  }
  if (q.includes('beneficio') || q.includes('ventaja')) {
    return 'Los beneficios principales son: mejorar la coordinación, compartir ubicación útil, recibir alertas orientadas y contar con una guía clara para actuar antes, durante y después de la emergencia.';
  }
  if (q.includes('ayuda') || q.includes('soporte') || q.includes('contacto')) {
    return 'Si necesitas ayuda, puedes usar esta sección de preguntas frecuentes y también habilitar un canal de soporte en la app o correo de contacto para atención personalizada.';
  }
  return 'Puedo ayudarte con preguntas sobre qué es LifeGuardAPP, cómo funciona, descarga, geolocalización, alertas, comunicación P2P, uso sin Internet, beneficios y soporte.';
}

function handleQuestion(text) {
  if (!text.trim()) return;
  addMessage(text, 'user');
  const response = getLucyResponse(text);
  setTimeout(() => addMessage(response, 'bot'), 300);
}

if (chatSend && chatInput && chatMessages) {
  chatSend.addEventListener('click', () => {
    handleQuestion(chatInput.value);
    chatInput.value = '';
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleQuestion(chatInput.value);
      chatInput.value = '';
    }
  });

  quickButtons.forEach((button) => {
    button.addEventListener('click', () => handleQuestion(button.textContent || ''));
  });
}

function createPhoneDots() {
  if (!phoneIndicators || phoneSlides.length === 0) return;
  phoneIndicators.innerHTML = '';
  phoneSlides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `phone-dot ${idx === 0 ? 'active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir a la captura ${idx + 1}`);
    dot.addEventListener('click', () => showPhoneSlide(idx));
    phoneIndicators.appendChild(dot);
  });
}

function showPhoneSlide(index) {
  if (phoneSlides.length === 0) return;
  phoneCurrent = (index + phoneSlides.length) % phoneSlides.length;
  phoneSlides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === phoneCurrent);
  });
  const dots = phoneIndicators ? phoneIndicators.querySelectorAll('.phone-dot') : [];
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === phoneCurrent));
}

function startPhoneAutoplay() {
  if (phoneSlides.length <= 1) return;
  clearInterval(phoneTimer);
  phoneTimer = setInterval(() => {
    showPhoneSlide(phoneCurrent + 1);
  }, 3200);
}

if (phoneSlides.length > 0) {
  createPhoneDots();
  showPhoneSlide(0);
  startPhoneAutoplay();
  if (phonePrev) {
    phonePrev.addEventListener('click', () => {
      showPhoneSlide(phoneCurrent - 1);
      startPhoneAutoplay();
    });
  }
  if (phoneNext) {
    phoneNext.addEventListener('click', () => {
      showPhoneSlide(phoneCurrent + 1);
      startPhoneAutoplay();
    });
  }
  if (phoneCarousel) {
    phoneCarousel.addEventListener('mouseenter', () => clearInterval(phoneTimer));
    phoneCarousel.addEventListener('mouseleave', startPhoneAutoplay);
  }
}
