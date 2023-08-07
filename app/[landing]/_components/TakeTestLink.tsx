'use client'

import {
	matomoEventParcoursTestReprendre,
	matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { Trans } from 'react-i18next'

export default function TakeTestLink({ hasData }: { hasData?: boolean }) {
	return (
		<ButtonLink
			href="/simulateur/bilan"
			className={`ui__ plain button cta`}
			css={hasData ? 'padding: 1rem!important;' : ''}
			data-cypress-id="do-the-test-link"
			onClick={() => {
				if (hasData) {
					trackEvent(matomoEventParcoursTestReprendre)
					return
				}

				trackEvent(matomoEventParcoursTestStart)
			}}
		>
			<ProgressCircle progress={0} white />
			<span>
				{hasData ? (
					<Trans>Reprendre mon test</Trans>
				) : (
					<Trans>Faire le test</Trans>
				)}
			</span>
		</ButtonLink>
	)
}
