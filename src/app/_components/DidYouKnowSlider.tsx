'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

const slides = [
  {
    illustration: '/images/misc/home-slide-1.svg',
    content: (
      <Trans>
        L’empreinte carbone moyenne d’un Français est de{' '}
        <strong className="text-primary-700">9,1 tonnes de CO₂e</strong> par an.
      </Trans>
    ),
    highlight: <Trans>Et la vôtre ?</Trans>,
  },
  {
    illustration: '/images/misc/home-slide-1.svg',
    content: (
      <Trans>
        La production d'un jean nécessite près de{' '}
        <strong className="text-primary-700">30 000</strong> litres d'eau.
      </Trans>
    ),
    highlight: <Trans>Considérable, non ?</Trans>,
  },
  {
    illustration: '/images/misc/home-slide-1.svg',
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
        <strong className="text-primary-700">800 kg de CO₂e.</strong>
      </Trans>
    ),
    highlight: <Trans>Impressionnant, non ?</Trans>,
  },
]
export default function DidYouKnowSlider() {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <div className="relative bg-primary-50 py-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Slider
          dots={true}
          arrows={false}
          infinite={false}
          fade
          className="max-w-[594px]">
          {slides.map((slide) => (
            <div className="!flex w-full items-center gap-10">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white">
                <img src={slide.illustration} alt="" width="80" height="80" />
              </div>
              <div className="flex-1">
                <Title tag="h3">Le saviez vous ?</Title>
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
    </div>
  )
}
