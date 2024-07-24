'use client'

import EyeIcon from '@/components/icons/EyeIcon'
import ReturnIcon from '@/components/icons/ReturnIcon'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import React from 'react'
import ResendButton from './notReceived/ResendButton'

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
  const router = useRouter()

  const { updateLoginExpirationDate } = useUser()

  function handleGoBackToForm() {
    // Reset the login expiration date
    updateLoginExpirationDate(undefined)

    router.push('/organisations/connexion')
  }

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
          Altospam, ect., qui bloque parfois nos emails.
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
