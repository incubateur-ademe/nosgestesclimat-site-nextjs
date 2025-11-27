'use client'

import type { AuthenticationMode } from '@/types/authentication'
import { useCallback, type ReactNode } from 'react'

import { usePendingVerification } from '@/hooks/authentication/usePendingVerification'
import { useRouter } from 'next/navigation'
import SendVerificationCodeForm from './SendVerificationCodeForm'
import VerifyCodeForm from './VerifyCodeForm'

type Props = {
  buttonLabel?: string | ReactNode
  buttonColor?: 'primary' | 'secondary'
  inputLabel?: ReactNode | string
  mode?: AuthenticationMode
  redirectURL?: string
  onComplete?: () => void
}

export default function AuthenticateUserForm({
  buttonLabel,
  buttonColor = 'primary',
  inputLabel,
  redirectURL,
  mode,
  onComplete,
}: Props) {
  const router = useRouter()

  const redirect = useCallback(() => {
    if (redirectURL) {
      router.push(redirectURL)
    }
    onComplete?.()
  }, [redirectURL, onComplete, router])

  const {
    pendingVerification,
    registerVerification,
    resetVerification,
    completeVerification,
  } = usePendingVerification({
    onComplete: redirect,
  })

  if (pendingVerification) {
    return (
      <VerifyCodeForm
        onRegisterNewVerification={registerVerification}
        onVerificationReset={resetVerification}
        pendingVerification={pendingVerification}
        onVerificationCompleted={completeVerification}
      />
    )
  }

  return (
    <SendVerificationCodeForm
      buttonLabel={buttonLabel}
      buttonColor={buttonColor}
      mode={mode}
      onCodeSent={registerVerification}
      inputLabel={inputLabel}
    />
  )
}
