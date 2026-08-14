'use server'

import {
  END_PAGE_GROUPS_PATH,
  GROUP_RESULTS_ROUTE_PATTERN,
  MON_ESPACE_GROUPS_PATH,
} from '@/constants/urls/paths'
import { getUserSession } from '@/services/auth/get-user-session'
import { removeParticipant } from '@/services/groups/remove-participant'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * Removes the connected user from the group, then navigates away — the results
 * page they are on is guarded against non-participants.
 *
 * The redirect is issued server-side (via `redirect()`) so that the navigation
 * does not depend on a client-side `router.push` after a server action, which
 * can be dropped once the transition settles.
 */
export async function leaveGroupAction(
  _prevState: void | undefined,
  formData: FormData
) {
  const groupId = formData.get('groupId') as string
  const participantId = formData.get('participantId') as string

  await removeParticipant({ groupId, participantId })

  revalidatePath(GROUP_RESULTS_ROUTE_PATTERN, 'page')

  const user = await getUserSession()

  redirect(user?.isAuth ? MON_ESPACE_GROUPS_PATH : END_PAGE_GROUPS_PATH)
}
