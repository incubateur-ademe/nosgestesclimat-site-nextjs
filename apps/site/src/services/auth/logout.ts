'use server'

import {
  deleteSessionCookies,
  REFRESH_COOKIE,
  SESSION_COOKIE,
} from '@/helpers/server/cookie/auth.cookie'
import { buildLegacyCookiePurges } from '@/helpers/server/cookie/legacy-purge'
import { revokeAllSessions } from '@nosgestesclimat/core/features/auth/services/revoke-all-sessions.service'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserSession } from './get-user-session'

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  const session = await getUserSession()
  if (session) {
    await revokeAllSessions(session.id)
  }
  for (const cookie of deleteSessionCookies()) {
    cookieStore.delete({ name: cookie.name, ...cookie.options })
  }

  // Also purge the legacy domain-scoped variants (Domain=nosgestesclimat.fr):
  // they are read first by the browser and would otherwise keep a stale prod
  // session alive until they expire.
  for (const purge of buildLegacyCookiePurges([
    SESSION_COOKIE,
    REFRESH_COOKIE,
  ])) {
    cookieStore.delete({ name: purge.name, ...purge.options })
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
