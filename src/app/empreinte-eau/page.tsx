import DynamicCTAButton from '@/components/cta/DynamicCTAButton'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/Trans'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import {
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import { headers } from 'next/headers'
import Image from 'next/image'
import DailyGestureWaterFootprint from './_components/DailyGestureWaterFootprint'
import DidYouKnowWaterFootprint from './_components/DidYouKnowWaterFootprint'
import FAQWaterFootprint from './_components/FAQWaterFootprint'
import MotivationSectionWaterFootprint from './_components/MotivationSectionWaterFootprint'
import UnderstandToActWaterFootprint from './_components/UnderstandToActWaterFootprint'
import WaterFootprintPartners from './_components/WaterFootprintPartners'
import WhatDoWeMeasureWaterFootprint from './_components/WhatDoWeMeasureWaterFootprint'
import WhatItIsWaterFootprint from './_components/WhatItIsWaterFootprint'
import { waterFAQJsonLd } from './_constants/waterFAQJsonLd'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Empreinte eau : comprendre, évaluer, économiser l’eau'),
    description: t(
      'Découvrez les litres d’eau cachés derrière chacun de vos repas, vêtements, appareils… Adoptez des actions concrètes pour réduire votre empreinte eau'
    ),
    alternates: {
      canonical: '/empreinte-eau',
    },
    image: '/images/misc/calculer-son-empreinte-eau.png',
  })
}

export default async function WaterFootprintLandingPage() {
  const { t } = await getServerTranslation()

  const headersList = headers()
  const pathname = headersList.get('x-pathname') || '/'

  return (
    <>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr/',
            name: 'Nos Gestes Climat',
            logo: 'https://nosgestesclimat.fr/_next/image?url=%2Fimages%2Fmisc%2Fpetit-logo%403x.png&w=640&q=75',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: waterFAQJsonLd.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]}
      />

      <LandingPage
        heroTitle={
          <Trans>Chaque goutte compte : découvrez votre empreinte eau !</Trans>
        }
        heroDescription={
          <div className="flex flex-col items-start gap-6">
            <p className="mb-0">
              <Trans>
                Calculez votre{' '}
                <strong className="text-primary-600">empreinte eau</strong> et
                découvrez{' '}
                <strong className="text-primary-600">
                  les litres qui se cachent
                </strong>{' '}
                dans votre consommation du quotidien.
              </Trans>
            </p>
            <div className="flex w-full justify-center md:justify-start">
              <DynamicCTAButton
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    pathname,
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    pathname,
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    pathname,
                    trackingActionClickCTA
                  ),
                }}
              />
            </div>
          </div>
        }
        heroIllustration={
          <Image
            width={560}
            height={560}
            src="/images/illustrations/mon-empreinte-eau.svg"
            alt={t(
              "Un homme dans un magasin réfléchissant à l'empreinte eau du tee-shirt qu'il tient"
            )}
          />
        }
        heroPartners={<WaterFootprintPartners />}>
        <WhatItIsWaterFootprint />

        <WhatDoWeMeasureWaterFootprint />

        <DidYouKnowWaterFootprint />

        <DailyGestureWaterFootprint />

        <UnderstandToActWaterFootprint />

        <MotivationSectionWaterFootprint />

        <FAQWaterFootprint />
      </LandingPage>
    </>
  )
}
