/* ============================================================
   Smart Heritage Tour — Interactive Map Logic
   map.js — all JavaScript separated from HTML
   ============================================================ */

const sites = [
  { name:"Taj Mahal",              state:"Uttar Pradesh",  lat:27.1751, lng:78.0421,  type:"monument", icon:"🏛️", color:"#3a86ff",
    img:"https://picsum.photos/seed/taj/600/300",
    desc:"An ivory-white marble mausoleum on the Yamuna river, commissioned in 1632 by Shah Jahan. UNESCO World Heritage & one of the Seven Wonders of the World.",
    wiki:"https://en.wikipedia.org/wiki/Taj_Mahal" },
  { name:"Kedarnath Temple",       state:"Uttarakhand",    lat:30.7352, lng:79.0669,  type:"temple",   icon:"🛕", color:"#e85d04",
    img:"https://picsum.photos/seed/kedar/600/300",
    desc:"One of the twelve Jyotirlinga shrines of Shiva at 3,583 m above sea level. Accessible only between April and November.",
    wiki:"https://en.wikipedia.org/wiki/Kedarnath_Temple" },
  { name:"Jama Masjid, Delhi",     state:"Delhi",          lat:28.6507, lng:77.2334,  type:"mosque",   icon:"🕌", color:"#43aa8b",
    img:"https://picsum.photos/seed/delhi2/600/300",
    desc:"Built by Shah Jahan between 1644–1656, one of the largest mosques in India with a courtyard holding 25,000 worshippers.",
    wiki:"https://en.wikipedia.org/wiki/Jama_Masjid,_Delhi" },
  { name:"Golden Temple",          state:"Punjab",         lat:31.6200, lng:74.8765,  type:"temple",   icon:"🛕", color:"#e85d04",
    img:"https://picsum.photos/seed/golden2/600/300",
    desc:"Harmandir Sahib — the holiest Sikh gurdwara in Amritsar, surrounded by the sacred Amrit Sarovar, the Pool of Nectar.",
    wiki:"https://en.wikipedia.org/wiki/Golden_Temple" },
  { name:"Basilica of Bom Jesus",  state:"Goa",            lat:15.5009, lng:73.9117,  type:"mosque",   icon:"⛪", color:"#43aa8b",
    img:"https://picsum.photos/seed/goa2/600/300",
    desc:"A UNESCO World Heritage Site in Old Goa built in 1605. One of the finest examples of Baroque architecture in India.",
    wiki:"https://en.wikipedia.org/wiki/Basilica_of_Bom_Jesus" },
  { name:"Meenakshi Amman Temple", state:"Tamil Nadu",     lat:9.9195,  lng:78.1193,  type:"temple",   icon:"🛕", color:"#e85d04",
    img:"https://picsum.photos/seed/temple2/600/300",
    desc:"14 stunning gopuram towers rising above Madurai — one of the finest examples of Dravidian architecture in South India.",
    wiki:"https://en.wikipedia.org/wiki/Meenakshi_Temple" },
  { name:"India Gate",             state:"Delhi",          lat:28.6129, lng:77.2295,  type:"monument", icon:"🏛️", color:"#3a86ff",
    img:"https://picsum.photos/seed/indiagate/600/300",
    desc:"A war memorial for 70,000 soldiers who died in World War I. Designed by Edwin Lutyens, completed in 1931.",
    wiki:"https://en.wikipedia.org/wiki/India_Gate" },
  { name:"Red Fort",               state:"Delhi",          lat:28.6562, lng:77.2410,  type:"fort",     icon:"🏰", color:"#9b5de5",
    img:"https://picsum.photos/seed/redfort/600/300",
    desc:"UNESCO World Heritage Site built by Shah Jahan in 1648. Served as the main residence of Mughal emperors for 200 years.",
    wiki:"https://en.wikipedia.org/wiki/Red_Fort" },
  { name:"Qutb Minar",             state:"Delhi",          lat:28.5245, lng:77.1855,  type:"monument", icon:"🏛️", color:"#3a86ff",
    img:"https://picsum.photos/seed/qutb/600/300",
    desc:"A 73-metre UNESCO-listed minaret built in 1193. One of the finest towers of the medieval world.",
    wiki:"https://en.wikipedia.org/wiki/Qutb_Minar" },
  { name:"Hawa Mahal",             state:"Rajasthan",      lat:26.9239, lng:75.8267,  type:"fort",     icon:"🏰", color:"#9b5de5",
    img:"https://picsum.photos/seed/hawamahal/600/300",
    desc:"The Palace of the Winds in Jaipur — 953 windows built in 1799 to allow royal ladies to observe street festivals.",
    wiki:"https://en.wikipedia.org/wiki/Hawa_Mahal" },
  { name:"Amber Fort",             state:"Rajasthan",      lat:26.9855, lng:75.8513,  type:"fort",     icon:"🏰", color:"#9b5de5",
    img:"https://picsum.photos/seed/amberfort/600/300",
    desc:"A magnificent UNESCO fort-palace built in 1592 from pale yellow sandstone near Jaipur.",
    wiki:"https://en.wikipedia.org/wiki/Amer_Fort" },
  { name:"Hampi",                  state:"Karnataka",      lat:15.3350, lng:76.4600,  type:"monument", icon:"🏛️", color:"#3a86ff",
    img:"https://picsum.photos/seed/hampi/600/300",
    desc:"Ruins of the Vijayanagara Empire — a UNESCO site spanning 4,100+ hectares. Once one of the world's largest cities.",
    wiki:"https://en.wikipedia.org/wiki/Hampi" },
  { name:"Ajanta Caves",           state:"Maharashtra",    lat:20.5519, lng:75.7033,  type:"monument", icon:"🏛️", color:"#3a86ff",
    img:"https://picsum.photos/seed/ajanta/600/300",
    desc:"30 rock-cut Buddhist cave monuments from 2nd century BCE, famous for their spectacular paintings and sculptures.",
    wiki:"https://en.wikipedia.org/wiki/Ajanta_Caves" },
  { name:"Ellora Caves",           state:"Maharashtra",    lat:20.0258, lng:75.1780,  type:"monument", icon:"🏛️", color:"#3a86ff",
    img:"https://picsum.photos/seed/ellora/600/300",
    desc:"34 monasteries and temples from the 6th–11th centuries — Buddhist, Hindu, and Jain side by side. UNESCO site.",
    wiki:"https://en.wikipedia.org/wiki/Ellora_Caves" },
  { name:"Jim Corbett",            state:"Uttarakhand",    lat:29.5300, lng:78.7747,  type:"nature",   icon:"🌿", color:"#55a630",
    img:"https://picsum.photos/seed/corbett/600/300",
    desc:"India's oldest national park, established in 1936. Home to the Royal Bengal Tiger and a biodiversity hotspot.",
    wiki:"https://en.wikipedia.org/wiki/Jim_Corbett_National_Park" },
  { name:"Konark Sun Temple",      state:"Odisha",         lat:19.8876, lng:86.0946,  type:"temple",   icon:"🛕", color:"#e85d04",
    img:"https://picsum.photos/seed/konark/600/300",
    desc:"A 13th-century UNESCO Sun temple designed as a giant stone chariot with intricate carved wheels and horses.",
    wiki:"https://en.wikipedia.org/wiki/Konark_Sun_Temple" },
  { name:"Mysore Palace",          state:"Karnataka",      lat:12.3052, lng:76.6552,  type:"fort",     icon:"🏰", color:"#9b5de5",
    img:"https://picsum.photos/seed/mysore/600/300",
    desc:"Residence of the Wadiyar dynasty — built in 1912 in Indo-Saracenic style. One of India's most visited monuments.",
    wiki:"https://en.wikipedia.org/wiki/Mysore_Palace" },
  { name:"Gateway of India",       state:"Maharashtra",    lat:18.9220, lng:72.8347,  type:"monument", icon:"🏛️", color:"#3a86ff",
    img:"https://picsum.photos/seed/gateway/600/300",
    desc:"An arch-monument in Mumbai overlooking the Arabian Sea — the ceremonial entrance to India during the British era.",
    wiki:"https://en.wikipedia.org/wiki/Gateway_of_India" },
];

const typeLabels = {
  temple:   "Temple",
  monument: "Monument",
  mosque:   "Mosque / Church",
  fort:     "Fort & Palace",
  nature:   "Nature & Wildlife"
};

/* ── MAP INIT ── */
const map = L.map('map', { center:[22.5, 80.0], zoom:5 });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:'© OpenStreetMap contributors', maxZoom:18
}).addTo(map);

let allMarkers = [];
let activeSite = null;

function makeIcon(color, big = false) {
  const size = big ? 20 : 14;
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      border:3px solid #fff;
      border-radius:50%;
      width:${size}px;height:${size}px;
      box-shadow:0 2px 10px ${color}99;
    "></div>`,
    iconSize:[size,size],
    iconAnchor:[size/2,size/2],
    popupAnchor:[0,-12]
  });
}

function popupHTML(site) {
  return `
    <div class="popup-title">${site.icon} ${site.name}</div>
    <div class="popup-state"><i class="fa-solid fa-location-dot"></i> ${site.state}</div>
    <div class="popup-desc">${site.desc.substring(0,100)}…</div>
    <a href="${site.wiki}" target="_blank" class="popup-btn">
      <i class="fa-solid fa-arrow-right"></i> Learn More
    </a>`;
}

function showPanel(site) {
  document.getElementById('panelImg').src            = site.img;
  document.getElementById('panelBadge').textContent  = site.state;
  document.getElementById('panelCat').textContent    = typeLabels[site.type] || site.type;
  document.getElementById('panelTitle').textContent  = site.icon + ' ' + site.name;
  document.getElementById('panelState').textContent  = site.state;
  document.getElementById('panelDesc').textContent   = site.desc;
  document.getElementById('panelLink').href          = site.wiki;
  document.getElementById('infoPanel').classList.add('visible');

  document.querySelectorAll('.site-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.querySelector(`.site-item[data-name="${site.name}"]`);
  if (activeEl) { activeEl.classList.add('active'); activeEl.scrollIntoView({ block:'nearest', behavior:'smooth' }); }
}

function addMarkers(filtered) {
  allMarkers.forEach(m => map.removeLayer(m));
  allMarkers = [];
  filtered.forEach(site => {
    const m = L.marker([site.lat, site.lng], { icon: makeIcon(site.color) })
      .addTo(map)
      .bindPopup(popupHTML(site), { maxWidth:240 })
      .on('click', () => {
        if (activeSite) {
          const prev = allMarkers.find(x => x._site === activeSite);
          if (prev) prev.setIcon(makeIcon(activeSite.color));
        }
        m.setIcon(makeIcon(site.color, true));
        activeSite = site;
        showPanel(site);
      });
    m._site = site;
    allMarkers.push(m);
  });
  document.getElementById('mapCount').textContent  = `${filtered.length} heritage sites`;
  document.getElementById('siteCount').textContent = `${filtered.length} sites`;
}

function buildList(filtered) {
  document.getElementById('sitesList').innerHTML = filtered.map(site => `
    <div class="site-item" data-name="${site.name}" onclick="flyTo('${site.name}')">
      <div class="site-icon-wrap" style="background:${site.color}22">
        <span>${site.icon}</span>
      </div>
      <div class="site-item-text">
        <div class="site-item-name">${site.name}</div>
        <div class="site-item-state">${site.state}</div>
      </div>
      <i class="fa-solid fa-chevron-right site-arrow"></i>
    </div>`).join('');
}

function flyTo(name) {
  const site = sites.find(s => s.name === name);
  if (!site) return;
  map.flyTo([site.lat, site.lng], 11, { duration:1.4 });
  window.scrollTo({ top: document.getElementById('map').getBoundingClientRect().top + window.scrollY - 80, behavior:'smooth' });
  setTimeout(() => {
    const m = allMarkers.find(x => x._site?.name === name);
    if (m) { m.openPopup(); m.setIcon(makeIcon(site.color, true)); }
    showPanel(site);
  }, 1450);
}

/* ── FILTER BUTTONS ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.type;
    const filtered = type === 'all' ? sites : sites.filter(s => s.type === type);
    addMarkers(filtered);
    buildList(filtered);
    document.getElementById('infoPanel').classList.remove('visible');
    activeSite = null;
  });
});

/* ── INIT ── */
addMarkers(sites);
buildList(sites);
