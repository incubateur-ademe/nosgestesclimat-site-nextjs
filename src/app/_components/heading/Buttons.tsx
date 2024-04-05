'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import {
  matomoEventParcoursTestNouveau,
  matomoEventParcoursTestReprendre,
  matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useIsClient } from '@/hooks/useIsClient'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function Buttons() {
  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const isClient = useIsClient()

  const {
    goToSimulateurPage,
    getLinkToSimulateurPage,
    linkToSimulateurPageLabel,
  } = useSimulateurPage()

  const progression = currentSimulation?.progression || 0

  return (
    <div className="relative">
      <ButtonLink
        className={`transition-all duration-300 ${
          isClient ? 'opacity-100' : 'opacity-0'
        }`}
        href={getLinkToSimulateurPage()}
        data-cypress-id="do-the-test-link"
        onClick={() => {
          if (progression) {
            trackEvent(matomoEventParcoursTestReprendre)
            return
          }

          trackEvent(matomoEventParcoursTestStart)
        }}
        size="lg">
        <Trans>{linkToSimulateurPageLabel}</Trans>
      </ButtonLink>
      {progression ? (
        <Link
          className={`absolute left-1/2 top-full -translate-x-1/2 translate-y-6 whitespace-nowrap transition-all delay-200 duration-300 md:text-lg ${
            isClient ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            trackEvent(matomoEventParcoursTestNouveau)
            goToSimulateurPage({ noNavigation: true, newSimulation: {} })
          }}
          href={getLinkToSimulateurPage({ newSimulation: true })}>
          <Trans>Commencer un nouveau test</Trans>
        </Link>
      ) : null}
    </div>
  )
}
