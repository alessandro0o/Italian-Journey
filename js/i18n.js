// ===== LINGUA: italiano / inglese per mappa, selezione, città e quiz =====
// La lingua sta nell'indirizzo (?lang=en, gestito da tema.js) e in <html lang>.
// Questo file va caricato DOPO dati_citta.js e dati_citta_en.js e PRIMA di common.js e dello script della pagina.
(function () {
  const radice = document.documentElement;
  const EN = radice.lang === "en";

  // ---------- testi dell'interfaccia ----------
  const T = {
    it: {
      p_homeH: '<span class="pref">Torna alla </span><span class="cap">home</span>',
      p_back: "Torna alla", p_mappa: "mappa", p_home: "home", p_sel: '<span class="pref2">selezione </span>contenuti', quiz_h: "QUIZ",
      lingua: "ENG", linguaAria: "Switch to English",
      avviso: "Traduzione inglese in arrivo: per ora il contenuto di questa città è disponibile solo in italiano.",
      mappaTitolo: "Mappa d'Italia - Italian Journey",
      tornaHome: "Torna alla home",
      cerca: "Cerca una città o una regione", cercaAria: "Barra di ricerca",
      anteprimaNome: "Italia", anteprimaReg: "Scegli un capoluogo", mappaAria: "Mappa dell'Italia",
      italia: "Italia", bandiera: "La bandiera italiana",
      selTitolo: "Scegli un argomento - Italian Journey",
      tornaMappa: "Torna alla mappa", tornaSel: "Torna alla selezione contenuti",
      storia: "Storia", cultura: "Cultura", eventi: "Eventi",
      storiaSub: "Le origini e le tappe principali", culturaSub: "Musei, palazzi e monumenti",
      eventiSub: "Feste, festival e luoghi celebri", quizSub: "Metti alla prova ciò che sai", quiz: "Quiz",
      cittaTitolo: "Città - Italian Journey",
      daVisitare: "Da visitare", eventiLuoghi: "Eventi e luoghi celebri", faiQuiz: "Fai il quiz",
      quizDi: "Quiz su ", quizIstr: ": scegli una risposta per ogni domanda e poi premi \"Termina quiz\".",
      termina: "Termina quiz",
      senzaRisp1: "Hai lasciato ", senzaRisp2: " domande senza risposta. Vuoi terminare lo stesso?",
      esatta: "Risposta esatta!", corretta: "Risposta corretta: ",
      finito: "Quiz terminato", perfetto1: "Perfetto, conosci bene ", perfetto2: "!",
      riprova: "Rivedi le risposte e riprova quando vuoi.", rivedi: "Rivedi le risposte", tornaCitta: "Torna alla città"
    },
    en: {
      p_homeH: '<span class="pref">Back to </span><span class="cap">home</span>',
      p_back: "Back to", p_mappa: "map", p_home: "home", p_sel: '<span class="pref2">content </span>selection', quiz_h: "QUIZ",
      lingua: "ITA", linguaAria: "Passa all'italiano",
      avviso: "English translation coming soon: for now this city's content is only available in Italian.",
      mappaTitolo: "Map of Italy - Italian Journey",
      tornaHome: "Back to home",
      cerca: "Search for a city or a region", cercaAria: "Search bar",
      anteprimaNome: "Italy", anteprimaReg: "Choose a regional capital", mappaAria: "Map of Italy",
      italia: "Italy", bandiera: "The Italian flag",
      selTitolo: "Choose a topic - Italian Journey",
      tornaMappa: "Back to map", tornaSel: "Back to content selection",
      storia: "History", cultura: "Culture", eventi: "Events",
      storiaSub: "The origins and main milestones", culturaSub: "Museums, palaces and monuments",
      eventiSub: "Festivals, celebrations and famous places", quizSub: "Test what you know", quiz: "Quiz",
      cittaTitolo: "City - Italian Journey",
      daVisitare: "Places to visit", eventiLuoghi: "Events and famous places", faiQuiz: "Take the quiz",
      quizDi: "Quiz on ", quizIstr: ": choose one answer for each question, then press \"Finish quiz\".",
      termina: "Finish quiz",
      senzaRisp1: "You left ", senzaRisp2: " questions unanswered. Do you want to finish anyway?",
      esatta: "Correct answer!", corretta: "Correct answer: ",
      finito: "Quiz finished", perfetto1: "Perfect, you know ", perfetto2: " very well!",
      riprova: "Review your answers and try again whenever you like.", rivedi: "Review answers", tornaCitta: "Back to the city"
    }
  };
  const D = T[EN ? "en" : "it"];
  window.ijT = function (k) { return D[k]; };
  window.ijInglese = EN;

  // ---------- nomi inglesi di città e regioni ----------
  const NOMI = {
    aosta: ["Aosta", "Aosta Valley"], torino: ["Turin", "Piedmont"], milano: ["Milan", "Lombardy"],
    trento: ["Trento", "Trentino-South Tyrol"], venezia: ["Venice", "Veneto"], trieste: ["Trieste", "Friuli-Venezia Giulia"],
    genova: ["Genoa", "Liguria"], bologna: ["Bologna", "Emilia-Romagna"], firenze: ["Florence", "Tuscany"],
    perugia: ["Perugia", "Umbria"], ancona: ["Ancona", "Marche"], roma: ["Rome", "Lazio"],
    laquila: ["L'Aquila", "Abruzzo"], campobasso: ["Campobasso", "Molise"], napoli: ["Naples", "Campania"],
    bari: ["Bari", "Apulia"], potenza: ["Potenza", "Basilicata"], catanzaro: ["Catanzaro", "Calabria"],
    palermo: ["Palermo", "Sicily"], cagliari: ["Cagliari", "Sardinia"]
  };

  // In inglese i dati delle città vengono sostituiti da quelli tradotti (dati_citta_en.js), dove esistono.
  // Le città non ancora tradotte restano in italiano e hanno il segno _senzaEn.
  if (EN && window.DATI_CITTA) {
    Object.keys(window.DATI_CITTA).forEach(function (id) {
      const c = window.DATI_CITTA[id];
      c.nomeIt = c.nome; c.regioneIt = c.regione;
      if (NOMI[id]) { c.nome = NOMI[id][0]; c.regione = NOMI[id][1]; }
      const t = window.DATI_CITTA_EN && window.DATI_CITTA_EN[id];
      if (t) {
        c.storia = t.storia; c.cultura = t.cultura; c.eventi = t.eventi; c.quiz = t.quiz;
        c.didascalie = t.didascalie || c.didascalie;
      } else {
        c._senzaEn = true;
      }
    });
  }

  // ---------- testi fissi delle pagine ----------
  function applica() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = D[el.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = D[el.dataset.i18nHtml]; });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", D[el.dataset.i18nAria]); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", D[el.dataset.i18nPh]); });
    const tt = document.querySelector("title[data-i18n-title]");
    if (tt) tt.textContent = D[tt.dataset.i18nTitle];
  }

  // ---------- pulsante lingua nelle barre ----------
  function pulsante() {
    const barra = document.querySelector(".topbar, .mappa-top");
    if (!barra) return;     // il quiz non ha barra: la lingua non si cambia durante le domande
    const b = document.createElement("button");
    b.type = "button"; b.className = "tema-btn lang-btn";
    b.textContent = D.lingua;
    b.setAttribute("aria-label", D.linguaAria);
    b.setAttribute("lang", EN ? "it" : "en");
    b.addEventListener("click", function () {
      radice.lang = EN ? "it" : "en";
      location.href = window.ijUrl(location.pathname.split("/").pop() + location.search + location.hash);
    });
    const t = barra.querySelector(".tema-btn");
    if (t) barra.insertBefore(b, t); else barra.appendChild(b);
  }

  document.addEventListener("DOMContentLoaded", function () { applica(); pulsante(); });
})();
