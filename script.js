// Main explosion dot and text
const dot = document.getElementById('dot');
const dotText = document.getElementById('dot-text');
const universe = document.getElementById('universe');
const explosionCenter = document.getElementById('explosion-center');

// Timeline info dots and texts
const infoDots = [
  { dot: document.getElementById('info-dot-1'), text: document.getElementById('info-text-1') },
  { dot: document.getElementById('info-dot-2'), text: document.getElementById('info-text-2') },
  { dot: document.getElementById('info-dot-3'), text: document.getElementById('info-text-3') }
];

// Background audio
const bgAudio = new Audio('bigbangsound.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.5;

// Cursor pointer
dot.style.cursor = 'pointer';
infoDots.forEach(item => item.dot.style.cursor = 'pointer');

// Toggle timeline info text visibility on click
infoDots.forEach(item => {
  item.dot.addEventListener('click', () => {
    item.text.classList.toggle('visible');
  });
});

// Main explosion
function expandDot(duration = 1000) {
  const centerX = window.innerWidth/2;
  const centerY = window.innerHeight/2;

  // Hide timeline dots and texts
  infoDots.forEach(item => {
    item.text.style.opacity = '0';
    item.dot.style.display = 'none';
  });
  dotText.style.opacity = '0';
  dot.style.display = 'none';

  // Show explosion effect in center
  explosionCenter.classList.add('animate');

  // Play audio
  bgAudio.play().catch(()=>{});

  // Create stars and galaxies from center after short delay
  setTimeout(()=>{
    createUniverse(centerX, centerY, 500, duration);
  },50);

  dot.removeEventListener('click', onDotClick);
}

// Create stars and galaxies
function createUniverse(centerX, centerY, starCount=100, duration=1000){
  universe.innerHTML = '';
  const maxRadius = Math.sqrt(window.innerWidth**2 + window.innerHeight**2) * 0.6;

  for(let i=0;i<starCount;i++){
    const star = document.createElement('div');
    star.classList.add('star');
    const angle = Math.random()*Math.PI*2;
    const distance = Math.random()*maxRadius;
    const dx = Math.cos(angle)*distance;
    const dy = Math.sin(angle)*distance;
    star.style.setProperty('--dx',`${dx}px`);
    star.style.setProperty('--dy',`${dy}px`);
    star.style.left = `${centerX}px`;
    star.style.top = `${centerY}px`;
    const size = Math.random()*2.5+0.8;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    const rand = Math.random();
    if(rand>0.98) star.style.background='#ffd27f';
    else if(rand>0.95) star.style.background='#a9d0ff';
    else star.style.background='#ffffff';
    star.style.animationDuration=`${20000*(0.8+Math.random()*0.5)}ms`;
    star.style.animationDelay=`${Math.random()*(duration*0.25)}ms`;
    universe.appendChild(star);
  }

  const galaxyImages = ["galaxy1.png","galaxy2.png","galaxy3.png","galaxy4.png","galaxy5.png","galaxy6.png","galaxy7.png","galaxy8.png","galaxy9.png"];
  const galaxyCount = 45;
  for(let i=0;i<galaxyCount;i++){
    const galaxy = document.createElement('div');
    galaxy.classList.add('galaxy');
    const angle=Math.random()*Math.PI*2;
    const distance=Math.random()*maxRadius;
    const dx=Math.cos(angle)*distance;
    const dy=Math.sin(angle)*distance;
    galaxy.style.setProperty('--dx',`${dx}px`);
    galaxy.style.setProperty('--dy',`${dy}px`);
    galaxy.style.left=`${centerX}px`;
    galaxy.style.top=`${centerY}px`;
    const img = galaxyImages[Math.floor(Math.random()*galaxyImages.length)];
    galaxy.style.backgroundImage=`url(${img})`;
    const size=Math.random()*35+25;
    galaxy.style.width=`${size}px`;
    galaxy.style.height=`${size}px`;
    galaxy.style.animationDuration=`${20000*(0.8+Math.random()*0.5)}ms`;
    galaxy.style.animationDelay=`${Math.random()*(duration*0.25)}ms`;
    universe.appendChild(galaxy);
  }
}

// Main dot shake + explosion
function onDotClick(){
  dot.classList.add('shaking');
  setTimeout(()=>{
    dot.classList.remove('shaking');
    expandDot(2000);
  },500);
}
dot.addEventListener('click', onDotClick);

