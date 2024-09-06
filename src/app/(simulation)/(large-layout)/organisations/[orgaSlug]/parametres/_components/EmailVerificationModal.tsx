'use client'

import VerificationCodeInput from '@/components/organisations/VerificationCodeInput'
import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import Modal from '@/design-system/modals/Modal'
import { useClientTranslation } from '@/hooks/useClientTranslation'

type Props = {
  closeModal: () => void
  onSubmit: (verificationCode: string) => void
  error: Error | null
  isSuccess: boolean
  isPending: boolean
  isErrorSendCode: boolean
}

export default function EmailVerificationModal({
  closeModal,
  onSubmit,
  error,
  isSuccess,
  isPending,
  isErrorSendCode,
}: Props) {
  const { t } = useClientTranslation()

  return (
    <Modal isOpen closeModal={closeModal}>
      <form>
        <h3>
          <Trans>Vous devez valider votre changement d'adresse e-mail.</Trans>
        </h3>

        <p>
          <Trans>
            Vous allez recevoir sous peu un e-mail de notre part contenant un{' '}
            <strong className="text-secondary-700">code de vérification</strong>{' '}
            à entrer dans cette fenêtre.
          </Trans>
        </p>

        <label htmlFor="code" className="mb-4 block font-bold">
          <Trans>Entrez votre code de vérification pour continuer</Trans>
        </label>

        <VerificationCodeInput
          inputError={error ? t("Le code n'est pas valide.") : undefined}
          isSuccessValidate={isSuccess}
          isPendingValidate={isPending}
          handleValidateVerificationCode={onSubmit}
        />

        {isErrorSendCode && (
          <p className="mt-8 text-red-700">
            <Trans>
              Oups ! Une erreur s'est produite au moment d'envoyer votre code de
              vérification par email. Vérifiez si votre nouvel e-mail est bien
              valide et si le problème persiste, n'hésitez pas à{' '}
              <InlineLink href="/contact">nous contacter</InlineLink>
            </Trans>
          </p>
        )}
      </form>
    </Modal>
  )
}
