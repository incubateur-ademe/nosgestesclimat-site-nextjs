'use client'

import { matomoEventModeGroupeCTAStart } from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { Trans } from 'react-i18next'

export default function GroupsLink() {
	return (
		<ButtonLink
			href="/groupe"
			className="ui__ button cta"
			onClick={() => {
				trackEvent(matomoEventModeGroupeCTAStart)
			}}
			data-cypress-id="as-a-group-link"
		>
			<img
				src="/images/silhouettes.svg"
				alt=""
				width="100"
				height="100"
				className="w-32 h-auto mr-4"
			/>
			<span>
				<Trans>En groupe</Trans>
			</span>
		</ButtonLink>
	)
}
