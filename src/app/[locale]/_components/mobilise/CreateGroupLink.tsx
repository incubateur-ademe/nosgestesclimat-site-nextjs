'use client'

import Trans from '@/components/translation/trans/TransClient'
import {
  createGroupLink,
  createGroupLinkPosthog,
} from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function CreateGroupLink() {
  return (
    <ButtonLink
      href="/amis/creer/connexion"
      onClick={() => {
        trackEvent(createGroupLink)
        trackPosthogEvent(createGroupLinkPosthog)
      }}>
      <Trans>Créer un groupe</Trans>
    </ButtonLink>
  )
}
