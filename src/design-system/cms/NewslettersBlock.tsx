'use client'

import CheckIcon from '@/components/icons/CheckIcon'
import Trans from '@/components/translation/Trans'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useLocale } from '@/hooks/useLocale'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
import { useUser } from '@/publicodes-state'
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

export default function NewslettersBlock() {
  const { data: numberSubscribers } = useNumberSubscribers()

  const locale = useLocale()

  const { user } = useUser()

  // Avoid refetching useGetNewsletterSubscriptions when defining an email for the first time
  const emailRef = useRef<string>(user?.email ?? '')

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    emailRef?.current ?? ''
  )

  const isSubscribedMainNewsletter =
    newsletterSubscriptions?.includes(LIST_MAIN_NEWSLETTER)

  const isSubscribedTransportNewsletter = newsletterSubscriptions?.includes(
    LIST_NOS_GESTES_TRANSPORT_NEWSLETTER
  )
  const isSubscribedLogementNewsletter = newsletterSubscriptions?.includes(
    LIST_NOS_GESTES_LOGEMENT_NEWSLETTER
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      name: user?.name,
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

  const onSubmit: SubmitHandler<Inputs> = async () => {
    // If the mutation is pending, we do nothing
    // if (isPending) {
    //   return
    // }
    // trackEvent(endClickSaveSimulation)
    // const listIds = getSaveSimulationListIds(data)
    // const formattedEmail = formatEmail(data.email)
    // updateEmail(formattedEmail)
    // if (currentSimulation?.computedResults[defaultMetric].bilan === 0) {
    //   // Send an error to Sentry
    //   captureException(
    //     new Error(
    //       'GetResultsByEmail: computedResults[defaultMetric].bilan === 0'
    //     )
    //   )
    //   return
    // }
    // We save the simulation (and signify the backend to send the email)
    // saveSimulation({
    //   simulation: {
    //     ...currentSimulation,
    //     savedViaEmail: true,
    //   },
    //   shouldSendSimulationEmail: true,
    //   listIds,
    // })
  }

  return (
    <div className="rainbow-border w-full rounded-xl bg-white p-8 md:w-4/6">
      <h3 className="mb-2">
        Vous souhaitez recevoir nos derniers articles directement ?
      </h3>

      <p className="mb-6 flex items-center">
        <CheckIcon className="mr-2 h-4 w-4 stroke-green-500" />

        <span className="text-sm text-gray-600">
          {numberSubscribers?.toLocaleString(locale) ?? 0}{' '}
          <Trans>personnes inscrites</Trans>
        </span>
      </p>

      <form
        id="newsletter-form"
        className="flex h-full flex-col items-start"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex w-full flex-col gap-2">
          {!isSubscribedMainNewsletter && (
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
          )}

          {!isSubscribedTransportNewsletter && (
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
          )}

          {!isSubscribedLogementNewsletter && (
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
          )}

          <div className="mt-10 flex w-full gap-8">
            <EmailInput
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
    </div>
  )
}
