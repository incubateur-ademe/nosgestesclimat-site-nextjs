'use client'

import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/Trans'
import {
  organisationsAccueilClickCommencer,
  organisationsAccueilClickDemo,
} from '@/constants/tracking/pages/organisationsAccueil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import Illustration from './heroSection/Illustration'

export default function HeroSection() {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className="flex flex-wrap justify-center gap-12 pt-14 lg:flex-nowrap lg:justify-start lg:gap-16">
      <div className="max-w-full md:w-[34rem]">
        <h1>
          <Trans>Nos Gestes Climat pour les organisations</Trans>
        </h1>

        <div className="mb-12 text-sm md:text-lg">
          <Baseline />
        </div>
        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:justify-start md:items-baseline md:gap-8 lg:justify-start">
          <ButtonLink
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            href="/organisations/connexion"
            trackingEvent={organisationsAccueilClickCommencer}>
            <Trans>Commencer</Trans>
          </ButtonLink>

          <ButtonLink
            color="text"
            href="/organisations/demander-demo"
            onClick={() => {
              trackEvent(organisationsAccueilClickDemo)
            }}>
            <Trans>Demander une démo</Trans>
          </ButtonLink>
        </div>
      </div>

      <div className="hidden flex-1 lg:block">
        <Illustration isHover={isHover} className="h-auto w-full" />
      </div>
    </div>
  )
}
