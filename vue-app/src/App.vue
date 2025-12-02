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
          <a href="#features" class="nav-link">Features</a>
          <a href="#how-it-works" class="nav-link">How It Works</a>
          <a href="#languages" class="nav-link">Languages</a>
          <button @click="scrollToDetector" class="btn-primary">
            Try Now
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
          <span>State-of-the-Art AI Detection</span>
        </div>
        
        <h1 class="hero-title">
          Detect AI Content with
          <span class="gradient-text">Unprecedented Accuracy</span>
        </h1>
        
        <p class="hero-description">
          Powered by advanced language models trained on millions of samples. 
          Identify ChatGPT, GPT-4, Gemini, DeepSeek, and more across 80+ languages.
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">80+</div>
            <div class="stat-label">Languages</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">99%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">Real-time</div>
            <div class="stat-label">Analysis</div>
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
          <p class="footer-tagline">Advanced AI Content Detection</p>
        </div>
        
        <div class="footer-copyright">
          <p>&copy; 2025 Detecta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import DetectorSection from './components/DetectorSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'

export default {
  name: 'App',
  components: {
    DetectorSection,
    FeaturesSection
  },
  methods: {
    scrollToDetector() {
      const detectorSection = document.getElementById('detector')
      if (detectorSection) {
        detectorSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  },
  mounted() {
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
</style>
