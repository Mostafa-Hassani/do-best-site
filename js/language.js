document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('language') || 'en';
  document.getElementById('language-select').value = defaultLang;
  loadTranslations(defaultLang);
  document.documentElement.lang = defaultLang;
});

function changeLanguage() {
  const lang = document.getElementById('language-select').value;
  localStorage.setItem('language', lang);
  window.location.search = `lang=${lang}`;
}

async function loadTranslations(lang) {
  try {
    const response = await fetch(`translations/${lang}.json`);
    const translations = await response.json();
    
    // Update text content
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[key]) {
        element.innerHTML = translations[key];
      }
    });
    
    // Update placeholder attributes
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      if (translations[key]) {
        element.placeholder = translations[key];
      }
    });
    
    // Update page title
    const titleElement = document.querySelector('title[data-translate]');
    if (titleElement && translations[titleElement.getAttribute('data-translate')]) {
      document.title = translations[titleElement.getAttribute('data-translate')];
    }
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}