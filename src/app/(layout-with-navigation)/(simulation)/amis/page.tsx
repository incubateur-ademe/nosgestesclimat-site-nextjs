import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Groups from './_components/Groups'
import FeedbackBlock from './resultats/_components/FeedbackBlock'
import SondagesBlock from './resultats/_components/SondagesBlock'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Groupes d'ami·e·s, simulateur d’empreinte carbone - Nos Gestes Climat",
    description:
      'Calculez votre empreinte carbone en groupe et comparez la avec l’empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat.',
  })
}

export default async function GroupesPage() {
  const { t } = await getServerTranslation()

  return (
    <div className="p-4 md:p-8">
      <AutoCanonicalTag />

      <Title
        title={t("Groupe d'ami·e·s")}
        subtitle={t(
          'Comparez vos résultats avec votre famille ou un groupe d’ami·e·s'
        )}
      />

      <FeedbackBlock />

      <Groups />

      <SondagesBlock />
    </div>
  )
}
