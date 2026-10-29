/* ============================================================
   SCRIPT.JS — lógica do convite. Os textos vêm de config.js.
   Sem dependências, sem rede, sem armazenamento de respostas.
   ============================================================ */
(() => {
  "use strict";

  const CFG = window.CONVITE_CONFIG;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduzMovimento = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const TOTAL_CAPITULOS = 6;

  // ---------- Utilidades ----------
  const get = (path, fallback = "") => {
    const v = path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), CFG);
    return v == null ? fallback : v;
  };
  const limpo = (v) => (typeof v === "string" ? v.trim() : "");
  const nomeVisitante = () => limpo(CFG.nomeVisitante);
  const nomeAutor = () => limpo(CFG.nomeAutor);

  const el = (tag, props = {}, children = []) => {
    const n = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    });
    [].concat(children).forEach((c) => c && n.append(c));
    return n;
  };
  const icone = (id) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `#i-${id}`);
    svg.append(use);
    return svg;
  };
  const paragrafos = (container, lista, prefixo) => {
    container.replaceChildren();
    if (prefixo) container.append(el("p", { text: prefixo }));
    (lista || []).forEach((t) => { if (limpo(t)) container.append(el("p", { text: t })); });
  };

  const status = (msg) => { const s = $("#status"); if (s) s.textContent = msg; };

  // ---------- Estado ----------
  const estado = {
    passo: 0,
    quiz: { i: 0, respostas: [] },
    escolha: null // { modo: 'aceito' | 'detalhes' | 'depois', id, titulo, sugestao }
  };

  // ---------- Cores vindas do config ----------
  function aplicarCores() {
    const c = CFG.cores || {};
    const map = { papel: "--papel", papelClaro: "--papel-claro", vinho: "--vinho", rosa: "--rosa", marrom: "--marrom", tinta: "--tinta" };
    Object.entries(map).forEach(([k, v]) => { if (limpo(c[k])) document.documentElement.style.setProperty(v, c[k]); });
  }

  // ---------- Textos estáticos (data-bind) ----------
  function aplicarTextos() {
    $$("[data-bind]").forEach((n) => {
      const v = get(n.dataset.bind);
      if (limpo(v)) n.textContent = v;
    });
    if (limpo(CFG.tituloSite)) document.title = CFG.tituloSite;

    const para = $("#capaPara");
    if (nomeVisitante()) { para.textContent = `Para ${nomeVisitante()}`; para.hidden = false; }

    paragrafos($("#cap1Texto"), get("capitulo1.paragrafos", []));
    paragrafos($("#conviteTexto"), get("convite.texto", []));

    // Fisioterapia
    const ul = $("#fisioCards");
    get("fisio.cartoes", []).forEach((c) => {
      ul.append(el("li", {}, [
        icone(c.icone || "prancheta"),
        el("div", {}, [el("h3", { text: c.titulo || "" }), el("p", { text: c.texto || "" })])
      ]));
    });

    // Teste
    $("#quizRefazer").textContent = get("teste.refazer", "Refazer o teste");
    $("#quizSeguir").textContent = get("teste.continuar", "Continuar");

    // Carta
    $("#cartaFechar").textContent = get("carta.fecharRotulo", "Fechar a carta");
    $("#cartaSeguir").textContent = get("carta.botao", "Continuar");
    $("#envelopeDica").textContent = get("carta.dica", "Toque no envelope para abrir");
    $("#envelope").setAttribute("aria-controls", "cartaLida");

    // Convite / detalhes
    $("#detalhesVoltar").textContent = get("convite.botaoVoltar", "Voltar");
    $("#detalhesConfirmar").textContent = get("convite.botaoConfirmarDetalhes", "Ver minhas escolhas");
    $("#labelOutro").textContent = get("convite.campoOutroRotulo", "Sua sugestão (opcional)");
    $("#inputOutro").placeholder = get("convite.campoOutroPlaceholder", "");

    // Final (extras)
    $("#btnCuriosidade").textContent = get("final.curiosidadeBotao", "Revelar uma curiosidade");
    $("#curiosidade").textContent = get("final.curiosidade", "");
    $("#finalReiniciar").textContent = get("final.reiniciar", "Ler de novo");
    $("#finalRever").textContent = get("final.detalhes.botaoRevisar", "Rever escolhas");
    $("#clichesTitulo").textContent = get("cliches.titulo", "");
    $("#clichesDica").textContent = get("cliches.dica", "");
    montarCliches();

    // Títulos como alvos de foco
    $$("h1, h2").forEach((h) => h.setAttribute("tabindex", "-1"));
  }

  // ---------- Navegação / páginas ----------
  function titulo(passo) {
    const h = $(`#p${passo} h1, #p${passo} h2`);
    return h ? h.textContent.trim() : "";
  }

  function irPara(passo, { focar = true, historico = true } = {}) {
    if (passo === 6 && !estado.escolha) passo = 5;
    passo = Math.max(0, Math.min(6, passo));
    if (passo === 6) montarFinal();

    $$(".page").forEach((p) => { p.hidden = true; p.classList.remove("is-in"); });
    const alvo = $(`#p${passo}`);
    alvo.hidden = false;
    void alvo.offsetWidth; // reinicia a animação de virar página
    alvo.classList.add("is-in");
    estado.passo = passo;

    // Marcador de livro
    const bm = $("#bookmark");
    bm.hidden = passo === 0;
    if (passo > 0) {
      $("#bookmarkText").textContent = `Capítulo ${passo} de ${TOTAL_CAPITULOS}`;
      const barra = $("#bookmarkBar");
      barra.setAttribute("aria-valuenow", String(passo));
      $("span", barra).style.width = `${(passo / TOTAL_CAPITULOS) * 100}%`;
    }

    window.scrollTo(0, 0);
    if (focar) {
      const h = $("h1, h2", alvo);
      if (h) h.focus({ preventScroll: true });
    }
    status(passo === 0 ? "Capa" : `Capítulo ${passo}: ${titulo(passo)}`);

    if (passo === 2) observarCartoes();
    if (historico) {
      try { history.pushState({ passo }, "", `#cap${passo}`); } catch (_) { /* file:// restrito: ignora */ }
    }
  }

  function observarCartoes() {
    const itens = $$("#fisioCards li");
    if (!("IntersectionObserver" in window) || reduzMovimento()) {
      itens.forEach((li) => li.classList.add("is-vis"));
      return;
    }
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-vis"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    itens.forEach((li, i) => { li.style.transitionDelay = `${Math.min(i, 4) * 60}ms`; io.observe(li); });
  }

  // ---------- Coração discreto ao concluir uma interação ----------
  function coracao(ancora) {
    if (reduzMovimento() || !ancora) return;
    const r = ancora.getBoundingClientRect();
    const h = el("span", { class: "heart-pop", "aria-hidden": "true" }, icone("coracao"));
    h.style.left = `${r.left + r.width / 2 - 10}px`;
    h.style.top = `${r.top - 6}px`;
    document.body.append(h);
    h.addEventListener("animationend", () => h.remove(), { once: true });
    setTimeout(() => h.remove(), 1600);
  }

  // ---------- Teste ----------
  const perguntas = () => get("teste.perguntas", []);

  function renderQuiz(focar = false) {
    const lista = perguntas();
    const { i, respostas } = estado.quiz;
    const q = lista[i];
    if (!q) return;

    $("#quizPasso").textContent = `Pergunta ${i + 1} de ${lista.length}`;
    const dots = $("#quizDots");
    dots.replaceChildren(...lista.map((_, k) => el("span", { class: k <= i ? "on" : "" })));

    const leg = $("#quizPergunta");
    leg.textContent = q.pergunta;
    leg.setAttribute("tabindex", "-1");

    const caixa = $("#quizOpcoes");
    caixa.replaceChildren(...q.opcoes.map((o, k) => {
      const input = el("input", { type: "radio", name: "quiz", value: o.id, id: `q${i}o${k}` });
      if (respostas[i] === o.id) input.checked = true;
      return el("label", { class: "op", for: `q${i}o${k}` }, [
        input,
        el("span", { class: "op__box" }, [el("span", { class: "op__mark" }), el("span", { class: "op__txt", text: o.texto })])
      ]);
    }));

    $("#quizProxima").disabled = !respostas[i];
    $("#quizProxima").textContent = i === lista.length - 1 ? "Ver resultado" : "Próxima";
    const card = $("#quizCard");
    card.classList.remove("is-in"); void card.offsetWidth; card.classList.add("is-in");
    if (focar) leg.focus({ preventScroll: true });
  }

  function mostrarResultado() {
    const frases = get("teste.resultadoFrases", {});
    const itens = estado.quiz.respostas.map((id) => frases[id]).filter(Boolean);
    $("#resTitulo").textContent = get("teste.resultadoTitulo", "Resultado");
    $("#resLista").replaceChildren(...itens.map((t) => el("li", { text: t })));
    $("#resFinal").textContent = get("teste.resultadoFinal", "");
    $("#quiz").hidden = true;
    $("#quizResultado").hidden = false;
    status("Resultado do teste (fictício) exibido");
    const t = $("#resTitulo"); t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true });
    coracao($("#quizSeguir"));
  }

  function reiniciarQuiz() {
    estado.quiz = { i: 0, respostas: [] };
    $("#quizResultado").hidden = true;
    $("#quiz").hidden = false;
    renderQuiz();
  }

  function iniciarQuiz() {
    $("#quizOpcoes").addEventListener("change", (e) => {
      if (e.target.name !== "quiz") return;
      estado.quiz.respostas[estado.quiz.i] = e.target.value;
      $("#quizProxima").disabled = false;
    });
    $("#quizProxima").addEventListener("click", () => {
      const total = perguntas().length;
      if (!estado.quiz.respostas[estado.quiz.i]) return;
      if (estado.quiz.i < total - 1) { estado.quiz.i += 1; renderQuiz(true); }
      else mostrarResultado();
    });
    $("#quizVoltar").addEventListener("click", () => {
      if (estado.quiz.i > 0) { estado.quiz.i -= 1; renderQuiz(true); }
      else irPara(2);
    });
    $("#quizRefazer").addEventListener("click", () => { reiniciarQuiz(); status("Teste reiniciado"); const l = $("#quizPergunta"); l.focus({ preventScroll: true }); });
    renderQuiz();
  }

  // ---------- Carta ----------
  let timerCarta = null;

  function abrirCarta() {
    const env = $("#envelope");
    env.classList.add("is-open");
    env.setAttribute("aria-expanded", "true");
    $("#envelopeRotulo").textContent = "Fechar a carta";
    $("#envelopeDica").hidden = true;
    const nome = nomeVisitante();
    paragrafos($("#cartaTexto"), get("carta.corpo", []), nome ? `${nome},` : "");
    const ass = limpo(get("carta.assinatura"));
    const autor = nomeAutor();
    $("#cartaAssinatura").textContent = [ass, autor].filter(Boolean).join(" — ");
    const mostrar = () => {
      $("#cartaLida").hidden = false;
      const t = $("#cartaTexto"); t.focus({ preventScroll: true });
      t.scrollIntoView({ block: "nearest", behavior: reduzMovimento() ? "auto" : "smooth" });
      status("Carta aberta");
      coracao($("#cartaSeguir"));
    };
    clearTimeout(timerCarta);
    if (reduzMovimento()) mostrar(); else timerCarta = setTimeout(mostrar, 750);
  }

  function fecharCarta(devolverFoco = false) {
    clearTimeout(timerCarta);
    const env = $("#envelope");
    env.classList.remove("is-open");
    env.setAttribute("aria-expanded", "false");
    $("#envelopeRotulo").textContent = "Abrir a carta";
    $("#envelopeDica").hidden = false;
    $("#cartaLida").hidden = true;
    status("Carta fechada");
    if (devolverFoco) env.focus({ preventScroll: true });
  }

  function iniciarCarta() {
    $("#envelope").addEventListener("click", () => {
      $("#envelope").classList.contains("is-open") ? fecharCarta() : abrirCarta();
    });
    $("#cartaFechar").addEventListener("click", () => fecharCarta(true));
  }

  // ---------- Convite ----------
  function montarOpcoesEncontro() {
    const caixa = $("#detalhesOpcoes");
    caixa.replaceChildren(...get("convite.opcoes", []).map((o, k) => {
      const input = el("input", { type: "radio", name: "encontro", value: o.id, id: `enc${k}` });
      return el("label", { class: "op", for: `enc${k}` }, [
        input,
        el("span", { class: "op__box" }, [
          el("span", { class: "op__mark" }),
          el("span", { class: "op__txt" }, [document.createTextNode(o.titulo), o.texto ? el("small", { text: o.texto }) : null])
        ])
      ]);
    }));
  }

  function mostrarDetalhes() {
    $("#respostas").hidden = true;
    $("#detalhes").hidden = false;
    $("#detalhesAviso").hidden = true;
    const h = $("#detalhes h3"); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: false });
  }
  function esconderDetalhes() {
    $("#detalhes").hidden = true;
    $("#respostas").hidden = false;
    $("#btnDetalhes").focus({ preventScroll: true });
  }

  function iniciarConvite() {
    montarOpcoesEncontro();

    $("#btnAceito").addEventListener("click", () => { estado.escolha = { modo: "aceito" }; irPara(6); });
    $("#btnDepois").addEventListener("click", () => { estado.escolha = { modo: "depois" }; irPara(6); });
    $("#btnDetalhes").addEventListener("click", mostrarDetalhes);
    $("#detalhesVoltar").addEventListener("click", esconderDetalhes);

    $("#detalhesOpcoes").addEventListener("change", (e) => {
      if (e.target.name !== "encontro") return;
      const outro = e.target.value === "outro";
      $("#campoOutro").hidden = !outro;
      $("#detalhesAviso").hidden = true;
      if (outro) $("#inputOutro").focus({ preventScroll: false });
    });

    $("#detalhes").addEventListener("submit", (e) => {
      e.preventDefault();
      const marcado = $('input[name="encontro"]:checked', $("#detalhes"));
      if (!marcado) {
        const aviso = $("#detalhesAviso");
        aviso.textContent = get("convite.avisoSemEscolha", "Escolha uma opção para continuar.");
        aviso.hidden = false;
        const primeiro = $('input[name="encontro"]'); if (primeiro) primeiro.focus();
        return;
      }
      const op = get("convite.opcoes", []).find((o) => o.id === marcado.value) || {};
      estado.escolha = {
        modo: "detalhes",
        id: marcado.value,
        titulo: op.titulo || "",
        sugestao: marcado.value === "outro" ? limpo($("#inputOutro").value) : ""
      };
      irPara(6);
    });
  }

  // ---------- Final ----------
  function confete() {
    if (reduzMovimento()) return;
    const c = $("#confete");
    c.replaceChildren();
    for (let i = 0; i < 14; i++) {
      const s = el("span", {}, icone(i % 3 === 0 ? "flor" : "coracao"));
      s.style.left = `${Math.random() * 94}%`;
      s.style.animationDelay = `${Math.random() * 1.2}s`;
      s.style.width = s.style.height = `${10 + Math.random() * 10}px`;
      c.append(s);
    }
    setTimeout(() => c.replaceChildren(), 5000);
  }

  function montarFinal() {
    const e = estado.escolha;
    const t = $("#t6");
    const selo = $("#finalSelo");
    const intro = $("#finalIntro");
    const sin = $("#sinopse");
    selo.hidden = intro.hidden = sin.hidden = true;
    $("#finalRever").hidden = true;
    $("#confete").replaceChildren();

    if (e.modo === "aceito") {
      const d = get("final.aceito", {});
      t.textContent = d.titulo || "";
      if (limpo(d.comemoracao)) { selo.textContent = d.comemoracao; selo.hidden = false; }
      paragrafos($("#finalTexto"), d.texto);
      confete();
    } else if (e.modo === "detalhes") {
      const d = get("final.detalhes", {});
      t.textContent = d.titulo || "";
      intro.textContent = d.intro || ""; intro.hidden = !limpo(d.intro);
      const linhas = [[d.rotuloPrograma || "Programa", e.titulo]];
      if (e.sugestao) linhas.push([d.rotuloSugestao || "Sugestão", e.sugestao]);
      linhas.push([d.rotuloData || "Data e horário", d.valorData || "a combinar"]);
      sin.replaceChildren(...linhas.map(([k, v]) => el("div", {}, [el("dt", { text: k }), el("dd", { text: v })])));
      sin.hidden = false;
      paragrafos($("#finalTexto"), d.texto);
      $("#finalRever").hidden = false;
    } else {
      const d = get("final.depois", {});
      t.textContent = d.titulo || "";
      paragrafos($("#finalTexto"), d.texto);
    }

    // Extras começam fechados a cada visita
    $("#curiosidade").hidden = true;
    $("#btnCuriosidade").setAttribute("aria-expanded", "false");
    $$(".cliche").forEach((b) => resetCliche(b));
  }

  function montarCliches() {
    const ul = $("#clichesLista");
    const itens = get("cliches.itens", []);
    ul.replaceChildren(...itens.map((texto, i) => {
      const b = el("button", { type: "button", class: "cliche", "aria-pressed": "false" }, [
        el("span", { class: "cliche__rotulo", text: `Clichê nº ${i + 1}` }),
        el("span", { class: "cliche__ico", "aria-hidden": "true", text: "+" })
      ]);
      b.dataset.texto = texto;
      b.dataset.rotulo = `Clichê nº ${i + 1}`;
      b.addEventListener("click", () => {
        const aberto = b.getAttribute("aria-pressed") === "true";
        aberto ? resetCliche(b) : abrirCliche(b);
      });
      return el("li", {}, b);
    }));
  }
  function abrirCliche(b) {
    b.setAttribute("aria-pressed", "true");
    $(".cliche__rotulo", b).textContent = b.dataset.texto;
    $(".cliche__rotulo", b).style.font = "inherit";
    $(".cliche__ico", b).textContent = "–";
  }
  function resetCliche(b) {
    b.setAttribute("aria-pressed", "false");
    const r = $(".cliche__rotulo", b);
    r.textContent = b.dataset.rotulo; r.style.font = "";
    $(".cliche__ico", b).textContent = "+";
  }

  function reiniciarTudo() {
    estado.escolha = null;
    reiniciarQuiz();
    fecharCarta();
    $("#detalhes").reset();
    $("#campoOutro").hidden = true;
    $("#detalhes").hidden = true;
    $("#respostas").hidden = false;
    irPara(0);
  }

  // ---------- Inicialização ----------
  function iniciar() {
    if (!CFG) throw new Error("config.js não foi carregado");
    aplicarCores();
    aplicarTextos();
    iniciarQuiz();
    iniciarCarta();
    iniciarConvite();

    $("#btnAbrir").addEventListener("click", () => irPara(1));

    // Botões com data-go (voltar/avançar). Ouve no documento para pegar botões criados depois.
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-go]");
      if (!b) return;
      irPara(Number(b.dataset.go));
    });

    $("#btnCuriosidade").addEventListener("click", () => {
      const p = $("#curiosidade");
      const abrir = p.hidden;
      p.hidden = !abrir;
      $("#btnCuriosidade").setAttribute("aria-expanded", String(abrir));
    });
    $("#finalRever").addEventListener("click", () => { irPara(5); mostrarDetalhes(); });
    $("#finalReiniciar").addEventListener("click", reiniciarTudo);

    // Botão voltar do navegador/celular
    window.addEventListener("popstate", (ev) => {
      const passo = ev.state && Number.isInteger(ev.state.passo) ? ev.state.passo : 0;
      irPara(passo, { historico: false, focar: false });
    });
    try { history.replaceState({ passo: 0 }, "", location.pathname + location.search); } catch (_) { /* ignora */ }

    irPara(0, { focar: false, historico: false });
  }

  function falhar(err) {
    console.error(err);
    const main = $("#conteudo");
    $$(".page", main).forEach((p) => { p.hidden = true; });
    main.append(el("p", { class: "noscript", text: "Não foi possível carregar o convite. Confira se os arquivos config.js e script.js estão na mesma pasta do index.html." }));
  }

  try { iniciar(); } catch (err) { falhar(err); }
})();
