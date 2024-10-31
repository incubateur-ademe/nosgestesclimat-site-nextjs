'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'

export default function TestCTAButton({
  size = 'xl',
  className,
}: {
  size?: 'sm' | 'lg' | 'xl'
  className?: string
}) {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <ButtonLink
      size={size}
      href={getLinkToSimulateurPage()}
      className={className}>
      <Trans>{linkToSimulateurPageLabel}</Trans>
    </ButtonLink>
  )
}
