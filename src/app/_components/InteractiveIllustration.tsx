'use client'

import Trans from '@/components/translation/Trans'
import Image from 'next/image'
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

      {/* Computer */}
      <PulsatingDot
        className="bottom-[15%] left-[50%]"
        itemTitle={<Trans>Ordinateur</Trans>}
        carbonScore={4}
        waterScore={4}
      />

      {/* Shirt */}
      <PulsatingDot
        className="right-[30%] top-[40%]"
        itemTitle={<Trans>Chemisier</Trans>}
        carbonScore={3}
        waterScore={5}
        floatingInfoOrientation="left"
      />

      {/* Coffee */}
      <PulsatingDot
        className="bottom-[35%] left-[12%]"
        itemTitle={<Trans>Café</Trans>}
        carbonScore={4}
        waterScore={3}
      />

      {/* Car */}
      <PulsatingDot
        className="bottom-[10%] left-[10%]"
        itemTitle={<Trans>Voiture</Trans>}
        carbonScore={5}
      />
    </div>
  )
}
