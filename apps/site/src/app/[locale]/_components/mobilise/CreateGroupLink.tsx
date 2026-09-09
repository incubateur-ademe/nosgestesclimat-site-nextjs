'use client'

import Trans from '@/components/translation/trans/TransClient'
import { captureCreateGroupLink } from '@/constants/tracking/trackers'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function CreateGroupLink() {
  return (
    <ButtonLink
      href="/amis/creer/connexion"
      onClick={() => {
        trackEvent(captureCreateGroupLink)
      }}>
      <Trans>Créer un groupe</Trans>
    </ButtonLink>
  )
}
