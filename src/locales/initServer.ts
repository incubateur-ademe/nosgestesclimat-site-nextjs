import { createInstance } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'
import { translations } from './translation'

const initI18next = async (language: string, log: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(LanguageDetector)
    .use(resourcesToBackend((language: string) => translations[language]))
    .use(initReactI18next)
    .init(getOptions(language))

  return i18nInstance
}

export default initI18next
