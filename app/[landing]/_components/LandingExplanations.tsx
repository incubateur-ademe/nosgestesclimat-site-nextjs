'use client'
import { Trans } from 'react-i18next'

import LandingContainer from './LandingContainer'

import { IframeOptionsContext } from '@/contexts/IframeOptionsContext'
import { useClientTranslation } from '@/locales/client'
import LandingContentEn from '@/locales/pages/en-us/landing.mdx'
import LandingContentFr from '@/locales/pages/fr/landing.mdx'
import { useContext } from 'react'
import ListedAdvantages from './ListedAdvantaged'

// Commented until validation by a native speaker
// import contentEs from '../../locales/pages/es/landing.md'
// import contentIt from '../../locales/pages/it/landing.md'

export async function generateStaticParams() {
	return [{ lang: 'fr' }, { lang: 'en-US' }]
}

export default function LandingExplanations() {
	const { isIframe } = useContext(IframeOptionsContext)

	const { t } = useClientTranslation()

	if (isIframe) return null

	return (
		<>
			<div className="w-full">
				<LandingContainer background>
					<LandingContentFr />
					<LandingContentEn />
				</LandingContainer>

				<LandingContainer>
					<h2>
						<Trans>Ouvert, documenté et contributif</Trans>
					</h2>
					<ListedAdvantages />
					{t('sites.publicodes.LandingExplanations.faqLink')}
				</LandingContainer>
			</div>
		</>
	)
}
