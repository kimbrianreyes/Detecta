<template>
  <div class="export-controls">
    <button @click="exportAsPDF" class="export-btn" :disabled="!hasResults">
      <i class="fas fa-file-pdf"></i>
      Export PDF
    </button>
    <button @click="exportAsJSON" class="export-btn" :disabled="!hasResults">
      <i class="fas fa-file-code"></i>
      Export JSON
    </button>
    <button @click="copyToClipboard" class="export-btn" :disabled="!hasResults">
      <i class="fas fa-copy"></i>
      {{ copied ? 'Copied!' : 'Copy Results' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ExportControls',
  props: {
    results: {
      type: Object,
      default: null
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copied: false
    }
  },
  computed: {
    hasResults() {
      return this.results !== null
    }
  },
  methods: {
    exportAsPDF() {
      if (!this.results) return

      // Create a printable HTML content
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Detecta - AI Detection Report</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #2563eb; margin-bottom: 10px; }
            .date { color: #6b7280; font-size: 14px; margin-bottom: 30px; }
            .score-section { background: #f9fafb; padding: 20px; border-radius: 12px; margin: 20px 0; }
            .score-large { font-size: 48px; font-weight: bold; color: #2563eb; }
            .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .metric { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .metric-label { color: #6b7280; font-size: 14px; }
            .metric-value { font-size: 24px; font-weight: bold; color: #111827; }
            .text-section { margin: 20px 0; }
            .text-content { background: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap; }
            .insights { margin: 20px 0; }
            .insight-item { margin: 10px 0; }
            .insight-bar { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
            .insight-fill { height: 100%; background: #2563eb; }
          </style>
        </head>
        <body>
          <h1>Detecta - AI Detection Report</h1>
          <div class="date">${new Date().toLocaleString()}</div>
          
          <div class="score-section">
            <h2>AI Detection Score</h2>
            <div class="score-large">${Math.round(this.results.aiScore)}%</div>
            <p>AI Generated Content</p>
          </div>

          <div class="metrics">
            <div class="metric">
              <div class="metric-label">Human Content</div>
              <div class="metric-value">${Math.round(100 - this.results.aiScore)}%</div>
            </div>
            <div class="metric">
              <div class="metric-label">AI Content</div>
              <div class="metric-value">${Math.round(this.results.aiScore)}%</div>
            </div>
          </div>

          ${this.results.detailedInsights && this.results.detailedInsights.length > 0 ? `
            <div class="insights">
              <h3>Detailed Insights</h3>
              ${this.results.detailedInsights.map(insight => `
                <div class="insight-item">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${insight.label}</span>
                    <strong>${Math.round(insight.score)}%</strong>
                  </div>
                  <div class="insight-bar">
                    <div class="insight-fill" style="width: ${insight.score}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="text-section">
            <h3>Analyzed Text</h3>
            <div class="text-content">${this.escapeHtml(this.text)}</div>
          </div>
        </body>
        </html>
      `

      // Open print dialog
      const printWindow = window.open('', '_blank')
      printWindow.document.write(content)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 250)
    },

    exportAsJSON() {
      if (!this.results) return

      const exportData = {
        timestamp: new Date().toISOString(),
        text: this.text,
        results: this.results,
        metadata: {
          textLength: this.text.length,
          analysisDate: new Date().toLocaleString()
        }
      }

      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `detecta-analysis-${Date.now()}.json`
      link.click()
      URL.revokeObjectURL(url)
    },

    async copyToClipboard() {
      if (!this.results) return

      const textToCopy = `
DETECTA - AI DETECTION REPORT
Generated: ${new Date().toLocaleString()}

AI DETECTION SCORE: ${Math.round(this.results.aiScore)}%
Human Content: ${Math.round(100 - this.results.aiScore)}%
AI Content: ${Math.round(this.results.aiScore)}%

${this.results.detailedInsights && this.results.detailedInsights.length > 0 ? `
DETAILED INSIGHTS:
${this.results.detailedInsights.map(insight => 
  `- ${insight.label}: ${Math.round(insight.score)}%`
).join('\n')}
` : ''}

ANALYZED TEXT:
${this.text}
      `.trim()

      try {
        await navigator.clipboard.writeText(textToCopy)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    },

    escapeHtml(text) {
      const div = document.createElement('div')
      div.textContent = text
      return div.innerHTML
    }
  }
}
</script>

<style scoped>
.export-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.export-btn {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1.25rem;
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.export-btn:hover:not(:disabled) {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.export-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.export-btn i {
  font-size: 1rem;
}
</style>
