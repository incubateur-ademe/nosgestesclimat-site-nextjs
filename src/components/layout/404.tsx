'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { useState } from 'react'
import Wave from 'react-wavify'
import Trans from '../translation/Trans'
import Fish from './404/Fish'

export default function Route404() {
  const { t } = useClientTranslation()

  const [numberOfFish, setNumberOfFish] = useState(0)
  return (
    <div className="relative h-svh">
      <div className="absolute bottom-0 left-0 right-0 top-20 bg-[#1617C5] opacity-75 lg:top-36" />

      <div className="relative mt-20 flex flex-col items-center lg:mt-36">
        <div className="relative w-full bg-white">
          <h1 className="mb-2 flex items-center justify-center text-[10rem] font-black text-amber-400  md:text-[20rem]">
            <span className="island mt-20 leading-none">4</span>
            <span className="island relative leading-none">
              <Image
                onClick={() =>
                  setNumberOfFish((prevNumberOfFish) => prevNumberOfFish + 1)
                }
                className="hover:animate-jump absolute -top-16 left-0 right-0 m-auto w-10 md:w-12"
                src="/images/misc/404_bonhomme.svg"
                width="60"
                height="60"
                alt={t('Un bonhomme se demandant où il est')}
              />
              0
            </span>
            <span className="island mt-20 leading-none">4</span>
          </h1>
          <Wave
            fill="#1617C5"
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full opacity-75"
            options={{
              height: 70,
              amplitude: 70,
              speed: 0.11,
              points: 3,
            }}
          />
        </div>
        <p className="relative text-center font-bold text-white sm:text-lg md:text-2xl">
          <Trans>
            Rien à l'horizon ! <br className="md:hidden" />
            La page recherchée n'existe pas.
          </Trans>
        </p>
        <ButtonLink
          color="primary"
          href="/"
          className="relative mt-8 justify-self-center border-2 border-white bg-white !text-primary-700 shadow-sm hover:bg-white hover:text-primary-700">
          <Trans>Revenir à l'accueil</Trans>
        </ButtonLink>
      </div>
      <Fish numberOfFish={numberOfFish} />
    </div>
  )
}
