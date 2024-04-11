'use client'

import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import LockIcon from '@/components/icons/LockIcon'
import SendIcon from '@/components/icons/SendIcon'
import Trans from '@/components/translation/Trans'
import { organisationsConnexionClickCode } from '@/constants/tracking/pages/organisationsConnexion'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  isRetryButtonDisabled: boolean
  isErrorResend: boolean
  sendVerificationCode: () => Promise<void>
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
  timeLeft: number
}

export default function NotReceived({
  isRetryButtonDisabled,
  isErrorResend,
  sendVerificationCode,
  setTimeLeft,
  timeLeft,
}: Props) {
  const [shouldDisplayConfirmation, setShouldDisplayConfirmation] =
    useState(false)
  const { t } = useClientTranslation()

  const { updateLoginExpirationDate } = useUser()

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
    <>
      <p className="mt-12">
        <Trans>Vous n'avez pas reçu d'e-mail ?</Trans>
      </p>

      {!isErrorResend && (
        <button
          aria-disabled={isRetryButtonDisabled}
          aria-label={
            isRetryButtonDisabled
              ? t('Renvoyer le code, désactivé pendant 30 secondes')
              : ''
          }
          onClick={handleResendVerificationCode}
          className="text-primary-700">
          {isRetryButtonDisabled && timeLeft > 0 && (
            <span className="flex items-center no-underline">
              <LockIcon className="h-4 w-4 fill-primary-700" />
              &nbsp;<Trans>Renvoyer le code</Trans>
            </span>
          )}

          {shouldDisplayConfirmation && (
            <span className="flex items-center text-green-500 no-underline">
              <CheckCircleIcon className="h-4 w-4 fill-green-500" />
              &nbsp;<Trans>Code renvoyé</Trans>
            </span>
          )}

          {!shouldDisplayConfirmation && !isRetryButtonDisabled && (
            <span className="flex items-center underline">
              <SendIcon className="h-4 w-4 fill-primary-700" />
              &nbsp;<Trans>Renvoyer le code</Trans>
            </span>
          )}
        </button>
      )}

      {isErrorResend && (
        <div className="text-red-800">
          <p>
            <Trans>
              Oups, une erreur s'est produite au moment de l'envoi de votre
              code...
            </Trans>
          </p>

          <div>
            <Button
              size="sm"
              onClick={() => {
                if (typeof window === 'undefined') return
                updateLoginExpirationDate(undefined)
                window.location.reload()
              }}>
              Recharger la page
            </Button>
          </div>
        </div>
      )}

      {timeLeft > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          <Trans>Veuillez attendre</Trans> {timeLeft}{' '}
          <Trans>secondes avant de pouvoir recevoir un nouveau code</Trans>
        </p>
      )}
    </>
  )
}
