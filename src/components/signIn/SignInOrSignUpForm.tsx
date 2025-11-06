'use client'

import useLogin from '@/hooks/authentication/useLogin'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import dayjs from 'dayjs'
import { useState, type ReactNode } from 'react'
import EmailSignInOrSignUpForm from './EmailSignInOrSignUpForm'
import VerificationForm from './VerificationForm'

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
  defaultEmail,
}: Props) {
  const { user } = useUser()

  const [email, setEmail] = useState<string | undefined>(
    defaultEmail ?? user?.email ?? ''
  )

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
    <EmailSignInOrSignUpForm
      emailDefaultValue={
        mode !== undefined
          ? user?.email
          : user?.organisation?.administratorEmail || user?.email || ''
      }
      buttonLabel={buttonLabel}
      buttonColor={buttonColor}
      mode={mode}
      inputLabel={inputLabel}
      onEmailChange={setEmail}
    />
  )
}
