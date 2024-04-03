'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
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
          className="text-primary-700 underline">
          {isRetryButtonDisabled && timeLeft > 0 && (
            <>
              <Emoji>🔒</Emoji>&nbsp;<Trans>Renvoyer le code</Trans>
            </>
          )}

          {shouldDisplayConfirmation && (
            <>
              <Emoji>✅</Emoji>&nbsp;<Trans>Code renvoyé</Trans>
            </>
          )}

          {!shouldDisplayConfirmation && !isRetryButtonDisabled && (
            <Trans>Renvoyer le code</Trans>
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
