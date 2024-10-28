'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import ColorLine from '@/design-system/layout/ColorLine'
import Separator from '@/design-system/layout/Separator'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

const slidesList = [
  {
    illustration: '/images/misc/home-slide-1.svg',
    content: (
      <Trans>
        L’empreinte carbone moyenne d’un Français est de{' '}
        <strong className="text-primary-700">9,1 tonnes de CO₂e</strong> par an.
      </Trans>
    ),
    highlight: <Trans>Et la vôtre ?</Trans>,
  },
  {
    illustration: '/images/icons/tee-shirt.svg',
    content: (
      <Trans>
        La production d'un jean nécessite près de{' '}
        <strong className="text-primary-700">30 000</strong> litres d'eau.
      </Trans>
    ),
    highlight: <Trans>Considérable, non ?</Trans>,
  },
  {
    illustration: '/images/icons/apple.svg',
    content: (
      <Trans>
        L'empreinte eau moyenne d'un français se compte en{' '}
        <strong className="text-primary-700">milliers de litres</strong> par
        jour.
      </Trans>
    ),
    highlight: <Trans>Et la vôtre ?</Trans>,
  },
  {
    illustration: '/images/misc/home-slide-1.svg',
    content: (
      <Trans>
        Un aller-retour Paris-Athènes en avion représente{' '}
        <strong className="text-primary-700">800 kg de CO₂e.</strong>
      </Trans>
    ),
    highlight: <Trans>Impressionnant, non ?</Trans>,
  },
]
export default function DidYouKnowSlider({
  mode,
}: {
  mode?: 'empreinte-carbone' | 'empreinte-eau'
}) {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  // Exchange position of the first and the second slide if mode is 'empreinte-eau'
  const slides = !mode
    ? slidesList
    : mode === 'empreinte-eau'
      ? [slidesList[1], slidesList[2]]
      : [slidesList[0], slidesList[3]]

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
