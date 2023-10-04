'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'
import { getOptions } from './settings'
import uiEnYaml from './ui/ui-en.yaml'
import uiFrYaml from './ui/ui-fr.yaml'
import unitsYaml from './units.yaml'

const enTranslation = {
  ...(uiEnYaml as unknown as { entries: { entries: [] } }).entries,
  ...(unitsYaml as any)['en'],
}
const frTranslation = {
  ...(uiFrYaml as unknown as { entries: { entries: [] } }).entries,
  ...(unitsYaml as any)['fr'],
}
const translations: Record<string, any> = {
  en: enTranslation,
  fr: frTranslation,
}

i18next
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string) => translations[language]))
  .use(initReactI18next)
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    resources: {
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
