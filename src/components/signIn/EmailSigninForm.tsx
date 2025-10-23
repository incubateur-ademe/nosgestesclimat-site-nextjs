'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import {
  ERROR_MESSAGE_USER_ALREADY_EXISTS,
  ERROR_MESSAGE_USER_DOES_NOT_EXIST,
} from '@/constants/errors/authentication'
import {
  captureClickSubmitEmail,
  signinTrackEvent,
} from '@/constants/tracking/pages/signin'
import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCreateVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  buttonLabel?: string
  mode?: AuthenticationMode
  emailDefaultValue?: string
}

type FormData = {
  email: string
}

export default function EmailSigninForm({
  buttonLabel,
  mode,
  emailDefaultValue,
}: Props) {
  const { t } = useClientTranslation()

  const {
    updateVerificationCodeExpirationDate,
    updateAuthenticationMode,
    updateUserOrganisation,
    user,
    updateEmail,
  } = useUser()

  const {
    mutateAsync: createVerificationCode,
    error: errorCreateVerificationCode,
    isError: isErrorCreateVerificationCode,
  } = useCreateVerificationCode()

  const errorCode =
    errorCreateVerificationCode instanceof AxiosError &&
    errorCreateVerificationCode.response?.data

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    try {
      const email = formatEmail(data.email)

      // Track the email signin form submission
      trackEvent(signinTrackEvent(mode))
      trackPosthogEvent(captureClickSubmitEmail({ mode }))

      const { expirationDate } = await createVerificationCode({
        email,
        userId: user.userId,
        mode,
      })

      // Reset the organisation local state
      updateUserOrganisation({
        administratorEmail: email,
        slug: '',
        name: '',
      })

      // We update the expiration date of the code
      updateVerificationCodeExpirationDate(expirationDate)
      updateAuthenticationMode(mode)
      updateUserOrganisation({ administratorEmail: email })

      if (!user.email) {
        updateEmail(email)
      }
    } catch (error) {
      console.log(error)
      // Error is handled by the useCreateVerificationCode hook
      return
    }
  }

  useEffect(() => {
    if (emailDefaultValue && getValues('email') === '') {
      setValue('email', emailDefaultValue)
    }
  }, [emailDefaultValue, setValue, getValues, user.email])

  // In sign up mode, if the user already exists, we update the email with the value from the form
  // so the user can login directly
  useEffect(() => {
    if (errorCode && errorCode === ERROR_MESSAGE_USER_ALREADY_EXISTS) {
      const email = getValues('email')

      if (email && email !== user.email) {
        updateEmail(email)
      }
    }
  }, [errorCode, getValues, updateEmail, user.email])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextInput
        type="email"
        shouldUseDebounce={false}
        autoComplete="email"
        data-cypress-id="organisation-connexion-email-input"
        label={<Trans>Votre adresse electronique</Trans>}
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
        error={errors.email?.message}
      />

      {isErrorCreateVerificationCode &&
        errorCode !== ERROR_MESSAGE_USER_DOES_NOT_EXIST &&
        errorCode !== ERROR_MESSAGE_USER_ALREADY_EXISTS && (
          <DefaultSubmitErrorMessage className="mt-4" />
        )}

      {errorCode === ERROR_MESSAGE_USER_DOES_NOT_EXIST && (
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
      )}

      {errorCode === ERROR_MESSAGE_USER_ALREADY_EXISTS && (
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
      )}

      <Button
        type="submit"
        data-cypress-id="organisation-connexion-submit-button"
        className="mt-8">
        {buttonLabel ?? <Trans>Accéder à mon espace</Trans>}
      </Button>
    </form>
  )
}
