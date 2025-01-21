'use client'

import { LIST_MAIN_NEWSLETTER } from '@/constants/brevo'
import { STORAGE_KEY } from '@/constants/storage'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Loader from '@/design-system/layout/Loader'
import { useSubscribeToNewsletter } from '@/hooks/newsletter/useSubscribeToNewsletter'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { getLocalState } from '@/services/ngc.service'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import Trans from '../translation/Trans'

function getSuccessMessage(isSubscribed: boolean, isSuccess: boolean) {
  if (isSuccess) {
    return <Trans>Bien noté ! Vous aurez prochainement de nos nouvelles.</Trans>
  }

  if (isSubscribed) {
    return <Trans>Super, vous êtes déjà inscrit !</Trans>
  }

  return null
}

export default function NewsletterForm() {
  const state = getLocalState()
  const userEmailFromLocalStorage = state?.user?.email
  const userId = state?.user?.userId

  // Avoid refetching useGetNewsletterSubscriptions when defining an email for the first time
  const emailRef = useRef<string>(userEmailFromLocalStorage ?? '')

  const { register, handleSubmit, setError, setValue } = useForm({
    defaultValues: {
      email: userEmailFromLocalStorage ?? '',
    },
  })

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    emailRef?.current ?? ''
  )

  const { isPending, isError, isSuccess, submit } = useSubscribeToNewsletter({
    email: emailRef?.current ?? '',
    userId: userId ?? '',
    setError,
    onSuccess: ({ email }) => {
      if (!userEmailFromLocalStorage || userEmailFromLocalStorage !== email) {
        // Update the email in the local storage
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...state,
            user: {
              ...(state?.user ?? {}),
              email,
            },
          })
        )
      }
    },
  })

  // Hack to force the email to be set in the form
  useEffect(() => {
    if (userEmailFromLocalStorage) {
      setValue('email', userEmailFromLocalStorage)
    }
  }, [setValue, userEmailFromLocalStorage])

  const isSubscribed =
    newsletterSubscriptions?.includes(LIST_MAIN_NEWSLETTER) &&
    emailRef.current === userEmailFromLocalStorage

  return (
    <div className="w-96 min-w-80 max-w-full md:flex-1">
      <h3 className="mb-4 text-base font-bold text-primary-700">
        <Trans>Inscrivez-vous à notre infolettre</Trans>
      </h3>

      <form
        className="flex flex-col items-end justify-start gap-2 sm:flex-row sm:items-start"
        onSubmit={handleSubmit(submit)}>
        <TextInputGroup
          placeholder="email@mail.com"
          className="rounded-full sm:min-w-96"
          containerClassName="w-full sm:w-auto"
          successMessage={getSuccessMessage(isSubscribed, isSuccess)}
          error={isError ? <Trans>Une erreur est survenue</Trans> : ''}
          disabled={isPending || isSuccess}
          value={userEmailFromLocalStorage ?? ''}
          {...register('email')}
        />
        <Button
          type="submit"
          style={{
            display: 'flex',
          }}
          className="relative flex h-14 w-14 min-w-14 max-w-14 rounded-full !px-0 !py-0"
          disabled={isPending || isSuccess}>
          {isPending ? (
            <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <Loader size="sm" />
            </div>
          ) : (
            <ArrowRightIcon className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
          )}
        </Button>
      </form>
    </div>
  )
}
