// ===== TEMA: modalità giorno / notte a scelta dell'utente =====
// Il tema è scritto nell'attributo data-tema di <html>.
// Aprendo i file in locale (file://) i browser non conservano in modo affidabile né localStorage
// né window.name tra una pagina e l'altra, quindi il tema "viaggia" nell'indirizzo:
// ogni link interno riceve ?tema=notte (solo in modalità notte).  Aprendo il sito da zero, il tema è sempre "giorno".
// Questo file va caricato nell'<head>, così il tema giusto è applicato prima che la pagina compaia.
(function () {
  const radice = document.documentElement;

  function dallUrl() {
    const v = new URLSearchParams(location.search).get("tema");
    return v === "notte" || v === "giorno" ? v : null;
  }
  // Nessuna memoria permanente: ogni volta che si apre il sito si parte dalla modalità giorno.
  function dalloStorage() { return null; }
  function salva() {}

  // l'indirizzo ha la precedenza (è ciò che ha appena scelto l'utente), e senza indirizzo si parte da "giorno"
  let tema = dallUrl() || dalloStorage() || "giorno";
  salva(tema);
  radice.setAttribute("data-tema", tema);

  // Lingua: anche lei viaggia nell'indirizzo (?lang=en). Senza parametro il sito è in italiano.
  const lingua0 = new URLSearchParams(location.search).get("lang") === "en" ? "en" : "it";
  radice.lang = lingua0;

  // Aggiunge (o toglie) ?tema=notte a un indirizzo interno del sito. Gli altri indirizzi restano uguali.
  function conTema(href) {
    if (!href || /^(#|mailto:|tel:|javascript:|https?:|\/\/)/i.test(href)) return href;
    const m = /^([^?#]*)(\?[^#]*)?(#.*)?$/.exec(href);
    if (!m) return href;
    const q = new URLSearchParams(m[2] || "");
    q.delete("tema"); q.delete("lang");
    if (radice.getAttribute("data-tema") === "notte") q.set("tema", "notte");
    if (radice.lang === "en") q.set("lang", "en");
    const s = q.toString();
    return m[1] + (s ? "?" + s : "") + (m[3] || "");
  }
  // per il codice che cambia pagina con location.href = ...
  window.ijUrl = conTema;
  // aggiorna l'indirizzo della pagina corrente (senza ricaricarla), ad esempio dopo un cambio di lingua
  window.ijAggiornaUrl = function () {
    try { history.replaceState(history.state, "", conTema(location.pathname.split("/").pop() + location.search + location.hash)); } catch (e) {}
  };

  // ogni click su un link interno porta con sé il tema scelto
  document.addEventListener("click", function (e) {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.defaultPrevented) return;
    const nuovo = conTema(a.getAttribute("href"));
    if (nuovo !== a.getAttribute("href")) a.setAttribute("href", nuovo);
  }, true);

  // tornando indietro con il tasto del browser la pagina può essere riproposta com'era: si riallinea al tema ricordato
  window.addEventListener("pageshow", function () {
    const t = dallUrl() || dalloStorage();
    if (t && t !== radice.getAttribute("data-tema")) { radice.setAttribute("data-tema", t); }
  });

  const ETICHETTE = {
    it: { giorno: "Modalità giorno", notte: "Modalità notte" },
    en: { giorno: "Day mode", notte: "Night mode" }
  };

  function aggiorna(bottone) {
    const lingua = radice.lang === "en" ? "en" : "it";
    // il bottone mostra la modalità in cui si passa cliccando
    const prossimo = radice.getAttribute("data-tema") === "notte" ? "giorno" : "notte";
    bottone.querySelector(".tema-icona").textContent = prossimo === "notte" ? "☾" : "☀";
    bottone.querySelector(".tema-txt").textContent = ETICHETTE[lingua][prossimo];
    bottone.setAttribute("aria-label", ETICHETTE[lingua][prossimo]);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tema-btn";
    b.innerHTML = '<span class="tema-icona" aria-hidden="true"></span><span class="tema-txt"></span>';

    // nelle pagine con barra di navigazione il bottone sta nella barra, altrimenti resta libero in alto
    const barra = document.querySelector(".topbar, .mappa-top");
    if (barra) barra.appendChild(b);
    else document.body.appendChild(b);

    b.addEventListener("click", function () {
      const nuovo = radice.getAttribute("data-tema") === "notte" ? "giorno" : "notte";
      radice.setAttribute("data-tema", nuovo);
      salva(nuovo);
      window.ijAggiornaUrl();
      aggiorna(b);
    });

    aggiorna(b);
    // se in home si cambia lingua, cambia anche la scritta del bottone
    new MutationObserver(function () { aggiorna(b); }).observe(radice, { attributes: true, attributeFilter: ["lang"] });
  });
})();
