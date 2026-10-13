import CTAButtons from '@/components/cta/CTAButtons'
import DidYouKnowSlider from '@/components/landing-pages/DidYouKnowSlider'
import Trans from '@/components/translation/trans/TransServer'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { Suspense } from 'react'

export default function DidYouKnowMainLanding({
  className,
  titleTag = 'h2',
}: {
  className?: string
  titleTag?: 'h2' | 'h3'
}) {
  return (
    <Suspense
      fallback={<BlockSkeleton className="my-0 h-[583px] md:h-[384px]" />}>
      <DidYouKnowSlider
        ctaButtons={<CTAButtons />}
        className={className}
        titleTag={titleTag}
        slides={[
          {
            illustration: '/_static/cms/icone_ordinateur_392d915ff0.svg',
            content: (
              <Trans>
                L'empreinte moyenne d'un Français est de{' '}
                <strong className="text-primary-600">
                  8,2 tonnes de CO2e par an
                </strong>{' '}
                (source SDES).
              </Trans>
            ),
            highlight: <Trans>Et la vôtre ?</Trans>,
          },
          {
            illustration: '/_static/cms/icone_jeans_7373ebf3c3.svg',
            content: (
              <Trans>
                La production d'un jean nécessite près de{' '}
                <strong className="text-primary-600">
                  30 000 litres d'eau
                </strong>
                .
              </Trans>
            ),
            highlight: <Trans>Considérable, non ?</Trans>,
          },
          {
            illustration: '/_static/cms/icone_goutte_eau_e6a89fd5e0.svg',
            content: (
              <Trans>
                L'empreinte eau moyenne d'un français se compte{' '}
                <strong className="text-primary-600">
                  milliers de litres par jour
                </strong>
                .
              </Trans>
            ),
            highlight: <Trans>Et la vôtre ?</Trans>,
          },
          {
            illustration: '/_static/cms/icone_avion_39cf1c300c.svg',
            content: (
              <Trans>
                Un aller-retour Paris-Athènes en avion représente{' '}
                <strong className="text-primary-600">800 kg de CO2e</strong>.
              </Trans>
            ),
            highlight: <Trans>Impressionnant, non ?</Trans>,
          },
        ]}
      />
    </Suspense>
  )
}
