'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { getOptions } from './settings'
import { translations } from './translation'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    ...getOptions(),
    resources: {
      es: {
        translation: translations['es'],
      },
      en: {
        translation: translations['en'],
      },
      fr: {
        translation: translations['fr'],
      },
    },
  })

export default i18next
