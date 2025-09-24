// script.js

const dot = document.getElementById('dot');
const universe = document.getElementById('universe');
const dotText = document.getElementById('dot-text');

// Load background audio
const bgAudio = new Audio('bigbangsound.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.5;

// Initial cursor
dot.style.cursor = 'pointer';

// List of galaxy images
const galaxyImages = [
  "galaxy1.png",
  "galaxy3.png",
  "galaxy4.png",
  "galaxy5.png",
  "galaxy6.png",
  "galaxy7.png",
  "galaxy8.png",
];

function expandDot(duration = 1000) {
  if (!dot) return;

  // Hide the text
  if (dotText) {
    dotText.style.transition = 'opacity 500ms ease-out';
    dotText.style.opacity = '0';
  }

  // Explosion animation
  dot.classList.add('exploding');

  // Play background audio
  bgAudio.play().catch(err => {});

  // Create stars + galaxies
  createUniverse(500, duration);

  // Remove click listener so it won't trigger again
  dot.removeEventListener('click', onDotClick);

  // After explosion, cursor is default (not clickable)
  dot.style.cursor = 'default';
}

function createUniverse(starCount = 100, duration = 1000) {
  universe.innerHTML = '';

  const rect = dot.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 0.6;

  // --- Stars ---
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * maxRadius;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    star.style.setProperty('--dx', `${dx}px`);
    star.style.setProperty('--dy', `${dy}px`);
    star.style.left = `${centerX}px`;
    star.style.top = `${centerY}px`;

    const size = Math.random() * 2.5 + 0.8;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    const rand = Math.random();
    if (rand > 0.98) star.style.background = '#ffd27f';
    else if (rand > 0.95) star.style.background = '#a9d0ff';
    else star.style.background = '#ffffff';

    const baseDuration = 20000;
    const animDur = baseDuration * (0.8 + Math.random() * 0.5);
    const animDelay = Math.random() * (duration * 0.25);

    star.style.animationDuration = `${animDur}ms`;
    star.style.animationDelay = `${animDelay}ms`;

    universe.appendChild(star);
  }

  // --- Galaxies ---
  const galaxyCount = 8; // number of galaxies
  for (let i = 0; i < galaxyCount; i++) {
    const galaxy = document.createElement('div');
    galaxy.classList.add('galaxy');

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * maxRadius;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    galaxy.style.setProperty('--dx', `${dx}px`);
    galaxy.style.setProperty('--dy', `${dy}px`);
    galaxy.style.left = `${centerX}px`;
    galaxy.style.top = `${centerY}px`;

    // Random galaxy image
    const img = galaxyImages[Math.floor(Math.random() * galaxyImages.length)];
    galaxy.style.backgroundImage = `url(${img})`;

    // Random size for galaxies (bigger than stars)
    const size = Math.random() * 55 + 25;
    galaxy.style.width = `${size}px`;
    galaxy.style.height = `${size}px`;

    // Animation duration
    const baseDuration = 20000;
    const animDur = baseDuration * (0.8 + Math.random() * 0.5);
    const animDelay = Math.random() * (duration * 0.25);

    galaxy.style.animationDuration = `${animDur}ms`;
    galaxy.style.animationDelay = `${animDelay}ms`;

    universe.appendChild(galaxy);
  }
}

function onDotClick() {
  // Add shaking animation before explosion
  dot.classList.add('shaking');

  // Wait until shake finishes (500ms), then trigger explosion
  setTimeout(() => {
    dot.classList.remove('shaking');
    expandDot(2000);
  }, 500);
}

window.simulation = { expandDot };

// Attach the click listener
dot.addEventListener('click', onDotClick);
