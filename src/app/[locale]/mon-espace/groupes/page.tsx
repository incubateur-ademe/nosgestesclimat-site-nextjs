import Groups from '@/components/results/groups/Groups'
import Organisations from '@/components/results/groups/Organisations'
import { getUserGroups } from '@/helpers/server/model/groups'
import { getUserCurrentOrganisation } from '@/helpers/server/model/organisations'
import EmptyState from './_components/EmptyState'

export default async function GroupsDashboard() {
  const [organisation, groups] = await Promise.all([
    getUserCurrentOrganisation(),
    getUserGroups(),
  ])

  if (!organisation || !groups.length) {
    return <EmptyState />
  }

  return (
    <>
      <Organisations organisations={[organisation]} />

      <Groups groups={groups} />
    </>
  )
}
