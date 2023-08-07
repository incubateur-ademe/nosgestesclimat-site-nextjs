'use client'

import Markdown from 'markdown-to-jsx'
import { Trans, useTranslation } from 'react-i18next'

import LandingContainer from './LandingContainer'

import { IframeOptionsContext } from '@/contexts/IframeOptionsContext'
import ContentEn from '@/locales/pages/en-us/landing.md'
import ContentFr from '@/locales/pages/fr/landing.md'
import { useContext } from 'react'
import ListedAdvantages from './ListedAdvantaged'

// Commented until validation by a native speaker
// import contentEs from '../../locales/pages/es/landing.md'
// import contentIt from '../../locales/pages/it/landing.md'

type TextLang = { fr: string; en: string /*es: string; it: string */ }

type Avantage = {
	illustration: string
	icon?: string
	text: TextLang
}

export async function generateStaticParams() {
	return [{ lang: 'fr' }, { lang: 'en-US' }]
}

export default function LandingExplanations({ locale }: { locale: string }) {
	const { isIframe } = useContext(IframeOptionsContext)

	console.log('TODO : replace trad here')
	const { t } = useTranslation()

	if (isIframe) return null

	return (
		<>
			<div className="w-full">
				<LandingContainer background>
					<ContentFr />
					<ContentEn />
				</LandingContainer>

				<LandingContainer>
					<h2>
						<Trans>Ouvert, documenté et contributif</Trans>
					</h2>
					<ListedAdvantages />
					<Markdown
						children={t('sites.publicodes.LandingExplanations.faqLink')}
					/>
				</LandingContainer>
			</div>
		</>
	)
}
