'use client'

import CheckIcon from '@/components/icons/CheckIcon'
import Trans from '@/components/translation/Trans'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { subscribeToNewsletterBlog } from '@/constants/tracking/pages/newsletter'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useLocale } from '@/hooks/useLocale'
import { useMainNewsletter } from '@/hooks/useMainNewsletter'
import { useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useRef } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import Button from '../inputs/Button'
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

  const locale = useLocale()

  const { user, updateEmail } = useUser()

  // Avoid refetching useGetNewsletterSubscriptions when defining an email for the first time
  const emailRef = useRef<string>(user?.email ?? '')

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    emailRef?.current ?? ''
  )

  const {
    mutateAsync: updateUserSettings,
    isPending,
    isSuccess,
  } = useUpdateUserSettings({
    email: emailRef?.current ?? '',
    userId: user?.userId ?? '',
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    trackEvent(subscribeToNewsletterBlog)

    const listIds = {
      [LIST_MAIN_NEWSLETTER]: data['newsletter-saisonniere'],
      [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: data['newsletter-transports'],
      [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: data['newsletter-logement'],
    }

    const formattedEmail = formatEmail(data.email)

    updateEmail(formattedEmail)

    // We save the simulation (and signify the backend to send the email)
    updateUserSettings({
      newsletterIds: listIds,
    })
  }

  return (
    <div
      className="rainbow-border w-full rounded-xl bg-white p-8 md:w-4/6"
      aria-live="polite">
      {isSuccess ? (
        <SuccessMessage />
      ) : (
        <>
          <h3 className="mb-2">
            Vous souhaitez recevoir nos derniers articles directement ?
          </h3>

          <p className="mb-6 flex items-center">
            <CheckIcon className="mr-2 h-4 w-4 stroke-green-500" />

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
                    <span className="text-gray-600">
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
                    <span className="text-gray-600">
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
                    <span className="text-gray-600">
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
                    required: 'Veuillez renseigner un email.',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Veuillez entrer une adresse email valide',
                    },
                  })}
                  aria-label="Entrez votre adresse email"
                  error={errors.email?.message}
                  data-cypress-id="fin-email-input"
                  className="h-full"
                />

                <Button size="lg" type="submit">
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
