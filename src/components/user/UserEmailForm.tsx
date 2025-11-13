'use client'

import EmailVerificationModal from '@/app/[locale]/(simulation)/(large-layout)/organisations/[orgaSlug]/parametres/_components/EmailVerificationModal'
import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import TextInput from '@/design-system/inputs/TextInput'
import Loader from '@/design-system/layout/Loader'
import { useCreateVerificationCode } from '@/hooks/authentication/useCreateVerificationCode'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { captureException } from '@sentry/nextjs'
import type { ReactNode } from 'react'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  email?: string
}

type Props = {
  submitLabel?: string | ReactNode
  className?: string
}

export default function UserEmailForm({ submitLabel, className }: Props) {
  const { t } = useClientTranslation()
  const { user, updateEmail } = useUser()

  const { register, handleSubmit } = useReactHookForm<Inputs>({
    defaultValues: { email: user?.email },
  })

  const {
    mutateAsync: updateUserSettings,
    isPending,
    isError,
    isSuccess,
    error,
  } = useUpdateUserSettings()

  const { createVerificationCode, createVerificationCodeError } =
    useCreateVerificationCode()

  const [shouldDisplayModal, setShouldDisplayModal] = useState(false)
  const [pendingEmail, setPendingEmail] = useState<string | undefined>(
    undefined
  )

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const nextEmail = formatEmail(data.email)

      if (nextEmail && nextEmail !== user.email) {
        setPendingEmail(nextEmail)
        await createVerificationCode(nextEmail)
        setShouldDisplayModal(true)

        return
      }
    } catch (error) {
      captureException(error)
    }
  }

  async function handleValidateVerificationCode(verificationCode: string) {
    if (!pendingEmail || verificationCode.length < 6) return

    try {
      await updateUserSettings({
        email: pendingEmail,
        userId: user.userId,
        code: verificationCode,
      })

      updateEmail(pendingEmail)
      setShouldDisplayModal(false)
    } catch (err) {
      captureException(err)
    }
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-4">
        {shouldDisplayModal && (
          <EmailVerificationModal
            closeModal={() => setShouldDisplayModal(false)}
            onSubmit={handleValidateVerificationCode}
            error={(error as Error) ?? null}
            isSuccess={isSuccess}
            isPending={isPending}
            isErrorSendCode={!!createVerificationCodeError}
          />
        )}

        <TextInput
          label={t('Votre adresse electronique')}
          className="w-full"
          value={user?.email ?? ''}
          autoComplete="email"
          {...register('email')}
        />

        {isSuccess && (
          <p
            data-testid="success-message"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mt-4 mb-4 text-green-700">
            <Trans>Vos informations ont bien été mises à jour.</Trans>
          </p>
        )}

        {isError && (
          <div data-testid="error-message">
            <DefaultSubmitErrorMessage />
          </div>
        )}

        <div>
          <Button
            data-testid="submit-button"
            type="submit"
            className="mt-6 gap-2 self-start"
            disabled={isPending}>
            {isPending && <Loader size="sm" color="light" />}
            {submitLabel ? (
              <span data-testid="custom-submit-label">{submitLabel}</span>
            ) : (
              <span data-testid="default-submit-label">
                <Trans>Mettre à jour mes coordonnées</Trans>
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
