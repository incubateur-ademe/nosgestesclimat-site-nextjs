'use client'

import type { AuthenticationMode } from '@/types/authentication'
import { useCallback, useState, type ReactNode } from 'react'

import { EMAIL_PENDING_AUTHENTICATION_KEY } from '@/constants/authentication/sessionStorage'
import { captureClickSubmitEmail } from '@/constants/tracking/pages/signin'
import Button from '@/design-system/buttons/Button'
import useLogin from '@/hooks/authentication/useLogin'
import { usePendingVerification } from '@/hooks/authentication/usePendingVerification'
import { useUser } from '@/publicodes-state'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { safeSessionStorage } from '@/utils/browser/safeSessionStorage'
import { useRouter } from 'next/navigation'
import Trans from '../translation/trans/TransClient'
import SendVerificationCodeForm from './SendVerificationCodeForm'
import VerifyCodeForm from './VerifyCodeForm'

interface Props {
  buttonLabel?: string | ReactNode
  buttonColor?: 'primary' | 'secondary'
  inputLabel?: ReactNode | string
  mode?: AuthenticationMode
  redirectURL?: string
  onEmailEntered?: (email: string) => void
  onEmailEmpty?: () => void
  onComplete?: (user: { email: string; userId: string }) => void
  required?: boolean
  trackers?: {
    posthog: {
      eventName: string
      properties?: Record<string, string | number | boolean | null | undefined>
    }
  }
}

export default function AuthenticateUserForm({
  buttonLabel,
  buttonColor = 'primary',
  inputLabel,
  redirectURL,
  mode,
  onComplete,
  required = true,
  trackers,
}: Props) {
  const router = useRouter()
  const { user } = useUser()

  const [isRedirecting, setIsRedirecting] = useState(false)

  // Called upon code verification
  const complete = useCallback(
    (user: { email: string; userId: string }) => {
      safeSessionStorage.removeItem(EMAIL_PENDING_AUTHENTICATION_KEY)
      setIsRedirecting(true)

      if (trackers) {
        trackPosthogEvent(trackers.posthog)
      }
      onComplete?.(user)

      if (redirectURL) {
        router.push(redirectURL)
      }

      router.refresh()
    },
    [redirectURL, onComplete, router, trackers]
  )

  const {
    pendingVerification,
    registerVerification,
    resetVerification,
    completeVerification,
  } = usePendingVerification({
    onComplete: complete,
  })

  const login = useLogin()

  if (pendingVerification || isRedirecting) {
    return (
      <div className="mb-8 rounded-xl bg-[#F4F5FB] p-4 md:p-8">
        <VerifyCodeForm
          onRegisterNewVerification={registerVerification}
          email={pendingVerification?.email ?? user.email ?? ''}
          onVerificationCompleted={completeVerification}
          verificationMutation={login}
        />
        <Button
          onClick={resetVerification}
          color="link"
          className="mt-2 -ml-2 flex items-center font-normal">
          <Trans i18nKey="signIn.verificationForm.notReceived.backButton">
            Retour à la connexion
          </Trans>
        </Button>
      </div>
    )
  }
  return (
    <SendVerificationCodeForm
      buttonLabel={buttonLabel}
      buttonColor={buttonColor}
      mode={mode}
      onCodeSent={(pendingVerification) => {
        registerVerification(pendingVerification)
        trackPosthogEvent(captureClickSubmitEmail({ mode }))
      }}
      inputLabel={inputLabel}
      required={required}
    />
  )
}
