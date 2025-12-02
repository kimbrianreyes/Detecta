<template>
  <div class="history-panel" v-if="showHistory">
    <div class="history-header">
      <h3>
        <i class="fas fa-history"></i>
        Recent Analyses
      </h3>
      <button @click="clearHistory" class="clear-btn" v-if="history.length > 0">
        <i class="fas fa-trash"></i>
        Clear All
      </button>
    </div>

    <div v-if="history.length === 0" class="empty-state">
      <i class="fas fa-inbox"></i>
      <p>No history yet</p>
    </div>

    <div v-else class="history-list">
      <div 
        v-for="(item, index) in history" 
        :key="index"
        class="history-item"
        @click="loadHistoryItem(item)"
      >
        <div class="history-item-header">
          <span class="history-date">{{ formatDate(item.timestamp) }}</span>
          <span class="history-score" :class="getScoreClass(item.results.aiScore)">
            {{ Math.round(item.results.aiScore) }}% AI
          </span>
        </div>
        <div class="history-text">{{ truncateText(item.text) }}</div>
        <button 
          @click.stop="deleteHistoryItem(index)" 
          class="delete-btn"
          aria-label="Delete this item"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextHistory',
  props: {
    showHistory: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      history: []
    }
  },
  mounted() {
    this.loadHistory()
  },
  methods: {
    loadHistory() {
      const saved = localStorage.getItem('detecta-history')
      if (saved) {
        this.history = JSON.parse(saved)
      }
    },

    saveToHistory(text, results) {
      const item = {
        text,
        results,
        timestamp: Date.now()
      }

      this.history.unshift(item)
      
      // Keep only last 10 items
      if (this.history.length > 10) {
        this.history = this.history.slice(0, 10)
      }

      localStorage.setItem('detecta-history', JSON.stringify(this.history))
    },

    loadHistoryItem(item) {
      this.$emit('load-history', item)
    },

    deleteHistoryItem(index) {
      this.history.splice(index, 1)
      localStorage.setItem('detecta-history', JSON.stringify(this.history))
    },

    clearHistory() {
      if (confirm('Are you sure you want to clear all history?')) {
        this.history = []
        localStorage.removeItem('detecta-history')
      }
    },

    formatDate(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date

      // Less than 1 minute
      if (diff < 60000) return 'Just now'
      
      // Less than 1 hour
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000)
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`
      }
      
      // Less than 24 hours
      if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
      }
      
      // Otherwise show date
      return date.toLocaleDateString()
    },

    truncateText(text) {
      return text.length > 100 ? text.substring(0, 100) + '...' : text
    },

    getScoreClass(score) {
      if (score < 30) return 'low'
      if (score < 70) return 'medium'
      return 'high'
    }
  }
}
</script>

<style scoped>
.history-panel {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-header h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
  color: var(--color-danger);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-btn:hover {
  background: rgba(220, 38, 38, 0.1);
  border-color: var(--color-danger);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-tertiary);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  position: relative;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1rem;
  cursor: pointer;
  transition: all var(--transition-base);
}

.history-item:hover {
  border-color: var(--color-primary);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.history-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.history-date {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.history-score {
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
}

.history-score.low {
  background: rgba(5, 150, 105, 0.1);
  color: var(--color-success);
}

.history-score.medium {
  background: rgba(217, 119, 6, 0.1);
  color: var(--color-warning);
}

.history-score.high {
  background: rgba(220, 38, 38, 0.1);
  color: var(--color-danger);
}

.history-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  opacity: 0;
}

.history-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: rgba(220, 38, 38, 0.1);
  color: var(--color-danger);
}
</style>
