/**
 * Main JavaScript functionality for PFinalClub Games
 * Handles language switching and other interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const langSwitch = document.getElementById('langSwitch');
    const currentLangElement = document.getElementById('currentLang');
    const htmlElement = document.documentElement;

    // Initialize language
    let currentLang = localStorage.getItem('language') || 'en';
    updateLanguage(currentLang);

    // Language switch event
    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            updateLanguage(currentLang);
            localStorage.setItem('language', currentLang);
        });
    }

    // Update all text elements with the selected language
    function updateLanguage(lang) {
        // Update HTML lang attribute
        htmlElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
        
        // Update language display
        if (currentLangElement) {
            currentLangElement.textContent = lang === 'zh' ? '中文' : 'English';
        }
        
        // Update all elements with data-lang-key attribute
        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (languages[lang][key]) {
                element.textContent = languages[lang][key];
            }
        });
        
        // Update image alt texts and placeholders if needed
        const langImages = document.querySelectorAll('[data-lang-img]');
        langImages.forEach(img => {
            const gameType = img.getAttribute('data-lang-img');
            const text = lang === 'zh' ? getChineseGameName(gameType) : getEnglishGameName(gameType);
            const src = img.src;
            const newSrc = src.replace(/text=([^&]+)/, `text=${encodeURIComponent(text)}`);
            img.src = newSrc;
            img.alt = text;
        });
    }

    // Check if there's a saved language preference and apply it
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }
});

// Add any additional functionality below
