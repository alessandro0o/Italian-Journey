// ===== MAPPA: cerchi cliccabili sui capoluoghi, anteprima al passaggio del mouse, ricerca =====
const NS = "http://www.w3.org/2000/svg";
const citta = Object.values(window.DATI_CITTA);
const perRegione = {};                      // id della regione nell'SVG -> città
citta.forEach(function (c) { perRegione[c.idMappa] = c; });

const elFoto = document.getElementById("anteprimaFoto");
const elNome = document.getElementById("anteprimaNome");
const elRegione = document.getElementById("anteprimaRegione");

function vai(c) { location.href = window.ijUrl("selezione.html?citta=" + c.id); }

function mostra(c) {
  elNome.textContent = c.nome;
  elRegione.textContent = c.regione;
  // sostituiamo il contenuto del box foto (il box resta lo stesso)
  const nuovo = creaSegnaposto(c.nome, c.foto.mappa);
  elFoto.className = nuovo.className;
  elFoto.replaceChildren.apply(elFoto, Array.from(nuovo.childNodes));
  document.querySelectorAll(".attiva").forEach(function (e) { e.classList.remove("attiva"); });
  const reg = document.getElementById(c.idMappa); if (reg) reg.classList.add("attiva");
  const cer = document.getElementById("c-" + c.id); if (cer) cer.classList.add("attiva");
}

// riquadro iniziale (nessuna regione selezionata): foto della bandiera italiana
(function () {
  const iniziale = creaSegnaposto("Italia", "img/italia.jpg");
  elFoto.className = iniziale.className;
  elFoto.replaceChildren.apply(elFoto, Array.from(iniziale.childNodes));
})();

// cerchi sui capoluoghi
const gruppo = document.getElementById("cerchi");
citta.forEach(function (c) {
  const cerchio = document.createElementNS(NS, "circle");
  cerchio.setAttribute("cx", c.x); cerchio.setAttribute("cy", c.y); cerchio.setAttribute("r", 11);
  cerchio.setAttribute("class", "cerchio"); cerchio.id = "c-" + c.id;
  cerchio.setAttribute("tabindex", "0"); cerchio.setAttribute("role", "link");
  cerchio.setAttribute("aria-label", c.nome + ", " + c.regione);
  cerchio.addEventListener("mouseenter", function () { mostra(c); });
  cerchio.addEventListener("focus", function () { mostra(c); });
  cerchio.addEventListener("click", function () { vai(c); });
  cerchio.addEventListener("keydown", function (e) { if (e.key === "Enter") vai(c); });
  gruppo.appendChild(cerchio);
});

// anche cliccando la regione si apre la città
document.querySelectorAll(".regione").forEach(function (r) {
  const c = perRegione[r.id];
  if (!c) return;
  r.addEventListener("mouseenter", function () { mostra(c); });
  r.addEventListener("click", function () { vai(c); });
});

// barra di ricerca (ignora maiuscole e accenti)
function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ']/g, ""); }
const campo = document.getElementById("cerca");
const esiti = document.getElementById("esiti");
function trova(testo) {
  const q = norm(testo.trim());
  if (!q) return [];
  return citta.filter(function (c) { return norm(c.nome).includes(q) || norm(c.regione).includes(q); }).slice(0, 6);
}
campo.addEventListener("input", function () {
  const r = trova(campo.value);
  esiti.innerHTML = "";
  esiti.hidden = r.length === 0;
  r.forEach(function (c) {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = c.nome + " (" + c.regione + ")";
    b.addEventListener("mouseenter", function () { mostra(c); });
    b.addEventListener("click", function () { vai(c); });
    esiti.appendChild(b);
  });
  if (r.length) mostra(r[0]);
});
campo.addEventListener("keydown", function (e) {
  if (e.key === "Enter") { const r = trova(campo.value); if (r.length) vai(r[0]); }
});
