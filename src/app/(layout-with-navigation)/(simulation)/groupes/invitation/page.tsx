import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Invitation from './_components/Invitation'

export function generateMetadata() {
  return getMetadataObject({
    title: 'Rejoindre un groupe - Nos Gestes Climat',
    description:
      "Rejoignez votre groupe pour calculez votre empreinte carbone et la comparer avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat.",
  })
}

export default function RejoindreGroupePage({
  searchParams,
}: {
  searchParams: { groupId: string }
}) {
  const { groupId } = searchParams

  return (
    <div className="p-4 md:p-8">
      <AutoCanonicalTag />

      <Invitation groupId={groupId} />
    </div>
  )
}
