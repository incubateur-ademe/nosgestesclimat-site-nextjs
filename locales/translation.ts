/*
	This module contains all types and functions related to the translation.
*/

import { i18n } from 'i18next'
import yaml from 'yaml'

const parseYaml = (content: string) => {
	const parsedYaml = yaml.parse(content)

	//Remove keys that make the bundle heavier but are only useful for translation purposes, not in the UI
	return Array.isArray(parsedYaml)
		? parsedYaml.map((entry) =>
				Object.fromEntries(
					Object.entries(entry).filter(([key]) => !key.endsWith('.lock'))
				)
		  )
		: {
				entries: Object.fromEntries(
					Object.entries(parsedYaml.entries).filter(
						([key]) => !key.endsWith('.lock')
					)
				),
		  }
}

import uiEnYaml from './ui/ui-en-us.yaml'
import uiFrYaml from './ui/ui-fr.yaml'
// Commented until validation by a native speaker
// import uiEs from './ui/ui-es.yaml'
// import uiIt from './ui/ui-it.yaml'

const uiFr = parseYaml(uiFrYaml)
const uiEn = parseYaml(uiEnYaml)

import faqEnYaml from './faq/FAQ-en-us.yaml'
import faqFrYaml from './faq/FAQ-fr.yaml'
// Commented until validation by a native speaker
// import faqEs from './faq/FAQ-es.yaml'
// import faqIt from './faq/FAQ-it.yaml'

const faqFr = parseYaml(faqFrYaml)
const faqEn = parseYaml(faqEnYaml)

import { Lang, LangInfos } from '@/types/translation'
import releasesEn from './releases/releases-en-us.json'
import releasesFr from './releases/releases-fr.json'
// Commented until validation by a native speaker
// import releasesEs from './releases/releases-es.json'
// import releasesIt from './releases/releases-it.json'

export const defaultLang = Lang.Fr

export function getLangInfos(lang: Lang): LangInfos {
	switch (lang) {
		case Lang.En: {
			return {
				name: 'English',
				abrv: 'en',
				abrvLocale: 'en-US',
				faqContent: faqEn,
				releases: releasesEn,
				uiTrad: uiEn.entries,
			}
		}
		// Commented until validation by a native speaker
		// case Lang.Es: {
		// 	return {
		// 		name: 'Español',
		// 		abrv: 'es',
		// 		abrvLocale: 'es-ES',
		// 		faqContent: faqEs,
		// 		releases: releasesEs,
		// 		uiTrad: uiEs.entries,
		// 	}
		// }
		// case Lang.It: {
		// 	return {
		// 		name: 'Italiano',
		// 		abrv: 'it',
		// 		abrvLocale: 'it-IT',
		// 		faqContent: faqIt,
		// 		releases: releasesIt,
		// 		uiTrad: uiIt.entries,
		// 	}
		// }
		case Lang.Fr:
		default: {
			return {
				name: 'Français',
				abrv: 'fr',
				abrvLocale: 'fr-FR',
				faqContent: faqFr,
				releases: releasesFr,
				uiTrad: uiFr.entries,
			}
		}
	}
}

export function getLangFromAbreviation(abrv: string): Lang {
	switch (abrv.slice(0, 2)) {
		case 'fr':
			return Lang.Fr
		case 'en':
			return Lang.En

		// Commented until validation by a native speaker
		// case 'es':
		// 	return Lang.Es
		// case 'it':
		// 	return Lang.It

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
