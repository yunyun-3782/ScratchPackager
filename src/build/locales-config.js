// 语言代码映射：项目内部代码 -> URL使用的BCP47代码
const localeMap = {
  'en': 'en-US',
  'ca': 'ca-ES',
  'cs': 'cs-CZ',
  'de': 'de-DE',
  'es': 'es-ES',
  'fi': 'fi-FI',
  'fr': 'fr-FR',
  'hu': 'hu-HU',
  'it': 'it-IT',
  'ja': 'ja-JP',
  'ko': 'ko-KR',
  'lt': 'lt-LT',
  'nb': 'nb-NO',
  'nl': 'nl-NL',
  'pl': 'pl-PL',
  'pt': 'pt-PT',
  'pt-br': 'pt-BR',
  'ru': 'ru-RU',
  'sl': 'sl-SI',
  'sv': 'sv-SE',
  'tr': 'tr-TR',
  'uk': 'uk-UA',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW'
};

// 获取所有支持的BCP47语言代码
const getSupportedLocales = () => Object.values(localeMap);

// 根据项目内部代码获取BCP47代码
const getBCP47Code = (internalCode) => localeMap[internalCode] || internalCode;

// 根据BCP47代码获取项目内部代码
const getInternalCode = (bcp47Code) => {
  const entry = Object.entries(localeMap).find(([_, v]) => v === bcp47Code);
  return entry ? entry[0] : bcp47Code.toLowerCase();
};

// 基础路径
const BASE_PATH = '/tool/scratchpackager';

module.exports = {
  localeMap,
  getSupportedLocales,
  getBCP47Code,
  getInternalCode,
  BASE_PATH
};
