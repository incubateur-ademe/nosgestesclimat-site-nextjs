'use client'

import TransClient from '@/components/translation/TransClient'
import { getOpenmojiURL } from '@/constants/urls'
import InlineLink from '@/design-system/inputs/InlineLink'
import { Appear } from '@/design-system/utils/Animate'
import { useClientTranslation } from '@/locales/client'

export default function ProfileLink() {
	// const { hasData } = useProfileData()
	const { t } = useClientTranslation()

	/*
	if (!hasData) {
		return null
	}
	*/

	return (
		<Appear delay={1}>
			<div className="mt-4 md:flex md:justify-center">
				<InlineLink
					href="/profil"
					title={t('Page profil')}
					className="w-[18rem] rounded-sm flex items-center"
				>
					<img alt="" src={getOpenmojiURL('profile')} className="w-6" />
					<span className="ml-2">
						<TransClient>Voir le détail de ma simulation</TransClient>
					</span>
				</InlineLink>
			</div>
		</Appear>
	)
}
