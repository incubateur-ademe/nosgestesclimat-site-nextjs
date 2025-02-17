import DynamicCTAButtons from '@/components/cta/DynamicCTAButtons'
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

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const { t } = await getServerTranslation(locale)
  return getMetadataObject({
    title: t('Calculez votre empreinte carbone et eau en 10 minutes !'),
    description: t(
      "2 millions de personnes ont déjà calculé leur empreinte sur le climat avec le calculateur Nos Gestes Climat ! Et vous, qu'attendez-vous pour faire le test ?"
    ),
    image: '/images/misc/calculer-empreinte-carbone-et-eau.png',
    alternates: {
      canonical: '',
    },
  })
}

export default async function Homepage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
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
            logo: 'https://nosgestesclimat.fr/_next/image?url=%2Fimages%2Fmisc%2Fpetit-logo%403x.png&w=640&q=75',
          },
        ]}
      />

      <LandingPage
        heroIllustration={<InteractiveIllustration />}
        heroTitle={
          <TransServer locale={locale}>
            Connaissez-vous votre empreinte écologique ?
          </TransServer>
        }
        heroDescription={
          <div className="flex flex-col items-center gap-6 md:items-start md:gap-10">
            <p className="mb-0 text-base md:order-1 md:text-2xl">
              <TransServer locale={locale}>
                Calculez votre{' '}
                <strong className="text-primary-700">empreinte carbone</strong>{' '}
                et votre{' '}
                <strong className="text-primary-700">empreinte eau</strong> en{' '}
                <strong className="text-secondary-700">
                  seulement 10 minutes
                </strong>
                .
              </TransServer>
            </p>

            <div className="flex flex-col items-center gap-6 md:order-2 md:mt-0 md:max-w-[300px] md:items-start">
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
                className="w-full"
              />

              {/* Displayed on mobile only */}
              <div className="mx-auto mt-4 max-w-80 md:mt-0 md:hidden">
                <InteractiveIllustration />
              </div>

              {/* Displayed on desktop only */}
              <p>
                <TransServer locale={locale}>
                  <strong className="text-primary-700">
                    2 millions de personnes
                  </strong>{' '}
                  ont déjà calculé leur empreinte !
                </TransServer>
              </p>
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
    </>
  )
}
