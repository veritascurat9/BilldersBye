// Billders Interactive Map - Full Improved JS
// --------------------------------------------
// This script includes:
// - Full 14-member marker list (intuitive positions)
// - Marker rendering
// - Popup rendering with avatar + bio
// - Farewell modal
// - Easter egg hooks
// - Music toggle system
// - Mobile responsiveness helpers

const team = [
  { name:'Tammi', x:15, y:28, avatar:'Tammi.png', bio:"Your best friend banter buddy. Mint fox." },
  { name:'Vanessa', x:22, y:35, avatar:'Vanessa.png', bio:"Scrum master. Teal duck with jokes." },
  { name:'Rishitha', x:30, y:42, avatar:'Rishitha.png', bio:"Rose deer. Gentle, quiet, recent mom." },
  { name:'Jarrett', x:52, y:18, avatar:'Jarrett.png', bio:"Golden owl. CA expert, pun king." },
  { name:'Andrew', x:60, y:30, avatar:'Andrew.png', bio:"Warm bear. Manager, protector, firefighter." },
  { name:'Danielle', x:70, y:40, avatar:'Danielle.png', bio:"Peach rabbit. Billing knowledge queen." },
  { name:'Nicholas', x:78, y:22, avatar:'Nicholas.png', bio:"Cream beaver. Precise communicator." },
  { name:'Deepesh', x:40, y:55, avatar:'Deepesh.png', bio:"Lavender Elephant — Gentle and dependable. Shadow steady helper. Helps everyone, great tester, solves complex issues." },
  { name:'Shreyas', x:55, y:60, avatar:'Shreyas.png', bio:"Grey moose. Calm Canadian SL." },
  { name:'Oleg', x:65, y:52, avatar:'Oleg.png', bio:"Lilac Ferret — Interactive and funny. Owns a katana sword. Known for saying ‘Exactly.’" },
  { name:'Sheri', x:48, y:38, avatar:'Sheri.png', bio:"Lavender tigress with French beret. PARIS queen." },
  { name:'Josh', x:32, y:65, avatar:'Josh.png', bio:"Sky-blue husky with kittens. Bills fan." },
  { name:'Arlene', x:75, y:70, avatar:'Arlene.png', bio:"Pastel phoenix. OG PO legend." },
  { name:'Vignesh', x:10, y:60, avatar:'Vignesh.png', bio:"Golden dog mascot with pawprint." }
];

// --------------------------------------------
// INITIAL LOAD
// --------------------------------------------
window.onload = () => {
  document.getElementById("farewell-modal").classList.remove("hidden");
  renderMarkers();
  setupMusic();
};

// --------------------------------------------
// CLOSE FAREWELL
// --------------------------------------------
function closeFarewell(){
  document.getElementById('farewell-modal').classList.add('hidden');
}

// --------------------------------------------
// RENDER MARKERS
// --------------------------------------------
function renderMarkers(){
  const container = document.getElementById("markers");

  team.forEach(p => {
    let m = document.createElement("div");
    m.className = "marker";
    m.style.left = p.x + "%";
    m.style.top = p.y + "%";
    m.onclick = () => showPopup(p);
    container.appendChild(m);
  });
}

// --------------------------------------------
// POPUP
// --------------------------------------------
function showPopup(p){
  const popup = document.getElementById("popup");

  popup.innerHTML = `
    <div style="text-align:center;">
      <img src="assets/avatars/${p.avatar}" style="width:80px;height:80px;border-radius:50%;" />
      <h3>${p.name}</h3>
      <p>${p.bio}</p>
    </div>
  `;

  popup.style.left = "50%";
  popup.style.top = "50%";
  popup.classList.remove("hidden");
}

// --------------------------------------------
// MUSIC TOGGLE
// --------------------------------------------
let musicPlaying = false;
let musicAudio = null;

function setupMusic(){
  const btn = document.getElementById("music-btn");
  btn.onclick = () => {
    if(!musicPlaying){
      musicAudio = new Audio("audio/lofi.mp3");
      musicAudio.loop = true;
      musicAudio.play();
      musicPlaying = true;
      btn.textContent = "🔇";
    } else {
      musicAudio.pause();
      musicPlaying = false;
      btn.textContent = "🎵";
    }
  };
}

// --------------------------------------------
// EASTER EGG HOOKS (IMPLEMENTED)
// --------------------------------------------
// Hidden interactive items added:
// - Codenames tile
// - PARIS scroll near Sheri
// - CA badge near Jarrett
// - Sparkles for Vignesh

// Create Easter Egg Markers
function createEasterEggs(){
  const container = document.getElementById("markers");

  // Codenames tile
  let codeTile = document.createElement("div");
  codeTile.className = "marker easter";
  codeTile.style.left = "58%";
  codeTile.style.top = "26%";
  codeTile.onclick = ()=>showSecret("You discovered a Billders Codenames word: <strong>INVOICE</strong>!");
  container.appendChild(codeTile);

  // PARIS scroll (Sheri)
  let paris = document.createElement("div");
  paris.className = "marker easter";
  paris.style.left = "48%";
  paris.style.top = "34%";
  paris.onclick = ()=>showSecret("Sheri’s PARIS Scroll: <em>‘Knowledge is power.’</em>");
  container.appendChild(paris);

  // CA badge (Jarrett)
  let ca = document.createElement("div");
  ca.className = "marker easter";
  ca.style.left = "52%";
  ca.style.top = "14%";
  ca.onclick = ()=>showSecret("You found the CA King’s badge!");
  container.appendChild(ca);

  // Sparkles for Vignesh
  let spark = document.createElement("div");
  spark.className = "marker sparkle";
  spark.style.left = "10%";
  spark.style.top = "56%";
  spark.onclick = ()=>showSecret("Sparkle aura activated ✨");
  container.appendChild(spark);
}

function showSecret(msg){
  const popup = document.getElementById("popup");
  popup.innerHTML = `<div style='padding:10px;text-align:center;'>${msg}</div>`;
  popup.style.left = "50%";
  popup.style.top = "50%";
  popup.classList.remove("hidden");
}

window.onload = () => {
  document.getElementById("farewell-modal").classList.remove("hidden");
  renderMarkers();
  createEasterEggs();
  setupMusic();
};
