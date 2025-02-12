'use client'

import Trans from '@/components/translation/Trans'
import { createGroupLink } from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function CreateGroupLink() {
  return (
    <ButtonLink href="/amis" onClick={() => trackEvent(createGroupLink)}>
      <Trans>Créer un groupe</Trans>
    </ButtonLink>
  )
}
