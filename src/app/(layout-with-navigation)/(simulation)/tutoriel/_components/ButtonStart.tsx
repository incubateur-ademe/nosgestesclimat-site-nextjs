'use client'

import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useUser } from '@/publicodes-state'

export default function ButtonStart() {
  const { hideTutorial } = useUser()

  return (
    <ButtonLink
      href="/simulateur/bilan"
      data-cypress-id="skip-tuto-button"
      onClick={() => hideTutorial('testIntro')}>
      <TransClient>C'est parti ! →</TransClient>
    </ButtonLink>
  )
}
