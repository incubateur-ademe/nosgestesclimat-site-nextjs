'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import { useState } from 'react'
import Background from './organisations/Background'
import Images from './organisations/Images'

export default function Organisations() {
  const [isHover, setIsHover] = useState(false)
  return (
    <div className="relative mb-16 py-12 md:py-24">
      <Background direction={isHover ? 'left' : 'right'} />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-4 md:flex-row md:gap-28">
        <div className=" max-w-lg flex-1 basis-1/2">
          <Kicker>
            <Trans>Pour les organisations</Trans>
          </Kicker>
          <h2 className="font-medium md:text-3xl">
            <Trans>
              Nos Gestes Climat dans votre entreprise, association, école...
            </Trans>
          </h2>
          <p className="max-w-sm md:mb-8 md:text-lg">
            <Trans>
              Vous souhaitez diffuser Nos Gestes Climat auprès de votre
              organisation, découvrez-nous outils pour vous simplifier la
              vie&#8239;!
            </Trans>
          </p>
          <ButtonLink
            href="/actions"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <Trans>Découvrir</Trans>
          </ButtonLink>
        </div>
        <div className="relative hidden flex-1 md:block">
          <Images />
        </div>
      </div>
    </div>
  )
}
