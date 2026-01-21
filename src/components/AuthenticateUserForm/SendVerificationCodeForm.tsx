'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import { EMAIL_PENDING_AUTHENTICATION_KEY } from '@/constants/authentication/sessionStorage'
import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import {
  CREATE_VERIFICATION_CODE_ERROR,
  useCreateVerificationCode,
} from '@/hooks/authentication/useCreateVerificationCode'
import type { PendingVerification } from '@/hooks/authentication/usePendingVerification'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import { safeSessionStorage } from '@/utils/browser/safeSessionStorage'
import { isEmailValid } from '@/utils/isEmailValid'
import { type ReactNode } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  buttonLabel?: string | ReactNode
  buttonColor?: 'primary' | 'secondary'
  mode?: AuthenticationMode
  onCodeSent: (pendingVerification: PendingVerification) => void
  inputLabel?: ReactNode | string
  required?: boolean
  onComplete?: ({ email, userId }: { email: string; userId: string }) => void
  onEmailEntered?: (email: string) => void
  onEmailEmpty?: () => void
}

interface FormData {
  email: string
}

export default function SendVerificationCodeForm({
  buttonLabel,
  buttonColor = 'primary',
  mode,
  inputLabel,
  onCodeSent,
  required = true,
}: Props) {
  const { t } = useClientTranslation()
  const { createVerificationCodeError, createVerificationCode } =
    useCreateVerificationCode({
      onComplete: onCodeSent,
      mode,
    })

  const user = useUser().user

  const defaultEmail =
    safeSessionStorage.getItem(EMAIL_PENDING_AUTHENTICATION_KEY) ?? user.email

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormData>({
    defaultValues: {
      email: defaultEmail,
    },
  })

  const onSubmit = ({ email }: FormData) => {
    createVerificationCode(email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextInput
        type="email"
        autoComplete="email"
        data-cypress-id="organisation-connexion-email-input"
        label={inputLabel ?? <Trans>Votre adresse e-mail</Trans>}
        placeholder="nom.prenom@domaine.fr"
        srOnlyHelperText={
          <Trans i18nKey="organisations.connexion.email.input.helper">
            Format attendu : nom.prenom@domaine.fr
          </Trans>
        }
        {...register('email', {
          required: required
            ? t('Merci de renseigner votre adresse e-mail')
            : undefined,
          validate: (value) =>
            isEmailValid(value) || t("L'adresse e-mail est invalide"),
        })}
        error={formErrors.email?.message}
      />

      {createVerificationCodeError ===
      CREATE_VERIFICATION_CODE_ERROR.SIGNIN_USER_DOES_NOT_EXIST ? (
        <Alert
          type="error"
          className="mt-4 max-w-[30rem]"
          description={
            <Trans i18nKey="signIn.email.error.userDoesNotExist">
              Nous n’avons pas d’e-mail enregistré à cette adresse. Veuillez
              vous inscrire pour accéder à votre espace.
            </Trans>
          }
        />
      ) : createVerificationCodeError ===
        CREATE_VERIFICATION_CODE_ERROR.SIGNUP_USER_ALREADY_EXISTS ? (
        <Alert
          type="error"
          className="mt-4 max-w-[30rem]"
          description={
            <Trans i18nKey="signIn.email.error.userAlreadyExists">
              Vous avez déjà un compte avec cet e-mail. Merci de vous connecter
              directement.
            </Trans>
          }
        />
      ) : createVerificationCodeError ===
        CREATE_VERIFICATION_CODE_ERROR.UNKNOWN_ERROR ? (
        <DefaultSubmitErrorMessage className="mt-4 max-w-[30rem]" />
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
