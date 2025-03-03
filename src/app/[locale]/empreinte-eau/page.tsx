import CTAButtonsPlaceholder from '@/components/cta/CTAButtonsPlaceholder'
import JSONLD from '@/components/seo/JSONLD'
import TransServer from '@/components/translation/trans/TransServer'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import dynamic from 'next/dynamic'
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

const DynamicCTAButtons = dynamic(
  () => import('@/components/cta/DynamicCTAButtons'),
  {
    loading: () => <CTAButtonsPlaceholder />,
  }
)

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
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

export default async function WaterFootprintLandingPage(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const { t } = await getServerTranslation(locale)

  return (
    <>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr',
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
          <TransServer locale={locale}>
            Chaque goutte compte : découvrez votre empreinte eau !
          </TransServer>
        }
        heroDescription={
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <p className="mb-0">
              <TransServer locale={locale}>
                Calculez votre{' '}
                <strong className="text-primary-600">empreinte eau</strong> et
                découvrez{' '}
                <strong className="text-primary-600">
                  les litres qui se cachent
                </strong>{' '}
                dans votre consommation du quotidien.
              </TransServer>
            </p>
            <div className="flex w-full justify-center md:justify-start">
              <DynamicCTAButtons
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                  restart: getLandingClickCTARestart(
                    '/empreinte-eau',
                    trackingActionClickCTA
                  ),
                }}
              />
            </div>

            <div className="mx-auto mt-4 max-w-80 md:mt-0 md:hidden">
              <Image
                width={560}
                height={560}
                src="/images/illustrations/mon-empreinte-eau.svg"
                alt={t(
                  "Un homme dans un magasin réfléchissant à l'empreinte eau du tee-shirt qu'il tient"
                )}
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
        <WhatItIsWaterFootprint locale={locale} />

        <WhatDoWeMeasureWaterFootprint locale={locale} />

        <DidYouKnowWaterFootprint locale={locale} />

        <DailyGestureWaterFootprint locale={locale} />

        <UnderstandToActWaterFootprint
          pathname={'/empreinte-eau'}
          locale={locale}
        />

        <MotivationSectionWaterFootprint locale={locale} />

        <FAQWaterFootprint locale={locale} />
      </LandingPage>
    </>
  )
}
