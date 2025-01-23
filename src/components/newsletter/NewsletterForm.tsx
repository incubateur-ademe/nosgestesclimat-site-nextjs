'use client'

import { LIST_MAIN_NEWSLETTER } from '@/constants/brevo'
import { STORAGE_KEY } from '@/constants/storage'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { useSubscribeToNewsletter } from '@/hooks/newsletter/useSubscribeToNewsletter'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { getLocalState } from '@/services/ngc.service'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import Trans from '../translation/Trans'

function getSuccessMessage({
  isSubscribed,
  isSuccess,
  userEmailFromLocalStorage,
}: {
  isSubscribed: boolean
  isSuccess: boolean
  userEmailFromLocalStorage: string
}) {
  if (userEmailFromLocalStorage) {
    return (
      <span>
        <Trans>Vous êtes déjà inscrit !</Trans> <Emoji>✅</Emoji>
      </span>
    )
  }

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
    !!userEmailFromLocalStorage &&
    emailRef.current === userEmailFromLocalStorage

  const isDisabled = !!userEmailFromLocalStorage || isPending || isSuccess

  return (
    <div className="min-w-56 max-w-full flex-1">
      <h3 className="mb-4 text-base font-bold text-primary-700">
        <Trans>Inscrivez-vous à notre infolettre</Trans>
      </h3>

      <form
        className="flex flex-col items-start justify-start gap-2 sm:flex-row"
        onSubmit={handleSubmit((data) =>
          submit({ ...data, newsletterIds: { [LIST_MAIN_NEWSLETTER]: true } })
        )}>
        <TextInputGroup
          placeholder="email@mail.com"
          className="w-full rounded-full"
          containerClassName="w-full max-w-[30rem]"
          successMessage={getSuccessMessage({
            isSubscribed,
            isSuccess,
            userEmailFromLocalStorage: userEmailFromLocalStorage ?? '',
          })}
          error={isError ? <Trans>Une erreur est survenue</Trans> : ''}
          disabled={isDisabled}
          value={userEmailFromLocalStorage ?? ''}
          {...register('email')}
        />
        <Button
          type="submit"
          className="relative flex h-14 w-14 min-w-14 max-w-14 self-end rounded-full !px-0 !py-0 sm:self-start md:self-start"
          disabled={isDisabled}>
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
