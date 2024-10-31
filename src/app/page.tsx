import TestCTAButton from '@/components/buttons/TestCTAButton'
import Trans from '@/components/translation/Trans'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'
import Actions from './_components/Actions'
import Amis from './_components/Amis'
import Contributions from './_components/Contributions'
import Explanations from './_components/Explanations'
import Organisations from './_components/Organisations'
import Partners from './_components/heading/Partners'

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
        <Image
          src="/images/illustrations/girl-typing.svg"
          alt=""
          width={580}
          height={580}
        />
      }
      heroTitle={<Trans>Connaissez-vous votre empreinte écologique ?</Trans>}
      heroDescription={
        <div className="flex flex-col items-start gap-10">
          <p className="mb-0">
            <Trans>
              Calculez votre <strong>empreinte carbone</strong> et votre{' '}
              <strong>empreinte eau</strong> en{' '}
              <strong className="text-secondary-700">
                seulement 10 minutes
              </strong>
              .
            </Trans>
          </p>

          <div className="flex flex-col items-start gap-6">
            <TestCTAButton />

            <p>
              <Trans>
                <strong className="text-primary-700">
                  2 millions de personnes
                </strong>{' '}
                ont déjà passé calculé leur empreinte !
              </Trans>
            </p>
          </div>
        </div>
      }
      heroPartners={<Partners />}>
      <div className="mx-auto mb-12 flex w-full max-w-5xl flex-col flex-wrap items-center gap-12 px-4 md:mb-20 md:flex-row md:items-start md:px-8 lg:gap-28">
        <Amis />
        <Actions />
      </div>
      <Organisations />
      <Explanations />
      <Contributions />
    </LandingPage>
  )
}
