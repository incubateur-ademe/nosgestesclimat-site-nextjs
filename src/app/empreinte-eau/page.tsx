import DynamicCTAButton from '@/components/cta/DynamicCTAButton'
import Trans from '@/components/translation/Trans'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'
import DailyGestureWaterFootprint from './_components/DailyGestureWaterFootprint'
import DidYouKnowWaterFootprint from './_components/DidYouKnowWaterFootprint'
import FAQWaterFootprint from './_components/FAQWaterFootprint'
import MotivationSectionWaterFootprint from './_components/MotivationSectionWaterFootprint'
import UnderstandToActWaterFootprint from './_components/UnderstandToActWaterFootprint'
import WaterFootprintPartners from './_components/WaterFootprintPartners'
import WhatDoWeMeasureWaterFootprint from './_components/WhatDoWeMeasureWaterFootprint'
import WhatItIsWaterFootprint from './_components/WhatItIsWaterFootprint'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t("Calculateur d'empreinte eau personnelle - Nos Gestes Climat"),
    description: t(
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte eau.'
    ),
    alternates: {
      canonical: '/empreinte-eau',
    },
  })
}

export default async function WaterFootprintLandingPage() {
  return (
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
            <DynamicCTAButton />
          </div>
        </div>
      }
      heroIllustration={
        <Image
          width={560}
          height={560}
          src="/images/illustrations/hero-banner-LP-eau.svg"
          alt=""
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
  )
}
