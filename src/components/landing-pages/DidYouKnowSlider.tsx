'use client'

import ColorLine from '@/design-system/layout/ColorLine'
import Separator from '@/design-system/layout/Separator'
import {
  getLandingDidYouKnowSlider,
  getLandingDidYouKnowSliderValue,
} from '@/helpers/tracking/landings'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
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
  slides: { illustration: string; content: ReactNode; highlight: ReactNode }[]
  className?: string
  titleTag?: 'h2' | 'h3'
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const pathname = usePathname()

  // Make slider accessible
  // Temporary : remove as soon as accessibility is well handled in Slick
  useEffect(() => {
    const slider = document.querySelector('.slick-track') as HTMLElement
    // Change slider tag to ul
    if (slider) {
      const ul = document.createElement('ul')
      ul.classList.add('slick-track')
      // copy style from slider to ul
      ul.style.width = window.getComputedStyle(slider).width
      ul.style.height = window.getComputedStyle(slider).height

      //Put slider children in ul
      Array.from(slider.children).forEach((child) => {
        const li = document.createElement('li')
        li.classList.add('slick-slide')
        li.appendChild(child)
        ul.appendChild(li)
      })

      slider.parentNode?.replaceChild(ul, slider)
    }
  }, [])

  const Title = titleTag === 'h2' ? 'h2' : 'h3'

  return (
    <div
      className={twMerge(
        'relative bg-heroLightBackground pb-20 pt-16',
        className
      )}>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 md:flex-row md:gap-0">
        <Slider
          dots={true}
          accessibility={true}
          arrows={false}
          infinite={true}
          autoplay={true}
          autoplaySpeed={4000}
          fade
          slide="ul"
          easing="ease-in-out"
          afterChange={(index) => setCurrentSlide(index)}
          className="max-w-[594px]">
          {slides.map((slide) => (
            <div
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
                <Title className="text-center text-xl md:text-left md:text-3xl">
                  <Trans>Le saviez vous ?</Trans>
                </Title>

                <Separator className="mx-auto my-4 md:mx-0" />

                <p className="mb-2 text-center text-sm md:text-left md:text-lg">
                  {slide.content}
                </p>

                <p className="mb-0 mt-4 pb-4 text-center text-sm font-bold text-secondary-700 md:text-left md:text-lg">
                  {slide.highlight}
                </p>
              </div>
            </div>
          ))}
        </Slider>
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

      <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[4px] w-[100%] animate-rainbow-slow transition-all" />
    </div>
  )
}
