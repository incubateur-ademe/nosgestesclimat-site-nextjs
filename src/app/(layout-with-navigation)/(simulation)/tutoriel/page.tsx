import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'

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
  const { t } = await getServerTranslation()

  return (
    <div className="flex flex-col">
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-2xl"
        title={
          <>
            <span className="inline text-secondary">
              <Trans>10 minutes</Trans>
            </span>{' '}
            <Trans>chrono pour calculer votre empreinte sur le climat</Trans>
          </>
        }
      />

      <AvantDeCommencer />
      <div className="mb-8 flex justify-between border-b border-gray-200 pb-8">
        <ButtonLink href="/" color="secondary" title={t("revenir à l'accueil")}>
          ←
        </ButtonLink>

        <ButtonStart />
      </div>
      <AutresQuestions />
    </div>
  )
}
