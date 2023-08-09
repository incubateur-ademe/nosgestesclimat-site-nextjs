'use client'

import { languages } from '@/constants/translation'
import { LangContext } from '@/contexts/LangContext'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useContext, useEffect, useState } from 'react'
import {
	initReactI18next,
	useTranslation as useLibTranslation,
} from 'react-i18next'
import { getOptions } from './settings'
import uiEnYaml from './ui/ui-en-us.yaml'
import uiFrYaml from './ui/ui-fr.yaml'

const runsOnServerSide = typeof window === 'undefined'

i18next
	.use(LanguageDetector)
	.use(
		resourcesToBackend((language: string) => {
			switch (language) {
				case 'en-US':
					return (uiEnYaml as unknown as { entries: {} }).entries
				case 'fr':
				default:
					return (uiFrYaml as unknown as { entries: {} }).entries
			}
		})
	)
	.use(initReactI18next)
	.init({
		...getOptions(),
		lng: undefined, // let detect the language on client side
		resources: {
			'en-US': {
				translation: (uiEnYaml as unknown as { entries: {} }).entries,
			},
			fr: {
				translation: (uiFrYaml as unknown as { entries: {} }).entries,
			},
		},
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator'],
		},
		preload: runsOnServerSide ? languages : [],
	})

export function useClientTranslation() {
	const [initChangeLang, setInitChangeLang] = useState(false)
	const { lang } = useContext(LangContext)

	const transObject = useLibTranslation('translation')

	const { i18n } = transObject

	useEffect(() => {
		if (!initChangeLang) {
			i18n.changeLanguage(lang)
			setInitChangeLang(true)
		}
	}, [lang, initChangeLang, i18n])

	if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
		i18n.changeLanguage(lang)
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (activeLng === i18n.resolvedLanguage) return

			setActiveLng(i18n.resolvedLanguage)
		}, [activeLng, i18n.resolvedLanguage])

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (!lang || i18n.resolvedLanguage === lang) return

			i18n.changeLanguage(lang)
		}, [lang, i18n])
	}

	return transObject
}

export default i18next
