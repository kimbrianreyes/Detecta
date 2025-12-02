# Detecta - AI Content Detection Website

A modern, minimalist AI content detection website built with Vue.js and Tailwind CSS. Detecta uses advanced AI detection API to identify AI-generated content with unprecedented accuracy across 80+ languages.

## Features

- 🧠 **State-of-the-Art Detection** - Identifies ChatGPT, GPT-4, Gemini, DeepSeek, and more
- 🌍 **80+ Languages** - Supports multiple languages with consistent accuracy
- 📊 **Detailed Insights** - Sentence and phrase-level AI detection analysis
- ⚡ **Real-Time Analysis** - Instant results with optimized detection algorithms
- 🎨 **Modern UI** - Beautiful, minimalist design with smooth animations
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend Framework**: Vue.js 3
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Inter & Space Grotesk (Google Fonts)
- **Icons**: Font Awesome 6
- **API**: RapidAPI AI Detection API

## Project Structure

```
Detecta/
├── index.html      # Main HTML structure
├── styles.css      # Custom styles and design system
├── app.js          # Vue.js application logic
└── README.md       # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources and API calls)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start analyzing text for AI content!

### Local Development

You can use any local server to run the project:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. **Enter Text**: Paste or type the text you want to analyze in the text area
2. **Select Language**: Choose the language of your text from the dropdown
3. **Analyze**: Click the "Analyze Text" button
4. **View Results**: See the AI detection score and detailed insights

### API Configuration

The API key is already configured in `app.js`. If you need to use your own API key:

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the AI Detection API
3. Replace the `apiKey` in `app.js`:

```javascript
apiKey: 'YOUR_API_KEY_HERE'
```

## Features Breakdown

### Hero Section
- Eye-catching gradient animations
- Key statistics display
- Call-to-action button

### AI Detector
- Text input with character counter (max 10,000 characters)
- Language selector (10 popular languages)
- Real-time analysis with loading states
- Circular progress indicator for AI score
- Detailed metrics (Human vs AI content)
- Insight bars showing detection factors

### Features Section
- Six feature cards highlighting key capabilities
- Hover animations for better UX
- Icon-based visual communication

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Adaptive layouts for all screen sizes

## Design System

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- **Primary Font**: Inter
- **Display Font**: Space Grotesk

### Animations
- Smooth transitions (300ms cubic-bezier)
- Floating gradient orbs
- Fade-in effects
- Hover transformations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## API Response Handling

The application handles various API response structures:
- `ai_score` or `aiScore`
- `score`
- `ai_probability` or `probability`
- Custom `insights` array

## Future Enhancements

- [ ] User authentication
- [ ] History of analyzed texts
- [ ] Export results as PDF
- [ ] Batch text analysis
- [ ] More language support
- [ ] API usage statistics
- [ ] Dark/Light theme toggle

## License

This project is open source and available for personal and commercial use.

## Credits

- **API**: AI Detection API via RapidAPI
- **Fonts**: Google Fonts (Inter, Space Grotesk)
- **Icons**: Font Awesome
- **Framework**: Vue.js
- **Styling**: Tailwind CSS

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

Built with ❤️ using Vue.js and Tailwind CSS
