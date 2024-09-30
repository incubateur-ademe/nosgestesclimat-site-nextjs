import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Groups from './_components/Groups'
import Organisations from './_components/Organisations'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      'Calculer votre empreinte carbone avec vos amis - Nos Gestes Climat'
    ),
    description: t(
      'Comparez vos résultats avec votre famille ou un groupe d’amis.'
    ),
    alternates: {
      canonical: '/classements',
    },
  })
}

export default async function ClassementsPage() {
  return (
    <>
      <Groups />

      <Organisations />
    </>
  )
}
