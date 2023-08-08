'use client'

import Markdown from 'markdown-to-jsx'
import { Trans } from 'react-i18next'

import LandingContainer from './LandingContainer'

import { IframeOptionsContext } from '@/contexts/IframeOptionsContext'
import { useClientTranslation } from '@/locales/client'
import ContentEn from '@/locales/pages/en-us/landing.md'
import ContentFr from '@/locales/pages/fr/landing.md'
import { useContext } from 'react'
import ListedAdvantages from './ListedAdvantaged'

// Commented until validation by a native speaker
// import contentEs from '../../locales/pages/es/landing.md'
// import contentIt from '../../locales/pages/it/landing.md'

export async function generateStaticParams() {
	return [{ lang: 'fr' }, { lang: 'en-US' }]
}

export default function LandingExplanations({ locale }: { locale: string }) {
	const { isIframe } = useContext(IframeOptionsContext)

	const { t } = useClientTranslation()

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
