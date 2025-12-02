// Billders Map Adventure
// Walkable Vignesh, markers, popups, easter eggs, music, farewell modal.

const team = [
  {
    name: 'Tammi',
    x: 15,
    y: 28,
    avatar: 'Tammi.png',
    character: 'Mint Fox',
    role: 'Tester, Banter Buddy, Best friend',
    powers: 'Funny, annoying and mad; Amazing PARIS domain knowledge. Billders will collapse without her.'
  },
  {
    name: 'Vanessa',
    x: 22,
    y: 35,
    avatar: 'Vanessa.png',
    character: 'Teal Duck',
    role: 'Scrum Master & Dad Jokes Generator, runs our circus',
    powers: 'Brings harmony wit and flow to the team. The bridge with dad jokes and dreary pokes. Her SM role is golden era Billders'
  },
  {
    name: 'Rishitha',
    x: 30,
    y: 42,
    avatar: 'Rishitha.png',
    character: 'Rose Deer',
    role: 'Dev,Previously [Mentee],Newly [Mom]',
    powers: 'Gentle, nickname "Samosa"; steady coder with warmth and care. '
  },
  {
    name: 'Jarrett',
    x: 52,
    y: 18,
    avatar: 'Jarrett.png',
    character: 'Golden Owl',
    role: 'Dev,Previously [SL,Mentor], CA KING, Cat dad, Mr Venerated',
    powers: 'CA knowledge so deep you will need a telescope to guess depth. Extremely sharp and perceptive, says "document" alot;tries to come off neutral but is very fuzzy and warm'
  },
  {
    name: 'Andrew',
    x: 60,
    y: 30,
    avatar: 'Andrew.png',
    character: 'Warm Bear',
    role: 'Manager, Volunteer firefighter , Amazing Dad',
    powers: 'Quiet strength; steady leadership and gentle guidance. Anxiety is scared of him cuz he is so cool and collected. Unanimously favorite Billders Manager in history.'
  },
  {
    name: 'Danielle',
    x: 70,
    y: 40,
    avatar: 'Danielle.png',
    character: 'Peach Rabbit',
    role: 'Product Owner, Previously [Tester], Powerpuff "Bubbles", Dance Mom',
    powers: 'Bridges stakeholders,design and devs with deep billing knowledge. Conducts Story elab like a smooth orchestra.Warm.'
  },
  {
    name: 'Nicholas',
    x: 78,
    y: 22,
    avatar: 'Nicholas.png',
    character: 'Cream Beaver',
    role: 'Developer , Long Islander, Previously [Mentee]',
    powers: 'Consice King, adaptable teammate; clear communicator and reliable coder under pressure. '
  },
  {
    name: 'Deepesh',
    x: 40,
    y: 55,
    avatar: 'Deepesh.png',
    character: 'Lavender Elephant',
    role: 'Developer, Previously [Mentee]',
    powers: 'Truly a team player, will take any task in stride and do it excellently. Very Calm.'
  },
  {
    name: 'Shreyas',
    x: 55,
    y: 60,
    avatar: 'Shreyas.png',
    character: 'Grey Moose',
    role: 'Solutions Lead, Previously [Dev], Always buried in snow',
    powers: 'Calm Canadian presence; deep experience, steady straightforward leader, easily likable.'
  },
  {
    name: 'Oleg',
    x: 65,
    y: 52,
    avatar: 'Oleg.png',
    character: 'Lilac Ferret',
    role: 'Application Test Lead, Katana Collector',
    powers: 'Interactive, funny, often says "Exactly", Automation test speedrunner'
  },
  {
    name: 'Sheri',
    x: 48,
    y: 38,
    avatar: 'Sheri.png',
    character: 'Lavender Tigress',
    role: 'Dev ,PARIS Queen, Previously[Mentor]',
    powers: 'PARIS mastery and strong guidance. Always wants the best for everyone. Honesty dispenser — push button, receive truth.'
  },
  {
    name: 'Josh',
    x: 32,
    y: 65,
    avatar: 'Josh.png',
    character: 'Sky-blue Husky',
    role: 'Developer, PARIS prince, Previously[Mentee], Newly [Cat dad], Bills fan',
    powers: 'Warm , always smiling ,says "Go bills" alot. Clever innovative reliable coder'
  },
  {
    name: 'Arlene',
    x: 75,
    y: 70,
    avatar: 'Arlene.png',
    character: 'Pastel Phoenix',
    role: 'Previously [Product Owner] , Soon-to-be [Enjoying Retirement]',
    powers: 'Wise,warm and Watchful. Blunt like a brick, loyal amd warm like a protective lioness. Knows how to celebrate victory in terms of how much dolla dolla bills we rake in as a team'
  }
];

const player = { x: 10, y: 60, el: null };
const pressedKeys = new Set();
let lastShownName = null;
const joined = new Set();
const followers = [];
let introShown = false;
let farewellShown = false;
let farewellPending = false;
let fireworksCanvas = null;
let fireworksCtx = null;
let fireworksParticles = [];
let fireworksActive = false;

window.addEventListener('load', () => {
  const farewellModal = document.getElementById('farewell-modal');
  const farewellCloseBtn = document.getElementById('farewell-close');
  const openPopupBtn = document.getElementById('open-popup-btn');

  farewellCloseBtn.addEventListener('click', closeFarewell);
  farewellModal.addEventListener('click', (e) => {
    if (e.target === farewellModal) closeFarewell();
  });

  if (openPopupBtn) {
    openPopupBtn.addEventListener('click', showIntroPopup);
  }

  renderMarkers();
  setupMusic();
  initPlayer();
  showIntroPopup();
  startPlayerLoop();
});

function closeFarewell() {
  const modal = document.getElementById('farewell-modal');
  modal.classList.add('hidden');
  modal.style.display = 'none';
  stopFireworks();
}

function renderMarkers() {
  const container = document.getElementById('markers');
  container.innerHTML = '';

  team.forEach((person) => {
    if (joined.has(person.name)) return;
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${person.x}%`;
    marker.style.top = `${person.y}%`;
    marker.innerHTML = `
      <img src="assets/Avatars/${person.avatar}" alt="${person.name} avatar" />
      <span class="label">${person.name}</span>
    `;
    marker.title = person.name;
    marker.setAttribute('aria-label', person.name);
    marker.dataset.name = person.name;
    marker.addEventListener('click', () => showPopup(person));
    container.appendChild(marker);
  });
}

function showPopup(person) {
  if (!introShown) {
    showIntroPopup();
    return;
  }
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="popup-card">
      <button class="popup-close" aria-label="Close popup">x</button>
      <div class="avatar">
        <img src="assets/Avatars/${person.avatar}" alt="${person.name} avatar" />
      </div>
      <h3>${person.name}</h3>
      <p><strong>Character:</strong> ${person.character}</p>
      <p><strong>Role:</strong> ${person.role}</p>
      <p><strong>Powers:</strong> ${person.powers}</p>
    </div>
  `;

  popup.classList.remove('hidden');
  popup.classList.add('show');
  lastShownName = person.name;
}

function showIntroPopup() {
  introShown = true;
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="popup-card">
      <button class="popup-close" aria-label="Close popup">x</button>
      <h3>Follow Along Vignesh's journey and collect Billders members</h3>
      <p>Use the arrow keys or WASD to move and meet everyone on the map.</p>
    </div>
  `;
  popup.classList.remove('hidden');
  popup.classList.add('show');
  lastShownName = null;
}

let musicPlaying = false;
let musicAudio = null;

function setupMusic() {
  const btn = document.getElementById('music-btn');
  btn.textContent = 'Play music';

  btn.onclick = () => {
    if (!musicAudio) {
      musicAudio = new Audio('audio/lofi.mp3');
      musicAudio.loop = true;
    }

    if (!musicPlaying) {
      musicAudio.play();
      musicPlaying = true;
      btn.textContent = 'Pause music';
      btn.classList.add('active');
    } else {
      musicAudio.pause();
      musicPlaying = false;
      btn.textContent = 'Play music';
      btn.classList.remove('active');
    }
  };
}

function hidePopup() {
  const popup = document.getElementById('popup');
  const wasVisible = !popup.classList.contains('hidden');
  popup.classList.add('hidden');
  popup.classList.remove('show');
  if (wasVisible && farewellPending && !farewellShown) {
    triggerFarewell();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hidePopup();
    closeFarewell();
  }
});

document.addEventListener('click', (e) => {
  const popup = document.getElementById('popup');
  if (popup.classList.contains('hidden')) return;
  const card = popup.querySelector('.popup-card');
  const clickedMarker = e.target.classList && e.target.classList.contains('marker');
  if (card && !card.contains(e.target) && !clickedMarker) {
    hidePopup();
  }
});

document.getElementById('popup').addEventListener('click', (e) => {
  if (e.target.id === 'popup') {
    hidePopup();
    return;
  }
  if (e.target.closest('.popup-close')) {
    hidePopup();
  }
});

// Walkable Vignesh
function initPlayer() {
  const container = document.getElementById('markers');
  const el = document.createElement('div');
  el.id = 'player';
  el.className = 'player';
  container.appendChild(el);
  player.el = el;
  updatePlayerPosition();
}

function updatePlayerPosition() {
  if (!player.el) return;
  player.el.style.left = `${player.x}%`;
  player.el.style.top = `${player.y}%`;
}

function startPlayerLoop() {
  const speed = 0.25; // percent per frame

  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) {
      pressedKeys.add(key);
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', (e) => {
    pressedKeys.delete(e.key);
  });

  function tick() {
    let dx = 0;
    let dy = 0;
    if (pressedKeys.has('ArrowLeft') || pressedKeys.has('a')) dx -= speed;
    if (pressedKeys.has('ArrowRight') || pressedKeys.has('d')) dx += speed;
    if (pressedKeys.has('ArrowUp') || pressedKeys.has('w')) dy -= speed;
    if (pressedKeys.has('ArrowDown') || pressedKeys.has('s')) dy += speed;

    if (dx !== 0 || dy !== 0) {
      player.x = Math.min(99, Math.max(1, player.x + dx));
      player.y = Math.min(99, Math.max(1, player.y + dy));
      updatePlayerPosition();
      positionFollowers();
      checkMarkerProximity();
    }

    requestAnimationFrame(tick);
  }
  tick();
}

function checkMarkerProximity() {
  let nearest = null;
  let nearestDist = Infinity;

  team.forEach((p) => {
    if (joined.has(p.name)) return;
    const dist = Math.hypot(player.x - p.x, player.y - p.y);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = p;
    }
  });

  if (nearest && nearestDist < 3) {
    if (nearest.name !== lastShownName) {
      showPopup(nearest);
      joinParty(nearest);
    }
  } else if (nearestDist > 4) {
    lastShownName = null;
  }
}

function joinParty(person) {
  if (joined.has(person.name)) return;
  joined.add(person.name);
  removeMarker(person.name);
  addFollower(person);
  checkCompletion();
}

function removeMarker(name) {
  const container = document.getElementById('markers');
  const marker = container.querySelector(`.marker[data-name="${name}"]`);
  if (marker) marker.remove();
}

function addFollower(person) {
  const container = document.getElementById('markers');
  const el = document.createElement('div');
  el.className = 'follower';
  el.style.backgroundImage = `url("assets/Avatars/${person.avatar}")`;
  container.appendChild(el);
  followers.push({ el, offset: followers.length + 1, person });
  positionFollowers();
}

function positionFollowers() {
  followers.forEach((f, idx) => {
    const angle = Math.PI; // trail behind
    const distance = 6 + idx * 3; // percent units
    f.el.style.left = `${player.x - Math.cos(angle) * distance}%`;
    f.el.style.top = `${player.y - Math.sin(angle) * distance}%`;
  });
}

function checkCompletion() {
  if (farewellShown) return;
  if (joined.size === team.length) {
    farewellPending = true;
  }
}

function triggerFarewell() {
  farewellShown = true;
  farewellPending = false;
  const modal = document.getElementById('farewell-modal');
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  startFireworks();
}

function setupFireworksCanvas() {
  if (fireworksCanvas) return;
  fireworksCanvas = document.createElement('canvas');
  fireworksCanvas.id = 'fireworks';
  fireworksCanvas.style.position = 'fixed';
  fireworksCanvas.style.inset = '0';
  fireworksCanvas.style.pointerEvents = 'none';
  fireworksCanvas.style.zIndex = '1000';
  document.body.appendChild(fireworksCanvas);
  fireworksCtx = fireworksCanvas.getContext('2d');
  resizeFireworksCanvas();
  window.addEventListener('resize', resizeFireworksCanvas);
}

function resizeFireworksCanvas() {
  if (!fireworksCanvas) return;
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}

function startFireworks(duration = 7000) {
  setupFireworksCanvas();
  fireworksActive = true;
  fireworksParticles = [];
  const endTime = performance.now() + duration;

  function createBurst() {
    if (!fireworksCanvas) return;
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height * 0.6;
    const colors = ['#ff6b6b', '#ffd166', '#6fffe9', '#a29bfe', '#f8c291', '#f5d547'];
    const count = 16 + Math.floor(Math.random() * 12);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 3;
      fireworksParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function frame(now) {
    if (!fireworksActive || !fireworksCtx || !fireworksCanvas) return;
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    if (Math.random() < 0.18) {
      createBurst();
    }

    fireworksParticles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.alpha -= p.decay;
    });

    fireworksParticles = fireworksParticles.filter((p) => p.alpha > 0);

    fireworksParticles.forEach((p) => {
      fireworksCtx.save();
      fireworksCtx.globalAlpha = p.alpha;
      fireworksCtx.fillStyle = p.color;
      fireworksCtx.beginPath();
      fireworksCtx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      fireworksCtx.fill();
      fireworksCtx.restore();
    });

    if (now < endTime || fireworksParticles.length > 0) {
      requestAnimationFrame(frame);
    } else {
      stopFireworks();
    }
  }

  requestAnimationFrame(frame);
}

function stopFireworks() {
  fireworksActive = false;
  fireworksParticles = [];
  if (fireworksCtx && fireworksCanvas) {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  }
}
