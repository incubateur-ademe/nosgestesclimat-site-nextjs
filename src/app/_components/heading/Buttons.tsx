'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import {
  matomoEventParcoursTestNouveau,
  matomoEventParcoursTestReprendre,
  matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useIsClient } from '@/hooks/useIsClient'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function Buttons() {
  const { tutorials, getCurrentSimulation, initSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const isClient = useIsClient()

  const progression = currentSimulation?.progression || 0
  let label
  if (!progression) {
    label = <Trans>Passer le test →</Trans>
  } else if (progression < 1) {
    label = <Trans>Reprendre mon test</Trans>
  } else {
    label = <Trans>Voir mes résultats</Trans>
  }

  return (
    <div className="relative">
      <ButtonLink
        className={`transition-opacity duration-500 ${
          isClient ? 'opacity-100' : 'opacity-0'
        }`}
        href={tutorials.testIntro ? '/simulateur/bilan' : '/tutoriel'}
        data-cypress-id="do-the-test-link"
        onClick={() => {
          if (progression) {
            trackEvent(matomoEventParcoursTestReprendre)
            return
          }

          trackEvent(matomoEventParcoursTestStart)
        }}
        size="lg">
        {label}
      </ButtonLink>
      {progression ? (
        <Link
          className={`absolute left-1/2 top-full -translate-x-1/2 translate-y-6 whitespace-nowrap transition-opacity delay-200 duration-1000 md:text-lg ${
            isClient ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            trackEvent(matomoEventParcoursTestNouveau)
            initSimulation()
          }}
          href={tutorials.testIntro ? '/simulateur/bilan' : '/tutoriel'}>
          <Trans>Commencer un nouveau test</Trans>
        </Link>
      ) : null}
    </div>
  )
}
