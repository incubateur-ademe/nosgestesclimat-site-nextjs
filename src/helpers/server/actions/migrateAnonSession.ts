'use server'

import { getAnonSession } from '../dal/anonSession'

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * One-shot migration: seeds the server session with the client's localStorage
 * userId.  This is only allowed once — after that, the server owns the userId
 * and the client can no longer overwrite it.
 *
 * This action is meant to be removed once the migration window is over.
 */
export async function migrateAnonSession(userId: string) {
  if (!UUID_REGEX.test(userId)) {
    throw new Error('Invalid userId: must be a valid UUID')
  }

  const session = await getAnonSession()

  if (session.migrated) {
    return
  }

  session.userId = userId
  session.migrated = true
  await session.save()
}
