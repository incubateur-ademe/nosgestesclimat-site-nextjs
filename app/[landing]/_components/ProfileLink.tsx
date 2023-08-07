'use client'

import { getOpenmojiURL } from '@/constants/urls'
import InlineLink from '@/design-system/inputs/InlineLink'
import { Appear } from '@/design-system/utils/Animate'
import { Trans, useTranslation } from 'react-i18next'

export default function ProfileLink() {
	// const { hasData } = useProfileData()
	const { t } = useTranslation()

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
						<Trans>Voir le détail de ma simulation</Trans>
					</span>
				</InlineLink>
			</div>
		</Appear>
	)
}
