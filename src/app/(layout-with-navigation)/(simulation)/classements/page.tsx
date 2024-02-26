import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import Groups from './_components/Groups'
import Organisations from './_components/Organisations'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Calculer votre empreinte carbone avec vos amis - Nos Gestes Climat',
    description:
      'Comparez vos résultats avec votre famille ou un groupe d’amis.',
    alternates: {
      canonical: linkToClassement,
    },
  })
}

export default async function GroupesPage() {
  return (
    <>
      <Groups />

      <Organisations />
    </>
  )
}
