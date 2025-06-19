/*
	This module contains all types and functions related to the translation.
*/

import type { LangInfos, YamlEntry } from '@/types/translation'
import { Lang } from '@/types/translation'
import type { i18n } from 'i18next'
import uiEnYaml from './ui/ui-en.yaml'
import uiEsYaml from './ui/ui-es.yaml'
import uiFrYaml from './ui/ui-fr.yaml'
import unitsYaml from './units.yaml'

const parseYaml = (yaml: YamlEntry) => {
  //Remove keys that make the bundle heavier but are only useful for translation purposes, not in the UI
  return Array.isArray(yaml)
    ? yaml.map((entry) =>
        Object.fromEntries(
          Object.entries(entry).filter(([key]) => !key.endsWith('.lock'))
        )
      )
    : {
        entries: Object.fromEntries(
          Object.entries(yaml.entries ?? {}).filter(
            ([key]) => !key.endsWith('.lock')
          )
        ),
      }
}

const uiFr = parseYaml(uiFrYaml as unknown as YamlEntry)
const uiEn = parseYaml(uiEnYaml as unknown as YamlEntry)
const uiEs = parseYaml(uiEsYaml as unknown as YamlEntry)

function getLangInfos(lang: Lang): LangInfos {
  switch (lang) {
    case Lang.En: {
      return {
        name: 'English',
        abrv: 'en',
        abrvLocale: 'en',
        uiTrad: uiEn.entries,
      }
    }
    case Lang.Es: {
      return {
        name: 'Español',
        abrv: 'es',
        abrvLocale: 'es',
        uiTrad: uiEs.entries,
      }
    }
    case Lang.Fr:
    default: {
      return {
        name: 'Français',
        abrv: 'fr',
        abrvLocale: 'fr-FR',
        uiTrad: uiFr.entries,
      }
    }
  }
}

function getLangFromAbreviation(abrv: string): Lang {
  switch (abrv?.slice(0, 2) ?? '') {
    case 'en':
      return Lang.En

    case 'es':
      return Lang.Es

    case 'fr':
    default:
      return Lang.Default
  }
}

export function getCurrentLangInfos(i18n: i18n): LangInfos {
  return getLangInfos(getLangFromAbreviation(i18n.language))
}

const enTranslation = {
  ...(uiEnYaml as unknown as YamlEntry).entries,
  ...(unitsYaml as any)['en'],
}
const esTranslation = {
  ...(uiEsYaml as unknown as YamlEntry).entries,
  ...(unitsYaml as any)['es'],
}
const frTranslation = {
  ...(uiFrYaml as unknown as YamlEntry).entries,
  ...(unitsYaml as any)['fr'],
}
export const translations: Record<string, any> = {
  en: enTranslation,
  es: esTranslation,
  fr: frTranslation,
}
