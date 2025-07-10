'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransClient'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { subscribeToNewsletterBlog } from '@/constants/tracking/pages/newsletter'
import { formatListIdsFromObject } from '@/helpers/brevo/formatListIdsFromObject'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUnsubscribeFromNewsletters } from '@/hooks/settings/useUnsubscribeFromNewsletters'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useMainNewsletter } from '@/hooks/useMainNewsletter'
import i18nConfig from '@/i18nConfig'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import Button from '../buttons/Button'
import CheckboxInputGroup from '../inputs/CheckboxInputGroup'
import EmailInput from '../inputs/EmailInput'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
  'newsletter-logement': boolean
}

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <CheckIcon className="mb-4 h-12 w-12 fill-green-500" />

      <h3 className="mb-4 text-xl font-bold text-gray-800">
        <Trans>Merci de votre inscription !</Trans>
      </h3>

      <p className="text-gray-600">
        <Trans>
          Vous recevrez bientôt nos actualités et conseils directement dans
          votre boîte mail.
        </Trans>
      </p>
    </div>
  )
}

export default function NewslettersBlock() {
  const { data: mainNewsletter } = useMainNewsletter()

  const { t } = useClientTranslation()

  const locale = useLocale()

  const { user, updateEmail } = useUser()

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.userId ?? ''
  )
  const {
    mutateAsync: updateUserSettings,
    isPending,
    isSuccess,
    isError,
  } = useUpdateUserSettings()

  const {
    mutateAsync: unsubscribeFromNewsletters,
    isPending: isPendingUnsubscribe,
    isError: isErrorUnsubscribe,
  } = useUnsubscribeFromNewsletters({
    email: user.email ?? '',
    userId: user.userId,
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: { name: user?.name, email: user?.email },
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!newsletterSubscriptions) return

    setValue(
      'newsletter-saisonniere',
      newsletterSubscriptions.includes(LIST_MAIN_NEWSLETTER)
    )
    setValue(
      'newsletter-transports',
      newsletterSubscriptions.includes(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER)
    )

    setValue(
      'newsletter-logement',
      newsletterSubscriptions.includes(LIST_NOS_GESTES_LOGEMENT_NEWSLETTER)
    )
  }, [newsletterSubscriptions, setValue])

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email)
    }
  }, [user?.email, setValue])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // If the mutation is pending, we do nothing
    if (isPending || isPendingUnsubscribe) {
      return
    }

    if (!data.email) {
      return
    }

    const listIds = {
      [LIST_MAIN_NEWSLETTER]: data['newsletter-saisonniere'],
      [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: data['newsletter-transports'],
      [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: data['newsletter-logement'],
    }

    const newslettersArray = formatListIdsFromObject(listIds)

    // If the user is not subscribed to any newsletter and has not selected any newsletter, we don't do anything
    if (!newsletterSubscriptions?.length && newslettersArray.length === 0) {
      setError('email', {
        message: t('Veuillez sélectionner au moins une infolettre.'),
      })
      return
    }

    trackEvent(subscribeToNewsletterBlog)

    const formattedEmail = formatEmail(data.email)

    updateEmail(formattedEmail)

    // We save the simulation (and signify the backend to send the email)
    await updateUserSettings({
      newsletterIds: newslettersArray,
      userId: user?.userId,
      email: formattedEmail,
      name: data.name,
    })

    if (newslettersArray && newslettersArray.length === 0) {
      await unsubscribeFromNewsletters({
        name: data.name,
        email: user.email ?? '',
        newsletterIds: listIds,
      })
    }
  }

  const isFrench = locale === i18nConfig.defaultLocale

  if (!isFrench) return null

  return (
    <div
      className="rainbow-border w-full rounded-xl bg-white p-8 md:w-4/6"
      aria-live="polite">
      {isSuccess ? (
        <SuccessMessage />
      ) : (
        <>
          <h3 className="mb-2">
            <Trans>
              Vous souhaitez recevoir nos derniers articles directement ?
            </Trans>
          </h3>

          <p className="mb-6 flex items-center">
            <CheckIcon className="mr-2 h-4 w-4 stroke-green-500" aria-hidden />

            <span className="text-sm text-gray-600">
              {mainNewsletter?.totalSubscribers.toLocaleString(locale) ?? 0}{' '}
              <Trans>personnes inscrites</Trans>
            </span>
          </p>

          <form
            id="newsletter-form"
            className="flex h-full flex-col items-start"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex w-full flex-col gap-2">
              <CheckboxInputGroup
                label={
                  <p className="mb-0 text-sm">
                    <span>
                      <Trans>Je m'inscris à l'infolettre</Trans>
                    </span>{' '}
                    -{' '}
                    <span className="text-gray-700">
                      <Trans>1 par mois max</Trans>
                    </span>
                  </p>
                }
                {...register('newsletter-saisonniere')}
              />

              <CheckboxInputGroup
                label={
                  <p className="mb-0 text-sm">
                    <span>Nos Gestes Transports</span> -{' '}
                    <span className="text-gray-700">
                      <Trans>4 infolettres l’impact des transports</Trans>
                    </span>
                  </p>
                }
                {...register('newsletter-transports')}
              />

              <CheckboxInputGroup
                label={
                  <p className="mb-0 text-sm">
                    <span>Nos Gestes Logement</span> -{' '}
                    <span className="text-gray-700">
                      <Trans>5 infolettres sur l’impact du logement</Trans>
                    </span>
                  </p>
                }
                {...register('newsletter-logement')}
              />

              <div className="mt-10 flex w-full flex-col gap-8 md:flex-row">
                <EmailInput
                  value={user?.email}
                  {...register('email', {
                    required: t('Veuillez renseigner un email.'),
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: t('Veuillez entrer une adresse email valide'),
                    },
                  })}
                  aria-label={t('Entrez votre adresse email')}
                  error={errors.email?.message}
                  data-cypress-id="fin-email-input"
                  className="h-full"
                />

                {(isError || isErrorUnsubscribe) && (
                  <DefaultSubmitErrorMessage />
                )}

                <Button size="lg" className="self-start" type="submit">
                  <Trans>S'inscrire</Trans>
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
