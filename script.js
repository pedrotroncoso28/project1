// script.js

const dot = document.getElementById('dot');
const universe = document.getElementById('universe');
const dotText = document.getElementById('dot-text');
const bgAudio = document.getElementById('bg-audio'); // background audio element

// initial cursor
dot.style.cursor = 'pointer';

function expandDot(duration = 1000) {
  if (!dot) return;

  // Play background audio in loop
  if (bgAudio) {
    bgAudio.currentTime = 0; // restart from beginning
    bgAudio.play().catch(err => console.log("Audio playback was blocked:", err));
  }

  // Hide the text
  if (dotText) {
    dotText.style.transition = 'opacity 500ms ease-out';
    dotText.style.opacity = '0';
  }

  // Animate dot
  dot.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
  dot.style.transform = 'scale(200)';
  dot.style.opacity = '0';

  // Create stars
  createUniverse(500, duration);

  // Remove click listener so it won't trigger again
  dot.removeEventListener('click', onDotClick);

  // After explosion, cursor is default (not clickable)
  dot.style.cursor = 'default';
}

function createUniverse(count = 100, duration = 1000) {
  universe.innerHTML = '';

  const rect = dot.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 0.6;

  for (let i = 0; i < count; i++) {
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

    const baseDuration = Math.max(duration, 1200);
    const animDur = baseDuration * (0.8 + Math.random() * 2.0);
    const animDelay = Math.random() * (duration * 0.25);

    star.style.animationDuration = `${animDur}ms`;
    star.style.animationDelay = `${animDelay}ms`;

    universe.appendChild(star);
  }
}

function onDotClick() {
  expandDot(2000);
}

window.simulation = { expandDot };

// Attach the click listener
dot.addEventListener('click', onDotClick);
