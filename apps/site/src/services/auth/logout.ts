'use server'

import { deleteSessionCookies } from '@/helpers/server/cookie/auth.cookie'
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

  // The legacy domain-scoped variants (Domain=nosgestesclimat.fr) are purged
  // by the proxy middleware (proxy.ts) on the next request: the browser still
  // sends them at that point. They cannot be deleted here — `cookies()` from
  // next/headers has the same Map-by-name limitation as NextResponse.cookies,
  // so a domain-scoped delete would overwrite the host-only deletes above and
  // break the logout. During the migration window a user with a legacy cookie
  // carrying a still-valid access token (< 15 min) may briefly appear logged
  // in until the token expires — negligible window, accepted.

  revalidatePath('/', 'layout')
  redirect('/')
}
