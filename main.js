/** Matches bible-2 app.config.ts getScheme() */
const getAppScheme = () => {
  const normalized = window.location.pathname.replace(/\/+$/, "");
  const segments = normalized.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (last === "dev") {
    return "b-rv60-dev";
  }
  return "sb-rv60";
};

const buildDeepLinkURLs = () => {
  const s = getAppScheme();
  return {
    default: `${s}://`,
    dashboard: `${s}://dashboard/`,
    settings: `${s}://settings`,
    home: `${s}://home`,
    search: `${s}://search/`,
    concordance: `${s}://concordance`,
    chooseBook: `${s}://chooseBook`,
    chooseChapterNumber: `${s}://chooseChapterNumber`,
    chooseVerseNumber: `${s}://chooseVerseNumber`,
    favorite: `${s}://favorite`,
    downloadManager: `${s}://downloadManager`,
    notes: `${s}://notes`,
    onboarding: `${s}://onboarding`,
    character: `${s}://character`,
    song: `${s}://song`,
    strongSearchEntire: `${s}://searchStrongWordEntire`,
    dictionarySearch: `${s}://dictionary`,
    noteDetail: `${s}://noteDetail`,
    hymn: `${s}://hymn`,
    game: `${s}://game/`,
    chooseGame: `${s}://chooseGame`,
  };
};

const modal = document.getElementById("modal");
const openAppButton = document.getElementById("open-app");

const getDeepLink = () => {
  const deepLinkURLs = buildDeepLinkURLs();
  const urlParams = new URLSearchParams(window.location.search);
  const screen = urlParams.get("screen") || "default";

  const fullQueryString = window.location.search.substring(1);

  let deepLink = deepLinkURLs[screen] || deepLinkURLs.default;

  if (fullQueryString) {
    deepLink += `?${fullQueryString}`;
  }
  return deepLink;
};

openAppButton?.addEventListener("click", () => {
  const deepLink = getDeepLink();
  window.location.href = deepLink;

  setTimeout(() => {
    if (!modal) return;
    modal.style.display = "flex";
  }, 500);
});

window.onload = () => {
  // OAuth (e.g. Google) returns here with ?code=… — keep https so the in-app browser can hand the URL to the native app.
  // Immediate redirect to a custom scheme would break expo-web-browser openAuthSessionAsync.
  const params = new URLSearchParams(window.location.search);
  if (params.get("code")) {
    const hint = document.querySelector(".container p");
    if (hint) {
      hint.textContent =
        "Autenticación completada. Esta ventana se cerrará al volver a la app.";
    }
    return;
  }
  const deepLink = getDeepLink();
  window.location.href = deepLink;
};
