// Billders Map Adventure
// Walkable Vignesh, markers, popups, easter eggs, music, farewell modal.

const team = [
  { name: 'Tammi', x: 15, y: 28, avatar: 'Tammi.png', bio: 'Mint fox and best-friend banter buddy. PARIS/CA whiz and hilarious tester.' },
  { name: 'Vanessa', x: 22, y: 35, avatar: 'Vanessa.png', bio: 'Teal duck scrum master. Ends standups with jokes and quotables.' },
  { name: 'Rishitha', x: 30, y: 42, avatar: 'Rishitha.png', bio: 'Rose deer, gentle and newly a mom. Mentored by Vignesh; nickname: Samosa.' },
  { name: 'Jarrett', x: 52, y: 18, avatar: 'Jarrett.png', bio: 'Golden owl. CA expert, pun king. Says "document document document".' },
  { name: 'Andrew', x: 60, y: 30, avatar: 'Andrew.png', bio: 'Warm bear manager. Quiet strength and volunteer firefighter.' },
  { name: 'Danielle', x: 70, y: 40, avatar: 'Danielle.png', bio: 'Peach rabbit PO, ex-tester, Billing knowledge queen. Powerpuff "Bubbles".' },
  { name: 'Nicholas', x: 78, y: 22, avatar: 'Nicholas.png', bio: 'Cream beaver. Precise communicator and adaptable tester.' },
  { name: 'Deepesh', x: 40, y: 55, avatar: 'Deepesh.png', bio: 'Lavender elephant. Quiet, steady helper who solves tough problems.' },
  { name: 'Shreyas', x: 55, y: 60, avatar: 'Shreyas.png', bio: 'Grey moose. Calm Canadian Solutions Lead with deep experience.' },
  { name: 'Oleg', x: 65, y: 52, avatar: 'Oleg.png', bio: 'Lilac ferret. Interactive, funny Test Lead; often says "Exactly".' },
  { name: 'Sheri', x: 48, y: 38, avatar: 'Sheri.png', bio: 'Lavender tigress with French beret. PARIS queen and strong mentor.' },
  { name: 'Josh', x: 32, y: 65, avatar: 'Josh.png', bio: 'Sky-blue husky. Bills fan with two kittens; leaving soon too.' },
  { name: 'Arlene', x: 75, y: 70, avatar: 'Arlene.png', bio: 'Pastel phoenix. Original PO with protective lioness energy.' }
];

const player = { x: 10, y: 60, el: null };
const pressedKeys = new Set();
let lastShownName = null;
const joined = new Set();
const followers = [];

window.addEventListener('load', () => {
  const farewellModal = document.getElementById('farewell-modal');
  const farewellCloseBtn = document.getElementById('farewell-close');
  const openPopupBtn = document.getElementById('open-popup-btn');

  farewellModal.classList.remove('hidden');
  farewellModal.style.display = 'flex';

  farewellCloseBtn.addEventListener('click', closeFarewell);
  farewellModal.addEventListener('click', (e) => {
    if (e.target === farewellModal) closeFarewell();
  });

  if (openPopupBtn) {
    openPopupBtn.addEventListener('click', () => showPopup(team[0]));
  }

  renderMarkers();
  createEasterEggs();
  setupMusic();
  initPlayer();
  startPlayerLoop();
});

function closeFarewell() {
  const modal = document.getElementById('farewell-modal');
  modal.classList.add('hidden');
  modal.style.display = 'none';
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
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="popup-card">
      <button class="popup-close" aria-label="Close popup">x</button>
      <div class="avatar">
        <img src="assets/Avatars/${person.avatar}" alt="${person.name} avatar" />
      </div>
      <h3>${person.name}</h3>
      <p>${person.bio}</p>
    </div>
  `;

  popup.classList.remove('hidden');
  popup.classList.add('show');
  lastShownName = person.name;
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

function createEasterEggs() {
  const container = document.getElementById('markers');

  const codeTile = document.createElement('div');
  codeTile.className = 'marker easter';
  codeTile.style.left = '58%';
  codeTile.style.top = '26%';
  codeTile.textContent = '*';
  codeTile.addEventListener('click', () => showSecret('You discovered a Billders Codenames word: <strong>INVOICE</strong>!'));
  container.appendChild(codeTile);

  const paris = document.createElement('div');
  paris.className = 'marker easter';
  paris.style.left = '48%';
  paris.style.top = '34%';
  paris.textContent = '*';
  paris.addEventListener('click', () => showSecret("Sheri's PARIS scroll: <em>Knowledge is power.</em>"));
  container.appendChild(paris);

  const ca = document.createElement('div');
  ca.className = 'marker easter';
  ca.style.left = '52%';
  ca.style.top = '14%';
  ca.textContent = '*';
  ca.addEventListener('click', () => showSecret("You found the CA King's badge!"));
  container.appendChild(ca);

  const spark = document.createElement('div');
  spark.className = 'marker sparkle';
  spark.style.left = '10%';
  spark.style.top = '56%';
  spark.textContent = '*';
  spark.addEventListener('click', () => showSecret('Sparkle aura activated for Vignesh!'));
  container.appendChild(spark);
}

function showSecret(msg) {
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="popup-card" style="text-align:center;">
      <button class="popup-close" aria-label="Close popup">x</button>
      ${msg}
    </div>`;
  popup.classList.remove('hidden');
  popup.classList.add('show');
  lastShownName = null;
}

function hidePopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('hidden');
  popup.classList.remove('show');
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
