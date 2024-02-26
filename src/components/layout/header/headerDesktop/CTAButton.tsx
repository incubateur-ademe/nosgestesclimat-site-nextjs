'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'

export default function CTAButton() {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <ButtonLink href={getLinkToSimulateurPage()}>
      <Trans>{linkToSimulateurPageLabel}</Trans>
    </ButtonLink>
  )
}
