'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import {
  CREATE_VERIFICATION_CODE_ERROR,
  useCreateVerificationCode,
} from '@/hooks/authentication/useCreateVerificationCode'
import type { PendingVerification } from '@/hooks/authentication/usePendingVerification'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { AuthenticationMode } from '@/types/authentication'
import { isEmailValid } from '@/utils/isEmailValid'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  buttonLabel?: string | ReactNode
  buttonColor?: 'primary' | 'secondary'
  mode?: AuthenticationMode
  onCodeSent: (pendingVerification: PendingVerification) => void
  inputLabel?: ReactNode | string
}

type FormData = {
  email: string
}

export default function SendVerificationCodeForm({
  buttonLabel,
  buttonColor = 'primary',
  mode,
  inputLabel,
  onCodeSent,
}: Props) {
  const { t } = useClientTranslation()
  const { defaultEmail, createVerificationCodeError, createVerificationCode } =
    useCreateVerificationCode({ onComplete: onCodeSent, mode })

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormData>({
    defaultValues: {
      email: defaultEmail,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(({ email }) => createVerificationCode(email))}
      noValidate>
      <TextInput
        type="email"
        shouldUseDebounce={false}
        autoComplete="email"
        data-cypress-id="organisation-connexion-email-input"
        label={inputLabel ?? <Trans>Votre adresse electronique</Trans>}
        placeholder="nom.prenom@domaine.fr"
        srOnlyHelperText={
          <Trans i18nKey="organisations.connexion.email.input.helper">
            Format attendu : nom.prenom@domaine.fr
          </Trans>
        }
        {...register('email', {
          required: t('Ce champ est requis'),
          validate: (value) =>
            isEmailValid(value) || t("L'adresse e-mail est invalide"),
        })}
        error={formErrors.email?.message}
      />

      {createVerificationCodeError ===
      CREATE_VERIFICATION_CODE_ERROR.SIGNIN_USER_DOES_NOT_EXIST ? (
        <Alert
          type="error"
          className="mt-4"
          description={
            <Trans i18nKey="signIn.email.error.userDoesNotExist">
              Ah ! Nous n’avons pas d’e-mail enregistré à cette adresse.
              Veuillez vous inscrire pour accéder à votre espace.
            </Trans>
          }
        />
      ) : createVerificationCodeError ===
        CREATE_VERIFICATION_CODE_ERROR.SIGNUP_USER_ALREADY_EXISTS ? (
        <Alert
          type="error"
          className="mt-4"
          description={
            <Trans i18nKey="signIn.email.error.userAlreadyExists">
              Ah ! Vous avez déjà un compte avec cet e-mail. Merci de vous
              connecter directement.
            </Trans>
          }
        />
      ) : createVerificationCodeError ===
        CREATE_VERIFICATION_CODE_ERROR.UNKNOWN_ERROR ? (
        <DefaultSubmitErrorMessage className="mt-4" />
      ) : null}

      <Button
        type="submit"
        color={buttonColor}
        data-cypress-id="organisation-connexion-submit-button"
        className="mt-8">
        {buttonLabel ?? <Trans>Accéder à mon espace</Trans>}
      </Button>
    </form>
  )
}
