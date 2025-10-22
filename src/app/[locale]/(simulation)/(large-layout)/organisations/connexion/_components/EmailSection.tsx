'use client'

import EmailSigninForm from '@/components/signIn/EmailSigninForm'
import useLogin from '@/hooks/authentication/useLogin'
import { useUser } from '@/publicodes-state'
import dayjs from 'dayjs'
import VerificationForm from '../../../../../../../components/signIn/VerificationForm'

export default function EmailSection() {
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

  // Only show verification form if the saved authentication mode is 'signIn' (default for organisations)
  const shouldShowVerificationForm =
    hasSavedValidVerificationCodeExpirationDate &&
    user.authenticationMode === 'signIn'

  if (!user) return null

  // We want to keep displaying the verification form when validated
  // until redirecting to the next page
  if (shouldShowVerificationForm || isSuccessValidate) {
    return (
      <VerificationForm
        login={login}
        isPendingValidate={isPendingValidate}
        isSuccessValidate={isSuccessValidate}
      />
    )
  }

  return <EmailSigninForm />
}
