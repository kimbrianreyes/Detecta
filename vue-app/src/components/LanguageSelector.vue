<template>
  <div class="language-selector-wrapper">
    <button @click="isOpen = !isOpen" class="language-button">
      <i class="fas fa-globe"></i>
      <span>{{ currentLanguageName }}</span>
      <i :class="isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </button>

    <div v-if="isOpen" class="language-dropdown">
      <button
        v-for="(name, code) in languages"
        :key="code"
        @click="selectLanguage(code)"
        class="language-option"
        :class="{ active: currentLanguage === code }"
      >
        <span>{{ name }}</span>
        <i v-if="currentLanguage === code" class="fas fa-check"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { languageNames } from '../i18n/translations.js'

export default {
  name: 'LanguageSelector',
  data() {
    return {
      isOpen: false,
      languages: languageNames
    }
  },
  computed: {
    currentLanguage() {
      return this.$root.currentLanguage || 'en'
    },
    currentLanguageName() {
      return this.languages[this.currentLanguage] || 'English'
    }
  },
  methods: {
    selectLanguage(code) {
      this.$root.setLanguage(code)
      this.isOpen = false
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    })
  }
}
</script>

<style scoped>
.language-selector-wrapper {
  position: relative;
}

.language-button {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1rem;
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
}

.language-button:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-primary);
}

.language-button i:first-child {
  font-size: 1rem;
}

.language-button i:last-child {
  font-size: 0.75rem;
  margin-left: auto;
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 160px;
  z-index: 1000;
  overflow: hidden;
}

.language-option {
  width: 100%;
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  color: var(--color-text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}

.language-option:hover {
  background: var(--color-bg-secondary);
}

.language-option.active {
  background: rgba(37, 99, 235, 0.1);
  color: var(--color-primary);
  font-weight: 600;
}

.language-option i {
  font-size: 0.875rem;
  color: var(--color-primary);
}
</style>
