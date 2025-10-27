import CTAButtonsPlaceholder from '@/components/cta/CTAButtonsPlaceholder'
import Footer from '@/components/layout/Footer'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/trans/TransServer'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import type { DefaultPageProps } from '@/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ClientLayout } from '../../../components/layout/ClientLayout'
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

export const generateMetadata = getCommonMetadata({
  title: t(
    'Empreinte eau : comprendre, évaluer, économiser l’eau - Nos Gestes Climat'
  ),
  description: t(
    'Découvrez les litres d’eau cachés derrière chacun de vos repas, vêtements, appareils… Adoptez des actions concrètes pour réduire votre empreinte eau'
  ),
  image:
    'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/calculer_son_empreinte_eau_9e5f8be16c.png',
  alternates: {
    canonical: '/empreinte-eau',
  },
})

export default async function WaterFootprintLandingPage(
  props: DefaultPageProps
) {
  const { t } = await getServerTranslation(props.params)
  const { locale } = await props.params

  return (
    <ClientLayout locale={locale}>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr',
            name: 'Nos Gestes Climat',
            logo: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/petit_logo_006dd01955.png',
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
          <Trans locale={locale}>
            Chaque goutte compte : découvrez votre empreinte eau !
          </Trans>
        }
        heroDescription={
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <p className="mb-0">
              <Trans locale={locale}>
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
                src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/mon_empreinte_eau_79e7327871.svg"
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
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/mon_empreinte_eau_79e7327871.svg"
            alt={t(
              "Un homme dans un magasin réfléchissant à l'empreinte eau du tee-shirt qu'il tient"
            )}
          />
        }
        heroPartners={<WaterFootprintPartners locale={locale} />}>
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
      <Footer />
    </ClientLayout>
  )
}
