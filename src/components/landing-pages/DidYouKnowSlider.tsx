'use client'

import ColorLine from '@/design-system/layout/ColorLine'
import Separator from '@/design-system/layout/Separator'
import Image from 'next/image'
import type { ReactNode } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import DynamicCTAButton from '../cta/DynamicCTAButton'

export default function DidYouKnowSlider({
  slides,
}: {
  slides: {
    illustration: string
    content: ReactNode
    highlight: ReactNode
  }[]
}) {
  return (
    <div className="relative bg-heroLightBackground pb-20 pt-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 md:flex-row md:gap-0">
        <Slider
          dots={true}
          arrows={false}
          infinite={true}
          autoplay={true}
          autoplaySpeed={4000}
          fade
          easing="ease-in-out"
          className="max-w-[594px]">
          {slides.map((slide) => (
            <li
              className="mx-auto !flex w-full max-w-[90vw] flex-col items-start gap-10 md:flex-row"
              key={String(slide.highlight)}>
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white md:mx-0 md:h-40 md:w-40">
                <Image
                  src={slide.illustration}
                  className="w-12 md:w-20"
                  alt=""
                  width="80"
                  height="80"
                />
              </div>

              <div className="w-full flex-1">
                <h3 className="text-center text-xl md:text-left md:text-3xl">
                  Le saviez vous ?
                </h3>

                <Separator className="mx-auto my-4 md:mx-0" />

                <p className="mb-1 text-center text-sm md:text-left md:text-lg">
                  {slide.content}
                </p>

                <p className="mb-0 text-center text-sm font-bold text-secondary-700 md:text-left md:text-lg">
                  {slide.highlight}
                </p>
              </div>
            </li>
          ))}
        </Slider>
        <div>
          <DynamicCTAButton />
        </div>
      </div>

      <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[4px] w-[100%] animate-rainbow-slow transition-all" />
    </div>
  )
}
