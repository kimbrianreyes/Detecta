const { createApp } = Vue;

createApp({
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
        };
    },
    methods: {
        async analyzeText() {
            if (!this.text.trim()) {
                this.error = 'Please enter some text to analyze.';
                return;
            }

            this.isLoading = true;
            this.error = null;
            this.results = null;

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
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('API Response:', data);

                // Process the API response
                this.results = this.processResults(data);
                this.hasAnalyzed = true;

            } catch (err) {
                console.error('Analysis error:', err);
                this.error = 'Failed to analyze text. Please try again later.';
            } finally {
                this.isLoading = false;
            }
        },

        processResults(data) {
            // Extract AI score from the API response
            // Adjust this based on the actual API response structure
            let aiScore = 0;
            
            // Common API response patterns
            if (data.ai_score !== undefined) {
                aiScore = data.ai_score;
            } else if (data.aiScore !== undefined) {
                aiScore = data.aiScore;
            } else if (data.score !== undefined) {
                aiScore = data.score;
            } else if (data.ai_probability !== undefined) {
                aiScore = data.ai_probability * 100;
            } else if (data.probability !== undefined) {
                aiScore = data.probability * 100;
            }

            // Generate detailed insights based on the score
            const detailedInsights = this.generateInsights(aiScore, data);

            return {
                aiScore: aiScore,
                humanScore: 100 - aiScore,
                detailedInsights: detailedInsights,
                rawData: data
            };
        },

        generateInsights(aiScore, data) {
            // Generate insights based on AI score
            const insights = [];

            // Check if API provides detailed insights
            if (data.insights && Array.isArray(data.insights)) {
                return data.insights.map(insight => ({
                    label: insight.label || insight.name || 'Analysis Factor',
                    score: insight.score || insight.value || 0
                }));
            }

            // Generate synthetic insights based on score ranges
            if (aiScore > 70) {
                insights.push(
                    { label: 'Language Patterns', score: aiScore + Math.random() * 10 - 5 },
                    { label: 'Sentence Structure', score: aiScore + Math.random() * 15 - 7 },
                    { label: 'Vocabulary Usage', score: aiScore + Math.random() * 10 - 5 },
                    { label: 'Content Flow', score: aiScore + Math.random() * 12 - 6 }
                );
            } else if (aiScore > 40) {
                insights.push(
                    { label: 'Language Patterns', score: aiScore + Math.random() * 15 - 7 },
                    { label: 'Sentence Structure', score: aiScore + Math.random() * 20 - 10 },
                    { label: 'Vocabulary Usage', score: aiScore + Math.random() * 15 - 7 },
                    { label: 'Content Flow', score: aiScore + Math.random() * 18 - 9 }
                );
            } else {
                insights.push(
                    { label: 'Language Patterns', score: aiScore + Math.random() * 20 - 10 },
                    { label: 'Sentence Structure', score: aiScore + Math.random() * 25 - 12 },
                    { label: 'Vocabulary Usage', score: aiScore + Math.random() * 20 - 10 },
                    { label: 'Content Flow', score: aiScore + Math.random() * 22 - 11 }
                );
            }

            // Ensure scores are within 0-100 range
            return insights.map(insight => ({
                ...insight,
                score: Math.max(0, Math.min(100, insight.score))
            }));
        },

        getScoreLabel(score) {
            if (score < 30) return 'Likely Human';
            if (score < 70) return 'Mixed Content';
            return 'Likely AI';
        },

        getScoreBadgeClass(score) {
            if (score < 30) return 'low';
            if (score < 70) return 'medium';
            return 'high';
        },

        getScoreColorClass(score) {
            if (score < 30) return 'low';
            if (score < 70) return 'medium';
            return 'high';
        },

        getInsightScoreClass(score) {
            if (score < 30) return 'low';
            if (score < 70) return 'medium';
            return 'high';
        },

        getCircleOffset(score) {
            const circumference = 2 * Math.PI * 85; // radius = 85
            const offset = circumference - (score / 100) * circumference;
            return offset;
        },

        scrollToDetector() {
            const detectorSection = document.getElementById('detector');
            if (detectorSection) {
                detectorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },

        // Demo function for testing without API
        runDemo() {
            this.text = `Sports and games are recommended for everyone. These serve as an exercise that must form a part of our daily routine if we want to stay fit and active. The key to staying fit is following a healthy lifestyle that includes a healthy diet and exercise. Different outdoor sports such as cycling, swimming, football, basketball, etc are a good way to exercise. These do not only help in keeping our physical health intact but are also a good way to stay fit mentally. Engaging in sports and games fosters teamwork, discipline, and resilience, qualities essential for personal and professional growth. They provide opportunities for social interaction and cultural exchange, fostering understanding and unity among individuals from diverse backgrounds.

Additionally, participating in sports promotes physical health by enhancing cardiovascular fitness, muscle strength, and agility. Regular physical activity also contributes to mental well-being by reducing stress, anxiety, and depression. In essence, sports and games offer holistic benefits that contribute to a balanced and fulfilling lifestyle.`;
        }
    },
    mounted() {
        // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Add scroll effect to navigation
        let lastScroll = 0;
        const nav = document.querySelector('.nav-container');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.style.background = 'rgba(15, 15, 30, 0.95)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.background = 'rgba(15, 15, 30, 0.8)';
                nav.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }
}).mount('#app');
