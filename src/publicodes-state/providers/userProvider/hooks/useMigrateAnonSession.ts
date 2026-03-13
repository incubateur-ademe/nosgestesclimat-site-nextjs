import { migrateAnonSession } from '@/helpers/server/actions/migrateAnonSession'
import { useEffect } from 'react'

/**
 * One-shot migration: if the client's localStorage userId differs from the
 * server session userId, send it to the server to seed the encrypted session.
 *
 * The server action (`migrateAnonSession`) is guarded by a `migrated` flag —
 * once the session has been seeded, further calls are no-ops.
 *
 * This hook (and the server action) can be removed once the migration window
 * is over (i.e. all active users have visited the site at least once).
 */
export function useMigrateAnonSession({
  initialUserId,
  currentUserId,
}: {
  initialUserId: string | undefined
  currentUserId: string
}) {
  useEffect(() => {
    if (initialUserId && initialUserId !== currentUserId) {
      void migrateAnonSession(currentUserId)
    }
  }, [initialUserId, currentUserId])
}
