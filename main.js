import languages from "./languages.js";
const selectFrom = document.getElementById("from-lang");
const selecTo = document.getElementById("to-lang");
const translateBtn = document.getElementById("btn-translate");
const textareaFrom = document.getElementById("from-text");
const textareaTo = document.getElementById("to-text");
const changeLangandText = document.getElementById("changeLangandText");
const fromCopy = document.getElementById("from-copy-btn");
const toCopy = document.getElementById("to-copy-btn");

function addLanguagesToOptions(languages) {
  for (const key in languages) {
    const option = `<option value='${key}'>${languages[key]}</option>`;
    selectFrom.innerHTML = selecTo.innerHTML += option;
  }
}

async function translateText() {
  const fromLang = selectFrom.value.split("-")[0];
  const toLang = selecTo.value.split("-")[0];
  const res = await sendRequest(fromLang, toLang);
  textareaTo.value = res.responseData.translatedText;
}

async function sendRequest(fromLang, toLang) {
  const base_url = `https://api.mymemory.translated.net/get?q=${textareaFrom.value}!&langpair=${fromLang}|${toLang}`;
  const res = await fetch(base_url);
  const data = await res.json();
  return data;
}

function changeInputs() {
  [selectFrom.value, selecTo.value] = [selecTo.value, selectFrom.value];
  [textareaFrom.value, textareaTo.value] = [
    textareaTo.value,
    textareaFrom.value,
  ];
}

function copyTextFrom() {
  navigator.clipboard.writeText(textareaFrom.value);
}

function copyTextTo() {
  navigator.clipboard.writeText(textareaTo.value);
}

translateBtn.addEventListener("click", translateText);
changeLangandText.addEventListener("click", changeInputs);
fromCopy?.addEventListener("click", copyTextFrom);
toCopy?.addEventListener("click", copyTextTo);

addLanguagesToOptions(languages);
