import { YamlEntry } from '@/types/translation'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'
import uiEnYaml from './ui/ui-en-us.yaml'
import uiFrYaml from './ui/ui-fr.yaml'

const initI18next = async (language: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string) => {
        switch (language) {
          case 'en-US':
            return (uiEnYaml as unknown as YamlEntry).entries
          case 'fr':
          default:
            return (uiFrYaml as unknown as YamlEntry).entries
        }
      })
    )
    .init(getOptions(language))

  return i18nInstance
}

export default initI18next
