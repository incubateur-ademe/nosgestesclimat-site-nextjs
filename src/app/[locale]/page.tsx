import CTAButtonsPlaceholder from '@/components/cta/CTAButtonsPlaceholder'
import Footer from '@/components/layout/Footer'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/trans/TransServer'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import type { Locale } from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import Partners from '../../components/landing-pages/Partners'
import CollectivelyCommit from './_components/CollectivelyCommit'
import DecryptChallenges from './_components/DecryptChallenges'
import DidYouKnowMainLanding from './_components/DidYouKnowMainLanding'
import InteractiveIllustration from './_components/InteractiveIllustration'
import Mobilise from './_components/Mobilise'
import ModelInfo from './_components/ModelInfo'
import TheySpeakAboutUs from './_components/TheySpeakAboutUs'
import TwoFootprints from './_components/TwoFootprints'

const DynamicCTAButtons = dynamic(
  () => import('@/components/cta/DynamicCTAButtons'),
  { loading: () => <CTAButtonsPlaceholder /> }
)
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

export default async function Homepage({ params }: DefaultPageProps) {
  const { locale } = await params

  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'

  return (
    <>
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
        heroIllustration={<InteractiveIllustration />}
        heroTitle={
          <Trans locale={locale}>
            Connaissez-vous votre empreinte écologique ?
          </Trans>
        }
        heroDescription={
          <div className="flex flex-col items-center gap-6 md:items-start md:gap-10">
            <p className="mb-0 text-base md:order-1 md:text-2xl">
              <Trans locale={locale}>
                Calculez votre{' '}
                <strong className="text-primary-700">empreinte carbone</strong>{' '}
                et votre{' '}
                <strong className="text-primary-700">empreinte eau</strong> en{' '}
                <strong className="text-secondary-700">
                  seulement 10 minutes
                </strong>
                .
              </Trans>
            </p>

            <div className="flex flex-col items-center gap-6 md:order-2 md:mt-0 md:items-start">
              <DynamicCTAButtons
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
                  restart: getLandingClickCTARestart(
                    pathname,
                    trackingActionClickCTA
                  ),
                }}
              />

              {/* Displayed on mobile only */}
              <div className="mx-auto mt-4 max-w-80 md:mt-0 md:hidden">
                <InteractiveIllustration />
              </div>

              {/* Displayed on desktop only */}
              <p className="md:max-w-[300px]">
                <Trans locale={locale}>
                  <strong className="text-primary-700">
                    2 millions de personnes
                  </strong>{' '}
                  ont déjà calculé leur empreinte !
                </Trans>
              </p>
            </div>
          </div>
        }
        heroPartners={<Partners locale={locale} />}>
        <TwoFootprints locale={locale} />

        <DidYouKnowMainLanding locale={locale} />

        <Mobilise locale={locale} />

        <DecryptChallenges locale={locale as Locale} />

        <CollectivelyCommit locale={locale} />

        <ModelInfo locale={locale} />

        <TheySpeakAboutUs locale={locale} />
      </LandingPage>

      <Footer />
    </>
  )
}
