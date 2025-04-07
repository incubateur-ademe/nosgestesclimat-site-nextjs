'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'
import { getOptions } from './settings'
import { translations } from './translation'

i18next
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string) => translations[language]))
  .use(initReactI18next)
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
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
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  })

export default i18next
