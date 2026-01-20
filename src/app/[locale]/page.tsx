import DynamicCTAButtons from '@/components/cta/DynamicCTAButtons'
import Footer from '@/components/layout/Footer'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/trans/TransServer'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import LandingPage from '@/design-system/layout/LandingPage'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import i18nConfig from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import { Suspense } from 'react'
import Partners from '../../components/landing-pages/Partners'
import { ClientLayout } from '../../components/layout/ClientLayout'
import CollectivelyCommit from './_components/CollectivelyCommit'
import DecryptChallenges from './_components/DecryptChallenges'
import DidYouKnowMainLanding from './_components/DidYouKnowMainLanding'
import HomePageDescription from './_components/HomePageDescription'
import HomepageSubtitle from './_components/HomepageSubtitle'
import InteractiveIllustration from './_components/InteractiveIllustration'
import Mobilise from './_components/Mobilise'
import ModelInfo from './_components/ModelInfo'
import TheySpeakAboutUs from './_components/TheySpeakAboutUs'
import TwoFootprints from './_components/TwoFootprints'

export const generateMetadata = getCommonMetadata({
  title: t('Calculez votre empreinte carbone et eau avec Nos Gestes Climat'),
  image:
    'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/calculer_empreinte_carbone_et_eau_ecccc9a625.png',
  description: t(
    'Comme 2 millions de personnes, mesurez votre empreinte écologique en 10 minutes. Un outil gratuit pour faire le bilan et réduire vos émissions de CO2.'
  ),
  alternates: {
    canonical: '',
  },
})

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({
    locale,
  }))
}

export default async function Homepage({ params }: DefaultPageProps) {
  const { locale } = await params

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
        ]}
      />
      <LandingPage
        locale={locale}
        heroIllustration={<InteractiveIllustration />}
        heroTitle={
          <Trans locale={locale}>Découvrez votre empreinte carbone</Trans>
        }
        heroDescription={
          <div className="flex flex-col items-center gap-6 md:items-start md:gap-10">
            <HomePageDescription locale={locale} />

            <div className="flex flex-col items-center gap-6 md:order-2 md:mt-0 md:items-start">
              <Suspense fallback={<BlockSkeleton />}>
                <DynamicCTAButtons
                  trackingEvents={{
                    start: getLandingClickCTAStart('/', trackingActionClickCTA),
                    resume: getLandingClickCTAResume(
                      '/',
                      trackingActionClickCTA
                    ),
                    results: getLandingClickCTAResults(
                      '/',
                      trackingActionClickCTA
                    ),
                    restart: getLandingClickCTARestart(
                      '/',
                      trackingActionClickCTA
                    ),
                  }}
                />
              </Suspense>

              {/* Displayed on mobile only */}
              <div className="mb-8 md:hidden">
                <HomepageSubtitle locale={locale} />
                <div className="mx-auto mt-4 max-w-80 md:mt-0">
                  <InteractiveIllustration />
                </div>
              </div>

              {/* Displayed on desktop only */}
              <div className="hidden md:block">
                <HomepageSubtitle locale={locale} />
              </div>
            </div>
          </div>
        }
        heroPartners={<Partners locale={locale} />}>
        <TwoFootprints locale={locale} />

        <DidYouKnowMainLanding locale={locale} />

        <Mobilise locale={locale} />

        <DecryptChallenges locale={locale} />

        <CollectivelyCommit locale={locale} />

        <ModelInfo locale={locale} />

        <TheySpeakAboutUs locale={locale} />
      </LandingPage>

      <Footer />
    </ClientLayout>
  )
}
