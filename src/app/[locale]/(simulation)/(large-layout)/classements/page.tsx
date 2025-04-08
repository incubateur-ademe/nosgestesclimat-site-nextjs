import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import Groups from './_components/Groups'
import Organisations from './_components/Organisations'

export const generateMetadata = getCommonMetadata({
  title: t(
    "Mes groupes d'amis, calculer vos empreintes carbone et eau à plusieurs - Nos Gestes Climat"
  ),
  description: t(
    "Comparez vos résultats avec votre famille ou un groupe d'amis."
  ),
  alternates: {
    canonical: '/classements',
  },
})

export default function ClassementsPage() {
  return (
    <>
      <Groups />

      <Organisations />
    </>
  )
}
