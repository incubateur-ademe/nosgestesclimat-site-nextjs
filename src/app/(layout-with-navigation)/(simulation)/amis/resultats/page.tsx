import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Results from './_components/Results'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Mon groupe, nos bilans carbone personnels - Nos Gestes Climat',
    description:
      "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat.",
  })
}

export default function GroupResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const groupId = String(searchParams.groupId)

  return <Results groupId={groupId} />
}
