'use server'

import { sendEmail } from '@/adapters/brevoClient'
import {
  UnknownCodeError,
  type EmailError,
} from '@/components/authentication/errors'
import { rateLimitSameRequest } from '@/helpers/server/rateLimitSameRequest'
import logger from '@/logger/logger.server'
import { CreateVerificationCodePayloadSchema } from '@nosgestesclimat/core/features/auth/schemas/auth.schema'
import { createCreateVerificationCodeService } from '@nosgestesclimat/core/features/auth/services/create-verification-code.service'
import type { Logger } from '@nosgestesclimat/core/features/logger/index'
import { maskEmail } from '@nosgestesclimat/core/lib/pii'
import { failure, success, type Result } from '@nosgestesclimat/core/lib/result'
import { toError } from '@nosgestesclimat/core/lib/to-error'
import { validatePayload } from '@nosgestesclimat/core/lib/validate-payload'
import { VerificationCodeUsage } from '@nosgestesclimat/core/prisma/generated/client'
import { after } from 'next/server'

const createVerificationCodeService = createCreateVerificationCodeService({
  logger,
  sendEmail,
  // The action returns before the email is dispatched: the task must outlive
  // the request.
  backgroundTaskRunner: after,
  usage: VerificationCodeUsage.login,
})

export const createVerificationCode = logger.withSpan(
  'site.action.createVerificationCode',
  ({ email }: { email: string }) => ({ email: maskEmail(email) }),
  async ({
    email,
    locale,
    logger,
  }: {
    email: string
    locale?: string
    logger: Logger
  }): Promise<Result<{ expirationDate: Date }, EmailError>> => {
    const startedAt = Date.now()

    // The schema lowercases the email before the DB lookup; the throttle key
    // must normalize the same way, or case permutations split the bucket.
    const rateLimit = await rateLimitSameRequest({
      key: `verification-code:${email.toLocaleLowerCase()}`,
      ttlInSeconds: 30,
    })
    if (!rateLimit.success) return rateLimit

    const parsed = validatePayload(CreateVerificationCodePayloadSchema, {
      email,
      locale,
    })
    if (!parsed.success) {
      logger.warn(parsed.error)
      return failure(new UnknownCodeError())
    }

    const boundLogger = logger.child({ locale: parsed.data.locale })

    try {
      const { expirationDate } = await createVerificationCodeService({
        email: parsed.data.email,
        locale: parsed.data.locale,
      })

      boundLogger.info('VerificationCode created', {
        expirationDate,
        durationMs: Date.now() - startedAt,
      })

      return success({ expirationDate })
    } catch (error) {
      boundLogger.error(toError(error), { durationMs: Date.now() - startedAt })

      return failure(new UnknownCodeError())
    }
  }
)
