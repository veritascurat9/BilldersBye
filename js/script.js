// Billders Map Adventure
// Renders markers, popups, easter eggs, music toggle, and farewell modal handling.

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
  { name: 'Arlene', x: 75, y: 70, avatar: 'Arlene.png', bio: 'Pastel phoenix. Original PO with protective lioness energy.' },
  { name: 'Vignesh', x: 10, y: 60, avatar: 'Vignesh.png', bio: 'Golden dog mascot. Happy-day greetings and six-year heart of the squad.' }
];

window.addEventListener('load', () => {
  const farewellModal = document.getElementById('farewell-modal');
  const farewellCloseBtn = document.getElementById('farewell-close');
  const openPopupBtn = document.getElementById('open-popup-btn');

  farewellModal.classList.remove('hidden');
  farewellModal.style.display = 'flex';

  farewellCloseBtn.addEventListener('click', closeFarewell);

  farewellModal.addEventListener('click', (e) => {
    if (e.target === farewellModal) {
      closeFarewell();
    }
  });

  if (openPopupBtn) {
    openPopupBtn.addEventListener('click', () => showPopup(team[0]));
  }

  renderMarkers();
  createEasterEggs();
  setupMusic();
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
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${person.x}%`;
    marker.style.top = `${person.y}%`;
    marker.textContent = person.name[0] || '';
    marker.title = person.name;
    marker.setAttribute('aria-label', person.name);
    marker.addEventListener('click', () => showPopup(person));
    container.appendChild(marker);
  });
}

function showPopup(person) {
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="popup-card">
      <button class="popup-close" aria-label="Close popup">×</button>
      <div class="avatar">
        <img src="assets/avatars/${person.avatar}" alt="${person.name} avatar" />
      </div>
      <h3>${person.name}</h3>
      <p>${person.bio}</p>
    </div>
  `;

  popup.classList.remove('hidden');
  popup.classList.add('show');
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
      <button class="popup-close" aria-label="Close popup">×</button>
      ${msg}
    </div>`;
  popup.classList.remove('hidden');
  popup.classList.add('show');
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
