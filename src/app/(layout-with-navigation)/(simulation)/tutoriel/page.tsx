import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import { noIndexObject } from '@/constants/metadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'
import ButtonBack from './_components/ButtonBack'
import OrganisationMessage from './_components/OrganisationMessage'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculer votre empreinte carbone individuelle - Nos Gestes Climat',
    description:
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.',
    alternates: {
      canonical: '/tutoriel',
    },
    robots: noIndexObject,
  })
}

export default async function Tutoriel() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-2xl"
        title={
          <>
            <span className="text-secondary-700 inline">
              <Trans>10 minutes</Trans>
            </span>{' '}
            <Trans>chrono pour calculer votre empreinte sur le climat</Trans>
          </>
        }
      />

      <AvantDeCommencer />
      <div className="mb-8 flex justify-between border-b border-gray-200 pb-8">
        <ButtonBack />

        <OrganisationMessage />

        <ButtonStart />
      </div>
      <AutresQuestions />
    </div>
  )
}
