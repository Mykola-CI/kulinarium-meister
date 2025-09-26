/**
 * Complete Multilingual Text Switcher with Flag-Only Display
 * Handles language switching using double-dot separator pattern
 * Features: Flag-only button display, localStorage persistence, URL params, auto-detection
 */
class MultilingualSwitcher {
  constructor() {
    this.currentLanguage = 0 // Default to first language (Ukrainian)
    this.languages = [
      { code: 'uk', name: 'Українська', flag: '🇺🇦' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'pl', name: 'Polski', flag: '🇵🇱' },
      { code: 'ru', name: 'Русский', flag: '[Ru]' },
    ]

    this.init()
  }

  init() {
    // Handle URL parameters first
    this.handleURLParams()

    // Load saved language preference (URL params take precedence)
    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (savedLanguage !== null && !this.urlLangSet) {
      this.currentLanguage = parseInt(savedLanguage)
    }

    // Auto-detect user language if no preference is set
    if (!savedLanguage && !this.urlLangSet) {
      this.currentLanguage = this.detectUserLanguage()
    }

    // Set up event listeners
    this.setupEventListeners()

    // Apply initial language
    this.applyLanguage(this.currentLanguage)
  }

  /**
   * Auto-detect user's preferred language based on browser settings
   */
  detectUserLanguage() {
    const userLang = navigator.language || navigator.userLanguage
    const langMap = {
      uk: 0,
      'uk-UA': 0,
      en: 1,
      'en-US': 1,
      'en-GB': 1,
      pl: 2,
      'pl-PL': 2,
      ru: 3,
      'ru-RU': 3,
    }

    return langMap[userLang] || langMap[userLang.split('-')[0]] || 0
  }

  /**
   * Handle URL parameters for language switching
   */
  handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')

    if (langParam) {
      const langIndex = this.languages.findIndex(
        (lang) => lang.code === langParam
      )
      if (langIndex !== -1) {
        this.currentLanguage = langIndex
        this.urlLangSet = true
      }
    }
  }

  /**
   * Update URL with current language parameter
   */
  updateURL(langIndex) {
    const url = new URL(window.location)
    url.searchParams.set('lang', this.languages[langIndex].code)
    window.history.replaceState({}, '', url)
  }

  setupEventListeners() {
    // Language selection from dropdown
    document.querySelectorAll('.language-option').forEach((option) => {
      option.addEventListener('click', (e) => {
        e.preventDefault()
        const langIndex = parseInt(e.currentTarget.dataset.lang)
        this.switchLanguage(langIndex)
      })
    })

    // Handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.processNewElements(node)
            }
          })
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  switchLanguage(langIndex) {
    if (langIndex === this.currentLanguage) return;

    // Add transition class
    document.body.classList.add('language-transition')

    // Short delay for smooth transition
    setTimeout(() => {
      this.currentLanguage = langIndex
      this.applyLanguage(langIndex)

      // Save preference
      localStorage.setItem('selectedLanguage', langIndex.toString())

      // Update URL
      this.updateURL(langIndex)

      // Complete transition
      document.body.classList.add('complete')
      setTimeout(() => {
        document.body.classList.remove('language-transition', 'complete')
      }, 300)
    }, 150)
  }

  applyLanguage(langIndex) {
    // First, show all previously hidden elements
    document
      .querySelectorAll('[data-hidden-by-lang="true"]')
      .forEach((element) => {
        element.style.display = ''
        element.removeAttribute('data-hidden-by-lang')
      })

    // Update all multilingual text elements
    document.querySelectorAll('.multilingual-text').forEach((element) => {
      this.updateElementText(element, langIndex)
    })

    // Update language switcher button (flag only)
    this.updateLanguageSwitcher(langIndex)

    // Update active language in dropdown
    this.updateActiveLanguage(langIndex)

    // Update page language attribute
    document.documentElement.lang = this.languages[langIndex].code

    // Update meta tags for SEO
    this.updateMetaTags(langIndex)

    // Trigger custom event for other scripts
    document.dispatchEvent(
      new CustomEvent('languageChanged', {
        detail: {
          languageIndex: langIndex,
          languageCode: this.languages[langIndex].code,
          languageName: this.languages[langIndex].name,
          languageFlag: this.languages[langIndex].flag,
        },
      })
    )
  }

  updateElementText(element, langIndex) {
    const originalText = element.dataset.originalText || element.textContent;

    // Store original text if not already stored
    if (!element.dataset.originalText) {
      element.dataset.originalText = originalText
    }

    // Split by double dots and get the appropriate language
    const textParts = originalText.split('..')

    if (textParts.length > langIndex) {
      const newText = textParts[langIndex].trim()

      // Check if current language text is empty
      if (newText === '') {
        this.hideElementCompletely(element)
        return // Exit early, don't process text
      } else {
        this.showElementCompletely(element)
      }

      // Handle different element types
      if (
        element.tagName === 'INPUT' &&
        (element.type === 'button' || element.type === 'submit')
      ) {
        element.value = newText
      } else if (element.tagName === 'INPUT' && element.placeholder) {
        // Handle placeholder text
        const placeholderParts = element.placeholder.split('..')
        if (placeholderParts.length > langIndex) {
          element.placeholder = placeholderParts[langIndex].trim()
        }
      } else if (element.hasAttribute('title')) {
        // Handle title attributes
        const titleParts = element.title.split('..')
        if (titleParts.length > langIndex) {
          element.title = titleParts[langIndex].trim()
        }
      } else if (element.hasAttribute('alt')) {
        // Handle alt attributes for images
        const altParts = element.alt.split('..')
        if (altParts.length > langIndex) {
          element.alt = altParts[langIndex].trim()
        }
      } else {
        // Handle text content, preserving HTML structure
        if (element.children.length === 0) {
          element.textContent = newText
        } else {
          // For elements with children, only update text nodes
          this.updateTextNodes(element, newText, originalText)
        }
      }
    }
  }

  updateTextNodes(element, newText, originalText) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    )

    const textNodes = []
    let node
    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes('..')) {
        textNodes.push(node)
      }
    }

    textNodes.forEach((textNode) => {
      const parts = textNode.nodeValue.split('..')
      if (parts.length > this.currentLanguage) {
        textNode.nodeValue = parts[this.currentLanguage].trim()
      }
    })
  }

  /**
   * Update language switcher button - ONLY FLAG DISPLAY
   */
  updateLanguageSwitcher(langIndex) {
    const currentLangFlagEl = document.querySelectorAll(
      '.current-language-flag'
    )
    if (currentLangFlagEl) {
      currentLangFlagEl.forEach((el) => {
        const lang = this.languages[langIndex]
        el.textContent = lang.flag // Only flag, no text
      })
    }
  }

  updateActiveLanguage(langIndex) {
    // Remove active class from all options
    document.querySelectorAll('.language-option').forEach((option) => {
      option.classList.remove('active')
    })

    // Add active class to selected option
    const activeOption = document.querySelector(`[data-lang="${langIndex}"]`)
    if (activeOption) {
      activeOption.classList.add('active')
    }
  }

  /**
   * Update meta tags for SEO optimization
   */
  updateMetaTags(langIndex) {
    const langCode = this.languages[langIndex].code

    // Update hreflang
    let hrefLangMeta = document.querySelector('link[rel="alternate"][hreflang]')
    if (hrefLangMeta) {
      hrefLangMeta.setAttribute('hreflang', langCode)
    }

    // Update content language
    let contentLangMeta = document.querySelector(
      'meta[http-equiv="content-language"]'
    )
    if (contentLangMeta) {
      contentLangMeta.setAttribute('content', langCode)
    } else {
      // Create meta tag if it doesn't exist
      contentLangMeta = document.createElement('meta')
      contentLangMeta.setAttribute('http-equiv', 'content-language')
      contentLangMeta.setAttribute('content', langCode)
      document.head.appendChild(contentLangMeta)
    }

    // Update og:locale for social media
    let ogLocaleMeta = document.querySelector('meta[property="og:locale"]')
    if (ogLocaleMeta) {
      const localeMap = {
        uk: 'uk_UA',
        en: 'en_US',
        pl: 'pl_PL',
        ru: 'ru_RU',
      }
      ogLocaleMeta.setAttribute('content', localeMap[langCode] || 'en_US')
    }
  }

  processNewElements(container) {
    // Process any new multilingual elements added to the DOM
    container.querySelectorAll('.multilingual-text').forEach((element) => {
      this.updateElementText(element, this.currentLanguage)
    })
  }

  /**
   * Public method to get current language info
   */
  getCurrentLanguage() {
    return {
      index: this.currentLanguage,
      code: this.languages[this.currentLanguage].code,
      name: this.languages[this.currentLanguage].name,
      flag: this.languages[this.currentLanguage].flag,
    };
  }

  /**
   * Public method to programmatically switch language
   */
  setLanguage(langCode) {
    const langIndex = this.languages.findIndex((lang) => lang.code === langCode)
    if (langIndex !== -1) {
      this.switchLanguage(langIndex)
      return true
    }
    return false
  }

  /**
   * Public method to add a new language
   */
  addLanguage(languageObj) {
    if (languageObj.code && languageObj.name && languageObj.flag) {
      this.languages.push(languageObj)
      return this.languages.length - 1 // Return new language index
    }
    return false
  }

  /**
   * Public method to get all available languages
   */
  getAvailableLanguages() {
    return [...this.languages] // Return copy to prevent external modification
  }

  /**
   * Check if a specific language code is supported
   */
  isLanguageSupported(langCode) {
    return this.languages.some((lang) => lang.code === langCode)
  }

  /**
   * Get language index by code
   */
  getLanguageIndex(langCode) {
    return this.languages.findIndex((lang) => lang.code === langCode)
  }

  /**
   * Hide element completely when language text is empty
   * Finds the appropriate container to hide based on element hierarchy
   */
  hideElementCompletely(element) {
    const containerToHide = this.findContainerToHide(element)
    if (containerToHide) {
      containerToHide.style.display = 'none'
      containerToHide.setAttribute('data-hidden-by-lang', 'true')
    }
  }

  /**
   * Show element when switching back to a language with content
   */
  showElementCompletely(element) {
    const containerToShow = this.findContainerToHide(element)
    if (
      containerToShow &&
      containerToShow.hasAttribute('data-hidden-by-lang')
    ) {
      containerToShow.style.display = ''
      containerToShow.removeAttribute('data-hidden-by-lang')
    }
  }

  /**
   * Find the appropriate container to hide based on element context
   * For dropdowns, navigation items, etc.
   */
  findContainerToHide(element) {
    // Check if element is inside a dropdown
    const dropdownContainer = element.closest('.dropdown')
    if (dropdownContainer) {
      return dropdownContainer
    }

    // Check if element is a navigation item
    const navItem = element.closest('.nav-item, .Header-nav-item')
    if (navItem) {
      return navItem
    }

    // Check if element is inside a list item
    const listItem = element.closest('li')
    if (listItem) {
      return listItem
    }

    // Check if element is inside a card or section
    const card = element.closest('.card, .section, .component')
    if (card) {
      return card
    }

    // Default: hide the element itself
    return element
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Create global instance
  window.multilingualSwitcher = new MultilingualSwitcher()

  // Debug information (remove in production)
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    console.log('Multilingual Switcher initialized')
    console.log(
      'Current language:',
      window.multilingualSwitcher.getCurrentLanguage()
    )
    console.log(
      'Available languages:',
      window.multilingualSwitcher.getAvailableLanguages()
    )
  }
})

// Legacy support for existing languageClicked function
function languageClicked(langIndex) {
  if (window.multilingualSwitcher) {
    window.multilingualSwitcher.switchLanguage(langIndex);
  }
}

// Additional utility functions for external use

/**
 * Quick language switch by code
 */
function switchToLanguage(langCode) {
  if (window.multilingualSwitcher) {
    return window.multilingualSwitcher.setLanguage(langCode)
  }
  return false;
}

/**
 * Get current language code
 */
function getCurrentLanguageCode() {
  if (window.multilingualSwitcher) {
    return window.multilingualSwitcher.getCurrentLanguage().code
  }
  return null;
}

/**
 * Listen for language change events
 * Usage: onLanguageChange(function(event) { console.log('Language changed to:', event.detail.languageCode); });
 */
function onLanguageChange(callback) {
  document.addEventListener('languageChanged', callback)
}

/**
 * Remove language change event listener
 */
function offLanguageChange(callback) {
  document.removeEventListener('languageChanged', callback)
}
