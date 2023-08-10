'use client'

import TransClient from '@/components/translation/TransClient'
import { IframeOptionsContext } from '@/contexts/IframeOptionsContext'
import { useLang } from '@/contexts/LangContext'
import { useClientTranslation } from '@/locales/client'
import LandingContentEn from '@/locales/pages/en-us/landing.mdx'
import LandingContentFr from '@/locales/pages/fr/landing.mdx'
import { useContext } from 'react'
import ListedAdvantages from './ListedAdvantaged'

// Commented until validation by a native speaker
// import contentEs from '../../locales/pages/es/landing.md'
// import contentIt from '../../locales/pages/it/landing.md'
console.log(LandingContentFr)
export async function generateStaticParams() {
	return [{ lang: 'fr' }, { lang: 'en-US' }]
}

export default function LandingExplanations() {
	const { isIframe } = useContext(IframeOptionsContext)

	const lang = useLang()

	const { t } = useClientTranslation()

	if (isIframe) return null

	return (
		<>
			<div className="bg-gray-100  py-10">
				<div className="w-full max-w-3xl mx-auto">
					{lang === 'fr' && <LandingContentFr />}
					{lang === 'en-US' && <LandingContentEn />}
				</div>
			</div>
			<div className="w-full max-w-3xl mx-auto py-10">
				<h2>
					<TransClient>Ouvert, documenté et contributif</TransClient>
				</h2>
				<ListedAdvantages />
			</div>
		</>
	)
}
