import {
  captureClickSubmitEmail,
  signinTrackEvent,
} from '@/constants/tracking/pages/signin'
import { VERIFICATION_CODE_URL } from '@/constants/urls/main'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useCallback } from 'react'
import { useLocale } from '../useLocale'
import type { PendingVerification } from './usePendingVerification'

export const enum CREATE_VERIFICATION_CODE_ERROR {
  SIGNIN_USER_DOES_NOT_EXIST = 'User does not exist',
  SIGNUP_USER_ALREADY_EXISTS = 'User already exists',
  UNKNOWN_ERROR = 'An unknown error occurred',
}

export function useCreateVerificationCode({
  mode,
  onComplete,
}: {
  mode?: AuthenticationMode
  onComplete?: (pendingVerification: PendingVerification) => void
} = {}) {
  const locale = useLocale()

  const {
    mutateAsync: postVerificationCode,
    error,
    isPending,
  } = useMutation({
    mutationFn: ({
      email,
      userId,
      mode,
    }: {
      email: string
      userId: string
      mode?: AuthenticationMode
    }) =>
      axios
        .post(
          `${VERIFICATION_CODE_URL}${mode ? `?mode=${mode}` : ''}`,
          {
            email,
            userId,
          },
          {
            params: { locale },
          }
        )
        .then((response) => response.data),
  })

  const errorCode: CREATE_VERIFICATION_CODE_ERROR | false =
    error &&
    ((error instanceof AxiosError && error.response?.data) ??
      CREATE_VERIFICATION_CODE_ERROR.UNKNOWN_ERROR)

  const { user } = useUser()

  const createVerificationCode = useCallback(
    async (email: string) => {
      try {
        email = formatEmail(email)
        // Track the email signin form submission
        // @TODO move
        trackEvent(signinTrackEvent(mode))
        trackPosthogEvent(captureClickSubmitEmail({ mode }))

        const { expirationDate } = await postVerificationCode({
          email,
          userId: user.userId,
          mode,
        })

        onComplete?.({ email, expirationDate })
      } catch (error) {
        console.error(error)
        // Error is handled by the useCreateVerificationCode hook
        return
      }
    },
    [user.userId, mode, onComplete, postVerificationCode]
  )

  return {
    createVerificationCode,
    createVerificationCodeError: errorCode,
    createVerificationCodePending: isPending,
    // @TODO
    defaultEmail: '',
  }
}
