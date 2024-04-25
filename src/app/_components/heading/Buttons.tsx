'use client'

import Trans from '@/components/translation/Trans'
import {
  homeClickCtaCommencer,
  homeClickCtaReprendre,
  homeClickCtaResultats,
  homeClickNewTest,
} from '@/constants/tracking/pages/home'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useIsClient } from '@/hooks/useIsClient'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Buttons() {
  const { progression } = useCurrentSimulation()

  const isClient = useIsClient()

  const {
    goToSimulateurPage,
    linkToSimulateurPage,
    linkToSimulateurPageLabel,
  } = useSimulateurPage()

  const [isHover, setIsHover] = useState(false)
  return (
    <div className="relative">
      <ButtonLink
        size="xl"
        className={`transition-all duration-300 hover:bg-primary-900 ${
          isClient ? 'opacity-100' : 'opacity-0'
        }`}
        href={linkToSimulateurPage}
        data-cypress-id="do-the-test-link"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (progression === 1) {
            trackEvent(homeClickCtaResultats)
            return
          }

          if (progression > 0) {
            trackEvent(homeClickCtaReprendre)
            return
          }

          trackEvent(homeClickCtaCommencer)
        }}>
        <span
          className={twMerge(
            isHover
              ? 'bg-rainbow animate-rainbow-fast !bg-clip-text !text-transparent duration-1000'
              : '',
            'leading-none'
          )}>
          <Trans>{linkToSimulateurPageLabel}</Trans>
        </span>
      </ButtonLink>

      {progression ? (
        <Button
          color="link"
          className={`absolute left-1/2 top-full -translate-x-1/2 translate-y-4 whitespace-nowrap font-normal transition-all delay-200 duration-300 md:text-lg ${
            isClient ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            trackEvent(homeClickNewTest)
            goToSimulateurPage({ newSimulation: {} })
          }}>
          <Trans>Commencer un nouveau test</Trans>
        </Button>
      ) : null}
    </div>
  )
}
