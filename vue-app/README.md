# Detecta - AI Content Detection

A modern, professional AI content detection web application built with **Vue.js 3** and **Vite**. Detecta uses advanced AI detection API to identify AI-generated content with unprecedented accuracy across 80+ languages.

![Detecta Banner](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## ✨ Features

### 🎯 Core Features
- 🧠 **State-of-the-Art Detection** - Identifies ChatGPT, GPT-4, Gemini, DeepSeek, and more
- 🌍 **80+ Languages** - Supports multiple languages with consistent accuracy
- 📊 **Detailed Insights** - Sentence and phrase-level AI detection analysis
- ⚡ **Real-Time Analysis** - Instant results with optimized detection algorithms
- 🎨 **Minimalist White Design** - Clean, professional interface with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

### 🆕 Advanced Features

#### 🌓 **Dark Mode**
- Toggle between light and dark themes
- Smooth transitions with CSS variables
- Preference saved to localStorage
- Professional dark color scheme

#### 📄 **Export Results**
- **Export as PDF** - Print-friendly formatted reports
- **Export as JSON** - Download structured data for analysis
- **Copy to Clipboard** - Quick text copy with formatting
- Disabled state when no results available

#### 📚 **Text History**
- Automatically saves last 10 analyses
- Collapsible panel with toggle button
- Shows timestamp and AI score preview
- Click to reload previous analysis
- Individual delete or clear all functionality
- Smart time formatting (e.g., "5 mins ago", "2 hours ago")

#### 📁 **File Upload**
- Drag & drop interface for .txt files
- Click to browse file system
- 10MB file size limit
- Visual feedback for drag-over state
- File validation and error handling
- Auto-populate text area from file content

#### 🌍 **Multi-Language UI**
- **4 Languages Supported:**
  - 🇬🇧 English (en)
  - 🇪🇸 Spanish (es)
  - 🇫🇷 French (fr)
  - 🇩🇪 German (de)
- **Auto-Detection** - Detects browser language on first visit
- **Persistence** - Saves language preference to localStorage
- **Language Selector** - Beautiful dropdown in navigation
- **Complete Translation** - All UI elements translated
- **Easy to Extend** - Add new languages easily

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite 5.4
- **Styling**: Custom CSS with CSS Variables (Dark Mode Support)
- **Fonts**: Inter & Space Grotesk (Google Fonts)
- **Icons**: Font Awesome 6
- **API**: RapidAPI AI Detection API
- **i18n**: Custom translation system with mixin
- **State Management**: Component-based with localStorage

## 📁 Project Structure

```
vue-app/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Styles and images
│   │   ├── styles.css        # Main stylesheet (Light theme)
│   │   └── dark-mode.css     # Dark mode theme
│   ├── components/           # Vue components
│   │   ├── DetectorSection.vue      # Main detector
│   │   ├── FeaturesSection.vue      # Features showcase
│   │   ├── ThemeToggle.vue          # Dark mode toggle
│   │   ├── LanguageSelector.vue     # Language dropdown
│   │   ├── TextHistory.vue          # Analysis history
│   │   ├── FileUpload.vue           # File upload component
│   │   └── ExportControls.vue       # Export buttons
│   ├── i18n/                 # Internationalization
│   │   ├── translations.js   # All language translations
│   │   └── i18n.js          # Translation mixin
│   ├── App.vue              # Root component
│   └── main.js              # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.10.0 or higher)
- npm (v10.2.3 or higher)

### Installation

1. Navigate to the project directory:
```bash
cd vue-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎯 Usage

### Basic Analysis
1. **Enter Text**: Paste or type the text you want to analyze
2. **Select Language**: Choose the language of your text (10 languages available)
3. **Analyze**: Click the "Analyze Text" button
4. **View Results**: See AI detection score, metrics, and detailed insights

### Advanced Features

#### Using File Upload
1. Click the file upload area or drag a .txt file
2. Text automatically populates in the text area
3. Click "Analyze Text" to process

#### Viewing History
1. Click "Recent Analyses" to expand history panel
2. See your last 10 analyses with scores
3. Click any item to reload that analysis
4. Use "Clear All" to remove all history

#### Exporting Results
1. After analyzing text, export buttons appear
2. Choose PDF, JSON, or Copy to Clipboard
3. PDF opens print dialog for saving
4. JSON downloads as structured data file

#### Changing Theme
1. Click the sun/moon icon in navigation
2. Theme switches instantly
3. Preference saved automatically

#### Changing Language
1. Click the globe icon (🌍) in navigation
2. Select from English, Spanish, French, or German
3. Entire UI updates immediately
4. Language preference saved

## 🔧 API Configuration

The API key is configured in `src/components/DetectorSection.vue`. To use your own API key:

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the AI Detection API
3. Update the `apiKey` in `DetectorSection.vue`:

```javascript
data() {
  return {
    apiKey: 'YOUR_API_KEY_HERE',
    apiHost: 'ai-detection4.p.rapidapi.com'
  }
}
```

## 🎨 Customization

### Adding New Languages

1. Open `src/i18n/translations.js`
2. Add your language object (e.g., `it` for Italian)
3. Add language name to `languageNames` object
4. Update `supportedLangs` array in `App.vue`

### Customizing Theme Colors

Edit CSS variables in `src/assets/styles.css` (light theme) or `src/assets/dark-mode.css` (dark theme):

```css
:root {
  --color-primary: #2563eb;
  --color-bg-primary: #ffffff;
  /* ... more variables */
}
```

## 📦 Dependencies

### Production Dependencies
- `vue`: ^3.5.24 - Progressive JavaScript framework

### Development Dependencies
- `@vitejs/plugin-vue`: ^5.1.4 - Official Vue plugin for Vite
- `vite`: ^5.4.11 - Next generation frontend tooling

## 🌟 Key Features Breakdown

| Feature | Description | Status |
|---------|-------------|--------|
| AI Detection | Multi-model AI content detection | ✅ Active |
| Dark Mode | Theme switching with persistence | ✅ Active |
| Multi-Language | 4 languages with auto-detection | ✅ Active |
| Export (PDF) | Print-friendly report generation | ✅ Active |
| Export (JSON) | Structured data download | ✅ Active |
| Clipboard Copy | Quick results copying | ✅ Active |
| Text History | Last 10 analyses saved locally | ✅ Active |
| File Upload | Drag & drop .txt file support | ✅ Active |
| Responsive Design | Mobile, tablet, desktop support | ✅ Active |
| Real-time Analysis | Instant AI detection results | ✅ Active |

## 🔒 Privacy

- **No Backend Storage** - All data stored locally in browser
- **localStorage Only** - History and preferences saved locally
- **API Calls** - Only text sent to AI detection API
- **No Tracking** - No analytics or user tracking
- **Secure** - All API calls over HTTPS

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Vite team for the blazing fast build tool
- RapidAPI for the AI Detection API
- Font Awesome for the icons
- Google Fonts for Inter and Space Grotesk fonts

---

**Built with ❤️ using Vue.js 3 and Vite**
