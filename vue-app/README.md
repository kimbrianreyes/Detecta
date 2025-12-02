# Detecta - AI Content Detection (Vue.js)

A modern, professional AI content detection web application built with **Vue.js 3** and **Vite**. Detecta uses advanced AI detection API to identify AI-generated content with unprecedented accuracy across 80+ languages.

## 🚀 Features

- 🧠 **State-of-the-Art Detection** - Identifies ChatGPT, GPT-4, Gemini, DeepSeek, and more
- 🌍 **80+ Languages** - Supports multiple languages with consistent accuracy
- 📊 **Detailed Insights** - Sentence and phrase-level AI detection analysis
- ⚡ **Real-Time Analysis** - Instant results with optimized detection algorithms
- 🎨 **Modern UI** - Beautiful, minimalist design with smooth animations
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ⚙️ **Component-Based** - Built with Vue.js 3 Single File Components

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Inter & Space Grotesk (Google Fonts)
- **Icons**: Font Awesome 6
- **API**: RapidAPI AI Detection API

## 📁 Project Structure

```
vue-app/
├── public/              # Static assets
├── src/
│   ├── assets/         # Styles and images
│   │   └── styles.css  # Main stylesheet
│   ├── components/     # Vue components
│   │   ├── DetectorSection.vue
│   │   └── FeaturesSection.vue
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
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

1. **Enter Text**: Paste or type the text you want to analyze in the text area
2. **Select Language**: Choose the language of your text from the dropdown (10 languages available)
3. **Analyze**: Click the "Analyze Text" button
4. **View Results**: See the AI detection score, metrics, and detailed insights

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
