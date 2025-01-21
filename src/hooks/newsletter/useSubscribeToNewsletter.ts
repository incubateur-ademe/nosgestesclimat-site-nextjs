'use client'

import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import type { UseFormSetError } from 'react-hook-form'
import { useUpdateUserSettings } from '../settings/useUpdateUserSettings'
import { useClientTranslation } from '../useClientTranslation'

// Use with react-hook-form
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
  onSuccess: (data: { email: string; name?: string }) => void
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

  const submit = async (data: {
    email: string
    name?: string
    newsletterIds: Record<string, boolean>
  }) => {
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
      name: data.name ?? undefined,
      email: formattedEmail,
      newsletterIds: data.newsletterIds,
    })

    onSuccess({ email: formattedEmail, name: data.name ?? undefined })
  }

  return { isPending, isError, isSuccess, submit }
}
