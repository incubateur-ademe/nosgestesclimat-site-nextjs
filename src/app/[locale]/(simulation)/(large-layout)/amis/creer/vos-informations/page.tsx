import StepsDisplay from '@/components/groups/StepsDisplay'
import { linkToGroupCreation } from '@/constants/group'
import { amisCreationConnexionRetour } from '@/constants/tracking/pages/amisCreation'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import GroupCreationForm from './_components/GroupCreationForm'

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
  console.log('isUserAuthenticated()', await isUserAuthenticated())
  if (!(await isUserAuthenticated())) {
    return redirect('/mon-espace/groupes')
  }

  const { t } = await getServerTranslation(params)

  return (
    <div className="pb-8">
      <GoBackLink
        href="/mon-espace/groupes"
        eventTracked={amisCreationConnexionRetour}
        className="mb-4 font-bold"
      />

      <StepsDisplay currentStep={1} />

      <Title
        title={t("Créer un groupe d'amis")}
        subtitle={t('Vos informations')}
      />

      <GroupCreationForm />
    </div>
  )
}
