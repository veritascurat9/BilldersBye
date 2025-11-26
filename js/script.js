// Billders Interactive Map - Interactive Farewell
// ------------------------------------------------
// Renders markers, popups, easter eggs, music toggle, and modal handling.

const team = [
  { name: 'Tammi', x: 15, y: 28, avatar: 'Tammi.png', bio: 'Mint fox and best-friend banter buddy. PARIS/CA whiz and hilarious tester.' },
  { name: 'Vanessa', x: 22, y: 35, avatar: 'Vanessa.png', bio: 'Teal duck scrum master. Ends standups with jokes and quotables.' },
  { name: 'Rishitha', x: 30, y: 42, avatar: 'Rishitha.png', bio: 'Rose deer, gentle and newly a mom. Mentored by Vignesh; nickname: Samosa.' },
  { name: 'Jarrett', x: 52, y: 18, avatar: 'Jarrett.png', bio: 'Golden owl. CA expert, pun king. Says "document document document".' },
  { name: 'Andrew', x: 60, y: 30, avatar: 'Andrew.png', bio: 'Warm bear manager. Quiet strength and volunteer firefighter.' },
  { name: 'Danielle', x: 70, y: 40, avatar: 'Danielle.png', bio: 'Peach rabbit PO, ex-tester, Billing knowledge queen. Powerpuff “Bubbles”.' },
  { name: 'Nicholas', x: 78, y: 22, avatar: 'Nicholas.png', bio: 'Cream beaver. Precise communicator and adaptable tester.' },
  { name: 'Deepesh', x: 40, y: 55, avatar: 'Deepesh.png', bio: 'Lavender elephant. Quiet, steady helper who solves tough problems.' },
  { name: 'Shreyas', x: 55, y: 60, avatar: 'Shreyas.png', bio: 'Grey moose. Calm Canadian Solutions Lead with deep experience.' },
  { name: 'Oleg', x: 65, y: 52, avatar: 'Oleg.png', bio: 'Lilac ferret. Interactive, funny Test Lead; often says "Exactly".' },
  { name: 'Sheri', x: 48, y: 38, avatar: 'Sheri.png', bio: 'Lavender tigress with French beret. PARIS queen and strong mentor.' },
  { name: 'Josh', x: 32, y: 65, avatar: 'Josh.png', bio: 'Sky-blue husky. Bills fan with two kittens; leaving soon too.' },
  { name: 'Arlene', x: 75, y: 70, avatar: 'Arlene.png', bio: 'Pastel phoenix. Original PO with protective “lioness” energy.' },
  { name: 'Vignesh', x: 10, y: 60, avatar: 'Vignesh.png', bio: 'Golden dog mascot. Happy-day greetings and six-year heart of the squad.' }
];

// --------------------------------------------
// INITIAL LOAD
// --------------------------------------------
window.addEventListener('load', () => {
  document.getElementById('farewell-modal').classList.remove('hidden');
  renderMarkers();
  createEasterEggs();
  setupMusic();
});

// --------------------------------------------
// CLOSE FAREWELL
// --------------------------------------------
function closeFarewell() {
  document.getElementById('farewell-modal').classList.add('hidden');
}

// --------------------------------------------
// RENDER MARKERS
// --------------------------------------------
function renderMarkers() {
  const container = document.getElementById('markers');
  container.innerHTML = '';

  team.forEach((person) => {
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${person.x}%`;
    marker.style.top = `${person.y}%`;
    marker.onclick = () => showPopup(person);
    container.appendChild(marker);
  });
}

// --------------------------------------------
// POPUP
// --------------------------------------------
function showPopup(person) {
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="popup-card">
      <button class="popup-close" aria-label="Close popup" onclick="hidePopup()">X</button>
      <div class="avatar">
        <img src="assets/avatars/${person.avatar}" alt="${person.name} avatar" />
      </div>
      <h3>${person.name}</h3>
      <p>${person.bio}</p>
    </div>
  `;

  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.classList.remove('hidden');
}

// --------------------------------------------
// MUSIC TOGGLE
// --------------------------------------------
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

// --------------------------------------------
// EASTER EGGS
// --------------------------------------------
function createEasterEggs() {
  const container = document.getElementById('markers');

  // Codenames tile
  const codeTile = document.createElement('div');
  codeTile.className = 'marker easter';
  codeTile.style.left = '58%';
  codeTile.style.top = '26%';
  codeTile.onclick = () => showSecret('You discovered a Billders Codenames word: <strong>INVOICE</strong>!');
  container.appendChild(codeTile);

  // PARIS scroll (Sheri)
  const paris = document.createElement('div');
  paris.className = 'marker easter';
  paris.style.left = '48%';
  paris.style.top = '34%';
  paris.onclick = () => showSecret("Sheri's PARIS scroll: <em>Knowledge is power.</em>");
  container.appendChild(paris);

  // CA badge (Jarrett)
  const ca = document.createElement('div');
  ca.className = 'marker easter';
  ca.style.left = '52%';
  ca.style.top = '14%';
  ca.onclick = () => showSecret("You found the CA King's badge!");
  container.appendChild(ca);

  // Sparkles for Vignesh
  const spark = document.createElement('div');
  spark.className = 'marker sparkle';
  spark.style.left = '10%';
  spark.style.top = '56%';
  spark.onclick = () => showSecret('Sparkle aura activated for Vignesh!');
  container.appendChild(spark);
}

function showSecret(msg) {
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="popup-card" style="text-align:center;">
      <button class="popup-close" aria-label="Close popup" onclick="hidePopup()">X</button>
      ${msg}
    </div>`;
  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.classList.remove('hidden');
}

function hidePopup() {
  document.getElementById('popup').classList.add('hidden');
}

// Close on ESC or click-outside
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hidePopup();
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
