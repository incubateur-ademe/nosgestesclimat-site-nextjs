'use client'

import useLogin from '@/hooks/authentication/useLogin'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import dayjs from 'dayjs'
import type { ReactNode } from 'react'
import EmailSigninForm from './EmailSigninForm'
import VerificationForm from './VerificationForm'

type Props = {
  buttonLabel?: string | ReactNode
  inputLabel?: ReactNode | string
  mode?: AuthenticationMode
  redirectURL?: string
  onVerificationSuccessOverride?: (data: {
    email: string
    code: string
  }) => void
  verificationOverrideError?: string
}

export default function SigninForm({
  buttonLabel,
  inputLabel,
  mode,
  redirectURL,
  onVerificationSuccessOverride,
  verificationOverrideError,
}: Props) {
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

  if (!user) return null

  // We want to keep displaying the verification form when validated
  // until redirecting to the next page
  if (hasSavedValidVerificationCodeExpirationDate || isSuccessValidate) {
    return (
      <VerificationForm
        login={login}
        isPendingValidate={isPendingValidate}
        isSuccessValidate={isSuccessValidate}
        redirectURL={redirectURL}
        mode={mode}
        onVerificationSuccessOverride={onVerificationSuccessOverride}
        verificationOverrideError={verificationOverrideError}
      />
    )
  }

  return (
    <EmailSigninForm
      emailDefaultValue={
        mode !== undefined
          ? user?.email
          : user?.organisation?.administratorEmail || user?.email || ''
      }
      buttonLabel={buttonLabel}
      mode={mode}
      inputLabel={inputLabel}
    />
  )
}
