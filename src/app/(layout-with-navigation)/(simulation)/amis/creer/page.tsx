import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import GroupCreationForm from './_component/GroupCreationForm'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      'Créer un groupe et calculer notre empreinte carbone - Nos Gestes Climat',
    description:
      "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat.",
    alternates: {
      canonical: '/amis/creer',
    },
  })
}

export default async function CreerGroupePage() {
  const { t } = await getServerTranslation()

  return (
    <div className="p-4 md:p-8">
      <GoBackLink className="mb-4 font-bold" />

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
