// Funzioni comuni a tutte le pagine.
// I dati stanno in dati_citta.json; la copia dati_citta.js (stessi dati) viene caricata con <script>
// perché aprendo le pagine in locale (file://) il browser non permette fetch() sul file .json.

function idCittaDaUrl() {
  return new URLSearchParams(location.search).get("citta");
}

function cittaCorrente() {
  const id = idCittaDaUrl();
  return (window.DATI_CITTA && window.DATI_CITTA[id]) || null;
}

// Se la città nell'indirizzo non esiste, torna alla mappa
function richiediCitta() {
  const c = cittaCorrente();
  if (!c) {
    location.replace(window.ijUrl ? window.ijUrl("mappa.html") : "mappa.html");
    return null;
  }
  return c;
}

// Didascalia di una foto: sta nel JSON ("didascalie", per percorso del file). La foto dell'Italia è fissa.
function didascaliaDi(src) {
  if (src === "img/italia.jpg") return window.ijT ? window.ijT("bandiera") : "La bandiera italiana";
  const tutte = Object.values(window.DATI_CITTA || {});
  for (let i = 0; i < tutte.length; i++) {
    const t = tutte[i].didascalie && tutte[i].didascalie[src];
    if (t) return t;
  }
  return "";
}

// Crea un segnaposto foto. Quando avrete le immagini, basta mettere il percorso nel JSON
// (campo "foto") oppure in FOTO_HOME in home.js, ad esempio "img/roma.jpg".
// Con conDescrizione = true (solo pagina città) si aggiunge la didascalia visibile in basso a sinistra,
// che è anche la descrizione (alt) letta dai lettori di schermo.
function creaSegnaposto(etichetta, src, conDescrizione) {
  const d = document.createElement("div");
  d.className = "ph";
  if (src) {
    // sfondo sfocato (riempie il riquadro) + foto intera sopra: nessuna foto viene tagliata
    d.classList.add("con-foto");
    const sfondo = document.createElement("img");
    sfondo.src = src;
    sfondo.alt = "";
    sfondo.setAttribute("aria-hidden", "true");   // lo sfondo sfocato è solo decorativo
    sfondo.className = "sfondo";
    const img = document.createElement("img");
    img.src = src;
    img.alt = etichetta;
    img.className = "primo-piano";
    d.appendChild(sfondo);
    d.appendChild(img);
    const testo = conDescrizione ? didascaliaDi(src) : "";
    if (testo) {
      img.alt = testo;
      const did = document.createElement("span");
      did.className = "did";
      did.textContent = testo;
      did.setAttribute("aria-hidden", "true");   // il testo è già letto come descrizione (alt) dell'immagine
      d.appendChild(did);
    }
  } else {
    d.innerHTML = "<div>Foto: " + etichetta + "<small>(segnaposto)</small></div>";
  }
  return d;
}
