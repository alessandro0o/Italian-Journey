// ===== HOME: immagini che scorrono, cambio lingua e globo 3D =====

// --- 1) Immagini che scorrono -------------------------------------------------
// Quando avrete le foto, scrivete il percorso accanto al nome, ad esempio: Roma: "img/roma.jpg"
const FOTO_HOME = {
  Aosta: "img/aosta.jpg", Torino: "img/torino.jpg", Milano: "img/milano.jpg", Trento: "img/trento.jpg", Venezia: "img/venezia.jpg", Trieste: "img/trieste.jpg", Genova: "img/genova.jpg",
  Bologna: "img/bologna.jpg", Firenze: "img/firenze.jpg", Perugia: "img/perugia.jpg", Ancona: "img/ancona.jpg", Roma: "img/roma.jpg", "L'Aquila": "img/laquila.jpg", Campobasso: "img/campobasso.jpg",
  Napoli: "img/napoli.jpg", Bari: "img/bari.jpg", Potenza: "img/potenza.jpg", Catanzaro: "img/catanzaro.jpg", Palermo: "img/palermo.jpg", Cagliari: "img/cagliari.jpg"
};

function costruisciRighe() {
  const contenitore = document.getElementById("righe");
  const nomi = Object.keys(FOTO_HOME);
  for (let r = 0; r < 3; r++) {
    const riga = document.createElement("div");
    riga.className = "row" + (r % 2 ? " rev" : "");
    // sfasiamo l'ordine delle città in ogni riga e duplichiamo la lista per un ciclo continuo
    const ordine = nomi.slice(r * 6).concat(nomi.slice(0, r * 6));
    for (let giro = 0; giro < 2; giro++) {
      ordine.forEach(function (nome) {
        const t = document.createElement("div");
        t.setAttribute("role", "listitem");
        t.className = "tile" + (FOTO_HOME[nome] ? " con-foto" : "");   // con foto: niente bordo tratteggiato
        if (FOTO_HOME[nome]) {
          const img = document.createElement("img");
          img.src = FOTO_HOME[nome];
          img.alt = nome;
          t.appendChild(img);
        }
        // le righe scorrevoli ripetono le stesse 20 foto: i lettori di schermo le leggono una volta sola
        if (r > 0 || giro > 0) t.setAttribute("aria-hidden", "true");
        const s = document.createElement("span");
        s.textContent = FOTO_HOME[nome] ? "" : nome;
        t.appendChild(s);
        riga.appendChild(t);
      });
    }
    contenitore.appendChild(riga);
  }
}

// --- 2) Cambio lingua ITA / ENG ----------------------------------------------
const TESTI = {
  it: {
    sottotitolo: "Alla scoperta dei 20 capoluoghi d'Italia",
    scopri: "Scopri ora",
    hint: "Trascina il globo per ruotarlo, cliccalo per entrare",
    infoTitolo: "Info",
    infoTesto: "Italian Journey è un progetto scolastico per esplorare storia, cultura ed eventi dei capoluoghi di regione italiani.",
    contattiTitolo: "Contatti"
  },
  en: {
    sottotitolo: "Discover the 20 regional capitals of Italy",
    scopri: "Explore now",
    hint: "Drag the globe to rotate it, click it to enter",
    infoTitolo: "About",
    infoTesto: "Italian Journey is a school project to explore the history, culture and events of Italy's regional capitals.",
    contattiTitolo: "Contacts"
  }
};

function impostaLingua(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = TESTI[lang][el.dataset.i18n];
  });
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  });
  try { localStorage.setItem("ij-lingua", lang); } catch (e) {}
}

function iniziaLingua() {
  let lang = "it";
  try { lang = localStorage.getItem("ij-lingua") || "it"; } catch (e) {}
  impostaLingua(lang);
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { impostaLingua(b.dataset.lang); });
  });
}

// --- 3) Globo 3D su canvas (proiezione ortografica) --------------------------
// I contorni dei continenti sono semplificati: coppie [longitudine, latitudine].
const TERRE = [
  // Eurasia + penisola italiana e balcanica
  [[-9,37],[-9,43],[-1.5,43.5],[-1.2,46],[-4.5,48.3],[-1.5,48.7],[1.5,50.2],[4,51.5],[8,53.5],[8.5,57],[10.5,57.7],[10.5,55],[12,54.2],[14,54],[18.5,54.8],[21,56.5],[24,57.2],[24,59.5],[23,60],[21.3,61],[21.5,63.5],[25,65.3],[24,66],[25,68],[28,70],[33,69.5],[41,67],[44,66],[44,68.5],[60,69],[68,70],[80,73],[110,76],[130,73],[150,71],[170,70],[180,68.5],[180,65],[170,60],[163,58],[156,52],[156,57],[143,59],[137,54],[141,52],[140,48],[132,43],[129,41],[129,35],[126,35],[126,38],[125,40],[122,40],[121,37],[119,35],[122,31],[121,28],[117,23],[110,21],[108,21],[106,17],[109,12],[105,9],[103,10],[100,13],[100,8],[103,1.5],[101,3],[98,8],[98,16],[95,16],[92,22],[87,21],[80,15],[77,8],[73,17],[72,21],[67,24.5],[62,25],[57,25.5],[56,26.5],[56.5,24.5],[59.8,22.5],[58.5,20],[55,17],[52,16],[45,13],[43,12.8],[42.5,16],[39,21.5],[37,25],[35,28.2],[34.9,29.5],[34.3,31.2],[35.5,33.5],[36,36],[34,36.7],[30,36.3],[27.5,37],[26.5,38.5],[26.2,40],[24,40.8],[23,40.2],[24,38],[23.2,36.5],[22,36.5],[21.5,37.5],[21,38.5],[19.5,40.3],[19.5,41.5],[19,42.5],[16.5,43.5],[14.5,45],[13.7,45.6],[12.3,45.3],[12.5,44],[14,42.5],[16,41.9],[18.5,40.1],[17,39],[16.5,38.4],[16,37.9],[15.7,38.3],[15.8,39.9],[14.8,40.2],[14,40.8],[12.5,41.5],[10.5,42.8],[9.5,44],[8.5,44.3],[7.5,43.8],[6,43.1],[3.2,43.2],[3,42],[0.8,41],[-0.3,39.5],[-1,37.5],[-2.2,36.7],[-5.4,36],[-6.5,36.9]],
  // Africa
  [[-5.5,35.8],[-2,35.2],[3,36.8],[10,37.3],[11,36.8],[10.2,34.5],[15,32.3],[20,31.2],[20,32.8],[25,31.8],[32,31.2],[32.5,29.9],[33.7,27.2],[36,22.5],[37.5,18],[39.5,15.5],[43,12.5],[51,11.8],[51,10],[48,5],[42,-1],[40,-5],[35,-20],[30,-30],[20,-35],[17,-30],[12,-17],[9,-1],[8,4.5],[-4,5],[-8,4.5],[-13,8],[-17,14.7],[-17,21],[-13,27.5],[-9.5,30],[-9.8,32],[-6,35.7]],
  // Scandinavia (Norvegia e Svezia)
  [[5,58.5],[5,62],[10,64],[15,68],[20,70],[28,71],[25,68.5],[24,66],[21.5,64],[21,63],[17.2,61.2],[18.8,59.8],[16.7,57],[14.2,55.5],[12.8,55.6],[11.5,58.5],[8,58]],
  // Gran Bretagna, Irlanda, Islanda
  [[-5.5,50],[1.5,51],[1.7,52.8],[0,53.5],[-1.5,55],[-2,57.5],[-4,58.6],[-5.5,58.5],[-6,56.5],[-5,55],[-3,54.5],[-3,53.3],[-4.5,53],[-5,51.8],[-3,51.4]],
  [[-10,52],[-6,52.2],[-6,54.2],[-8,55.2],[-10,54]],
  [[-24,65.5],[-14,65.5],[-14,64.3],[-22,63.8]],
  // Sicilia, Sardegna, Corsica, Creta
  [[12.5,38],[15.6,38.2],[15.1,36.7],[12.5,37.6]],
  [[8.2,41],[9.7,41],[9.6,39.1],[8.4,39]],
  [[8.6,43],[9.4,43],[9.5,41.4],[8.7,41.6]],
  [[23.5,35.5],[26.3,35.2],[24,35]],
  // Nord America (con America centrale)
  [[-168,66],[-165,69],[-156,71.3],[-141,69.6],[-125,70],[-110,68],[-95,68],[-90,69],[-82,69],[-85,66],[-93,62],[-94,58],[-88,56],[-82,53],[-79,55],[-78,62],[-72,62],[-65,60],[-61,56],[-56,52],[-60,48],[-65,49],[-64,45.5],[-70,43.5],[-70,41.7],[-74,40.5],[-76,38],[-76,35],[-81,31],[-80,26],[-81,25],[-83,29],[-85,30],[-89,30],[-94,29.5],[-97,26],[-97.5,22],[-96,19],[-94,18],[-91,19],[-90.5,21],[-87,21.5],[-88,16],[-84,15.5],[-83,11],[-80,9],[-77.5,8.6],[-79.5,7.4],[-83,8],[-86,11],[-87.5,13],[-92,14.5],[-96,15.8],[-101,17.5],[-105.5,20],[-105.5,23.5],[-109.5,26],[-112.5,29.5],[-114.8,31.8],[-116,31],[-117.1,32.5],[-120.5,34.5],[-122.5,37.5],[-124,40.5],[-124,46],[-124.7,48.4],[-123,49],[-127,51],[-130,54.5],[-133,57],[-137,58.5],[-142,60],[-148,60.5],[-152,59],[-158,57],[-162,55],[-158,58.5],[-162,59.8],[-165,62],[-161,64.5]],
  // Groenlandia, Baffin, Terranova
  [[-73,78],[-60,82],[-30,83.5],[-18,80],[-20,75],[-22,70],[-32,68],[-40,65],[-43,60],[-50,62],[-53,67],[-55,71],[-60,76],[-68,76.5]],
  [[-80,73],[-68,70.5],[-62,66.5],[-66,62.5],[-72,64],[-78,64.5],[-73,68],[-80,70]],
  [[-59,47.5],[-53,47],[-53,51.5],[-56,51.7]],
  // Cuba e Hispaniola
  [[-85,22],[-80,23],[-74,20],[-78,20],[-82,22.5]],
  [[-74.5,18.5],[-72,19.8],[-68.5,18.5],[-71,17.8]],
  // Sud America
  [[-77.5,8.5],[-72,12],[-68,10.7],[-62,10.7],[-60,8.5],[-55,6],[-51,4.5],[-50,0],[-44,-2.5],[-35,-5.5],[-35,-9],[-39,-13],[-39,-18],[-41,-22],[-45,-23.5],[-48.5,-26],[-48.5,-28.5],[-53,-34],[-58,-34.5],[-57,-38],[-62,-39],[-65,-41],[-64,-45],[-67.5,-46.5],[-66,-48],[-69,-51.5],[-68.5,-53],[-72,-54],[-75,-50],[-74,-44],[-73.5,-37],[-71.5,-30],[-70.3,-18],[-76,-14],[-81,-6],[-80,-2],[-80.5,0],[-78,2.5],[-77.3,6.5]],
  // Oceania: Australia, Nuova Zelanda, Nuova Guinea, Indonesia, Filippine
  [[114,-22],[122,-18],[128,-15],[131,-12],[136,-12],[136.7,-15.5],[140,-17.5],[142.3,-10.8],[145,-15],[146,-19],[150,-22.5],[153,-26],[153,-31],[150,-37],[146,-39],[141,-38],[138,-35.5],[135,-34.5],[131,-31.5],[124,-33.5],[116,-35],[115,-33],[114,-27]],
  [[172.5,-34.5],[178,-37.5],[175,-41.5],[172,-40.5]],
  [[174.5,-41.5],[171,-44.5],[167,-46],[169,-44]],
  [[131,-1],[135,-3.5],[141,-2.6],[147,-6],[150,-10.5],[146,-8],[143,-9],[141,-9],[138,-8],[137,-5],[133,-4]],
  [[95,5.5],[98,4],[104,-1],[106,-5.8],[102,-4],[98,0],[95.5,3]],
  [[109,1.5],[111,2],[115,5],[118,6],[119,1],[116,-4],[111,-3],[109,-1]],
  [[105.5,-6.5],[114.5,-7.7],[114,-8.7],[106,-7.5]],
  [[120,18.5],[122,18.4],[122,14],[124,12.5],[121,13.5],[120,15]],
  [[122,8],[126,9.5],[126,6],[124,6.5]],
  // Giappone, Sri Lanka, Madagascar
  [[130.5,31],[132,34],[135,34],[137,34.8],[140,35],[141,38],[141.5,41.5],[140,40],[139.5,38],[137,37],[136,36],[133,35.5],[131,34.5]],
  [[140,42],[141.5,45.4],[145,43.3],[143,42]],
  [[80,9.7],[82,7.5],[80.5,6],[79.8,8]],
  [[44,-25],[47,-25],[50,-15.5],[49.5,-12],[47,-15],[44,-20]],
  // Antartide (con penisola antartica e rientranze dei mari di Ross e di Weddell)
  [[-180,-78.5],[-160,-78],[-150,-76.5],[-140,-75.5],[-125,-74],[-110,-74.5],[-100,-73.5],[-90,-72.5],[-80,-73],[-72,-72],[-68,-70],[-64,-67],[-62,-64.5],[-57,-63.3],[-58,-64.5],[-61,-66],[-62,-68],[-66,-71],[-62,-73],[-60,-75.5],[-50,-78],[-40,-78],[-32,-77.5],[-28,-75],[-20,-72.5],[-10,-71],[0,-70],[10,-70],[20,-69.5],[30,-69.5],[40,-68.5],[50,-67],[60,-67.5],[69,-68],[70,-69.5],[75,-69.5],[80,-67.5],[90,-66],[100,-66.5],[110,-66],[120,-66.5],[130,-66],[140,-66.7],[150,-69],[160,-70.5],[165,-72],[170,-72],[163,-77],[170,-78],[180,-78.5],[180,-90],[-180,-90]]
];
// Mari interni disegnati sopra la terra (Nero, Caspio, Golfo Persico)
const MARI = [
  [[28,41.2],[28,43.5],[29.5,45.5],[31,46.5],[33,46],[35,45],[37.5,47],[39.5,46.5],[41.5,42],[38,41],[33,42],[29,41.2]],
  [[47,44],[51,47],[53,45],[53.5,40],[54,37],[50.5,37],[49,40],[47.5,42]],
  [[48,30],[50,30],[52,28],[55,26],[56.5,26.5],[54,24],[51.5,24.5],[50.5,26],[49,28]]
];
TERRE[TERRE.length - 1].senzaBordo = true; TERRE[TERRE.length - 1].bianco = true;   // Antartide: il suo contorno include la linea del cambio di data, che non va tratteggiata
const ROMA = [12.5, 41.9];

function iniziaGlobo() {
  const canvas = document.getElementById("globo");
  const ctx = canvas.getContext("2d");
  const C = canvas.width / 2, R = C - 24;
  const CENTRO = { lon: 12, lat: 42 };            // punto di vista sull'Europa
  const vista = { lon: CENTRO.lon, lat: CENTRO.lat };
  const ridotto = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let trascina = false, mosso = 0, ultimo = null;

  // proietta [lon, lat] sulla sfera; ritorna x, y (da -1 a 1) e se è sul lato visibile
  function proietta(lon, lat, lon0, lat0) {
    const l = (lon - lon0) * Math.PI / 180, f = lat * Math.PI / 180, f0 = lat0 * Math.PI / 180;
    const cosc = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l);
    let x = Math.cos(f) * Math.sin(l);
    let y = Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l);
    let visibile = cosc > 0;
    if (!visibile) { const n = Math.hypot(x, y) || 1; x /= n; y /= n; }   // punti nascosti: li schiacciamo sul bordo
    return { x: C + R * x, y: C - R * y, v: visibile };
  }

  // Orientamento del poligono (+1 antiorario, -1 orario) sulla carta lon/lat: serve a sapere da che parte sta l'interno.
  function orientamento(punti) {
    if (punti.__o) return punti.__o;
    let a = 0;
    for (let i = 0; i < punti.length; i++) {
      const p = punti[i], q = punti[(i + 1) % punti.length];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return (punti.__o = a >= 0 ? 1 : -1);
  }

  // Traccia un poligono ritagliato sull'emisfero visibile. I tratti del contorno che stanno davanti al globo
  // vengono collegati lungo il bordo del disco (limbo): da ogni punto di uscita si percorre il bordo, nel verso
  // dell'orientamento del poligono, fino al primo punto di rientro. Così il riempimento non esce mai dal disco.
  function tracciaPoligono(punti, lon0, lat0) {
    const l0 = lon0 * Math.PI / 180, f0 = lat0 * Math.PI / 180;
    const sf0 = Math.sin(f0), cf0 = Math.cos(f0), DUEPI = 2 * Math.PI;
    // 1) punti del contorno (infittiti) come vettori nel sistema della vista: x destra, y alto, z verso chi guarda
    let V = [];
    for (let i = 0; i < punti.length; i++) {
      const a = punti[i], b = punti[(i + 1) % punti.length];
      const passi = Math.max(1, Math.ceil(Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) / 2));
      for (let s = 0; s < passi; s++) {
        const f = (a[1] + (b[1] - a[1]) * s / passi) * Math.PI / 180;
        const l = (a[0] + (b[0] - a[0]) * s / passi) * Math.PI / 180 - l0;
        V.push([Math.cos(f) * Math.sin(l),
                cf0 * Math.sin(f) - sf0 * Math.cos(f) * Math.cos(l),
                sf0 * Math.sin(f) + cf0 * Math.cos(f) * Math.cos(l)]);
      }
    }
    ctx.beginPath();
    const P = function (x, y) { return [C + R * x, C - R * y]; };
    const nascosto = V.findIndex(function (v) { return v[2] <= 0; });
    if (nascosto < 0) {                       // tutto davanti: poligono intero
      V.forEach(function (v, i) { const p = P(v[0], v[1]); if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); });
      ctx.closePath(); return;
    }
    if (V.every(function (v) { return v[2] <= 0; })) return;   // tutto dietro: niente da disegnare
    V = V.slice(nascosto).concat(V.slice(0, nascosto));        // si parte da un punto nascosto
    // 2) tratti visibili: ciascuno va da un punto di entrata a uno di uscita sul limbo
    const tratti = [];
    let corrente = null;
    const incrocio = function (a, b) {
      const t = a[2] / (a[2] - b[2]);
      const x = a[0] + t * (b[0] - a[0]), y = a[1] + t * (b[1] - a[1]), n = Math.hypot(x, y) || 1;
      return [x / n, y / n];
    };
    for (let k = 0; k < V.length; k++) {
      const a = V[k], b = V[(k + 1) % V.length];
      if (a[2] <= 0 && b[2] > 0) { const c = incrocio(a, b); corrente = { pts: [c, b], ent: Math.atan2(c[1], c[0]) }; }
      else if (a[2] > 0 && b[2] > 0 && corrente) corrente.pts.push(b);
      else if (a[2] > 0 && b[2] <= 0 && corrente) {
        const c = incrocio(a, b); corrente.pts.push(c); corrente.usc = Math.atan2(c[1], c[0]); tratti.push(corrente); corrente = null;
      }
    }
    if (!tratti.length) return;
    const verso = orientamento(punti);
    // distanza lungo il limbo da un angolo all'altro, nel verso dato (0 .. 2π)
    const avanti = function (da, a) { let d = (a - da) * verso; d -= DUEPI * Math.floor(d / DUEPI); return d; };
    // 3) si collega ogni uscita al rientro più vicino lungo il limbo
    tratti.forEach(function (t) {
      let best = null, bd = 1e9;
      tratti.forEach(function (u) { const d = avanti(t.usc, u.ent); if (d < bd) { bd = d; best = u; } });
      t.next = best; t.arco = bd;
    });
    tratti.forEach(function (t) { t.fatto = false; });
    tratti.forEach(function (t0) {
      if (t0.fatto) return;
      let t = t0, primo = true;
      do {
        t.fatto = true;
        t.pts.forEach(function (c) { const p = P(c[0], c[1]); if (primo) { ctx.moveTo(p[0], p[1]); primo = false; } else ctx.lineTo(p[0], p[1]); });
        const n = Math.max(1, Math.ceil(t.arco / 0.05));
        for (let j = 1; j < n; j++) { const ang = t.usc + verso * t.arco * j / n; const p = P(Math.cos(ang), Math.sin(ang)); ctx.lineTo(p[0], p[1]); }
        t = t.next;
      } while (t && !t.fatto);
      ctx.closePath();
    });
  }

  function disegna(t) {
    const sway = ridotto || trascina ? 0 : Math.sin(t / 3500) * 9;
    const lon0 = vista.lon + sway, lat0 = vista.lat;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // alone luminoso
    const alone = ctx.createRadialGradient(C, C, R * 0.95, C, C, R * 1.05);
    alone.addColorStop(0, "rgba(120,180,255,.55)"); alone.addColorStop(1, "rgba(120,180,255,0)");
    ctx.fillStyle = alone; ctx.beginPath(); ctx.arc(C, C, R * 1.05, 0, 7); ctx.fill();

    // oceano
    const mare = ctx.createRadialGradient(C * 0.8, C * 0.7, R * 0.1, C, C, R);
    mare.addColorStop(0, "#3d86d6"); mare.addColorStop(0.6, "#1d5aa6"); mare.addColorStop(1, "#0a2a5a");
    ctx.fillStyle = mare; ctx.beginPath(); ctx.arc(C, C, R, 0, 7); ctx.fill();

    ctx.save();
    ctx.beginPath(); ctx.arc(C, C, R, 0, 7); ctx.clip();

    // reticolo di meridiani e paralleli
    ctx.strokeStyle = "rgba(255,255,255,.13)"; ctx.lineWidth = 1.2;
    for (let lon = -180; lon < 180; lon += 15) {
      ctx.beginPath(); let inizio = true;
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = proietta(lon, lat, lon0, lat0);
        if (!p.v) { inizio = true; continue; }
        if (inizio) { ctx.moveTo(p.x, p.y); inizio = false; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (let lat = -75; lat <= 75; lat += 15) {
      ctx.beginPath(); let inizio = true;
      for (let lon = -180; lon <= 180; lon += 3) {
        const p = proietta(lon, lat, lon0, lat0);
        if (!p.v) { inizio = true; continue; }
        if (inizio) { ctx.moveTo(p.x, p.y); inizio = false; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // terre
    ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1.5;
    TERRE.forEach(function (p) { ctx.fillStyle = p.bianco ? "#ffffff" : "#8fb37a"; tracciaPoligono(p, lon0, lat0); ctx.fill(); if (!p.senzaBordo) ctx.stroke(); });
    ctx.fillStyle = "#1d5aa6"; ctx.strokeStyle = "rgba(255,255,255,.35)";
    MARI.forEach(function (p) { tracciaPoligono(p, lon0, lat0); ctx.fill(); ctx.stroke(); });

    // marcatore sull'Italia
    const it = proietta(ROMA[0], ROMA[1], lon0, lat0);
    if (it.v) {
      const pulsa = (t % 1800) / 1800;
      ctx.strokeStyle = "rgba(230,201,120," + (1 - pulsa) + ")"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(it.x, it.y, 14 + pulsa * 46, 0, 7); ctx.stroke();
      ctx.fillStyle = "#e6c978"; ctx.strokeStyle = "#10203a"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(it.x, it.y, 13, 0, 7); ctx.fill(); ctx.stroke();
      ctx.font = "700 34px Inter, sans-serif"; ctx.fillStyle = "#fff"; ctx.strokeStyle = "rgba(10,20,40,.8)"; ctx.lineWidth = 6;
      ctx.strokeText("ITALIA", it.x + 26, it.y + 56); ctx.fillText("ITALIA", it.x + 26, it.y + 56);
    }

    // luce e ombra per dare volume
    const luce = ctx.createRadialGradient(C * 0.72, C * 0.62, R * 0.05, C, C, R);
    luce.addColorStop(0, "rgba(255,255,255,.28)"); luce.addColorStop(0.45, "rgba(255,255,255,0)");
    luce.addColorStop(1, "rgba(0,10,30,.55)");
    ctx.fillStyle = luce; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function ciclo(t) {
    if (!trascina) {   // dopo il trascinamento il globo torna lentamente sull'Europa
      vista.lon += (CENTRO.lon - vista.lon) * 0.02;
      vista.lat += (CENTRO.lat - vista.lat) * 0.02;
    }
    disegna(t);
    requestAnimationFrame(ciclo);
  }

  // trascinamento con mouse o dito; un semplice click apre la mappa
  canvas.addEventListener("pointerdown", function (e) {
    trascina = true; mosso = 0; ultimo = { x: e.clientX, y: e.clientY };
    canvas.classList.add("drag"); canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!trascina) return;
    const k = 0.35 * (canvas.width / canvas.getBoundingClientRect().width) / (R / C);
    const dx = e.clientX - ultimo.x, dy = e.clientY - ultimo.y;
    mosso += Math.abs(dx) + Math.abs(dy);
    vista.lon -= dx * k * 0.35; vista.lat = Math.max(-70, Math.min(70, vista.lat + dy * k * 0.35));
    ultimo = { x: e.clientX, y: e.clientY };
  });
  function fine() { trascina = false; canvas.classList.remove("drag"); }
  canvas.addEventListener("pointerup", function () {
    const eraClick = mosso < 6; fine();
    if (eraClick) location.href = window.ijUrl("mappa.html");
  });
  canvas.addEventListener("pointercancel", fine);
  canvas.tabIndex = 0;
  canvas.addEventListener("keydown", function (e) { if (e.key === "Enter") location.href = window.ijUrl("mappa.html"); });

  requestAnimationFrame(ciclo);
}

costruisciRighe();
iniziaLingua();
iniziaGlobo();
