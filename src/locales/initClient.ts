'use client'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getOptions } from './settings'
import { translations } from './translation'

const getLanguageFromCookie = () => {
  if (typeof document === 'undefined') return 'fr'
  const cookie = document.cookie
  const match = cookie.match(/NEXT_LOCALE=([^;]+)/)
  return match ? match[1] : 'fr'
}

i18next.use(initReactI18next).init({
  ...getOptions(),
  lng: getLanguageFromCookie(),
  resources: {
    en: {
      translation: translations['en'],
    },
    fr: {
      translation: translations['fr'],
    },
  },
})

export default i18next
