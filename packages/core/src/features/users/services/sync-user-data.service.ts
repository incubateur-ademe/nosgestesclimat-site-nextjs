import { transaction } from '../../../lib/transaction.ts'
import type { Logger } from '../../logger/index.ts'
import { transferOwnershipToUser } from '../repositories/ownership-transfer.repository.ts'

/**
 * Folds the anonymous users that still carry the verified email into the
 * account that just signed up. The line only fires when it merged something:
 * its frequency is what says the legacy path can be deleted.
 */
export const syncUserData = async ({
  logger,
  user,
  verified,
}: {
  logger: Logger
  user: { id: string; email: string }
  verified?: boolean
}) =>
  await logger.openSpan('core.service.syncUserData', async (logger) => {
    // `transaction` carries a `Result` out of its callback, not a count.
    let mergedUserCount = 0

    await transaction(async (session) => {
      mergedUserCount = await transferOwnershipToUser(
        { user, verified },
        { session }
      )
    })

    logger.setSpanAttribute('mergedUserCount', mergedUserCount)

    if (mergedUserCount > 0) {
      logger.info('Legacy user data merged', { mergedUserCount })
    }
  })
