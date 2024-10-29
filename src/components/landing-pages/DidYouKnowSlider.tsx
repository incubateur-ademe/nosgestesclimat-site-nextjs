'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import ColorLine from '@/design-system/layout/ColorLine'
import Separator from '@/design-system/layout/Separator'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import Image from 'next/image'
import { ReactNode } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

export default function DidYouKnowSlider({
  slides,
}: {
  slides: {
    illustration: string
    content: ReactNode
    highlight: ReactNode
  }[]
}) {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <div className="relative bg-heroLightBackground py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 md:flex-row md:gap-0">
        <Slider
          dots={true}
          arrows={false}
          infinite={false}
          fade
          className="max-w-[594px]">
          {slides.map((slide) => (
            <div
              className="!flex w-full flex-col items-start gap-10 md:flex-row"
              key={String(slide.highlight)}>
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-white md:mx-0">
                <Image src={slide.illustration} alt="" width="80" height="80" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-3xl">Le saviez vous ?</h3>

                <Separator />

                <p className="text-lg">{slide.content}</p>

                <p className="text-lg text-secondary-700">{slide.highlight}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div>
          <ButtonLink size="xl" href={getLinkToSimulateurPage()}>
            <Trans>{linkToSimulateurPageLabel}</Trans>
          </ButtonLink>
        </div>
      </div>

      <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[5px] w-[100%] animate-rainbow-slow transition-all" />
    </div>
  )
}
