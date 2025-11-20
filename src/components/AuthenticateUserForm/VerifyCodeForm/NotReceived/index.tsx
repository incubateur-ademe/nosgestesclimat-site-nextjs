'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import ResendButton from './ResendButton'

type Props = {
  isRetryButtonDisabled: boolean
  isErrorResend: boolean
  onReset: () => void
  onResendVerificationCode: () => void
  timeLeft: number
}

export default function NotReceived({
  isRetryButtonDisabled,
  isErrorResend,
  onReset,
  onResendVerificationCode,
  timeLeft,
}: Props) {
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
          onResendVerificationCode={onResendVerificationCode}
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
        onClick={onReset}
        color="link"
        className="mt-2 -ml-2 flex items-center font-normal">
        <Trans i18nKey="signIn.verificationForm.notReceived.backButton">
          Retour à la connexion
        </Trans>
      </Button>
    </>
  )
}
