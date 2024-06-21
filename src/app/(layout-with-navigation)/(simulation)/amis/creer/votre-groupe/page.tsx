import StepsDisplay from '@/components/groups/StepsDisplay'
import { amisCreationVotreGroupeRetour } from '@/constants/tracking/pages/amisCreation'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { linkToGroupCreation } from '@/helpers/navigation/groupPages'
import NameForm from './_components/NameForm'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      'Créer un groupe et calculer votre empreinte carbone - Nos Gestes Climat'
    ),
    description: t(
      "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
    ),
    alternates: {
      canonical: linkToGroupCreation,
    },
  })
}

export default async function GroupNamePage() {
  const { t } = await getServerTranslation()

  return (
    <div className="p-4 md:p-8">
      <GoBackLink
        className="mb-4 font-bold"
        href={'/amis/creer/vos-informations'}
        eventTracked={amisCreationVotreGroupeRetour}
      />

      <StepsDisplay currentStep={2} />

      <Title
        title={t("Créer un groupe d'amis")}
        subtitle={t(
          'Comparez vos résultats avec votre famille ou un groupe d’amis'
        )}
      />

      <NameForm />
    </div>
  )
}
