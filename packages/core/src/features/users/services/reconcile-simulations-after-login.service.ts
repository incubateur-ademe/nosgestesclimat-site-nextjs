import { transaction } from '../../../lib/transaction.ts'
import type { Logger } from '../../logger/index.ts'
import { transferSimulationsFromUser } from '../repositories/ownership-transfer.repository.ts'

/**
 * Hands the anonymous session's data over to the account the visitor just
 * signed into: its simulations and group participations follow, the anonymous
 * row is deleted. The outcome of the login is logged by its caller.
 */
export const createReconcileSimulationsAfterLogin = ({
  logger,
}: {
  logger: Logger
}) =>
  logger.withSpan(
    'core.service.reconcileSimulationsAfterLogin',
    async ({
      user,
      previousUserId,
    }: {
      user: { id: string; email: string }
      previousUserId: string
    }) => {
      await transaction((session) =>
        transferSimulationsFromUser({ user, previousUserId }, { session })
      )
    }
  )
