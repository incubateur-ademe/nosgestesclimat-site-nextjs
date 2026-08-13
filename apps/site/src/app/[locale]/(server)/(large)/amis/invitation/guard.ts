import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { throwNextError } from '@/helpers/server/error'
import { getGroup } from '@/helpers/server/model/groups'
import { getUserSession } from '@/services/auth/get-user-session'
import type { Group } from '@/types/groups'
import { notFound, redirect } from 'next/navigation'
import { findOwnParticipant } from '../_helpers/findOwnParticipant'

interface GroupInvitationGuardReturn {
  group: Group
}

/**
 * Validates access to the group invitation page:
 * - Checks that `groupId` is present in search params
 * - Fetches the group and the current user
 * - Checks that the user does not take part in the group yet (otherwise
 *   redirects to the results page)
 *
 * Takes its decision from {@link findOwnParticipant}, the same predicate the
 * results page guards on, so the two pages cannot redirect to one another
 * indefinitely.
 */
export async function groupInvitationGuard(
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | undefined
): Promise<GroupInvitationGuardReturn> {
  if (!searchParams) {
    notFound()
  }

  const searchParamsObject = await searchParams
  const groupId = searchParamsObject.groupId

  if (typeof groupId !== 'string' || !groupId) {
    notFound()
  }

  const user = await getUserSession()
  const group = await throwNextError(() => getGroup({ groupId }))

  if (findOwnParticipant(group, user?.id)) {
    redirect(getLinkToGroupDashboard({ group }))
  }

  return { group }
}
