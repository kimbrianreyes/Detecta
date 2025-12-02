import { translations } from './translations.js'

export const i18nMixin = {
    computed: {
        $t() {
            const lang = this.$root.currentLanguage || 'en'
            return (path) => {
                const keys = path.split('.')
                let value = translations[lang]

                for (const key of keys) {
                    if (value && typeof value === 'object') {
                        value = value[key]
                    } else {
                        return path // Return path if translation not found
                    }
                }

                return value || path
            }
        }
    }
}
