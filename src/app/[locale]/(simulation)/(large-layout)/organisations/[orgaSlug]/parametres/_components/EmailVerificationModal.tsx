'use client'

import VerificationCodeInput from '@/components/organisations/VerificationCodeInput'
import TransClient from '@/components/translation/trans/TransClient'
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
    <Modal isOpen closeModal={closeModal} hasAbortCross={false}>
      <form>
        <h3>
          <TransClient>
            Vous devez valider votre changement d'adresse e-mail.
          </TransClient>
        </h3>

        <p>
          <TransClient>
            Vous allez recevoir sous peu un e-mail de notre part contenant un{' '}
            <strong className="text-secondary-700">code de vérification</strong>{' '}
            à entrer dans cette fenêtre.
          </TransClient>
        </p>

        <label htmlFor="code" className="mb-4 block font-bold">
          <TransClient>
            Entrez votre code de vérification pour continuer
          </TransClient>
        </label>

        <VerificationCodeInput
          inputError={error ? t("Le code n'est pas valide.") : undefined}
          isSuccessValidate={isSuccess}
          isPendingValidate={isPending}
          handleValidateVerificationCode={onSubmit}
        />

        {isErrorSendCode && (
          <p className="mt-8 text-red-700">
            <TransClient>
              Oups ! Une erreur s'est produite au moment d'envoyer votre code de
              vérification par email. Vérifiez si votre nouvel e-mail est bien
              valide et si le problème persiste, n'hésitez pas à{' '}
              <InlineLink href="/contact">nous contacter</InlineLink>
            </TransClient>
          </p>
        )}
      </form>
    </Modal>
  )
}
