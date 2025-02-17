import CTAButtonsPlaceholder from '@/components/cta/CTAButtonsPlaceholder'
import Partners from '@/components/landing-pages/Partners'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/Trans'
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
import DailyGestureCarbonFootprint from './_components/DailyGestureCarbonFootprint'
import DidYouKnowCarbon from './_components/DidYouKnowCarbonFootprint'
import FAQCarbonFootprint from './_components/FAQCarbonFootprint'
import MotivationSectionCarbonFootprint from './_components/MotivationSectionCarbonFootprint'
import UnderstandToActCarbonFootprint from './_components/UnderstandToActCarbonFootprint'
import WhatDoWeMeasureCarbon from './_components/WhatDoWeMeasureCarbonFootprint'
import WhatItIsCarbon from './_components/WhatItIsCarbon'
import { carbonFAQJsonLd } from './_constants/carbonFAQJsonLd'

const DynamicCTAButtons = dynamic(
  () => import('@/components/cta/DynamicCTAButtons'),
  {
    ssr: false,
    loading: () => <CTAButtonsPlaceholder />,
  }
)

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Empreinte carbone : comprendre, mesurer, réduire son impact'),
    description: t(
      'Informez-vous sur l’empreinte carbone, de sa définition aux actions les plus impactantes pour réduire ses émissions et enclencher sa transition écologique'
    ),
    alternates: {
      canonical: '/empreinte-carbone',
    },
  })
}

export default function CarbonFootprintLandingPage() {
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
            mainEntity: carbonFAQJsonLd.map((faq) => ({
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
          <Trans>
            L'empreinte carbone, une première étape pour passer à l’action
          </Trans>
        }
        heroDescription={
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <p className="mb-0">
              <Trans>
                Calculez votre{' '}
                <strong className="text-primary-600">empreinte carbone</strong>{' '}
                en quelques minutes et découvrez les{' '}
                <strong className="text-primary-600">actions</strong> les plus
                efficaces pour{' '}
                <strong className="text-primary-600">
                  réduire vos émissions
                </strong>{' '}
                de gaz à effet de serre.
              </Trans>
            </p>
            <div className="flex w-full justify-center md:justify-start">
              <DynamicCTAButtons
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                  restart: getLandingClickCTARestart(
                    '/empreinte-carbone',
                    trackingActionClickCTA
                  ),
                }}
              />
            </div>

            <div className="mx-auto mt-4 max-w-80 md:mt-0 md:hidden">
              <Image
                width={280}
                height={280}
                src="/images/illustrations/girl-holding-earth.svg"
                alt=""
              />
            </div>
          </div>
        }
        heroIllustration={
          <div className="hidden md:block">
            <Image
              width={400}
              height={400}
              src="/images/illustrations/girl-holding-earth.svg"
              alt=""
            />
          </div>
        }
        heroPartners={<Partners />}>
        <WhatItIsCarbon />

        <WhatDoWeMeasureCarbon />

        <DidYouKnowCarbon />

        <DailyGestureCarbonFootprint />

        <UnderstandToActCarbonFootprint pathname={'/empreinte-carbone'} />

        <MotivationSectionCarbonFootprint />

        <FAQCarbonFootprint />
      </LandingPage>
    </>
  )
}
