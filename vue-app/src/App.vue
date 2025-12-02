<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="nav-container">
      <div class="nav-content">
        <div class="nav-logo">
          <i class="fas fa-brain logo-icon"></i>
          <span class="logo-text">Detecta</span>
        </div>
        <div class="nav-links">
          <a href="#features" class="nav-link">{{ $t('nav.features') }}</a>
          <a href="#how-it-works" class="nav-link">{{ $t('nav.howItWorks') }}</a>
          <a href="#languages" class="nav-link">{{ $t('nav.languages') }}</a>
          <LanguageSelector />
          <ThemeToggle />
          <button @click="scrollToDetector" class="btn-primary">
            {{ $t('nav.tryNow') }}
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fas fa-shield-alt"></i>
          <span>{{ $t('hero.badge') }}</span>
        </div>
        
        <h1 class="hero-title">
          {{ $t('hero.title') }}
          <span class="gradient-text">{{ $t('hero.titleHighlight') }}</span>
        </h1>
        
        <p class="hero-description">
          {{ $t('hero.description') }}
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">80+</div>
            <div class="stat-label">{{ $t('hero.stats.languages') }}</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">99%</div>
            <div class="stat-label">{{ $t('hero.stats.accuracy') }}</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">{{ $t('hero.stats.realtime') }}</div>
            <div class="stat-label">{{ $t('hero.stats.analysis') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Detector Section -->
    <DetectorSection />

    <!-- Features Section -->
    <FeaturesSection />

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <i class="fas fa-brain"></i>
            <span>Detecta</span>
          </div>
          <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
        </div>
        
        <div class="footer-copyright">
          <p>{{ $t('footer.copyright') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import DetectorSection from './components/DetectorSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import { i18nMixin } from './i18n/i18n.js'

export default {
  name: 'App',
  mixins: [i18nMixin],
  components: {
    DetectorSection,
    FeaturesSection,
    ThemeToggle,
    LanguageSelector
  },
  data() {
    return {
      currentLanguage: 'en'
    }
  },
  methods: {
    scrollToDetector() {
      const detectorSection = document.getElementById('detector')
      if (detectorSection) {
        detectorSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    setLanguage(lang) {
      this.currentLanguage = lang
      localStorage.setItem('detecta-language', lang)
    },
    detectBrowserLanguage() {
      const browserLang = navigator.language || navigator.userLanguage
      const langCode = browserLang.split('-')[0] // Get 'en' from 'en-US'
      const supportedLangs = ['en', 'es', 'fr', 'de']
      return supportedLangs.includes(langCode) ? langCode : 'en'
    }
  },
  mounted() {
    // Initialize language
    const savedLang = localStorage.getItem('detecta-language')
    this.currentLanguage = savedLang || this.detectBrowserLanguage()

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })

    // Add scroll effect to navigation
    let lastScroll = 0
    const nav = document.querySelector('.nav-container')
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset
      
      if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)'
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)'
        nav.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }
      
      lastScroll = currentScroll
    })
  }
}
</script>

<style>
@import './assets/styles.css';
@import './assets/dark-mode.css';
</style>
