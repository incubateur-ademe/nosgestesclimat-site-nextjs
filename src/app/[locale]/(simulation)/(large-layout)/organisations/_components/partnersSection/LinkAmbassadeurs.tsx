'use client'

import Trans from '@/components/translation/trans/TransClient'
import { organisationsAccueilClickAmbassadeurs } from '@/constants/tracking/pages/organisationsAccueil'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function LinkAmbassadeurs() {
  return (
    <ButtonLink
      color="secondary"
      href="/ambassadeurs"
      trackingEvent={organisationsAccueilClickAmbassadeurs}>
      <Trans>Ils ont testé</Trans>
    </ButtonLink>
  )
}
