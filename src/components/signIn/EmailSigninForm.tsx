'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import { ERROR_MESSAGE_USER_DOES_NOT_EXIST } from '@/constants/errors/authentication'
import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCreateVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import type { AuthenticationMode } from '@/types/authentication'
import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

type Props = {
  buttonLabel?: string
  mode?: AuthenticationMode
}

type FormData = {
  email: string
}

export default function EmailSigninForm({
  buttonLabel,
  mode = 'signIn',
}: Props) {
  const { t } = useClientTranslation()

  const {
    updateLoginExpirationDate,
    updateUserOrganisation,
    user,
    updateEmail,
  } = useUser()

  const {
    mutateAsync: createVerificationCode,
    error: errorCreateVerificationCode,
    isError: isErrorCreateVerificationCode,
  } = useCreateVerificationCode()

  const isUserDoesNotExistError =
    errorCreateVerificationCode instanceof AxiosError &&
    errorCreateVerificationCode.response?.data ===
      ERROR_MESSAGE_USER_DOES_NOT_EXIST

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    try {
      const email = formatEmail(data.email)

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
      updateLoginExpirationDate(expirationDate)
      updateUserOrganisation({ administratorEmail: email })

      if (!user.email) {
        updateEmail(email)
      }
    } catch (error) {
      // Error is handled by the useCreateVerificationCode hook
      return
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextInput
        type="email"
        autoComplete="email"
        data-cypress-id="organisation-connexion-email-input"
        value={user?.organisation?.administratorEmail || user?.email || ''}
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

      {isErrorCreateVerificationCode && !isUserDoesNotExistError && (
        <DefaultSubmitErrorMessage className="mt-4" />
      )}

      {isUserDoesNotExistError && (
        <Alert
          type="error"
          className="mt-4"
          description={
            <Trans i18nKey="signIn.email.error.userDoesNotExist">
              Nous n’avons pas d’e-mail enregistré à cette adresse. Veuillez
              vous inscrire pour accéder à votre espace.
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
