'use client'

import Trans from '@/components/translation/trans/TransClient'
import { trackCreateGroupLink } from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/buttons/ButtonLink'

export default function CreateGroupLink() {
  return (
    <ButtonLink
      href="/amis/creer/connexion"
      onClick={() => trackCreateGroupLink()}>
      <Trans>Créer un groupe</Trans>
    </ButtonLink>
  )
}
