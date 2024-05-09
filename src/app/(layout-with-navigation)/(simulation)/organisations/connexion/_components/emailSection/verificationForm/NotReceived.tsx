'use client'

import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import EyeIcon from '@/components/icons/EyeIcon'
import LockIcon from '@/components/icons/LockIcon'
import ReturnIcon from '@/components/icons/ReturnIcon'
import SendIcon from '@/components/icons/SendIcon'
import Trans from '@/components/translation/Trans'
import { organisationsConnexionClickCode } from '@/constants/tracking/pages/organisationsConnexion'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()

  const { updateLoginExpirationDate } = useUser()

  const timeoutRef = useRef<NodeJS.Timeout>()

  function handleGoBackToForm() {
    // Reset the login expiration date
    updateLoginExpirationDate(undefined)

    router.push('/organisations/connexion')
  }

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
        <strong>
          <Trans>Vous n'avez pas reçu de code ?</Trans>
        </strong>
      </p>
      <p className="mb-1 flex items-center text-sm">
        <EyeIcon className="mr-2 h-4  w-4" />{' '}
        <Trans>Avez-vous pensé à vérifier votre outil anti-spams ?</Trans>
      </p>
      <p className="mb-0 ml-6 text-xs text-gray-500">
        <Trans>
          Certaines organisations sont dotées d’un outil type MailinBlack,
          Altospam qui bloquent parfois nos emails.
        </Trans>
      </p>

      {!isErrorResend && (
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

      <Button
        onClick={handleGoBackToForm}
        color="link"
        size="sm"
        className="-ml-2 -mt-2 flex items-center font-normal">
        <ReturnIcon className="mr-2 inline-block w-4 fill-primary-700" />

        <Trans>Revenir au formulaire de connexion</Trans>
      </Button>
    </>
  )
}
