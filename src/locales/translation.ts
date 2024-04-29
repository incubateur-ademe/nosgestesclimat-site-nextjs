/*
	This module contains all types and functions related to the translation.
*/

import { Lang, LangInfos, YamlEntry } from '@/types/translation'
import { i18n } from 'i18next'
import faqEnYaml from './faq/FAQ-en.yaml'
import faqEsYaml from './faq/FAQ-es.yaml'
import faqFrYaml from './faq/FAQ-fr.yaml'
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
          Object.entries(yaml.entries).filter(([key]) => !key.endsWith('.lock'))
        ),
      }
}

const uiFr = parseYaml(uiFrYaml as unknown as YamlEntry)
const uiEn = parseYaml(uiEnYaml as unknown as YamlEntry)
const uiEs = parseYaml(uiEsYaml as unknown as YamlEntry)

const faqFr = parseYaml(faqFrYaml as unknown as YamlEntry)
const faqEn = parseYaml(faqEnYaml as unknown as YamlEntry)
const faqEs = parseYaml(faqEsYaml as unknown as YamlEntry)

export const defaultLang = Lang.Fr

export function getLangInfos(lang: Lang): LangInfos {
  switch (lang) {
    case Lang.En: {
      return {
        name: 'English',
        abrv: 'en',
        abrvLocale: 'en',
        faqContent: faqEn as unknown as string,
        uiTrad: uiEn.entries,
      }
    }
    case Lang.Es: {
      return {
        name: 'Español',
        abrv: 'es',
        abrvLocale: 'es',
        faqContent: faqEs as unknown as string,
        uiTrad: uiEs.entries,
      }
    }
    case Lang.Fr:
    default: {
      return {
        name: 'Français',
        abrv: 'fr',
        abrvLocale: 'fr-FR',
        faqContent: faqFr as unknown as string,
        uiTrad: uiFr.entries,
      }
    }
  }
}

export function getLangFromAbreviation(abrv: string): Lang {
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

export function getCurrentLangAbrv(i18n: i18n): string {
  return getCurrentLangInfos(i18n).abrv
}

export function changeLangTo(i18n: i18n, currentLangState: Lang) {
  const langInfos = getLangInfos(currentLangState)
  if (langInfos) {
    i18n.changeLanguage(langInfos.abrv)
    console.log('[i18next] current language:', i18n.language)
  }
}

export function getMarkdownInCurrentLang(
  markdownFiles: Array<[Lang, string]>,
  currentLangState: Lang
) {
  return (
    markdownFiles.find(
      ([lang]) => getLangInfos(lang).abrv === currentLangState
    )?.[1] || markdownFiles[0][1]
  )
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
