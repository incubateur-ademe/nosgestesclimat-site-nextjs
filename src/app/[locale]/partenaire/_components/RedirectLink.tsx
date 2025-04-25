'use client'

import Trans from '@/components/translation/trans/TransClient'
import { usePartner } from '@/contexts/partner/PartnerContext'
import ButtonLink from '@/design-system/buttons/ButtonLink'

export default function RedirectLink() {
  const { redirectUrl } = usePartner()

  return (
    <ButtonLink href={redirectUrl}>
      <Trans>Aller sur le site partenaire maintenant</Trans>
    </ButtonLink>
  )
}
