'use client'

import { LIST_MAIN_NEWSLETTER } from '@/constants/brevo'
import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import type { UseFormSetError } from 'react-hook-form'
import { useUpdateUserSettings } from '../settings/useUpdateUserSettings'
import { useClientTranslation } from '../useClientTranslation'

export function useSubscribeToNewsletter({
  email,
  userId,
  setError,
  onSuccess,
}: {
  // The email to subscribe to the newsletter
  email: string
  // The user id got from the user context or the local storage
  userId: string
  setError: UseFormSetError<{ email: string }>
  onSuccess: (data: { email: string }) => void
}) {
  const { t } = useClientTranslation()

  const {
    mutateAsync: updateUserSettings,
    isPending,
    isError,
    isSuccess,
  } = useUpdateUserSettings({
    email: email ?? '',
    userId: userId ?? '',
  })

  const submit = async (data: { email: string }) => {
    if (isPending || isSuccess) {
      return
    }

    if (!isEmailValid(data.email)) {
      setError('email', {
        type: 'validate',
        message: t('Veuillez saisir une adresse email valide.'),
      })
      return
    }

    const formattedEmail = formatEmail(data.email)

    await updateUserSettings({
      email: formattedEmail,
      newsletterIds: {
        [LIST_MAIN_NEWSLETTER]: true,
      },
    })

    onSuccess({ email: formattedEmail })
  }

  return { isPending, isError, isSuccess, submit }
}
