import DynamicCTAButtons from '@/components/cta/DynamicCTAButtons'
import Partners from '@/components/landing-pages/Partners'
import Footer from '@/components/layout/Footer'
import Trans from '@/components/translation/trans/TransServer'
import { noIndexObject } from '@/constants/metadata'
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
import type { DefaultPageProps } from '@/types'
import { headers } from 'next/headers'
import InteractiveIllustration from '../_components/InteractiveIllustration'

export const generateMetadata = getCommonMetadata({
  title: t(
    'Nos Gestes Climat, calculez votre empreinte climatique, mode intégré'
  ),
  description: t(
    "2 millions de personnes ont déjà calculé leur empreinte sur le climat avec le calculateur Nos Gestes Climat ! Et vous, qu'attendez-vous pour faire le test ?"
  ),
  alternates: {
    canonical: '/accueil-iframe',
  },
  robots: noIndexObject,
  image:
    'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/calculer_empreinte_carbone_et_eau_7d061171e4.png',
})

export default async function Homepage({ params }: DefaultPageProps) {
  const { locale } = await params
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'

  return (
    <>
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
        <></>
      </LandingPage>

      <Footer />
    </>
  )
}
