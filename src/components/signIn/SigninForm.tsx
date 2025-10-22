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
}

export default function SigninForm({ buttonLabel, mode = 'signIn' }: Props) {
  const { user } = useUser()

  const {
    mutateAsync: login,
    isPending: isPendingValidate,
    isSuccess: isSuccessValidate,
  } = useLogin()

  const hasSavedValidLoginExpirationDate = user?.loginExpirationDate
    ? dayjs(user?.loginExpirationDate).isAfter(dayjs())
    : false

  if (!user) return null

  // We want to keep displaying the verification form when validated
  // until redirecting to the next page
  if (hasSavedValidLoginExpirationDate || isSuccessValidate) {
    return (
      <VerificationForm
        login={login}
        isPendingValidate={isPendingValidate}
        isSuccessValidate={isSuccessValidate}
      />
    )
  }

  return <EmailSigninForm buttonLabel={buttonLabel} mode={mode} />
}
