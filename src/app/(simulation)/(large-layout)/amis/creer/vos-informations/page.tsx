import StepsDisplay from '@/components/groups/StepsDisplay'
import { linkToGroupCreation } from '@/constants/group'
import { amisCreationVosInformationsRetour } from '@/constants/tracking/pages/amisCreation'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import GroupCreationForm from './_component/GroupCreationForm'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      'Créer un groupe et calculer votre empreinte carbone - Nos Gestes Climat'
    ),
    description: t(
      "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au calculateur de bilan carbone personnel Nos Gestes Climat."
    ),
    alternates: {
      canonical: linkToGroupCreation,
    },
  })
}

export default async function YourInfoPage() {
  const { t } = await getServerTranslation()

  return (
    <div className="p-4 md:p-8">
      <GoBackLink
        href={'/classements'}
        eventTracked={amisCreationVosInformationsRetour}
        className="mb-4 font-bold"
      />

      <StepsDisplay currentStep={1} />

      <Title
        title={t("Créer un groupe d'amis")}
        subtitle={t(
          'Comparez vos résultats avec votre famille ou un groupe d’amis'
        )}
      />

      <GroupCreationForm />
    </div>
  )
}
