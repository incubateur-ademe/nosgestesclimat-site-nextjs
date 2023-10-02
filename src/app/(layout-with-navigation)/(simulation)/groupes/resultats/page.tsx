import GoBackLink from '@/design-system/inputs/GoBackLink'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useRouter } from 'next/navigation'
import FeedbackBlock from './_components/FeedbackBlock'
import Footer from './_components/Footer'

import Trans from '@/components/translation/Trans'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import EditableGroupTitle from './_components/EditableGroupTitle'
import GroupResults from './_components/GroupResults'

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

  const router = useRouter()

  if (!groupId) {
    router.push('/groupes')
  }

  return (
    <>
      <div className="p-4 pb-0">
        <GoBackLink className="mb-4 font-bold" />

        <AutoCanonicalTag />

        <EditableGroupTitle groupId={groupId} />

        <FeedbackBlock />

        <div className="mt-4">
          <h2 className="m-0 text-lg font-bold">
            <Trans>Le classement</Trans>
          </h2>
        </div>

        <GroupResults groupId={groupId} />
      </div>
      <Footer />
    </>
  )
}
