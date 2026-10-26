
"use strict";

(() => {
  const $ = selector => document.querySelector(selector);
  const content = $("#content");
  const storage = window.CyberStorage;
  const data = window.CyberData;

  let page = "dashboard";
  let activeCourse = null;
  let quizQuestions = null;
  let activeSecurityScenario = null;
  let activeDockerIncident = null;
  let toastTimer = null;

  const titles = {
    dashboard: "Tableau de bord",
    courses: "Formations",
    missions: "Missions pratiques",
    quiz: "Quiz et révisions",
    network: "Laboratoire réseau",
    security: "Cybersécurité",
    monitoring: "Supervision",
    docker: "Docker simulé",
    journal: "Carnet de bord",
    settings: "Paramètres"
  };

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

  const getState = () => storage.getState();

  function notify(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function heading(title, description, action = "") {
    return `<div class="page-heading">
      <div><h2>${escapeHTML(title)}</h2><p>${escapeHTML(description)}</p></div>
      ${action}
    </div>`;
  }

  function cardStat(icon, label, value, note) {
    return `<article class="card">
      <div class="card-header"><span class="stat-label">${escapeHTML(label)}</span><span class="stat-icon">${icon}</span></div>
      <div class="stat-number">${escapeHTML(value)}</div>
      <div class="small">${escapeHTML(note)}</div>
    </article>`;
  }

  function progressBar(percent) {
    const p = Math.max(0, Math.min(100, Number(percent) || 0));
    return `<div class="progress-track"><span style="width:${p}%"></span></div>`;
  }

  function lessonKey(courseId, index) {
    return `${courseId}:${index}`;
  }

  function courseProgress(course) {
    const s = getState();
    const done = course.lessons.filter((_, index) =>
      s.completedLessons.includes(lessonKey(course.id, index))
    ).length;
    return {
      done,
      total: course.lessons.length,
      percent: course.lessons.length ? Math.round(done / course.lessons.length * 100) : 0
    };
  }

  function updateSidebar() {
    const s = getState();
    const level = Math.floor(s.xp / 250) + 1;
    const intoLevel = s.xp % 250;

    $("#levelLabel").textContent = `Niveau ${level}`;
    $("#xpLabel").textContent = `${s.xp} XP`;
    $("#levelProgress").style.width = `${intoLevel / 250 * 100}%`;
    $("#levelHint").textContent = `${250 - intoLevel} XP avant le niveau suivant`;

    document.body.classList.toggle("light", s.theme === "light");
    $("#themeButton").textContent = s.theme === "light" ? "☀" : "☾";

    document.querySelectorAll("[data-page]").forEach(button => {
      button.classList.toggle("active", button.dataset.page === page);
    });

    $("#pageTitle").textContent = titles[page] || "CyberLab Academy";
  }

  function render() {
    updateSidebar();

    const renderers = {
      dashboard: dashboardPage,
      courses: coursesPage,
      missions: missionsPage,
      quiz: quizPage,
      network: networkPage,
      security: securityPage,
      monitoring: monitoringPage,
      docker: dockerPage,
      journal: journalPage,
      settings: settingsPage
    };

    content.innerHTML = (renderers[page] || dashboardPage)();
    $("#sidebar").classList.remove("open");
  }

  function navigate(nextPage) {
    if (!titles[nextPage]) return;
    page = nextPage;
    if (page !== "courses") activeCourse = null;
    if (page !== "security") activeSecurityScenario = null;
    if (page !== "docker") activeDockerIncident = null;
    render();
  }

  function courseCard(course) {
    const p = courseProgress(course);

    return `<article class="card course-card">
      <div class="course-icon">${course.icon}</div>
      <span class="pill">${escapeHTML(course.level)}</span>
      <h3>${escapeHTML(course.title)}</h3>
      <p class="muted">${escapeHTML(course.description)}</p>
      ${progressBar(p.percent)}
      <div class="row-between small"><span>${p.done}/${p.total} leçons</span><span>${p.percent}%</span></div>
      <div class="actions"><button class="btn primary" data-open-course="${escapeHTML(course.id)}">Ouvrir le parcours</button></div>
    </article>`;
  }

  function dashboardPage() {
    const s = getState();
    const lessonCount = data.courses.reduce((sum, course) => sum + course.lessons.length, 0);
    const completed = s.completedLessons.length;
    const coursePercent = lessonCount ? Math.round(completed / lessonCount * 100) : 0;
    const missionCount = data.missions.length;

    return heading("Bonjour, bienvenue dans ton laboratoire.",
      "Apprends, entraîne-toi et documente tes interventions techniques.") +
      `<div class="grid">
        ${cardStat("⚡", "Expérience", `${s.xp} XP`, `Niveau ${Math.floor(s.xp / 250) + 1}`)}
        ${cardStat("📚", "Leçons terminées", `${completed}/${lessonCount}`, `${coursePercent}% du programme`)}
        ${cardStat("⚑", "Missions validées", `${s.completedMissions.length}/${missionCount}`, "Scénarios pratiques")}
        ${cardStat("🎯", "Meilleur quiz", `${bestQuizScore()}%`, `${s.quizHistory.length} tentatives enregistrées`)}
      </div>
      <h3 class="section-title">Reprendre une formation</h3>
      <div class="grid three">${data.courses.slice(0, 3).map(courseCard).join("")}</div>
      <h3 class="section-title">Accès rapide</h3>
      <div class="grid three">
        <article class="card"><h3>🌐 Réseau</h3><p class="muted">Calculer un sous-réseau IPv4.</p><button class="btn" data-go="network">Ouvrir</button></article>
        <article class="card"><h3>🛡️ Sécurité</h3><p class="muted">Étudier un scénario défensif.</p><button class="btn" data-go="security">Ouvrir</button></article>
        <article class="card"><h3>📈 Supervision</h3><p class="muted">Examiner les serveurs fictifs.</p><button class="btn" data-go="monitoring">Ouvrir</button></article>
      </div>
      <h3 class="section-title">Progression globale</h3>
      <div class="card">
        <div class="row-between"><strong>Programme de formation</strong><strong>${coursePercent}%</strong></div>
        ${progressBar(coursePercent)}
        <p class="small">Valide une leçon après l'avoir étudiée, puis applique les notions dans une mission.</p>
      </div>`;
  }

  function coursesPage() {
    if (!activeCourse) {
      return heading("Parcours de formation",
        "Cours et exercices pour les systèmes, les réseaux et la sécurité.") +
        `<div class="grid three">${data.courses.map(courseCard).join("")}</div>`;
    }

    const course = data.courses.find(item => item.id === activeCourse);
    if (!course) {
      activeCourse = null;
      return coursesPage();
    }

    const p = courseProgress(course);

    return heading(course.title, course.description,
      `<button class="btn" data-back-courses>← Tous les cours</button>`) +
      `<div class="card">
        <div class="row-between"><span class="pill">${escapeHTML(course.level)}</span><strong>${p.percent}%</strong></div>
        ${progressBar(p.percent)}
      </div>
      <h3 class="section-title">Leçons du parcours</h3>
      <div class="grid two">${course.lessons.map((lesson, index) => {
        const key = lessonKey(course.id, index);
        const done = getState().completedLessons.includes(key);
        return `<article class="card">
          <span class="pill ${done ? "good" : ""}">${done ? "✓ Terminée" : `Leçon ${index + 1}`}</span>
          <h3 style="margin-top:12px">${escapeHTML(lesson.title)}</h3>
          <div class="lesson-text">${escapeHTML(lesson.content)}</div>
          <h4>À toi de réfléchir</h4>
          <p class="muted">${escapeHTML(lesson.task)}</p>
          <div class="actions">
            ${done
              ? '<span class="pill good">+25 XP déjà attribués</span>'
              : `<button class="btn primary" data-complete-lesson="${escapeHTML(key)}">Valider la leçon · +25 XP</button>`}
          </div>
        </article>`;
      }).join("")}</div>`;
  }

  function missionsPage() {
    const s = getState();

    return heading("Missions pratiques",
      "Suis les étapes, documente ton diagnostic et valide le travail réalisé.") +
      `<div class="grid two">${data.missions.map(mission => {
        const done = s.completedMissions.includes(mission.id);
        const checks = s.missionChecks[mission.id] || [];

        return `<article class="card">
          <div class="row-between"><span class="pill">${escapeHTML(mission.category)}</span><span class="pill">${mission.xp} XP</span></div>
          <h3 style="margin-top:12px">${escapeHTML(mission.title)}</h3>
          <div class="small">${escapeHTML(mission.difficulty)}</div>
          <p class="muted">${escapeHTML(mission.description)}</p>
          ${mission.steps.map((step, index) => `
            <label class="check-row">
              <input type="checkbox" data-mission-check="${escapeHTML(mission.id)}:${index}"
                ${checks.includes(index) ? "checked" : ""} ${done ? "disabled" : ""}>
              <span>${escapeHTML(step)}</span>
            </label>`).join("")}
          <div class="actions">
            ${done
              ? '<span class="pill good">✓ Mission validée</span>'
              : `<button class="btn primary" data-finish-mission="${escapeHTML(mission.id)}"
                  ${checks.length !== mission.steps.length ? "disabled" : ""}>
                  Valider la mission · +${mission.xp} XP
                </button>`}
          </div>
        </article>`;
      }).join("")}</div>`;
  }

  function bestQuizScore() {
    return getState().quizHistory.reduce((best, item) => Math.max(best, item.score), 0);
  }

  function quizPage() {
    const s = getState();

    if (quizQuestions) {
      return heading("Quiz de révision", "Réponds aux dix questions puis corrige tes réponses.") +
        `<form id="quizForm"><div class="card">
          ${quizQuestions.map((question, index) => `
            <div class="question-block">
              <strong>${index + 1}. ${escapeHTML(question.q)}</strong>
              ${question.answers.map((answer, optionIndex) => `
                <label class="option-row">
                  <input type="radio" name="q${index}" value="${optionIndex}" required>
                  <span>${escapeHTML(answer)}</span>
                </label>`).join("")}
            </div>`).join("")}
          <div class="actions">
            <button class="btn primary">Corriger le quiz</button>
            <button type="button" class="btn" data-cancel-quiz>Annuler</button>
          </div>
        </div></form>`;
    }

    return heading("Quiz et révisions", "Révise les notions essentielles du BTS SIO SISR.") +
      `<div class="grid two">
        <article class="card"><h3>🎯 Quiz aléatoire</h3><p class="muted">10 questions avec correction expliquée.</p><button class="btn primary" data-start-quiz>Commencer</button></article>
        <article class="card"><h3>Meilleur score</h3><div class="stat-number">${bestQuizScore()}%</div><p class="muted">${s.quizHistory.length} tentatives conservées</p></article>
      </div>
      <h3 class="section-title">Historique</h3>
      <div class="card table-wrap">${s.quizHistory.length ? `
        <table><thead><tr><th>Date</th><th>Score</th><th>Résultat</th></tr></thead><tbody>
        ${s.quizHistory.slice().reverse().map(item => `<tr>
          <td>${escapeHTML(item.date)}</td><td>${item.score}%</td>
          <td>${item.correct}/${item.total}</td>
        </tr>`).join("")}
        </tbody></table>` : '<div class="empty">Aucun quiz effectué pour le moment.</div>'}
      </div>`;
  }

  function startQuiz() {
    quizQuestions = [...data.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, data.questions.length));
    render();
  }

  function submitQuiz(form) {
    if (!quizQuestions) return;

    const formData = new FormData(form);
    let correct = 0;

    const review = quizQuestions.map((question, index) => {
      const answer = Number(formData.get(`q${index}`));
      const isCorrect = answer === question.correct;
      if (isCorrect) correct++;

      return `<div class="question-block">
        <strong>${index + 1}. ${escapeHTML(question.q)}</strong>
        <p>${isCorrect ? "✓ Bonne réponse" : `Réponse attendue : ${escapeHTML(question.answers[question.correct])}`}</p>
        <p class="muted">${escapeHTML(question.explanation)}</p>
      </div>`;
    }).join("");

    const total = quizQuestions.length;
    const score = Math.round(correct / total * 100);
    const reward = correct * 10;

    const result = storage.update(s => {
      s.quizHistory.push({
        date: new Date().toLocaleString("fr-FR"),
        score,
        correct,
        total
      });
      s.quizHistory = s.quizHistory.slice(-100);
      s.xp += reward;
    });

    quizQuestions = null;
    render();

    content.insertAdjacentHTML("afterbegin", `
      <div class="card">
        <h2>Résultat : ${score}%</h2>
        <p>${correct}/${total} bonnes réponses · ${reward} XP gagnés.</p>
        <div class="actions">
          <button class="btn primary" data-start-quiz>Recommencer</button>
          <button class="btn" data-go="quiz">Retour aux quiz</button>
        </div>
        <h3 class="section-title">Correction détaillée</h3>
        ${review}
      </div>`);

    notify(result.ok ? `Quiz terminé : ${score}%` : result.message);
  }

  function ipToNumber(ip) {
    const parts = ip.split(".");
    if (parts.length !== 4) return null;

    if (parts.some(part => !/^\d{1,3}$/.test(part) ||
      Number(part) < 0 || Number(part) > 255)) return null;

    return parts.reduce((total, part) => total * 256 + Number(part), 0);
  }

  function numberToIP(value) {
    const n = value >>> 0;
    return [
      n >>> 24,
      (n >>> 16) & 255,
      (n >>> 8) & 255,
      n & 255
    ].join(".");
  }

  function calculateSubnet(ip, prefix) {
    const address = ipToNumber(ip);
    const p = Number(prefix);

    if (address === null || !Number.isInteger(p) || p < 0 || p > 32) {
      return { error: "Adresse IPv4 ou préfixe invalide." };
    }

    const mask = p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0;
    const network = (address & mask) >>> 0;
    const broadcast = (network | (~mask)) >>> 0;
    const total = 2 ** (32 - p);

    let first = network;
    let last = broadcast;
    let usable = total;

    if (p <= 30) {
      first = network + 1;
      last = broadcast - 1;
      usable = total - 2;
    } else if (p === 31) {
      usable = 2;
    } else {
      usable = 1;
    }

    return {
      ip,
      prefix: p,
      mask: numberToIP(mask),
      network: numberToIP(network),
      broadcast: numberToIP(broadcast),
      first: numberToIP(first),
      last: numberToIP(last),
      total,
      usable
    };
  }

  function networkPage() {
    return heading("Laboratoire réseau", "Calculateur IPv4/CIDR et terminal de diagnostic fictif.") +
      `<div class="grid two">
        <article class="card">
          <h3>Calculateur IPv4 / CIDR</h3>
          <form id="networkForm">
            <div class="field"><label for="networkIP">Adresse IPv4</label><input id="networkIP" value="192.168.10.25" required></div>
            <div class="field"><label for="networkPrefix">Préfixe</label>
              <select id="networkPrefix">${Array.from({ length: 33 }, (_, i) => 32 - i)
                .map(p => `<option value="${p}" ${p === 24 ? "selected" : ""}>/${p}</option>`).join("")}
              </select>
            </div>
            <button class="btn primary">Calculer le sous-réseau</button>
          </form>
          <div id="networkResult" class="notice" style="margin-top:14px">Entre une adresse puis lance le calcul.</div>
        </article>
        <article class="card">
          <h3>Diagnostic réseau simulé</h3>
          <p class="muted">Ces commandes sont pédagogiques : elles n'envoient aucun paquet.</p>
          <div class="actions">
            <button class="btn" data-net-command="ipconfig">ipconfig</button>
            <button class="btn" data-net-command="ip addr">ip addr</button>
            <button class="btn" data-net-command="ip route">ip route</button>
            <button class="btn" data-net-command="ping 192.168.10.1">ping</button>
            <button class="btn" data-net-command="help">help</button>
          </div>
          <div class="terminal" id="networkTerminal">CyberLab Network Lab V8
Tape une commande pour voir la simulation.
$ </div>
          <form id="networkTerminalForm" class="actions">
            <input id="networkCommand" aria-label="Commande réseau" placeholder="help" autocomplete="off">
            <button class="btn primary">Exécuter</button>
          </form>
        </article>
      </div>
      <h3 class="section-title">Rappels de diagnostic</h3>
      <div class="grid three">
        <article class="card"><h3>DNS</h3><p class="muted">Vérifier le serveur DNS configuré, la connectivité et la résolution.</p></article>
        <article class="card"><h3>DHCP</h3><p class="muted">Examiner le bail, le VLAN, l'étendue et le relais éventuel.</p></article>
        <article class="card"><h3>Routage</h3><p class="muted">Contrôler la passerelle et les routes adaptées au réseau cible.</p></article>
      </div>`;
  }

  function renderSubnet(result) {
    if (result.error) return `<p>${escapeHTML(result.error)}</p>`;

    const fields = [
      ["Adresse", result.ip],
      ["Masque", result.mask],
      ["Réseau", result.network],
      ["Broadcast", result.broadcast],
      ["Premier hôte", result.first],
      ["Dernier hôte", result.last],
      ["Adresses totales", result.total.toLocaleString("fr-FR")],
      ["Hôtes utilisables", result.usable.toLocaleString("fr-FR")]
    ];

    return `<div class="grid two">${fields.map(([label, value]) => `
      <div><div class="small">${label}</div><strong>${escapeHTML(value)}</strong></div>
    `).join("")}</div>
    <p class="small" style="margin-top:12px">Les préfixes /31 et /32 ont des usages particuliers. Vérifie le contexte avant d'appliquer un plan d'adressage.</p>`;
  }

  function runNetworkCommand(command) {
    const output = $("#networkTerminal");
    if (!output) return;

    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    const answers = {
      help: "Commandes simulées : help, ipconfig, ip addr, ip route, ping <IP>, clear",
      ipconfig: "Ethernet (simulation)\nIPv4 : 192.168.10.25\nMasque : 255.255.255.0\nPasserelle : 192.168.10.254\nDNS : 192.168.10.10",
      "ip addr": "2: eth0: <UP>\n    inet 192.168.10.25/24",
      "ip route": "default via 192.168.10.254 dev eth0\n192.168.10.0/24 dev eth0"
    };

    if (cmd === "clear") {
      output.textContent = "CyberLab Network Lab V8\n$ ";
      return;
    }

    let result = answers[cmd];

    if (!result && /^ping\s+\d{1,3}(?:\.\d{1,3}){3}$/.test(cmd)) {
      result = "Résultat fictif : aucune requête réelle n'a été envoyée.\nSimulation : 4 réponses, 0 % de perte.";
    }

    if (!result) result = "Commande non prise en charge. Tape help.";

    output.textContent += `${command}\n${result}\n$ `;
    output.scrollTop = output.scrollHeight;
  }

  function securityPage() {
    const s = getState();

    if (activeSecurityScenario) {
      const scenario = data.securityScenarios.find(item => item.id === activeSecurityScenario);
      if (!scenario) {
        activeSecurityScenario = null;
        return securityPage();
      }

      const completed = s.securityResults.some(item => item.id === scenario.id);

      return heading(scenario.title, scenario.description,
        '<button class="btn" data-security-back>← Scénarios</button>') +
        `<div class="card">
          <span class="pill">${escapeHTML(scenario.category)}</span>
          <h3 class="section-title">Quelle est la meilleure approche défensive ?</h3>
          <form id="securityForm">
            ${scenario.options.map((option, index) => `
              <label class="option-row">
                <input type="radio" name="securityAnswer" value="${index}" required>
                <span>${escapeHTML(option)}</span>
              </label>`).join("")}
            <button class="btn primary" style="margin-top:12px" ${completed ? "disabled" : ""}>
              ${completed ? "Scénario déjà validé" : "Vérifier ma réponse"}
            </button>
          </form>
          <div id="securityFeedback"></div>
        </div>`;
    }

    return heading("Cybersécurité défensive",
      "Étudie des situations de sécurité et choisis une réponse prudente.") +
      `<div class="notice">Ces scénarios sont pédagogiques. Ils ne testent aucun système réel.</div>
      <div class="grid three" style="margin-top:14px">
        ${data.securityScenarios.map(scenario => {
          const done = s.securityResults.some(item => item.id === scenario.id);
          return `<article class="card">
            <span class="pill">${escapeHTML(scenario.category)}</span>
            <h3 style="margin-top:12px">${escapeHTML(scenario.title)}</h3>
            <p class="muted">${escapeHTML(scenario.description)}</p>
            <div class="actions">
              <button class="btn primary" data-security-open="${escapeHTML(scenario.id)}">${done ? "Revoir le scénario" : "Analyser"}</button>
              ${done ? '<span class="pill good">✓ Validé</span>' : ""}
            </div>
          </article>`;
        }).join("")}
      </div>`;
  }

  function submitSecurity(form) {
    const scenario = data.securityScenarios.find(item => item.id === activeSecurityScenario);
    if (!scenario) return;

    const selected = Number(new FormData(form).get("securityAnswer"));
    const correct = selected === scenario.correct;
    const alreadyDone = getState().securityResults.some(item => item.id === scenario.id);

    if (correct && !alreadyDone) {
      storage.update(s => {
        s.securityResults.push({ id: scenario.id, date: new Date().toLocaleString("fr-FR") });
        s.xp += 20;
      });
    }

    $("#securityFeedback").innerHTML = `<div class="notice" style="margin-top:14px">
      <strong>${correct ? "Bonne réponse" : "Réponse à revoir"}</strong>
      <p>${escapeHTML(scenario.explanation)}</p>
      ${correct ? '<p>+20 XP si c’était ta première validation correcte.</p>' : ""}
    </div>`;

    if (correct) {
      form.querySelectorAll("input, button").forEach(el => el.disabled = true);
    }

    updateSidebar();
  }

  function monitoringPage() {
    const s = getState();

    return heading("Supervision IT",
      "Métriques et incidents fictifs pour t'entraîner à l'analyse.") +
      `<div class="notice">Les indicateurs affichés sont des données de démonstration, sans connexion à tes vrais serveurs.</div>
      <div class="grid two" style="margin-top:14px">
        ${data.servers.map(server => {
          const override = s.serverOverrides[server.id];
          const status = override || server.status;
          const down = status === "down";
          const warn = status === "warning";

          return `<article class="card">
            <div class="card-header">
              <div><h3>${escapeHTML(server.name)}</h3><p class="muted">${escapeHTML(server.role)}</p></div>
              <span class="pill ${down ? "bad" : warn ? "warn" : "good"}">${down ? "INDISPONIBLE" : warn ? "ALERTE" : "OK"}</span>
            </div>
            <p class="small">${escapeHTML(server.ip)}</p>
            ${metricBar("CPU", server.cpu, 75)}
            ${metricBar("Mémoire", server.ram, 80)}
            ${metricBar("Disque", server.disk, 85)}
            <div class="actions">
              <button class="btn" data-server-toggle="${escapeHTML(server.id)}">${down ? "Simuler le retour" : "Simuler une panne"}</button>
              <button class="btn" data-server-reset="${escapeHTML(server.id)}">Réinitialiser</button>
            </div>
          </article>`;
        }).join("")}
      </div>
      <h3 class="section-title">Méthode d'analyse</h3>
      <div class="card">
        <ol>
          <li>Confirmer l'alerte et sa durée.</li>
          <li>Vérifier les métriques associées et les journaux.</li>
          <li>Évaluer l'impact sur les utilisateurs.</li>
          <li>Documenter les constatations avant toute correction.</li>
        </ol>
      </div>`;
  }

  function metricBar(label, value, threshold) {
    const color = value >= threshold ? "var(--orange)" : "var(--accent)";
    return `<div style="margin-top:12px">
      <div class="row-between"><span class="small">${label}</span><strong>${value}%</strong></div>
      <div class="progress-track"><span style="width:${value}%;background:${color}"></span></div>
    </div>`;
  }

  function dockerPage() {
    const s = getState();

    if (activeDockerIncident) {
      const incident = data.dockerIncidents.find(item => item.id === activeDockerIncident);
      if (!incident) {
        activeDockerIncident = null;
        return dockerPage();
      }

      const checked = s.dockerChecks[incident.id] || [];

      return heading(incident.title, incident.description,
        '<button class="btn" data-docker-back>← Laboratoire Docker</button>') +
        `<div class="card">
          <h3>Checklist de diagnostic</h3>
          ${incident.checks.map((check, index) => `
            <label class="check-row">
              <input type="checkbox" data-docker-check="${escapeHTML(incident.id)}:${index}" ${checked.includes(index) ? "checked" : ""}>
              <span>${escapeHTML(check)}</span>
            </label>`).join("")}
          <p class="small">La checklist enregistre ton avancement localement.</p>
        </div>`;
    }

    return heading("Docker simulé",
      "Étudie les états, les ports, les volumes et les incidents sans lancer de conteneur réel.") +
      `<div class="notice">Aucun conteneur Docker réel n'est créé ou modifié par cette page.</div>
      <h3 class="section-title">Services fictifs</h3>
      <div class="grid three">
        ${data.dockerServices.map(service => {
          const status = s.serverOverrides["docker:" + service.id] || service.status;
          return `<article class="card">
            <div class="card-header"><h3>${escapeHTML(service.name)}</h3>
              <span class="pill ${status === "running" ? "good" : "warn"}">${status === "running" ? "RUNNING" : "STOPPED"}</span>
            </div>
            <p class="small">Image : ${escapeHTML(service.image)}</p>
            <p class="small">Ports : ${escapeHTML(service.port)}</p>
            <p class="small">Volume : ${escapeHTML(service.volume)}</p>
            <p class="muted">${escapeHTML(service.note)}</p>
            <button class="btn" data-docker-toggle="${escapeHTML(service.id)}">${status === "running" ? "Simuler l'arrêt" : "Simuler le démarrage"}</button>
          </article>`;
        }).join("")}
      </div>
      <h3 class="section-title">Scénarios de dépannage</h3>
      <div class="grid three">
        ${data.dockerIncidents.map(incident => `
          <article class="card">
            <h3>${escapeHTML(incident.title)}</h3>
            <p class="muted">${escapeHTML(incident.description)}</p>
            <button class="btn primary" data-docker-incident="${escapeHTML(incident.id)}">Examiner</button>
          </article>`).join("")}
      </div>`;
  }

  function journalPage() {
    const notes = getState().journal;

    return heading("Carnet de bord",
      "Documente tes apprentissages et tes interventions de laboratoire.") +
      `<div class="grid two">
        <div class="card">
          <h3>Nouvelle entrée</h3>
          <form id="journalForm">
            <div class="field"><label for="journalTitle">Titre</label><input id="journalTitle" maxlength="120" required placeholder="Ex. Diagnostic DNS"></div>
            <div class="field"><label for="journalCategory">Catégorie</label>
              <select id="journalCategory">
                <option>Réseau</option><option>Windows Server</option><option>Linux</option>
                <option>Cybersécurité</option><option>Docker</option><option>Supervision</option><option>Autre</option>
              </select>
            </div>
            <div class="field"><label for="journalText">Contenu</label><textarea id="journalText" maxlength="5000" required placeholder="Contexte, tests, résultats, prochaines étapes..."></textarea></div>
            <button class="btn primary">Enregistrer l'entrée</button>
          </form>
        </div>
        <div class="card">
          <h3>Bonnes pratiques</h3>
          <ul>
            <li>Décrire le symptôme et l'impact.</li>
            <li>Noter les vérifications réellement effectuées.</li>
            <li>Distinguer les faits des hypothèses.</li>
            <li>Décrire la correction et le résultat.</li>
          </ul>
          <div class="notice">Ne saisis pas de mots de passe, de clés secrètes ou de données confidentielles dans ce carnet.</div>
        </div>
      </div>
      <h3 class="section-title">Historique (${notes.length})</h3>
      <div class="grid two">
        ${notes.slice().reverse().map(note => `
          <article class="card">
            <div class="row-between"><span class="pill">${escapeHTML(note.category)}</span><span class="small">${escapeHTML(note.date)}</span></div>
            <h3 style="margin-top:10px">${escapeHTML(note.title)}</h3>
            <p style="white-space:pre-wrap;overflow-wrap:anywhere">${escapeHTML(note.text)}</p>
            <button class="btn danger" data-delete-note="${escapeHTML(note.id)}">Supprimer</button>
          </article>`).join("") || '<div class="card empty">Aucune entrée enregistrée.</div>'}
      </div>`;
  }

  function settingsPage() {
    const s = getState();

    return heading("Paramètres",
      "Gère l'apparence et les sauvegardes de tes données locales.") +
      `<div class="grid two">
        <article class="card">
          <h3>🎨 Apparence</h3>
          <p class="muted">Thème actuel : ${s.theme === "light" ? "clair" : "sombre"}.</p>
          <div class="actions"><button class="btn" data-set-theme="dark">Bleu nuit</button><button class="btn" data-set-theme="light">Clair</button></div>
        </article>
        <article class="card">
          <h3>📦 Exporter la sauvegarde</h3>
          <p class="muted">Télécharge un fichier JSON contenant la progression, les notes et les résultats.</p>
          <button class="btn primary" data-export>Exporter mes données</button>
        </article>
        <article class="card">
          <h3>↩️ Restaurer une sauvegarde</h3>
          <p class="muted">Sélectionne un fichier exporté depuis CyberLab Academy.</p>
          <div class="field"><label for="importFile">Fichier JSON</label><input id="importFile" type="file" accept=".json,application/json"></div>
          <button class="btn" data-import>Importer la sauvegarde</button>
        </article>
        <article class="card">
          <h3>🧹 Réinitialiser</h3>
          <p class="muted">Efface la progression et les notes de ce navigateur.</p>
          <button class="btn danger" data-reset>Réinitialiser mes données</button>
        </article>
      </div>
      <h3 class="section-title">Stockage et confidentialité</h3>
      <div class="card">
        <p>Les données sont conservées dans le stockage local de ce navigateur. Elles ne sont pas automatiquement partagées entre plusieurs appareils ou navigateurs.</p>
        <p class="muted">Exporter régulièrement une sauvegarde permet de conserver une copie séparée. Toute importation remplace la progression actuelle.</p>
      </div>`;
  }

  function exportBackup() {
    const json = storage.exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "cyberlab-academy-v8.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("Export JSON préparé.");
  }

  async function importBackup() {
    const file = $("#importFile")?.files?.[0];
    if (!file) {
      notify("Sélectionne un fichier JSON.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      notify("Le fichier dépasse la limite de 2 Mo.");
      return;
    }

    try {
      const text = await file.text();
      if (!confirm("Remplacer les données actuelles par cette sauvegarde ?")) return;

      const result = storage.importJSON(text);
      if (!result.ok) {
        notify(result.message);
        return;
      }

      activeCourse = null;
      quizQuestions = null;
      activeSecurityScenario = null;
      activeDockerIncident = null;
      navigate("dashboard");
      notify("Sauvegarde importée.");
    } catch {
      notify("Impossible de lire ce fichier.");
    }
  }

  function resetData() {
    if (!confirm("Effacer toute la progression, les notes et les résultats de ce navigateur ?")) return;
    const result = storage.reset();

    if (!result.ok) {
      notify(result.message);
      return;
    }

    activeCourse = null;
    quizQuestions = null;
    activeSecurityScenario = null;
    activeDockerIncident = null;
    navigate("dashboard");
    notify("Données réinitialisées.");
  }

  function toggleMissionCheck(input) {
    const [id, rawIndex] = input.dataset.missionCheck.split(":");
    const index = Number(rawIndex);

    storage.update(s => {
      const set = new Set(s.missionChecks[id] || []);
      if (input.checked) set.add(index);
      else set.delete(index);
      s.missionChecks[id] = [...set];
    });

    render();
  }

  function finishMission(id) {
    const mission = data.missions.find(item => item.id === id);
    if (!mission) return;

    const s = getState();
    if (s.completedMissions.includes(id)) {
      notify("Mission déjà validée.");
      return;
    }

    const checks = s.missionChecks[id] || [];
    if (checks.length !== mission.steps.length) {
      notify("Coche toutes les étapes avant de valider.");
      return;
    }

    const result = storage.completeMission(id, mission.xp);
    if (!result.ok) {
      notify(result.message);
      return;
    }

    render();
    notify(`Mission validée : +${mission.xp} XP`);
  }

  content.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.go) return navigate(button.dataset.go);

    if (button.dataset.openCourse) {
      activeCourse = button.dataset.openCourse;
      page = "courses";
      render();
      return;
    }

    if (button.hasAttribute("data-back-courses")) {
      activeCourse = null;
      render();
      return;
    }

    if (button.dataset.completeLesson) {
      const result = storage.completeLesson(button.dataset.completeLesson);
      if (!result.ok) {
        notify(result.message);
        return;
      }
      render();
      notify("Leçon validée : +25 XP");
      return;
    }

    if (button.dataset.finishMission) return finishMission(button.dataset.finishMission);
    if (button.hasAttribute("data-start-quiz")) return startQuiz();

    if (button.hasAttribute("data-cancel-quiz")) {
      quizQuestions = null;
      render();
      return;
    }

    if (button.dataset.netCommand !== undefined) {
      runNetworkCommand(button.dataset.netCommand);
      return;
    }

    if (button.dataset.securityOpen) {
      activeSecurityScenario = button.dataset.securityOpen;
      render();
      return;
    }

    if (button.hasAttribute("data-security-back")) {
      activeSecurityScenario = null;
      render();
      return;
    }

    if (button.dataset.serverToggle) {
      const id = button.dataset.serverToggle;
      const server = data.servers.find(item => item.id === id);
      if (!server) return;

      storage.update(s => {
        const current = s.serverOverrides[id] || server.status;
        s.serverOverrides[id] = current === "down" ? "ok" : "down";
      });
      render();
      return;
    }

    if (button.dataset.serverReset) {
      storage.update(s => { delete s.serverOverrides[button.dataset.serverReset]; });
      render();
      return;
    }

    if (button.dataset.dockerToggle) {
      const id = button.dataset.dockerToggle;
      const service = data.dockerServices.find(item => item.id === id);
      if (!service) return;

      storage.update(s => {
        const key = "docker:" + id;
        const current = s.serverOverrides[key] || service.status;
        s.serverOverrides[key] = current === "running" ? "stopped" : "running";
      });
      render();
      return;
    }

    if (button.dataset.dockerIncident) {
      activeDockerIncident = button.dataset.dockerIncident;
      render();
      return;
    }

    if (button.hasAttribute("data-docker-back")) {
      activeDockerIncident = null;
      render();
      return;
    }

    if (button.dataset.setTheme) {
      storage.setTheme(button.dataset.setTheme);
      render();
      notify("Thème modifié.");
      return;
    }

    if (button.hasAttribute("data-export")) return exportBackup();
    if (button.hasAttribute("data-import")) return importBackup();
    if (button.hasAttribute("data-reset")) return resetData();

    if (button.dataset.deleteNote) {
      storage.update(s => {
        s.journal = s.journal.filter(note => String(note.id) !== button.dataset.deleteNote);
      });
      render();
      notify("Entrée supprimée.");
    }
  });

  content.addEventListener("change", event => {
    const input = event.target;

    if (input.dataset.missionCheck) {
      toggleMissionCheck(input);
      return;
    }

    if (input.dataset.dockerCheck) {
      const [id, rawIndex] = input.dataset.dockerCheck.split(":");
      const index = Number(rawIndex);

      storage.update(s => {
        const set = new Set(s.dockerChecks[id] || []);
        if (input.checked) set.add(index);
        else set.delete(index);
        s.dockerChecks[id] = [...set];
      });

      render();
    }
  });

  content.addEventListener("submit", event => {
    event.preventDefault();

    if (event.target.id === "networkForm") {
      const result = calculateSubnet($("#networkIP").value.trim(), $("#networkPrefix").value);
      $("#networkResult").innerHTML = renderSubnet(result);
      return;
    }

    if (event.target.id === "networkTerminalForm") {
      runNetworkCommand($("#networkCommand").value);
      $("#networkCommand").value = "";
      return;
    }

    if (event.target.id === "quizForm") {
      submitQuiz(event.target);
      return;
    }

    if (event.target.id === "securityForm") {
      submitSecurity(event.target);
      return;
    }

    if (event.target.id === "journalForm") {
      const title = $("#journalTitle").value.trim();
      const category = $("#journalCategory").value;
      const text = $("#journalText").value.trim();

      if (!title || !text) return;

      const result = storage.update(s => {
        s.journal.push({
          id: Date.now(),
          title,
          category,
          text,
          date: new Date().toLocaleString("fr-FR")
        });
        s.journal = s.journal.slice(-300);
      });

      if (!result.ok) {
        notify(result.message);
        return;
      }

      render();
      notify("Entrée ajoutée au carnet.");
    }
  });

  function runNetworkCommand(command) {
    const output = $("#networkTerminal");
    if (!output) return;

    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    const answers = {
      help: "Commandes simulées : help, ipconfig, ip addr, ip route, ping <IP>, clear",
      ipconfig: "Ethernet (simulation)\nIPv4 : 192.168.10.25\nMasque : 255.255.255.0\nPasserelle : 192.168.10.254\nDNS : 192.168.10.10",
      "ip addr": "2: eth0: <UP>\n    inet 192.168.10.25/24",
      "ip route": "default via 192.168.10.254 dev eth0\n192.168.10.0/24 dev eth0"
    };

    if (cmd === "clear") {
      output.textContent = "CyberLab Network Lab V8\n$ ";
      return;
    }

    let result = answers[cmd];
    if (!result && /^ping\s+\d{1,3}(?:\.\d{1,3}){3}$/.test(cmd)) {
      result = "Simulation pédagogique : aucune requête réelle n'a été envoyée.";
    }
    if (!result) result = "Commande non prise en charge. Tape help.";

    output.textContent += `${command}\n${result}\n$ `;
    output.scrollTop = output.scrollHeight;
  }

  $("#navigation").addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (button) navigate(button.dataset.page);
  });

  $("#themeButton").addEventListener("click", () => {
    const next = getState().theme === "light" ? "dark" : "light";
    storage.setTheme(next);
    render();
  });

  $("#menuButton").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
  });

  $("#globalSearch").addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const query = event.currentTarget.value.trim().toLowerCase();
    if (!query) return;

    const course = data.courses.find(item =>
      (item.title + " " + item.description + " " +
       item.lessons.map(lesson => lesson.title + " " + lesson.content).join(" "))
      .toLowerCase().includes(query)
    );

    if (course) {
      activeCourse = course.id;
      page = "courses";
      render();
      return;
    }

    const mission = data.missions.find(item =>
      (item.title + " " + item.description + " " + item.category).toLowerCase().includes(query)
    );

    if (mission) {
      navigate("missions");
      notify("Mission correspondante : " + mission.title);
      return;
    }

    const security = data.securityScenarios.find(item =>
      (item.title + " " + item.description + " " + item.category).toLowerCase().includes(query)
    );

    if (security) {
      activeSecurityScenario = security.id;
      navigate("security");
      activeSecurityScenario = security.id;
      render();
      return;
    }

    notify("Aucun résultat trouvé dans les cours, missions ou scénarios.");
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") $("#sidebar").classList.remove("open");
  });

  function init() {
    if (!storage || !data) {
      content.innerHTML = '<div class="card"><h2>Erreur de chargement</h2><p>Vérifie que data.js et storage.js sont chargés avant app.js.</p></div>';
      return;
    }

    render();
  }

  init();
})();
