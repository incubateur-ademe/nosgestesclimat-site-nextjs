import StepsDisplay from '@/components/groups/StepsDisplay'
import { linkToGroupCreation } from '@/constants/group'
import { amisCreationVotreGroupeRetour } from '@/constants/tracking/pages/amisCreation'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import NameForm from './_components/NameForm'

export const generateMetadata = getCommonMetadata({
  title: t('Créer un groupe, étape 2 sur 2 - Nos Gestes Climat'),
  description: t(
    "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au calculateur de bilan carbone personnel Nos Gestes Climat."
  ),
  alternates: {
    canonical: linkToGroupCreation,
  },
})

export default async function GroupNamePage({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return (
    <div className="pb-8">
      <GoBackLink
        className="mb-4 font-bold"
        href={linkToGroupCreation}
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
