<template>
  <div class="file-upload">
    <div 
      class="drop-zone"
      :class="{ 'drag-over': isDragging, 'has-file': fileName }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input 
        ref="fileInput"
        type="file"
        accept=".txt"
        @change="handleFileSelect"
        style="display: none"
      />
      
      <div v-if="!fileName" class="drop-zone-content">
        <i class="fas fa-cloud-upload-alt"></i>
        <p class="drop-zone-title">Drop a .txt file here or click to browse</p>
        <p class="drop-zone-subtitle">Only .txt files are supported (max 10MB)</p>
      </div>

      <div v-else class="file-info">
        <i class="fas fa-file-alt"></i>
        <div class="file-details">
          <p class="file-name">{{ fileName }}</p>
          <p class="file-size">{{ fileSize }}</p>
        </div>
        <button @click.stop="clearFile" class="remove-file-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <div v-if="isProcessing" class="processing-indicator">
      <i class="fas fa-spinner fa-spin"></i>
      <span>Processing file...</span>
    </div>

    <div v-if="error" class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      isDragging: false,
      fileName: '',
      fileSize: '',
      isProcessing: false,
      error: null
    }
  },
  methods: {
    handleDragOver(e) {
      this.isDragging = true
    },

    handleDragLeave(e) {
      this.isDragging = false
    },

    handleDrop(e) {
      this.isDragging = false
      const files = e.dataTransfer.files
      if (files.length > 0) {
        this.processFile(files[0])
      }
    },

    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileSelect(e) {
      const files = e.target.files
      if (files.length > 0) {
        this.processFile(files[0])
      }
    },

    async processFile(file) {
      this.error = null

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        this.error = 'File size exceeds 10MB limit'
        return
      }

      // Validate file type - only .txt
      const fileExt = '.' + file.name.split('.').pop().toLowerCase()
      if (fileExt !== '.txt') {
        this.error = 'Only .txt files are supported'
        return
      }

      this.fileName = file.name
      this.fileSize = this.formatFileSize(file.size)
      this.isProcessing = true

      try {
        const text = await this.readTextFile(file)

        if (text.trim()) {
          this.$emit('file-loaded', text)
        } else {
          this.error = 'File appears to be empty'
        }
      } catch (err) {
        this.error = 'Failed to read file: ' + err.message
      } finally {
        this.isProcessing = false
      }
    },

    readTextFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = (e) => reject(new Error('Failed to read file'))
        reader.readAsText(file)
      })
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    },

    clearFile() {
      this.fileName = ''
      this.fileSize = ''
      this.error = null
      this.$refs.fileInput.value = ''
      this.$emit('file-cleared')
    }
  }
}
</script>

<style scoped>
.file-upload {
  margin-bottom: 1rem;
}

.drop-zone {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
  background: var(--color-bg-secondary);
}

.drop-zone:hover {
  border-color: var(--color-primary);
  background: var(--color-bg-tertiary);
}

.drop-zone.drag-over {
  border-color: var(--color-primary);
  background: rgba(37, 99, 235, 0.05);
  transform: scale(1.02);
}

.drop-zone.has-file {
  border-style: solid;
  border-color: var(--color-success);
  background: rgba(5, 150, 105, 0.05);
}

.drop-zone-content i {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.drop-zone-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.drop-zone-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.file-info i {
  font-size: 2rem;
  color: var(--color-success);
}

.file-details {
  flex: 1;
  text-align: left;
}

.file-name {
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.file-size {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.remove-file-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-tertiary);
  transition: all var(--transition-base);
}

.remove-file-btn:hover {
  background: rgba(220, 38, 38, 0.1);
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.processing-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: var(--radius-lg);
  margin-top: 1rem;
  color: var(--color-primary);
  font-weight: 500;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(220, 38, 38, 0.05);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: var(--radius-lg);
  margin-top: 1rem;
  color: var(--color-danger);
  font-weight: 500;
}
</style>
