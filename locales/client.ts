'use client'

import { languages } from '@/constants/translation'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
	initReactI18next,
	useTranslation as useLibTranslation,
} from 'react-i18next'
import { getOptions } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(
		resourcesToBackend((language: string) => {
			return import(`@/locales/ui/ui-${language.toLowerCase()}.yaml`)
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
	const { locale: language } = useRouter()

	const transObject = useLibTranslation()

	const { i18n } = transObject

	if (runsOnServerSide && language && i18n.resolvedLanguage !== language) {
		i18n.changeLanguage(language)
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
			if (!language || i18n.resolvedLanguage === language) return

			i18n.changeLanguage(language)
		}, [language, i18n])
	}

	return transObject
}
