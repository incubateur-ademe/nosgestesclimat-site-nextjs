import { transaction } from '../../../lib/transaction.ts'
import type { Logger } from '../../logger/index.ts'
import { transferSimulationsFromUser } from '../repositories/ownership-transfer.repository.ts'

/**
 * Hands the anonymous session's data over to the account the visitor just
 * signed into: its simulations and group participations follow, the anonymous
 * row is deleted. The outcome of the login is logged by its caller.
 */
export const reconcileSimulationsAfterLogin = async ({
  logger,
  user,
  previousUserId,
}: {
  logger: Logger
  user: { id: string; email: string }
  previousUserId: string
}) =>
  await logger.openSpan(
    'core.service.reconcileSimulationsAfterLogin',
    async () => {
      await transaction((session) =>
        transferSimulationsFromUser({ user, previousUserId }, { session })
      )
    }
  )
