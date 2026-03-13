'use server'

import { validate } from 'uuid'
import { getAnonSession } from '../dal/anonSession'
import { InvalidInputError } from '../error'

/**
 * One-shot migration: seeds the server session with the client's localStorage
 * userId, in order to keep the simulation associated with the previous userID.
 *
 * This is only allowed once — after that, the server owns the userId
 * and the client can no longer overwrite it.
 *
 * This action is meant to be removed once the migration window is over (once every active user has connect, e.g ).
 */
export async function migrateAnonSession(userId: string) {
  if (!validate(userId)) {
    throw new InvalidInputError('Invalid userId: must be a valid UUID')
  }

  const session = await getAnonSession()

  if (session.migrated) {
    return
  }

  session.userId = userId
  session.migrated = true
  await session.save()
}
