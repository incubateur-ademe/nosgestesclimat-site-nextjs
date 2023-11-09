import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Groups from './_components/Groups'
import FeedbackBlock from './resultats/_components/FeedbackBlock'
import SondagesBlock from './resultats/_components/SondagesBlock'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculer votre empreinte carbone avec vos amis - Nos Gestes Climat',
    description:
      'Comparez vos résultats avec votre famille ou un groupe d’amis.',
  })
}

export default async function GroupesPage() {
  const { t } = await getServerTranslation()

  return (
    <>
      <AutoCanonicalTag />

      <Title
        title={t("Groupe d'amis")}
        subtitle={t(
          'Comparez vos résultats avec votre famille ou un groupe d’ami·e·s'
        )}
      />

      <FeedbackBlock />

      <Groups />

      <SondagesBlock />
    </>
  )
}
