'use client'

import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/Trans'
import {
  organisationsAccueilClickCommencer,
  organisationsAccueilClickDemo,
} from '@/constants/tracking/pages/organisationsAccueil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="flex flex-wrap justify-center gap-12 pt-14 lg:flex-nowrap lg:justify-start lg:gap-8">
      <div className="max-w-full md:w-[34rem]">
        <h1>
          <Trans>Nos Gestes Climat pour les organisations</Trans>
        </h1>

        <div className="mb-12 text-sm md:text-lg">
          <Baseline />
        </div>

        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:justify-start md:items-baseline md:gap-8 lg:justify-start">
          <ButtonLink
            href="/organisations/connexion"
            trackingEvent={organisationsAccueilClickCommencer}>
            <Trans>Commencez</Trans>
          </ButtonLink>

          <InlineLink
            className="py-4"
            href="/organisations/demander-demo"
            onClick={() => {
              trackEvent(organisationsAccueilClickDemo)
            }}>
            <Trans>Demandez une démo</Trans>
          </InlineLink>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <Image
          src="/images/organisations/group.svg"
          alt=""
          width="400"
          height="400"
          className="mx-auto block max-w-full md:mx-0 md:max-w-lg"
        />
      </div>
    </div>
  )
}
