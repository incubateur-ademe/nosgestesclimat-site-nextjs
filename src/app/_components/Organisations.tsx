'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { useState } from 'react'
import Background from './organisations/Background'

export default function Organisations() {
  const { t } = useClientTranslation()

  const [isHover, setIsHover] = useState(false)

  return (
    <div className="relative mb-16 py-12 md:py-24">
      <Background direction={isHover ? 'left' : 'right'} />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-4 md:flex-row md:gap-4 md:px-8">
        <div className="w-full flex-1 basis-1/2 md:max-w-lg">
          <Kicker>
            <Trans>Pour les organisations</Trans>
          </Kicker>
          <h2 className="font-medium md:text-3xl">
            <Trans>
              Nos Gestes Climat dans votre entreprise, association, école...
            </Trans>
          </h2>
          <p className="max-w-lg md:mb-8 md:max-w-sm md:text-lg">
            {t(
              'Vous souhaitez diffuser Nos Gestes Climat auprès de votre organisation, découvrez-nous outils pour vous simplifier la vie\u202f!'
            )}
          </p>
          <ButtonLink
            href="/organisations"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <Trans>Découvrir</Trans>
          </ButtonLink>
        </div>
        <div
          className="relative hidden flex-1 items-center md:flex"
          data-cypress-id="organisations-link">
          <Image
            src="/images/organisations/crowd.png"
            width={500}
            height={400}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
