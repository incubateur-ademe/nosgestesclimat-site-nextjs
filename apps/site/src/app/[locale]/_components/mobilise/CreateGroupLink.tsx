'use client'

import Trans from '@/components/translation/trans/TransClient'
import { captureCreateGroupLink } from '@/constants/trackers'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function CreateGroupLink() {
  return (
    <ButtonLink
      href="/amis/creer/connexion"
      onClick={() => {
        trackPosthogEvent(captureCreateGroupLink)
      }}>
      <Trans>Créer un groupe</Trans>
    </ButtonLink>
  )
}
