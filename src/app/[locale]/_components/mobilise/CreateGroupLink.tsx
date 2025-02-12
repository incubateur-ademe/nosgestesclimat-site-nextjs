'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { createGroupLink } from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function CreateGroupLink() {
  return (
    <ButtonLink href="/amis" onClick={() => trackEvent(createGroupLink)}>
      <TransClient>Créer un groupe</TransClient>
    </ButtonLink>
  )
}
