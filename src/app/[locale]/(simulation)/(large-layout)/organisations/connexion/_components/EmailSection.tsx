'use client'

import useLogin from '@/hooks/authentication/useLogin'
import { useUser } from '@/publicodes-state'
import dayjs from 'dayjs'
import EmailForm from './emailSection/EmailForm'
import VerificationForm from './emailSection/VerificationForm'

export default function EmailSection() {
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

  return <EmailForm />
}
