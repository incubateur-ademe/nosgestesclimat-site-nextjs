import StepsDisplay from '@/components/groups/StepsDisplay'
import { linkToGroupCreation } from '@/constants/group'
import { amisCreationVosInformationsRetour } from '@/constants/tracking/pages/amisCreation'
import { MON_ESPACE_GROUPS_PATH } from '@/constants/urls/paths'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import GroupCreationForm from './_component/GroupCreationForm'

export const generateMetadata = getCommonMetadata({
  title: t('Créer un groupe, étape 1 sur 2 - Nos Gestes Climat'),
  description: t(
    "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au calculateur de bilan carbone personnel Nos Gestes Climat."
  ),
  alternates: {
    canonical: linkToGroupCreation,
  },
})

export default async function YourInfoPage({ params }: DefaultPageProps) {
  const { t } = await getServerTranslation(params)

  return (
    <div className="pb-8">
      <GoBackLink
        href={MON_ESPACE_GROUPS_PATH}
        eventTracked={amisCreationVosInformationsRetour}
        className="mb-4 font-bold"
      />

      <StepsDisplay currentStep={1} />

      <Title
        title={t("Créer un groupe d'amis")}
        subtitle={t('Invitez vos proches à passer le test')}
      />

      <GroupCreationForm />
    </div>
  )
}
