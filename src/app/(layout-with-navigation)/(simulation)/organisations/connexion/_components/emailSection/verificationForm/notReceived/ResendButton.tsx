'use client'

import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import LockIcon from '@/components/icons/LockIcon'
import SendIcon from '@/components/icons/SendIcon'
import Trans from '@/components/translation/Trans'
import { organisationsConnexionClickCode } from '@/constants/tracking/pages/organisationsConnexion'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  isRetryButtonDisabled: boolean
  sendVerificationCode: () => Promise<void>
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
  timeLeft: number
}

export default function ResendButton({
  isRetryButtonDisabled,
  sendVerificationCode,
  setTimeLeft,
  timeLeft,
}: Props) {
  const [shouldDisplayConfirmation, setShouldDisplayConfirmation] =
    useState(false)

  const { t } = useClientTranslation()

  const timeoutRef = useRef<NodeJS.Timeout>()

  async function handleResendVerificationCode() {
    if (isRetryButtonDisabled) {
      return
    }

    trackEvent(organisationsConnexionClickCode)

    await sendVerificationCode()
    setShouldDisplayConfirmation(true)

    timeoutRef.current = setTimeout(() => {
      setTimeLeft(30)
      setShouldDisplayConfirmation(false)
    }, 1500)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex items-center">
      <Button
        color="link"
        size="sm"
        aria-disabled={isRetryButtonDisabled}
        aria-label={
          isRetryButtonDisabled
            ? t('Renvoyer le code, désactivé pendant 30 secondes')
            : ''
        }
        className="-ml-2 font-normal"
        onClick={handleResendVerificationCode}>
        {isRetryButtonDisabled && timeLeft > 0 && (
          <span className="mr-2 flex items-center">
            <LockIcon className="mr-2 h-4 w-4 fill-primary-700" />
            <Trans>Renvoyer le code</Trans>
          </span>
        )}

        {shouldDisplayConfirmation && (
          <span className="flex items-center text-green-500 no-underline">
            <CheckCircleIcon className="mr-2 h-4 w-4 fill-green-500" />
            <Trans>Code renvoyé</Trans>
          </span>
        )}

        {!shouldDisplayConfirmation && !isRetryButtonDisabled && (
          <span className="flex items-center underline">
            <SendIcon className="mr-2 h-4 w-4 fill-primary-700" />
            <Trans>Renvoyer le code</Trans>
          </span>
        )}
      </Button>
      {isRetryButtonDisabled && timeLeft > 0 && (
        <span className="text-xs font-normal text-gray-500 !no-underline">
          <Trans>(Attendre</Trans> {timeLeft} <Trans>secondes)</Trans>
        </span>
      )}
    </div>
  )
}
