'use client'

import useLogin from '@/hooks/authentication/useLogin'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import dayjs from 'dayjs'
import { type ReactNode } from 'react'
import { useState } from 'storybook/internal/preview-api'

import SendVerificationCodeForm from './SendVerificationCodeForm'
import VerifyCodeForm from './VerifyCodeForm'

type Props = {
  buttonLabel?: string | ReactNode
  buttonColor?: 'primary' | 'secondary'
  inputLabel?: ReactNode | string
  mode?: AuthenticationMode
  redirectURL?: string
  onComplete?: (email: string) => void
  defaultEmail?: string
}

export default function SignInOrSignUpForm({
  buttonLabel,
  buttonColor = 'primary',
  inputLabel,
  mode,
  redirectURL,
  onComplete,
}: Props) {
  const { user } = useUser()
  const [email, setEmail] = useState<string | undefined>(user?.email)
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
      <VerifyCodeForm
        email={email ?? ''}
        login={login}
        isPendingValidate={isPendingValidate}
        isSuccessValidate={isSuccessValidate}
        redirectURL={redirectURL}
        mode={mode}
        onComplete={onComplete}
      />
    )
  }

  return (
    <SendVerificationCodeForm
      buttonLabel={buttonLabel}
      buttonColor={buttonColor}
      mode={mode}
      onComplete={setEmail}
      inputLabel={inputLabel}
    />
  )
}
