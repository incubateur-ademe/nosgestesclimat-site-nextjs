'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useUser } from '@/publicodes-state'

export default function ButtonStart() {
  const { hideTutorial } = useUser()

  return (
    <ButtonLink
      href="/simulateur/bilan"
      data-cypress-id="skip-tutorial-button"
      onClick={() => hideTutorial('testIntro')}>
      <Trans>C'est parti ! →</Trans>
    </ButtonLink>
  )
}
