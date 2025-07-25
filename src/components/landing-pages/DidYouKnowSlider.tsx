'use client'

import ColorLine from '@/design-system/layout/ColorLine'
import Separator from '@/design-system/layout/Separator'
import {
  getLandingDidYouKnowSlider,
  getLandingDidYouKnowSliderValue,
} from '@/helpers/tracking/landings'
// @ts-expect-error package types are wrongly exported
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CTAButtonsPlaceholder from '../cta/CTAButtonsPlaceholder'
import Trans from '../translation/trans/TransClient'

const DynamicCTAButtons = dynamic(
  () => import('@/components/cta/DynamicCTAButtons'),
  { ssr: false, loading: () => <CTAButtonsPlaceholder /> }
)

export default function DidYouKnowSlider({
  slides,
  className,
  titleTag = 'h2',
}: {
  slides: { illustration: string; content: ReactNode; highlight?: ReactNode }[]
  className?: string
  titleTag?: 'h2' | 'h3'
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const pathname = usePathname()

  const Title = titleTag === 'h2' ? 'h2' : 'h3'

  return (
    <div
      className={twMerge(
        'bg-heroLightBackground relative pt-16 pb-20',
        className
      )}>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 lg:flex-row lg:gap-0">
        <Splide
          options={{
            autoplay: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnInteraction: false,
            rewind: true,
            interval: 5500,
            reducedMotion: true,
          }}
          onMoved={(slide: unknown, nextSlideIndex: number) =>
            setCurrentSlide(nextSlideIndex)
          }
          onAutoplayPlay={(slide: unknown, nextSlideIndex: number) =>
            setCurrentSlide(nextSlideIndex)
          }
          className="relative max-w-[594px]"
          role="group">
          {slides.map((slide, index) => (
            <SplideSlide
              className="mx-auto flex! w-full max-w-[90vw] flex-col items-start gap-10 md:flex-row"
              key={`slide-${index}`}>
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
                <Title className="text-center text-xl md:text-left md:text-3xl">
                  <Trans>Le saviez vous ?</Trans>
                </Title>

                <Separator className="mx-auto my-4 md:mx-0" />

                <p className="mb-2 text-center text-sm md:text-left md:text-lg">
                  {slide.content}
                </p>

                <p className="text-secondary-700 mt-4 mb-0 pb-4 text-center text-sm font-bold md:text-left md:text-lg">
                  {slide.highlight}
                </p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
        <div>
          <DynamicCTAButtons
            trackingEvents={{
              start: getLandingDidYouKnowSlider(
                pathname,
                getLandingDidYouKnowSliderValue(currentSlide + 1)
              ),
              resume: getLandingDidYouKnowSlider(
                pathname,
                getLandingDidYouKnowSliderValue(currentSlide + 1)
              ),
              results: getLandingDidYouKnowSlider(
                pathname,
                getLandingDidYouKnowSliderValue(currentSlide + 1)
              ),
            }}
            withRestart={false}
          />
        </div>
      </div>

      <ColorLine className="bg-rainbow animate-rainbow-slow absolute bottom-0 left-0 h-[4px] w-[100%] transition-all" />
    </div>
  )
}
