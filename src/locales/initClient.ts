'use client'

import { YamlEntry } from '@/types/translation'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'
import { getOptions } from './settings'
import uiEnYaml from './ui/ui-en.yaml'
import uiFrYaml from './ui/ui-fr.yaml'

i18next
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string) => {
      switch (language) {
        case 'en':
          return (uiEnYaml as unknown as YamlEntry).entries
        case 'fr':
          return (uiFrYaml as unknown as YamlEntry).entries

        default:
          return undefined
      }
    })
  )
  .use(initReactI18next)
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    resources: {
      en: {
        translation: (uiEnYaml as unknown as { entries: { entries: [] } })
          .entries,
      },
      fr: {
        translation: (uiFrYaml as unknown as { entries: { entries: [] } })
          .entries,
      },
    },
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  })

export default i18next
