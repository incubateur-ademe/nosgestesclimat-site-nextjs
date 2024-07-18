'use client'

import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import Modal from '@/design-system/modals/Modal'
import { useSendVerificationCodeWhenModifyingEmail } from '@/hooks/organisations/useSendVerificationCodeWhenModifyingEmail'
import { useVerifyCodeAndUpdate } from '@/hooks/organisations/useVerifyCodeAndUpdate'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'
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
  onSuccess: () => void
}

export default function EmailVerificationModal({
  data,
  closeModal,
  onSuccess,
}: Props) {
  const {
    mutateAsync: verifyCodeAndUpdateOrganisation,
    error,
    isSuccess,
    isPending,
  } = useVerifyCodeAndUpdate()

  const { t } = useClientTranslation()

  const {
    mutateAsync: sendVerificationCode,
    isError: isErrorSendCode,
    isPending: isPendingSend,
  } = useSendVerificationCodeWhenModifyingEmail(data?.email ?? '')

  const { user, updateUserOrganisation } = useUser()

  useEffect(() => {
    async function send() {
      await sendVerificationCode({
        email: data?.email,
        previousEmail: user?.organisation?.administratorEmail ?? '',
      })
    }

    if (!data || isPendingSend) return

    try {
      send()
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, user?.organisation?.administratorEmail, isPendingSend])

  if (!data) return ''

  async function handleVerifyCodeAndSaveModifications(
    verificationCode: string
  ) {
    if (verificationCode?.length < 6) return

    await verifyCodeAndUpdateOrganisation({
      ...data,
      email: user?.organisation?.administratorEmail ?? '',
      emailModified: data.email,
      verificationCode,
    })

    updateUserOrganisation({
      administratorEmail: data.email,
    })

    onSuccess()
  }

  return (
    <Modal closeModal={closeModal}>
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
          handleValidateVerificationCode={handleVerifyCodeAndSaveModifications}
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
