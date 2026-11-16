// ===== QUIZ: domande a risposta multipla, uscita solo con "Termina quiz" =====
const c = richiediCitta();
const modulo = document.getElementById("modulo");
let finito = false;

if (c) {
  document.title = ijT("quizDi") + c.nome + " - Italian Journey";
  document.getElementById("sottotitolo").textContent =
    ijT("quizDi") + c.nome + ijT("quizIstr");
  if (c._senzaEn) {   // città non ancora tradotta: domande in italiano
    modulo.lang = "it";
    document.getElementById("sottotitolo").textContent += " " + ijT("avviso");
  }

  c.quiz.forEach(function (q, i) {
    const f = document.createElement("fieldset");
    f.className = "domanda";
    const l = document.createElement("legend");
    l.textContent = (i + 1) + ". " + q.domanda;
    f.appendChild(l);
    q.risposte.forEach(function (r, k) {
      const lab = document.createElement("label");
      const inp = document.createElement("input");
      inp.type = "radio"; inp.name = "d" + i; inp.value = k;   // una sola risposta per domanda
      lab.appendChild(inp);
      lab.appendChild(document.createTextNode(r));
      f.appendChild(lab);
    });
    modulo.appendChild(f);
  });

  // --- Blocco dell'uscita durante il quiz ---
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function () {
    if (!finito) history.pushState(null, "", location.href);   // il tasto Indietro non fa uscire
  });
  window.addEventListener("beforeunload", function (e) {
    if (!finito) { e.preventDefault(); e.returnValue = ""; }
  });

  document.getElementById("termina").addEventListener("click", termina);
}

function termina() {
  const fieldsets = modulo.querySelectorAll(".domanda");
  let punti = 0, senzaRisposta = 0;
  c.quiz.forEach(function (q, i) {
    const scelta = modulo.querySelector('input[name="d' + i + '"]:checked');
    if (!scelta) senzaRisposta++;
  });
  if (senzaRisposta > 0 && !confirm(ijT("senzaRisp1") + senzaRisposta + ijT("senzaRisp2"))) return;

  finito = true;
  c.quiz.forEach(function (q, i) {
    const scelta = modulo.querySelector('input[name="d' + i + '"]:checked');
    const ok = scelta && Number(scelta.value) === q.corretta;
    if (ok) punti++;
    fieldsets[i].classList.add(ok ? "giusta" : "sbagliata");
    const esito = document.createElement("p");
    esito.className = "esito";
    esito.textContent = ok ? ijT("esatta") : ijT("corretta") + q.risposte[q.corretta];
    fieldsets[i].appendChild(esito);
    fieldsets[i].querySelectorAll("input").forEach(function (inp) { inp.disabled = true; });
  });

  // Dopo "Termina quiz" si può tornare alla scheda della città
  document.getElementById("termina").hidden = true;
  const box = document.createElement("div");
  box.className = "risultato";
  box.innerHTML = '<div class="scheda" role="dialog" aria-modal="true" aria-labelledby="titRis">' +
    '<h2 id="titRis">' + ijT("finito") + '</h2><div class="punti">' + punti + ' / ' + c.quiz.length + '</div>' +
    '<p>' + (punti === c.quiz.length ? ijT("perfetto1") + c.nome + ijT("perfetto2") : ijT("riprova")) + '</p>' +
    '<button class="btn" id="rivedi" type="button">' + ijT("rivedi") + '</button> ' +
    '<a class="btn primary" href="selezione.html?citta=' + c.id + '">' + ijT("tornaCitta") + '</a></div>';
  document.body.appendChild(box);
  document.getElementById("rivedi").addEventListener("click", function () {
    box.remove();
    const a = document.createElement("a");
    a.className = "btn primary fine"; a.style.textAlign = "center";
    a.href = window.ijUrl("selezione.html?citta=" + c.id); a.textContent = ijT("tornaCitta");
    document.querySelector(".quiz-col").appendChild(a);
    window.scrollTo(0, 0);
  });
}
