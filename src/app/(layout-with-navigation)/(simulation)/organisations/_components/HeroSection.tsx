'use client'

import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/Trans'
import {
  clickAskDemoLandingPageEvent,
  clickStartButtonLandingPageEvent,
} from '@/constants/matomo/organisations'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="flex flex-wrap justify-center gap-12 pt-14 lg:flex-nowrap lg:justify-start lg:gap-8">
      <div className="max-w-full md:w-[34rem]">
        <h1 className="text-center md:text-left">
          <Trans>Nos Gestes Climat pour les organisations</Trans>
        </h1>

        <Baseline />

        <div className="flex flex-col flex-wrap items-center gap-8 sm:flex-row sm:justify-center md:items-baseline lg:justify-start">
          <ButtonLink
            href="/organisations/connexion"
            onClick={() => {
              trackEvent(clickStartButtonLandingPageEvent)
            }}
            size="lg">
            <Trans>Commencez</Trans>
          </ButtonLink>

          <InlineLink
            className="py-4"
            href="/organisations/demander-demo"
            onClick={() => {
              trackEvent(clickAskDemoLandingPageEvent)
            }}>
            <Trans>Demandez une démo</Trans>
          </InlineLink>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <Image
          src="/images/organisations/group.svg"
          alt=""
          width="400"
          height="400"
          className="mx-auto block max-w-xs md:mx-0 md:max-w-lg"
        />
      </div>
    </div>
  )
}
