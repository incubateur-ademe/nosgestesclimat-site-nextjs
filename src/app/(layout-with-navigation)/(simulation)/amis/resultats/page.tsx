import Trans from '@/components/translation/Trans'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import { useRouter } from 'next/router'
import EditableGroupTitle from './_components/EditableGroupTitle'
import Footer from './_components/Footer'
import GroupResults from './_components/GroupResults'

export default function GroupResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const groupId = String(searchParams.groupId)

  const router = useRouter()

  if (!groupId) {
    router.push('/amis')
  }

  return (
    <>
      <div className="p-4 pb-0">
        <GoBackLink className="mb-4 font-bold" />

        <EditableGroupTitle groupId={groupId} />

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
