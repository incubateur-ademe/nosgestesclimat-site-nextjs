'use client'

import Trans from '@/components/translation/Trans'
import { homeClickOrganisations } from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import Image from 'next/image'
import { useState } from 'react'
import Background from './organisations/Background'

export default function Organisations() {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className="relative mb-16 py-12 md:py-24">
      <Background direction={isHover ? 'left' : 'right'} withColorLine />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-4 md:flex-row md:gap-4 md:px-8">
        <div className="w-full flex-1 basis-1/2 md:max-w-lg">
          <Kicker>
            <Trans>Nos Gestes Climat pour les organisations</Trans>
          </Kicker>
          <h2 className="font-medium md:text-3xl">
            <Trans>
              Notre offre dédiée aux entreprises, collectivités, écoles et
              associations
            </Trans>
          </h2>
          <p className="max-w-lg md:mb-8 md:max-w-sm md:text-lg">
            <Trans>Vous souhaitez</Trans>{' '}
            <strong className="text-primary-700">
              <Trans>diffuser Nos Gestes Climat</Trans>
            </strong>{' '}
            <Trans>
              via votre organisation ? Découvrez nos outils pour vous simplifier
              la vie !
            </Trans>
          </p>
          <ButtonLink
            href="/organisations"
            data-cypress-id="organisations-link"
            trackingEvent={homeClickOrganisations}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <Trans>Découvrir</Trans>
          </ButtonLink>
        </div>
        <div className="relative hidden flex-1 md:block">
          <Image
            className="absolute"
            src="/images/organisations/crowd.png"
            width="603"
            height="332"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
