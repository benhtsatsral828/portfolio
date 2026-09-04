/* ==========================================================================
   CASTLE DRAVEN - MAXIMALIST GOTHIC ENGINE & PARTICLES
   ========================================================================== */

// Project Data Registry for Library Bookshelf
const PROJECTS_DATA = {
  'proj-1': {
    vol: 'VOL. I — ARCHIVAL BLUEPRINT',
    title: 'Agy Core Engine',
    category: 'System Architecture',
    year: 'MMXXVI',
    client: 'Cargo Collective (Agy)',
    stack: 'HTML5, Custom CSS Tokens, SVG Overlays, Liquid Engine',
    description: 'A comprehensive system architecture and custom plugin framework designed for high-performance agent workflows. Features maximalist gothic visuals, zero layout shifts, and deep customizability for creative portfolios.',
    link: '#'
  },
  'proj-2': {
    vol: 'VOL. II — UI/UX SYSTEM',
    title: 'Gothic Cargo Framework',
    category: 'Design System',
    year: 'MMXXV',
    client: 'Victorian Tech Guild',
    stack: 'CSS Grid, Filigree Overlays, Candlelight Shaders',
    description: 'A minimal high-contrast yet ornamental design system incorporating heavy dark stone textures, gilded corner fleurons, and candlelit shadow physics tailored for Cargo Collective sites.',
    link: '#'
  },
  'proj-3': {
    vol: 'VOL. III — SPATIAL WEB3',
    title: 'Nocturne Web3 Deck',
    category: '3D Spatial Interface',
    year: 'MMXXVI',
    client: 'Nocturne Realm',
    stack: 'Three.js, WebGL Shaders, Spatial Audio',
    description: 'An interactive 3D castle exploration platform connecting decentralized art collections within dark, candle-lit vaulted chambers.',
    link: '#'
  },
  'proj-4': {
    vol: 'VOL. IV — INTERACTIVE DYNAMICS',
    title: 'Victorian Canvas API',
    category: 'Generative Art Engine',
    year: 'MMXXIV',
    client: 'Alchemist Collective',
    stack: 'HTML5 Canvas 2D, SVG Filters, Procedural Vines',
    description: 'Procedural ivy and vine generator engine that organically creeps across screen margins and frames based on user cursor velocity.',
    link: '#'
  },
  'proj-5': {
    vol: 'VOL. V — WEBGL SHADERS',
    title: 'Alchemist Shader Engine',
    category: 'Shader Development',
    year: 'MMXXV',
    client: 'Private Commission',
    stack: 'GLSL, WebGL 2.0, Web Audio API',
    description: 'Custom fragment shaders simulating realistic flickering candlelight on weathered stone walls with dynamic normal mapping and vignette attenuation.',
    link: '#'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initCandleCursor();
  initEmberParticles();
  initRoomNavigation();
  initLibraryBookshelf();
  initAmbientAudio();
});

/* ==========================================================================
   1. AMBIENT CANDLE CURSOR FOLLOWER
   ========================================================================== */
function initCandleCursor() {
  const cursor = document.getElementById('candle-cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

/* ==========================================================================
   2. DYNAMIC FLOATING EMBERS & DUST DYNAMICS
   ========================================================================== */
function initEmberParticles() {
  const container = document.getElementById('ember-container');
  if (!container) return;

  const emberCount = 28;

  for (let i = 0; i < emberCount; i++) {
    const ember = document.createElement('div');
    ember.classList.add('ember-particle');
    
    const randomX = Math.random() * 100; // % across screen width
    const randomDelay = Math.random() * 8; // seconds
    const randomDuration = 6 + Math.random() * 6; // seconds
    const randomSize = 2 + Math.random() * 4; // px

    ember.style.left = `${randomX}vw`;
    ember.style.animationDelay = `${randomDelay}s`;
    ember.style.animationDuration = `${randomDuration}s`;
    ember.style.width = `${randomSize}px`;
    ember.style.height = `${randomSize}px`;

    container.appendChild(ember);
  }
}

/* ==========================================================================
   3. ROOM NAVIGATION & TRANSITION CURTAIN
   ========================================================================== */
function initRoomNavigation() {
  const navBtns = document.querySelectorAll('.nav-room-btn');
  const hotspots = document.querySelectorAll('.map-hotspot');
  const curtain = document.getElementById('room-transition-curtain');
  const transitionTitle = document.getElementById('transition-room-title');
  const stage = document.getElementById('castle-stage');
  const viewModeBtn = document.getElementById('view-mode-toggle');

  let isRoomMode = true;

  // Navigation button clicks
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roomTarget = btn.getAttribute('data-room');
      navigateToRoom(roomTarget);
    });
  });

  // Map hotspot clicks
  hotspots.forEach(spot => {
    spot.addEventListener('click', () => {
      const roomTarget = spot.getAttribute('data-room-target');
      navigateToRoom(roomTarget);
    });
  });

  // View Mode Switcher: Single Room Mode vs Full Scroll View
  if (viewModeBtn) {
    viewModeBtn.addEventListener('click', () => {
      isRoomMode = !isRoomMode;
      if (isRoomMode) {
        stage.classList.remove('full-scroll-mode');
        stage.classList.add('room-mode-active');
        viewModeBtn.querySelector('.btn-text').textContent = 'Room Mode';
      } else {
        stage.classList.remove('room-mode-active');
        stage.classList.add('full-scroll-mode');
        viewModeBtn.querySelector('.btn-text').textContent = 'Full View';
      }
    });
  }

  function navigateToRoom(roomId) {
    if (!roomId) return;

    const roomNames = {
      'foyer': 'The Castle Foyer',
      'library': 'The Overgrown Library',
      'gallery': 'The Overgrown Gallery',
      'secret-chamber': 'The Secret Chamber'
    };

    // If in full scroll mode, smooth scroll directly
    if (!isRoomMode) {
      const targetElement = document.getElementById(roomId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      updateActiveNavUI(roomId);
      return;
    }

    // Single Room Mode Curtain Transition
    if (curtain) {
      if (transitionTitle) {
        transitionTitle.textContent = `Entering ${roomNames[roomId] || 'The Chamber'}...`;
      }
      curtain.classList.add('curtain-active');

      setTimeout(() => {
        // Hide all rooms, show target room
        const allRooms = document.querySelectorAll('.castle-room');
        allRooms.forEach(r => r.classList.remove('room-active'));
        
        const activeRoom = document.getElementById(roomId);
        if (activeRoom) {
          activeRoom.classList.add('room-active');
        }

        updateActiveNavUI(roomId);
        window.scrollTo({ top: 0, behavior: 'instant' });

        setTimeout(() => {
          curtain.classList.remove('curtain-active');
        }, 300);
      }, 500);
    }
  }

  function updateActiveNavUI(roomId) {
    // Update Header Buttons
    navBtns.forEach(b => {
      if (b.getAttribute('data-room') === roomId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Update Map Hotspots
    hotspots.forEach(s => {
      if (s.getAttribute('data-room-target') === roomId) {
        s.classList.add('active-spot');
      } else {
        s.classList.remove('active-spot');
      }
    });
  }
}

/* ==========================================================================
   4. LIBRARY BOOKSHELF & TOME MODAL
   ========================================================================== */
function initLibraryBookshelf() {
  const books = document.querySelectorAll('.book-spine');
  const modal = document.getElementById('tome-modal');

  books.forEach(book => {
    book.addEventListener('click', () => {
      const projId = book.getAttribute('data-project-id');
      if (projId && PROJECTS_DATA[projId]) {
        openTomeModal(PROJECTS_DATA[projId]);
      }
    });
  });

  // Close modal when clicking backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeTomeModal();
      }
    });
  }
}

function openTomeModal(data) {
  const modal = document.getElementById('tome-modal');
  if (!modal) return;

  document.getElementById('modal-vol-num').textContent = data.vol;
  document.getElementById('modal-project-title').textContent = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-year').textContent = data.year;
  document.getElementById('modal-client').textContent = data.client;
  document.getElementById('modal-stack').textContent = data.stack;
  document.getElementById('modal-description').textContent = data.description;
  
  const linkElem = document.getElementById('modal-live-link');
  if (linkElem) linkElem.href = data.link;

  modal.classList.add('modal-open');
}

function closeTomeModal() {
  const modal = document.getElementById('tome-modal');
  if (modal) {
    modal.classList.remove('modal-open');
  }
}

/* ==========================================================================
   5. WEB AUDIO SYNTHETIC CASTLE FIREPLACE AMBIENCE
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let noiseNode = null;

function initAmbientAudio() {
  const toggleBtn = document.getElementById('ambient-audio-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!isAudioPlaying) {
      startFireplaceAmbience();
      toggleBtn.classList.add('active');
      toggleBtn.querySelector('.btn-text').textContent = 'Mute Fire';
      isAudioPlaying = true;
    } else {
      stopFireplaceAmbience();
      toggleBtn.classList.remove('active');
      toggleBtn.querySelector('.btn-text').textContent = 'Ambience';
      isAudioPlaying = false;
    }
  });
}

function startFireplaceAmbience() {
  if (!audioCtx) return;

  // Generate pink noise buffer for rain/crackling sound
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.025; // Soft ambient volume
    b6 = white * 0.115926;
  }

  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;
  noiseNode.loop = true;

  // Filter for low warm rumble
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, audioCtx.currentTime);

  noiseNode.connect(filter);
  filter.connect(audioCtx.destination);
  noiseNode.start();
}

function stopFireplaceAmbience() {
  if (noiseNode) {
    noiseNode.stop();
    noiseNode.disconnect();
    noiseNode = null;
  }
}

/* ==========================================================================
   6. DISPATCH RAVEN FORM SUBMISSION
   ========================================================================== */
function handleRavenSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('raven-name').value;

  alert(`⚜ The Raven has been dispatched into the night sky! Lord Draven shall receive your scroll, ${name}.`);
  document.getElementById('raven-form').reset();
}
