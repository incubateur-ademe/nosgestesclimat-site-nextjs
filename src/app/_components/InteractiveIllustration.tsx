'use client'

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
      <PulsatingDot className="bottom-[15%] left-[50%]" />

      {/* Shirt */}
      <PulsatingDot className="right-[30%] top-[40%]" />

      {/* Coffee */}
      <PulsatingDot className="bottom-[35%] left-[12%]" />

      {/* Car */}
      <PulsatingDot className="bottom-[10%] left-[10%]" />
    </div>
  )
}
