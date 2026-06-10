import {derived, writable} from 'svelte/store';
import englishMessages from '!../build/unstructure-translations-loader!./en.json';
import localeNames from './locale-names.json';

const allMessages = {
  en: () => englishMessages,
  // Generated code:
  /*===*/
  "ca": () => require("./ca.json"),
  "cs": () => require("./cs.json"),
  "de": () => require("./de.json"),
  "es": () => require("./es.json"),
  "fi": () => require("./fi.json"),
  "fr": () => require("./fr.json"),
  "hu": () => require("./hu.json"),
  "it": () => require("./it.json"),
  "ja": () => require("./ja.json"),
  "ko": () => require("./ko.json"),
  "lt": () => require("./lt.json"),
  "nb": () => require("./nb.json"),
  "nl": () => require("./nl.json"),
  "pl": () => require("./pl.json"),
  "pt": () => require("./pt.json"),
  "pt-br": () => require("./pt-br.json"),
  "ru": () => require("./ru.json"),
  "sl": () => require("./sl.json"),
  "sv": () => require("./sv.json"),
  "tr": () => require("./tr.json"),
  "uk": () => require("./uk.json"),
  "zh-cn": () => require("./zh-cn.json"),
  "zh-tw": () => require("./zh-tw.json"),
  /*===*/
};

// BCP47代码到内部代码的映射
const bcp47ToInternal = {
  'en-US': 'en',
  'ca-ES': 'ca',
  'cs-CZ': 'cs',
  'de-DE': 'de',
  'es-ES': 'es',
  'fi-FI': 'fi',
  'fr-FR': 'fr',
  'hu-HU': 'hu',
  'it-IT': 'it',
  'ja-JP': 'ja',
  'ko-KR': 'ko',
  'lt-LT': 'lt',
  'nb-NO': 'nb',
  'nl-NL': 'nl',
  'pl-PL': 'pl',
  'pt-PT': 'pt',
  'pt-BR': 'pt-br',
  'ru-RU': 'ru',
  'sl-SI': 'sl',
  'sv-SE': 'sv',
  'tr-TR': 'tr',
  'uk-UA': 'uk',
  'zh-CN': 'zh-cn',
  'zh-TW': 'zh-tw'
};

// 从URL中获取语言代码
const getLocaleFromURL = () => {
  const path = window.location.pathname;
  const match = path.match(/\/tool\/scratchpackager\/([a-z]{2}-[A-Z]{2})\//);
  if (match) {
    const bcp47Code = match[1];
    const internalCode = bcp47ToInternal[bcp47Code];
    if (internalCode && allMessages[internalCode]) {
      return internalCode;
    }
  }
  return null;
};

// 完全从URL读取语言，不使用localStorage
const getInitialLocale = () => {
  const urlLocale = getLocaleFromURL();
  if (urlLocale) {
    return urlLocale;
  }
  // 如果URL中没有语言，使用浏览器语言
  const browserLang = navigator.language.toLowerCase();
  const browserLangShort = browserLang.split('-')[0];
  // 尝试匹配完整的浏览器语言代码
  const matchFull = Object.entries(bcp47ToInternal).find(([k]) => k.toLowerCase() === browserLang);
  if (matchFull && allMessages[matchFull[1]]) {
    return matchFull[1];
  }
  // 尝试匹配语言代码的前缀
  const matchShort = Object.entries(bcp47ToInternal).find(([k]) => k.toLowerCase().startsWith(browserLangShort));
  if (matchShort && allMessages[matchShort[1]]) {
    return matchShort[1];
  }
  return 'en';
};

const locale = writable(getInitialLocale());
locale.subscribe((lang) => {
  if (!allMessages[lang]) {
    locale.set('en');
  }
  document.documentElement.lang = lang;
});

const getProperty = (obj, id) => {
  const parts = id.split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    obj = obj[parts[i]];
    if (!obj) {
      return null;
    }
  }
  return obj[parts[parts.length - 1]] || null;
};

const translate = derived(locale, (locale) => {
  const localMessages = allMessages[locale]();
  /**
   * @param {string} id Message ID
   * @returns {string} Translated message
   */
  const translateMessage = (id) => {
    return getProperty(localMessages, id) || getProperty(englishMessages, id) || id;
  };
  translate.translate = translateMessage;
  return translateMessage;
});

export {
  locale,
  localeNames,
  translate as _
};
