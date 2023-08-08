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
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(
		resourcesToBackend((language: string) => {
			switch (language) {
				case 'en':
					return uiEnYaml.entries
				case 'fr':
				default:
					return uiFrYaml.entries
			}
		})
	)
	.init({
		...getOptions(),
		lng: undefined, // let detect the language on client side
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator'],
		},
		preload: runsOnServerSide ? languages : [],
	})

export function useClientTranslation() {
	const { lang } = useContext(LangContext)

	const transObject = useLibTranslation()

	const { i18n } = transObject

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
