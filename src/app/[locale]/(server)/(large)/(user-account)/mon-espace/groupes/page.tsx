import EmptyState from '@/components/results/groups/EmptyState'
import Groups from '@/components/results/groups/Groups'
import Organisation from '@/components/results/groups/Organisation'
import { getUserOrganisation } from '@/helpers/server/model/organisations'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import { unauthorized } from 'next/navigation'

export default async function GroupsDashboard() {
  if (!(await isUserAuthenticated())) {
    unauthorized()
  }
  const [organisation, groups] = await Promise.all([
    getUserOrganisation(),
    getGroups({ user }),
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
