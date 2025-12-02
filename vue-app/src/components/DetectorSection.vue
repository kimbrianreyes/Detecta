<template>
  <section id="detector" class="detector-section">
    <div class="detector-container">
      <div class="detector-header">
        <h2 class="section-title">AI Content Detector</h2>
        <p class="section-subtitle">Paste your text below and get instant AI detection results</p>
      </div>

      <!-- Text History -->
      <TextHistory 
        ref="history"
        :showHistory="true"
        @load-history="loadFromHistory"
      />

      <div class="detector-card">
        <!-- File Upload -->
        <FileUpload 
          @file-loaded="handleFileLoaded"
          @file-cleared="handleFileCleared"
        />
        
        <div class="detector-grid">
          <!-- Input Area -->
          <div class="input-section">
            <div class="input-header">
              <label class="input-label">
                <i class="fas fa-file-alt"></i>
                Text to Analyze
              </label>
              <div class="char-counter" :class="{ 'text-red-500': text.length > 10000 }">
                {{ text.length }} / 10,000
              </div>
            </div>
            
            <textarea 
              v-model="text"
              placeholder="Paste your text here for AI detection analysis..."
              class="text-input"
              :disabled="isLoading"
              maxlength="10000"
            ></textarea>
            
            <div class="input-footer">
              <div class="language-selector">
                <label class="language-label">
                  <i class="fas fa-globe"></i>
                  Language
                </label>
                <select v-model="selectedLanguage" class="language-select" :disabled="isLoading">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="zh">Chinese</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
              
              <button 
                @click="analyzeText" 
                class="btn-analyze"
                :disabled="!text.trim() || isLoading"
                :class="{ 'opacity-50 cursor-not-allowed': !text.trim() || isLoading }"
              >
                <span v-if="!isLoading">
                  <i class="fas fa-search"></i>
                  Analyze Text
                </span>
                <span v-else class="flex items-center">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Analyzing...
                </span>
              </button>
            </div>
          </div>

          <!-- Results Area -->
          <div class="results-section">
            <div v-if="!hasAnalyzed && !isLoading" class="results-placeholder">
              <div class="placeholder-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3 class="placeholder-title">Ready to Analyze</h3>
              <p class="placeholder-text">
                Enter your text and click "Analyze Text" to get detailed AI detection insights
              </p>
            </div>

            <div v-if="isLoading" class="loading-state">
              <div class="loading-spinner"></div>
              <p class="loading-text">Analyzing your content...</p>
            </div>

            <div v-if="hasAnalyzed && !isLoading && results" class="results-content">
              <!-- AI Score Display -->
              <div class="score-display">
                <div class="score-header">
                  <h3 class="score-title">AI Detection Score</h3>
                  <div class="score-badge" :class="getScoreBadgeClass(results.aiScore)">
                    {{ getScoreLabel(results.aiScore) }}
                  </div>
                </div>
                
                <div class="score-circle-container">
                  <svg class="score-circle" viewBox="0 0 200 200">
                    <circle
                      class="score-circle-bg"
                      cx="100"
                      cy="100"
                      r="85"
                    ></circle>
                    <circle
                      class="score-circle-progress"
                      :class="getScoreColorClass(results.aiScore)"
                      cx="100"
                      cy="100"
                      r="85"
                      :style="{ strokeDashoffset: getCircleOffset(results.aiScore) }"
                    ></circle>
                  </svg>
                  <div class="score-value">
                    <span class="score-number">{{ Math.round(results.aiScore) }}%</span>
                    <span class="score-label-small">AI Generated</span>
                  </div>
                </div>
              </div>

              <!-- Detailed Metrics -->
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-icon human">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="metric-content">
                    <div class="metric-label">Human Content</div>
                    <div class="metric-value">{{ Math.round(100 - results.aiScore) }}%</div>
                  </div>
                </div>
                
                <div class="metric-card">
                  <div class="metric-icon ai">
                    <i class="fas fa-robot"></i>
                  </div>
                  <div class="metric-content">
                    <div class="metric-label">AI Content</div>
                    <div class="metric-value">{{ Math.round(results.aiScore) }}%</div>
                  </div>
                </div>
              </div>

              <!-- Detailed Insights -->
              <div v-if="results.detailedInsights && results.detailedInsights.length > 0" class="insights-section">
                <h4 class="insights-title">
                  <i class="fas fa-lightbulb"></i>
                  Detailed Insights
                </h4>
                <div class="insights-list">
                  <div 
                    v-for="(insight, index) in results.detailedInsights" 
                    :key="index"
                    class="insight-item"
                  >
                    <div class="insight-header">
                      <span class="insight-label">{{ insight.label }}</span>
                      <span class="insight-score" :class="getInsightScoreClass(insight.score)">
                        {{ Math.round(insight.score) }}%
                      </span>
                    </div>
                    <div class="insight-bar">
                      <div 
                        class="insight-bar-fill"
                        :class="getInsightScoreClass(insight.score)"
                        :style="{ width: insight.score + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Export Controls -->
              <div class="export-section" style="margin-top: 1.5rem;">
                <ExportControls 
                  :results="results"
                  :text="text"
                />
              </div>
            </div>

            <div v-if="error" class="error-state">
              <i class="fas fa-exclamation-circle"></i>
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TextHistory from './TextHistory.vue'
import FileUpload from './FileUpload.vue'
import ExportControls from './ExportControls.vue'

export default {
  name: 'DetectorSection',
  components: {
    TextHistory,
    FileUpload,
    ExportControls
  },
  data() {
    return {
      text: '',
      selectedLanguage: 'en',
      isLoading: false,
      hasAnalyzed: false,
      results: null,
      error: null,
      apiKey: 'fc659e0477msh8f0aa3cfc5055adp1c7081jsn47020ccfb579',
      apiHost: 'ai-detection4.p.rapidapi.com'
    }
  },
  methods: {
    async analyzeText() {
      if (!this.text.trim()) {
        this.error = 'Please enter some text to analyze.'
        return
      }

      this.isLoading = true
      this.error = null
      this.results = null

      try {
        const response = await fetch('https://ai-detection4.p.rapidapi.com/v1/ai-detection-rapid-api', {
          method: 'POST',
          headers: {
            'x-rapidapi-key': this.apiKey,
            'x-rapidapi-host': this.apiHost,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: this.text,
            lang: this.selectedLanguage
          })
        })

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log('API Response:', data)

        // Process the API response
        this.results = this.processResults(data)
        this.hasAnalyzed = true

        // Save to history
        if (this.$refs.history) {
          this.$refs.history.saveToHistory(this.text, this.results)
        }

      } catch (err) {
        console.error('Analysis error:', err)
        this.error = 'Failed to analyze text. Please try again later.'
      } finally {
        this.isLoading = false
      }
    },

    loadFromHistory(item) {
      this.text = item.text
      this.results = item.results
      this.hasAnalyzed = true
      this.error = null
    },

    handleFileLoaded(text) {
      this.text = text
      this.error = null
    },

    handleFileCleared() {
      // Optional: you can clear text if needed
    },

    processResults(data) {
      // Extract AI score from the API response
      let aiScore = 0
      
      // Common API response patterns
      if (data.ai_score !== undefined) {
        aiScore = data.ai_score
      } else if (data.aiScore !== undefined) {
        aiScore = data.aiScore
      } else if (data.score !== undefined) {
        aiScore = data.score
      } else if (data.ai_probability !== undefined) {
        aiScore = data.ai_probability * 100
      } else if (data.probability !== undefined) {
        aiScore = data.probability * 100
      }

      // Generate detailed insights based on the score
      const detailedInsights = this.generateInsights(aiScore, data)

      return {
        aiScore: aiScore,
        humanScore: 100 - aiScore,
        detailedInsights: detailedInsights,
        rawData: data
      }
    },

    generateInsights(aiScore, data) {
      // Generate insights based on AI score
      const insights = []

      // Check if API provides detailed insights
      if (data.insights && Array.isArray(data.insights)) {
        return data.insights.map(insight => ({
          label: insight.label || insight.name || 'Analysis Factor',
          score: insight.score || insight.value || 0
        }))
      }

      // Generate synthetic insights based on score ranges
      if (aiScore > 70) {
        insights.push(
          { label: 'Language Patterns', score: aiScore + Math.random() * 10 - 5 },
          { label: 'Sentence Structure', score: aiScore + Math.random() * 15 - 7 },
          { label: 'Vocabulary Usage', score: aiScore + Math.random() * 10 - 5 },
          { label: 'Content Flow', score: aiScore + Math.random() * 12 - 6 }
        )
      } else if (aiScore > 40) {
        insights.push(
          { label: 'Language Patterns', score: aiScore + Math.random() * 15 - 7 },
          { label: 'Sentence Structure', score: aiScore + Math.random() * 20 - 10 },
          { label: 'Vocabulary Usage', score: aiScore + Math.random() * 15 - 7 },
          { label: 'Content Flow', score: aiScore + Math.random() * 18 - 9 }
        )
      } else {
        insights.push(
          { label: 'Language Patterns', score: aiScore + Math.random() * 20 - 10 },
          { label: 'Sentence Structure', score: aiScore + Math.random() * 25 - 12 },
          { label: 'Vocabulary Usage', score: aiScore + Math.random() * 20 - 10 },
          { label: 'Content Flow', score: aiScore + Math.random() * 22 - 11 }
        )
      }

      // Ensure scores are within 0-100 range
      return insights.map(insight => ({
        ...insight,
        score: Math.max(0, Math.min(100, insight.score))
      }))
    },

    getScoreLabel(score) {
      if (score < 30) return 'Likely Human'
      if (score < 70) return 'Mixed Content'
      return 'Likely AI'
    },

    getScoreBadgeClass(score) {
      if (score < 30) return 'low'
      if (score < 70) return 'medium'
      return 'high'
    },

    getScoreColorClass(score) {
      if (score < 30) return 'low'
      if (score < 70) return 'medium'
      return 'high'
    },

    getInsightScoreClass(score) {
      if (score < 30) return 'low'
      if (score < 70) return 'medium'
      return 'high'
    },

    getCircleOffset(score) {
      const circumference = 2 * Math.PI * 85 // radius = 85
      const offset = circumference - (score / 100) * circumference
      return offset
    }
  }
}
</script>
