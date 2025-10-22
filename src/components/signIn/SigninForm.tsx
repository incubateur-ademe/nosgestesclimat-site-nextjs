'use client'

import useLogin from '@/hooks/authentication/useLogin'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import EmailSigninForm from './EmailSigninForm'
import VerificationForm from './VerificationForm'

type Props = {
  buttonLabel?: string
  mode?: AuthenticationMode
  redirectURL?: string
}

export default function SigninForm({ buttonLabel, mode, redirectURL }: Props) {
  const { user, updateLoginExpirationDate } = useUser()

  useEffect(() => {
    if (user?.loginExpirationDate) {
      updateLoginExpirationDate(undefined)
    }
  }, [user, updateLoginExpirationDate])

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
        redirectURL={redirectURL}
      />
    )
  }

  return <EmailSigninForm buttonLabel={buttonLabel} mode={mode} />
}
