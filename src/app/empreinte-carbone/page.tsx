import DynamicCTAButton from '@/components/cta/DynamicCTAButton'
import Partners from '@/components/landing-pages/Partners'
import Trans from '@/components/translation/Trans'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'
import DailyGestureCarbonFootprint from './_components/DailyGestureCarbonFootprint'
import DidYouKnowCarbon from './_components/DidYouKnowCarbonFootprint'
import FAQCarbonFootprint from './_components/FAQCarbonFootprint'
import MotivationSectionCarbonFootprint from './_components/MotivationSectionCarbonFootprint'
import UnderstandToActCarbonFootprint from './_components/UnderstandToActCarbonFootprint'
import WhatDoWeMeasureCarbon from './_components/WhatDoWeMeasureCarbonFootprint'
import WhatItIsCarbon from './_components/WhatItIsCarbon'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t("Calculateur d'empreinte carbone personnelle - Nos Gestes Climat"),
    description: t(
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone.'
    ),
    alternates: {
      canonical: '/empreinte-carbone',
    },
  })
}

export default function CarbonFootprintLandingPage() {
  return (
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
              <strong className="text-primary-600">empreinte carbone</strong> en
              quelques minutes et découvrez les{' '}
              <strong className="text-primary-600">actions</strong> les plus
              efficaces pour{' '}
              <strong className="text-primary-600">
                réduire vos émissions
              </strong>{' '}
              de gaz à effet de serre.
            </Trans>
          </p>
          <div className="flex w-full justify-center md:justify-start">
            <DynamicCTAButton />
          </div>
        </div>
      }
      heroIllustration={
        <Image
          width={560}
          height={560}
          src="/images/illustrations/girl-holding-earth.svg"
          alt=""
        />
      }
      heroPartners={<Partners />}>
      <WhatItIsCarbon />

      <WhatDoWeMeasureCarbon />

      <DidYouKnowCarbon />

      <DailyGestureCarbonFootprint />

      <UnderstandToActCarbonFootprint />

      <MotivationSectionCarbonFootprint />

      <FAQCarbonFootprint />
    </LandingPage>
  )
}
