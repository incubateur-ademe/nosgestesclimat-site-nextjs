'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import useAppNavigation from '@/hooks/useAppNavigation'
import { useUser } from '@/publicodes-state'

export default function ButtonStart() {
  const { hideTutorial } = useUser()
  const { linkAfterTutorial } = useAppNavigation()

  return (
    <ButtonLink
      href={linkAfterTutorial}
      data-cypress-id="skip-tutorial-button"
      onClick={() => hideTutorial('testIntro')}>
      <Trans>C'est parti ! →</Trans>
    </ButtonLink>
  )
}
