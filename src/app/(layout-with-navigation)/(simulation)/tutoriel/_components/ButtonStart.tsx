'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useUser } from '@/publicodes-state'

export default function ButtonStart() {
  const { hideTutorial } = useUser()
  const { getLinkToNextInfosPage } = useInfosPage()

  return (
    <ButtonLink
      href={getLinkToNextInfosPage({ curPage: 'tutoriel' })}
      data-cypress-id="skip-tutorial-button"
      onClick={() => hideTutorial('testIntro')}>
      <Trans>C'est parti ! →</Trans>
    </ButtonLink>
  )
}
