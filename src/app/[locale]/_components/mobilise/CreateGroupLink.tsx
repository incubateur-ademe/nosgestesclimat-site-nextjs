'use client'

import Trans from '@/components/translation/trans/TransClient'
import { createGroupLink } from '@/constants/tracking/pages/mainLanding'
import { captureCreateGroupLink } from '@/constants/tracking/posthogTrackers'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function CreateGroupLink() {
  return (
    <ButtonLink
      href="/amis/creer/connexion"
      onClick={() => {
        trackEvent(createGroupLink)
        trackPosthogEvent(captureCreateGroupLink)
      }}>
      <Trans>Créer un groupe</Trans>
    </ButtonLink>
  )
}
