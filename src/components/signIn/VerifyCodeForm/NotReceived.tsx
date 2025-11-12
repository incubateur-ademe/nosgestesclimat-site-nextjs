'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import { useUser } from '@/publicodes-state'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import ResendButton from './notReceived/ResendButton'

type Props = {
  isRetryButtonDisabled: boolean
  isErrorResend: boolean
  sendVerificationCode: UseMutateAsyncFunction<any, Error, string, unknown>
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
  const router = useRouter()

  const { updateVerificationCodeExpirationDate } = useUser()

  function handleGoBackToForm() {
    // Reset the verification code expiration date
    updateVerificationCodeExpirationDate(undefined)

    router.refresh()
  }

  return (
    <>
      <h3 className="mt-12 text-lg">
        <strong>
          <Trans i18nKey="signIn.verificationForm.notReceived.title">
            Vous n'avez pas reçu de code ?
          </Trans>
        </strong>
      </h3>

      <p className="mb-0">
        <Trans i18nKey="signIn.verificationForm.notReceived.text">
          Vérifiez vos spams ou outils anti-spam (MailinBlack, Altospam, etc...)
        </Trans>
      </p>

      {!isErrorResend && (
        <ResendButton
          isRetryButtonDisabled={isRetryButtonDisabled}
          sendVerificationCode={sendVerificationCode}
          setTimeLeft={setTimeLeft}
          timeLeft={timeLeft}
        />
      )}

      {isErrorResend && (
        <div className="text-red-800">
          <p>
            <Trans i18nKey="signIn.verificationForm.notReceived.error">
              Oups, une erreur s'est produite au moment de l'envoi de votre
              code...
            </Trans>
          </p>

          <div>
            <Button
              size="sm"
              onClick={() => {
                if (typeof window === 'undefined') return
                updateVerificationCodeExpirationDate(undefined)
                window.location.reload()
              }}>
              <Trans i18nKey="signIn.verificationForm.notReceived.reloadPage">
                Recharger la page
              </Trans>
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={handleGoBackToForm}
        color="link"
        className="mt-2 -ml-2 flex items-center font-normal">
        <Trans i18nKey="signIn.verificationForm.notReceived.backButton">
          Retour à la connexion
        </Trans>
      </Button>
    </>
  )
}
