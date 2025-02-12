'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { FloatingElementDisplayedProvider } from './interactiveIllustration/FloatingElementDisplayedProvider'
import PulsatingDot from './interactiveIllustration/PulsatingDot'
export default function InteractiveIllustration() {
  const { t } = useClientTranslation()

  return (
    <div className="relative mx-auto sm:max-w-[380px] md:max-w-none">
      <Image
        src="/images/illustrations/empreinte-carbone-eau-objets-du-quotidien.svg"
        alt={t(
          "Une fille tapant sur son ordinateur, entouré d'objets aux empreintes carbone et eau variées."
        )}
        width={580}
        height={580}
      />
      <FloatingElementDisplayedProvider>
        {/* Computer */}
        <PulsatingDot
          className="bottom-[15%] left-[50%]"
          itemTitle={<TransClient>Ordinateur</TransClient>}
          itemKey="computer"
          carbonScore={4}
          waterScore={4}
          shouldDefaultDisplayFloatingInfo={true}
        />

        {/* Shirt */}
        <PulsatingDot
          className="top-[40%] right-[35%]"
          itemTitle={<TransClient>Chemisier</TransClient>}
          itemKey="shirt"
          carbonScore={3}
          waterScore={5}
          floatingInfoOrientation="left"
        />

        {/* Coffee */}
        <PulsatingDot
          className="bottom-[41%] left-[12%]"
          itemTitle={<TransClient>Café</TransClient>}
          itemKey="coffee"
          carbonScore={4}
          waterScore={3}
        />

        {/* Car */}
        <PulsatingDot
          className="bottom-[15%] left-[10%]"
          itemTitle={<TransClient>Voiture</TransClient>}
          carbonScore={5}
          itemKey="car"
        />
      </FloatingElementDisplayedProvider>
    </div>
  )
}
