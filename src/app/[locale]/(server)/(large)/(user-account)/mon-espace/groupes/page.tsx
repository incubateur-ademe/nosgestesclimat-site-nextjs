import Groups from '@/components/results/groups/Groups'
import Organisation from '@/components/results/groups/Organisation'
import { getUserGroups } from '@/helpers/server/model/groups'
import { getUserOrganisation } from '@/helpers/server/model/organisations'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import { unauthorized } from 'next/navigation'
import EmptyState from './_components/EmptyState'

export default async function GroupsDashboard() {
  if (!(await isUserAuthenticated())) {
    unauthorized()
  }
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
