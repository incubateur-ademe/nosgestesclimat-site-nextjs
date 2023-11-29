import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Groups from './_components/Groups'
import SondagesBlock from './resultats/_components/SondagesBlock'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculer votre empreinte carbone avec vos amis - Nos Gestes Climat',
    description:
      'Comparez vos résultats avec votre famille ou un groupe d’amis.',
    alternates: {
      canonical: '/amis',
    },
  })
}

export default async function GroupesPage() {
  const { t } = await getServerTranslation()

  return (
    <>
      <Title
        title={t("Groupe d'amis")}
        subtitle={t(
          'Comparez vos résultats avec votre famille ou un groupe d’ami·e·s'
        )}
      />

      <Groups />

      <SondagesBlock />
    </>
  )
}
