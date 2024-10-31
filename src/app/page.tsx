import TestCTAButton from '@/components/buttons/TestCTAButton'
import Trans from '@/components/translation/Trans'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'
import CollectivelyCommit from './_components/CollectivelyCommit'
import DecryptChallenges from './_components/DecryptChallenges'
import DidYouKnowMainLanding from './_components/DidYouKnowMainLanding'
import Mobilise from './_components/Mobilise'
import ModelInfo from './_components/ModelInfo'
import Partners from './_components/Partners'
import TheySpeakAboutUs from './_components/TheySpeakAboutUs'
import TwoFootprints from './_components/TwoFootprints'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t(
      "Votre calculateur d'empreinte carbone personnelle - Nos Gestes Climat"
    ),
    description: t(
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone sur le climat.'
    ),
    alternates: {
      canonical: '',
    },
  })
}

export default async function Homepage() {
  return (
    <LandingPage
      heroIllustration={
        <div className="flex flex-col gap-10">
          <p className="text-center text-sm md:hidden">
            <Trans>
              <strong className="text-primary-700">
                2 millions de personnes
              </strong>{' '}
              ont déjà passé calculé leur empreinte !
            </Trans>
          </p>

          <Image
            src="/images/illustrations/girl-typing.svg"
            alt=""
            width={580}
            height={580}
          />
        </div>
      }
      heroTitle={<Trans>Connaissez-vous votre empreinte écologique ?</Trans>}
      heroDescription={
        <div className="flex flex-col items-center gap-10 md:items-start">
          <p className="mb-0 text-lg md:text-2xl">
            <Trans>
              Calculez votre <strong>empreinte carbone</strong> et votre{' '}
              <strong>empreinte eau</strong> en{' '}
              <strong className="text-secondary-700">
                seulement 10 minutes
              </strong>
              .
            </Trans>
          </p>

          <div className="flex flex-col items-center gap-6 md:max-w-[300px] md:items-start">
            <TestCTAButton className="md:w-full" />

            <p className="hidden md:block ">
              <Trans>
                <strong className="text-primary-700">
                  2 millions de personnes
                </strong>{' '}
                ont déjà calculé leur empreinte !
              </Trans>
            </p>
          </div>
        </div>
      }
      heroPartners={<Partners />}>
      <TwoFootprints />

      <DidYouKnowMainLanding />

      <Mobilise />

      <DecryptChallenges />

      <CollectivelyCommit />

      <ModelInfo />

      <TheySpeakAboutUs />
    </LandingPage>
  )
}
