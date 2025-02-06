import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import ContentLarge from '@/components/layout/ContentLarge'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { twMerge } from 'tailwind-merge'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'
import ButtonBack from './_components/ButtonBack'
import OrganisationMessage from './_components/OrganisationMessage'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      'Calculer votre empreinte carbone individuelle - Nos Gestes Climat'
    ),
    description: t(
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
    ),
    alternates: {
      canonical: '/tutoriel',
    },
    robots: noIndexObject,
  })
}

export default async function Tutoriel() {
  return (
    <ContentLarge className="mt-10 px-4 lg:px-0">
      <div className="mx-auto flex h-screen max-w-3xl flex-col overflow-auto">
        <Title
          data-cypress-id="tutoriel-title"
          className="text-lg md:text-2xl"
          title={
            <>
              <span className="inline text-secondary-700">
                <Trans>10 minutes</Trans>
              </span>{' '}
              <Trans>chrono pour calculer votre empreinte carbone et eau</Trans>
            </>
          }
        />

        <AvantDeCommencer />

        <div className={twMerge('mb-12 flex w-full gap-4 px-4 md:px-0 ')}>
          <ButtonBack />

          <OrganisationMessage />

          <ButtonStart />
        </div>

        <AutresQuestions />
      </div>
    </ContentLarge>
  )
}
