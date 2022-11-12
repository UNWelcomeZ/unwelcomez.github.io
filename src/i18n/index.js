import { createI18n } from 'vue-i18n'
import ja from './ja.json'
import zh from './zh.json'

export default createI18n({
  legacy: false,
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'zh',
  messages: {
    ja,
    zh
  }
})
