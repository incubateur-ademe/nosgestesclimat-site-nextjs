import Groups from '@/components/results/groups/Groups'
import Organisation from '@/components/results/groups/Organisation'
import { getUserGroups } from '@/helpers/server/model/groups'
import { getUserOrganisation } from '@/helpers/server/model/organisations'
import EmptyState from './_components/EmptyState'

export default async function GroupsDashboard() {
  const [organisation, groups] = await Promise.all([
    getUserOrganisation(),
    getUserGroups(),
  ])

  if (!organisation && !groups.length) {
    return <EmptyState />
  }

  return (
    <>
      <Organisation organisation={organisation} />

      <Groups groups={groups} />
    </>
  )
}
