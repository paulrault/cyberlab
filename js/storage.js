
"use strict";

window.CyberStorage = (() => {
  const KEY = "cyberlab-academy-v8";
  const VERSION = 8;

  const defaults = {
    version: VERSION,
    xp: 0,
    completedLessons: [],
    completedMissions: [],
    missionChecks: {},
    quizHistory: [],
    securityResults: [],
    dockerChecks: {},
    serverOverrides: {},
    journal: [],
    theme: "dark"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function cleanState(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Format de sauvegarde incorrect.");
    }

    const next = { ...defaults, ...value };

    if (!Number.isFinite(next.xp) || next.xp < 0) {
      throw new Error("Valeur XP incorrecte.");
    }

    for (const key of [
      "completedLessons",
      "completedMissions",
      "quizHistory",
      "securityResults",
      "journal"
    ]) {
      if (!Array.isArray(next[key])) {
        throw new Error("Donnée incorrecte : " + key);
      }
    }

    for (const key of [
      "missionChecks",
      "dockerChecks",
      "serverOverrides"
    ]) {
      if (!next[key] || typeof next[key] !== "object" || Array.isArray(next[key])) {
        next[key] = {};
      }
    }

    next.xp = Math.floor(next.xp);
    next.completedLessons = [...new Set(
      next.completedLessons.filter(x => typeof x === "string")
    )];
    next.completedMissions = [...new Set(
      next.completedMissions.filter(x => typeof x === "string")
    )];

    next.quizHistory = next.quizHistory
      .filter(x => x && Number.isFinite(x.score))
      .slice(-100);

    next.securityResults = next.securityResults
      .filter(x => x && typeof x.id === "string")
      .slice(-100);

    next.journal = next.journal
      .filter(x => x && typeof x.title === "string" && typeof x.text === "string")
      .slice(-300);

    next.theme = next.theme === "light" ? "light" : "dark";
    next.version = VERSION;

    return next;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(defaults);
      return cleanState(JSON.parse(raw));
    } catch (error) {
      console.warn("CyberLab Academy : chargement local impossible.", error);
      return clone(defaults);
    }
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error("CyberLab Academy : sauvegarde impossible.", error);
      return false;
    }
  }

  function getState() {
    return clone(state);
  }

  function update(mutator) {
    const draft = getState();
    mutator(draft);
    state = cleanState(draft);

    if (!save()) {
      return {
        ok: false,
        message: "Sauvegarde impossible. Vérifie l'espace disponible du navigateur."
      };
    }

    return { ok: true, state: getState() };
  }

  function addXP(amount) {
    const n = Number(amount);
    if (!Number.isFinite(n) || n < 0) return;
    update(s => { s.xp += Math.floor(n); });
  }

  function completeLesson(key) {
    if (state.completedLessons.includes(key)) {
      return { ok: false, message: "Cette leçon est déjà terminée." };
    }

    return update(s => {
      s.completedLessons.push(key);
      s.xp += 25;
    });
  }

  function completeMission(id, reward) {
    if (state.completedMissions.includes(id)) {
      return { ok: false, message: "Cette mission est déjà terminée." };
    }

    return update(s => {
      s.completedMissions.push(id);
      s.xp += Math.max(0, Math.floor(Number(reward) || 0));
    });
  }

  function setTheme(theme) {
    return update(s => {
      s.theme = theme === "light" ? "light" : "dark";
    });
  }

  function exportJSON() {
    return JSON.stringify({
      app: "CyberLab Academy",
      version: VERSION,
      exportedAt: new Date().toISOString(),
      state: getState()
    }, null, 2);
  }

  function validateImport(parsed) {
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Fichier JSON invalide.");
    }

    if (parsed.app !== "CyberLab Academy" || !parsed.state) {
      throw new Error("Ce fichier ne semble pas être une sauvegarde CyberLab Academy.");
    }

    return cleanState(parsed.state);
  }

  function importJSON(text) {
    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      return { ok: false, message: "Le fichier n'est pas un JSON valide." };
    }

    let incoming;

    try {
      incoming = validateImport(parsed);
    } catch (error) {
      return { ok: false, message: error.message };
    }

    const previous = state;
    state = incoming;

    if (!save()) {
      state = previous;
      return {
        ok: false,
        message: "Import impossible : le navigateur n'a pas pu enregistrer les données."
      };
    }

    return { ok: true, state: getState() };
  }

  function reset() {
    const previous = state;
    state = clone(defaults);

    if (!save()) {
      state = previous;
      return { ok: false, message: "Réinitialisation impossible." };
    }

    return { ok: true, state: getState() };
  }

  return {
    getState,
    update,
    addXP,
    completeLesson,
    completeMission,
    setTheme,
    exportJSON,
    importJSON,
    reset
  };
})();
