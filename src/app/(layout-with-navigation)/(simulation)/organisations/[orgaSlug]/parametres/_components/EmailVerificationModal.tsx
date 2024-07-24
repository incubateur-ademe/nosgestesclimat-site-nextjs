'use client'

import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import Modal from '@/design-system/modals/Modal'
import { useSendVerificationCodeWhenModifyingEmail } from '@/hooks/organisations/useSendVerificationCodeWhenModifyingEmail'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useEffect, useState } from 'react'
import VerificationCodeInput from '../../../connexion/_components/emailSection/verificationForm/VerificationCodeInput'

type Props = {
  data: {
    name: string
    administratorName: string
    administratorTelephone: string
    hasOptedInForCommunications: boolean
    email: string
    organisationType: string
    position: string
    numberOfCollaborators: number
  }
  closeModal: () => void
  onSubmit: (verificationCode: string) => void
  error: Error | null
  isSuccess: boolean
  isPending: boolean
}

export default function EmailVerificationModal({
  data,
  closeModal,
  onSubmit,
  error,
  isSuccess,
  isPending,
}: Props) {
  const [shouldSendEmail, setShouldSendEmail] = useState(false)

  const { user } = useUser()

  const { t } = useClientTranslation()

  const {
    mutateAsync: sendVerificationCode,
    isSuccess: isSuccessSend,
    isError: isErrorSendCode,
  } = useSendVerificationCodeWhenModifyingEmail(data?.email ?? '')

  useEffect(() => {
    if (!data || !user?.organisation?.administratorEmail || shouldSendEmail)
      return

    setShouldSendEmail(true)
  }, [
    data,
    sendVerificationCode,
    shouldSendEmail,
    user?.organisation?.administratorEmail,
  ])

  useEffect(() => {
    async function send() {
      await sendVerificationCode({
        email: data?.email,
        previousEmail: user?.organisation?.administratorEmail ?? '',
      })
    }

    if (shouldSendEmail && !isSuccessSend && !isErrorSendCode) {
      send()
    }
  }, [
    data,
    isErrorSendCode,
    isSuccessSend,
    sendVerificationCode,
    shouldSendEmail,
    user?.organisation?.administratorEmail,
  ])

  if (!data) return ''

  return (
    <Modal isOpen closeModal={closeModal}>
      <form>
        <h3>
          <Trans>Vous devez valider votre changement d'adresse e-mail.</Trans>
        </h3>

        <p>
          <Trans>
            Vous allez recevoir sous peu un e-mail de notre part contenant un{' '}
            <span className="font-bold text-secondary-700">
              code de vérification
            </span>{' '}
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
