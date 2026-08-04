'use server'

import {
  rateLimitedError,
  unknownCodeError,
  type EmailError,
  type Translate,
} from '@/components/authentication/errors'
import { VERIFICATION_CODE_URL } from '@/constants/urls/main'
import { LOCALE_FR_KEY } from '@/i18nConfig'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { TooManyRequestsError } from '@/helpers/server/error'
import { fetchServer } from '@/helpers/server/fetchServer'
import type { AuthenticationMode } from '@/types/authentication'
import { failure, success, type Result } from '@nosgestesclimat/core/lib/result'

export const createVerificationCode = async ({
  email,
  mode,
  locale,
}: {
  email: string
  mode?: AuthenticationMode
  locale?: string
}): Promise<Result<{ expirationDate: string }, EmailError>> => {
  const params = new URLSearchParams()
  if (mode) params.set('mode', mode)
  if (locale) params.set('locale', locale)
  const qs = params.toString()

  try {
    const data = await fetchServer<{ expirationDate: string }>(
      `${VERIFICATION_CODE_URL}${qs ? `?${qs}` : ''}`,
      { method: 'POST', body: { email } }
    )
    return success(data)
  } catch (error) {
    const { t } = await getServerTranslation({
      locale: locale ?? LOCALE_FR_KEY,
    })
    const translate = t as Translate
    if (error instanceof TooManyRequestsError)
      return failure(rateLimitedError(translate))
    return failure(unknownCodeError(translate))
  }
}
