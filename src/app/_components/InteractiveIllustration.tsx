'use client'

import Trans from '@/components/translation/Trans'
import Image from 'next/image'
import { FloatingElementDisplayedProvider } from './interactiveIllustration/FloatingElementDisplayedProvider'
import PulsatingDot from './interactiveIllustration/PulsatingDot'

export default function InteractiveIllustration() {
  return (
    <div className="relative">
      <Image
        src="/images/illustrations/girl-typing.svg"
        alt=""
        width={580}
        height={580}
      />
      <FloatingElementDisplayedProvider>
        {/* Computer */}
        <PulsatingDot
          className="bottom-[15%] left-[50%]"
          itemTitle={<Trans>Ordinateur</Trans>}
          itemKey="computer"
          carbonScore={4}
          waterScore={4}
          shouldDefaultDisplayFloatingInfo={true}
        />

        {/* Shirt */}
        <PulsatingDot
          className="right-[35%] top-[40%]"
          itemTitle={<Trans>Chemisier</Trans>}
          itemKey="shirt"
          carbonScore={3}
          waterScore={5}
          floatingInfoOrientation="left"
        />

        {/* Coffee */}
        <PulsatingDot
          className="bottom-[41%] left-[12%]"
          itemTitle={<Trans>Café</Trans>}
          itemKey="coffee"
          carbonScore={4}
          waterScore={3}
        />

        {/* Car */}
        <PulsatingDot
          className="bottom-[15%] left-[10%]"
          itemTitle={<Trans>Voiture</Trans>}
          carbonScore={5}
          itemKey="car"
        />
      </FloatingElementDisplayedProvider>
    </div>
  )
}
