<script>
  import {locale, localeNames} from '../locales/index';
  
  // 语言代码映射：项目内部代码 -> BCP47代码
  const localeToBCP47 = {
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
  
  const BASE_PATH = '/tool/scratchpackager';
  
  // 从URL获取当前语言
  function getCurrentLocaleFromURL() {
    const path = window.location.pathname;
    const match = path.match(/\/tool\/scratchpackager\/([a-z]{2}-[A-Z]{2})\//);
    if (match) {
      const bcp47Code = match[1];
      const entry = Object.entries(localeToBCP47).find(([_, v]) => v === bcp47Code);
      if (entry) {
        return entry[0];
      }
    }
    return 'en';
  }
  
  // 当前语言从URL读取
  let currentLocale = getCurrentLocaleFromURL();
  
  function handleLocaleChange(event) {
    const newLocale = event.target.value;
    const bcp47Code = localeToBCP47[newLocale] || newLocale;
    const newURL = `${BASE_PATH}/${bcp47Code}/`;
    
    // 使用JS跳转到新语言的URL
    window.location.href = newURL;
  }
</script>

<select value={currentLocale} on:change={handleLocaleChange}>
  {#each Object.entries(localeNames) as [loc, name]}
    <option value={loc}>{name || loc}</option>
  {/each}
</select>
