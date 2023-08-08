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
					case 'en':
						return uiEnYaml
					case 'fr':
						return uiFrYaml
					default:
						return uiFrYaml
				}
			})
		)
		.init(getOptions(language))

	return i18nInstance
}

export async function useServerTranslation(
	language: string,
	namespace?: string,
	options?: { keyPrefix: string }
) {
	console.log(language)
	const i18nextInstance = await initI18next(language || '')
	console.log(
		i18nextInstance.getFixedT(
			language || '',
			Array.isArray(namespace) ? namespace[0] : namespace,
			options?.keyPrefix ?? ''
		)
	)
	return {
		t: i18nextInstance.getFixedT(
			language || '',
			Array.isArray(namespace) ? namespace[0] : namespace,
			options?.keyPrefix ?? ''
		),
		i18n: i18nextInstance,
	}
}
