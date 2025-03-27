const deepLinkURLs = {
  default: "sb-rv60://",
  dashboard: "sb-rv60://dashboard/",
  settings: "sb-rv60://settings",
  home: "sb-rv60://home",
  search: "sb-rv60://search/",
  concordance: "sb-rv60://concordance",
  chooseBook: "sb-rv60://chooseBook",
  chooseChapterNumber: "sb-rv60://chooseChapterNumber",
  chooseVerseNumber: "sb-rv60://chooseVerseNumber",
  favorite: "sb-rv60://favorite",
  downloadManager: "sb-rv60://downloadManager",
  notes: "sb-rv60://notes",
  onboarding: "sb-rv60://onboarding",
  character: "sb-rv60://character",
  song: "sb-rv60://song",
  strongSearchEntire: "sb-rv60://searchStrongWordEntire",
  dictionarySearch: "sb-rv60://dictionary",
  noteDetail: "sb-rv60://noteDetail",
  hymn: "sb-rv60://hymn",
  game: "sb-rv60://game/",
  chooseGame: "sb-rv60://chooseGame",
};

const modal = document.getElementById("modal");
const openAppButton = document.getElementById("open-app");

const getDeepLink = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const screen = urlParams.get("screen") || "default";

  // Capture everything after "?" in the URL
  const fullQueryString = window.location.search.substring(1); // Remove "?"

  let deepLink = deepLinkURLs[screen] || deepLinkURLs.default;

  // Append full Google OAuth response if it exists
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
  const deepLink = getDeepLink();
  window.location.href = deepLink;
};
