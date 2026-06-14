<script>
  import {onMount} from 'svelte';
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
  let container;
  
  // JS加载后，隐藏链接列表，显示下拉框
  onMount(() => {
    if (container) {
      const linksDiv = container.querySelector('.locale-links');
      const selectEl = container.querySelector('select');
      if (linksDiv && selectEl) {
        linksDiv.style.display = 'none';
        selectEl.style.display = 'block';
      }
    }
  });
  
  function handleLocaleChange(event) {
    const newLocale = event.target.value;
    const bcp47Code = localeToBCP47[newLocale] || newLocale;
    const newURL = `${BASE_PATH}/${bcp47Code}/`;
    
    // 使用JS跳转到新语言的URL
    window.location.href = newURL;
  }
  
  // 生成语言链接URL
  function getLocaleURL(loc) {
    const bcp47Code = localeToBCP47[loc] || loc;
    return `${BASE_PATH}/${bcp47Code}/`;
  }
</script>

<div bind:this={container}>
  <!-- 无JS时显示超链接列表，搜索引擎可抓取 -->
  <div class="locale-links" aria-label="Select Language">
    {#each Object.entries(localeNames) as [loc, name]}
      <a href={getLocaleURL(loc)} hreflang={localeToBCP47[loc] || loc} 
         class:active={loc === currentLocale} title={name || loc}>
        {name || loc}
      </a>
    {/each}
  </div>

  <!-- JS加载后会显示下拉框 -->
  <select value={currentLocale} on:change={handleLocaleChange} style="display:none">
    {#each Object.entries(localeNames) as [loc, name]}
      <option value={loc}>{name || loc}</option>
    {/each}
  </select>
</div>

<style>
  .locale-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    padding: 0.5rem 0;
    font-size: 0.85rem;
  }
  
  .locale-links a {
    color: inherit;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .locale-links a:hover {
    background-color: rgba(128, 128, 128, 0.2);
    text-decoration: underline;
  }
  
  .locale-links a.active {
    font-weight: bold;
    background-color: rgba(128, 128, 128, 0.15);
  }
</style>
