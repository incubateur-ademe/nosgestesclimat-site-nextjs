'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCreateVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
}

export default function EmailForm() {
  const { t } = useClientTranslation()

  const {
    updateLoginExpirationDate,
    updateUserOrganisation,
    user,
    updateEmail,
  } = useUser()

  const { mutateAsync: createVerificationCode, isError } =
    useCreateVerificationCode()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    const email = formatEmail(data.email)

    const { expirationDate } = await createVerificationCode({
      email,
      userId: user.userId,
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

      {isError && <DefaultSubmitErrorMessage className="mt-4" />}

      <Button
        type="submit"
        data-cypress-id="organisation-connexion-submit-button"
        className="mt-8">
        <Trans>Accéder à mon espace</Trans>
      </Button>
    </form>
  )
}
