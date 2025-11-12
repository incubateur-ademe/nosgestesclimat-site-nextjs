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
import { useCallback } from 'storybook/internal/preview-api'
import { useLocale } from '../useLocale'

export const enum ERRORS {
  SIGNIN_USER_DOES_NOT_EXIST = 'User does not exist',
  SIGNUP_USER_ALREADY_EXISTS = 'User already exists',
  UNKNOWN_ERROR = 'An unknown error occurred',
}

export function useCreateVerificationCode({
  mode,
  onComplete,
}: {
  mode?: AuthenticationMode
  onComplete?: (email: string) => void
} = {}) {
  const { mutateAsync: postVerificationCode, error } = usePostVerificationCode()

  const errorCode: ERRORS | false =
    error &&
    ((error instanceof AxiosError && error.response?.data) ??
      ERRORS.UNKNOWN_ERROR)

  const {
    updateVerificationCodeExpirationDate,
    updateUserOrganisation,
    user,
    updateEmail,
  } = useUser()

  const createVerificationCode = useCallback(
    async (data: { email: string }) => {
      try {
        const email = formatEmail(data.email)

        // Track the email signin form submission
        trackEvent(signinTrackEvent(mode))
        trackPosthogEvent(captureClickSubmitEmail({ mode }))

        const { expirationDate } = await postVerificationCode({
          email,
          userId: user.userId,
          mode,
        })

        updateVerificationCodeExpirationDate(expirationDate)

        onComplete?.(email)
      } catch (error) {
        console.error(error)
        // Error is handled by the useCreateVerificationCode hook
        return
      }
    },
    [
      mode,
      onComplete,
      postVerificationCode,
      updateVerificationCodeExpirationDate,
      user.userId,
    ]
  )

  return {
    createVerificationCode,
    createVerificationCodeError: errorCode,
    // @TODO
    defaultEmail: '',
  }
}

export function usePostVerificationCode() {
  const locale = useLocale()

  return useMutation({
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
}
