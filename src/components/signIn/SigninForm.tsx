'use client'

import useLogin from '@/hooks/authentication/useLogin'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import dayjs from 'dayjs'
import EmailSigninForm from './EmailSigninForm'
import VerificationForm from './VerificationForm'

type Props = {
  buttonLabel?: string
  mode?: AuthenticationMode
  redirectURL?: string
}

export default function SigninForm({ buttonLabel, mode, redirectURL }: Props) {
  const { user } = useUser()

  const {
    mutateAsync: login,
    isPending: isPendingValidate,
    isSuccess: isSuccessValidate,
  } = useLogin()

  const hasSavedValidVerificationCodeExpirationDate =
    user?.verificationCodeExpirationDate
      ? dayjs(user?.verificationCodeExpirationDate).isAfter(dayjs())
      : false

  // Only show verification form if the current mode matches the saved authentication mode
  const shouldShowVerificationForm =
    hasSavedValidVerificationCodeExpirationDate &&
    user.authenticationMode === mode

  if (!user) return null

  // We want to keep displaying the verification form when validated
  // until redirecting to the next page
  if (shouldShowVerificationForm || isSuccessValidate) {
    return (
      <VerificationForm
        login={login}
        isPendingValidate={isPendingValidate}
        isSuccessValidate={isSuccessValidate}
        redirectURL={redirectURL}
      />
    )
  }

  return <EmailSigninForm buttonLabel={buttonLabel} mode={mode} />
}
