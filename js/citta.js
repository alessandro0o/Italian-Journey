// ===== CITTA: riempie la pagina con i dati della città scelta (dati_citta.json) =====
const c = richiediCitta();

function elenco(luoghi) {
  const ul = document.createElement("ul");
  luoghi.forEach(function (l) {
    const li = document.createElement("li");
    const s = document.createElement("strong");
    s.textContent = l.nome;
    li.appendChild(s);
    li.appendChild(document.createTextNode(": " + l.descrizione));
    ul.appendChild(li);
  });
  return ul;
}

function riempi(idBox, sezione, titoloElenco) {
  const box = document.getElementById(idBox);
  // più paragrafi: nel testo, vanno a capo con una riga vuota o con un "a capo"
  sezione.testo.split(/\n+/).forEach(function (par) {
    // una riga che inizia con "## " è un titoletto di sezione, le altre sono paragrafi
    const titolo = par.indexOf("## ") === 0;
    const p = document.createElement(titolo ? "h3" : "p");
    p.textContent = titolo ? par.slice(3) : par;
    box.appendChild(p);
  });
  if (sezione.luoghi) {
    const h = document.createElement("h3");
    h.textContent = titoloElenco;
    box.appendChild(h);
    box.appendChild(elenco(sezione.luoghi));
  }
}

if (c) {
  document.title = c.nome + " - Italian Journey";
  document.getElementById("nome").textContent = c.nome;
  document.getElementById("regione").textContent = c.regione;
  riempi("testoStoria", c.storia);
  riempi("testoCultura", c.cultura, "Da visitare");
  riempi("testoEventi", c.eventi, "Eventi e luoghi celebri");
  document.getElementById("fotoStoria").appendChild(creaSegnaposto(c.nome + " - storia", c.foto.storia, true));
  document.getElementById("fotoCultura").appendChild(creaSegnaposto(c.nome + " - cultura", c.foto.cultura, true));
  document.getElementById("bSelezione").href = "selezione.html?citta=" + c.id;
  document.getElementById("bQuiz").href = "quiz.html?citta=" + c.id;
}
