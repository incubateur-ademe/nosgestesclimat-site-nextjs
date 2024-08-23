'use client'

import Trans from '@/components/translation/Trans'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { defaultMetric } from '@/constants/metric'
import { endClickSaveSimulation } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import EmailInput from '@/design-system/inputs/EmailInput'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { getSaveSimulationListIds } from '@/helpers/brevo/getSaveSimulationListIds'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Confirmation from './carbone/getResultsByEmail/Confirmation'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
  'newsletter-logement': boolean
}

export default function GetResultsByEmail({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()
  const { user, updateEmail } = useUser()

  const locale = useLocale()

  const currentSimulation = useCurrentSimulation()

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

  const isSubscribedLogementNewsletter = newsletterSubscriptions?.includes(
    LIST_NOS_GESTES_LOGEMENT_NEWSLETTER
  )

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

  const { saveSimulation, isPending, isSuccess, isError, error } =
    useSaveSimulation()

  const { data: numberSubscribers } = useNumberSubscribers()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    trackEvent(endClickSaveSimulation)

    const listIds = getSaveSimulationListIds(data)

    const formattedEmail = formatEmail(data.email)

    updateEmail(formattedEmail)

    if (currentSimulation?.computedResults[defaultMetric].bilan === 0) {
      // Send an error to Sentry
      captureException(
        new Error(
          'GetResultsByEmail: computedResults[defaultMetric].bilan === 0'
        )
      )
      return
    }

    // We save the simulation (and signify the backend to send the email)
    saveSimulation({
      simulation: {
        ...currentSimulation,
        savedViaEmail: true,
      },
      shouldSendSimulationEmail: true,
      listIds,
    })
  }

  useEffect(() => {
    if (isSuccess && !currentSimulation.savedViaEmail) {
      // We update the simulation to signify that it has been saved (and not show the form anymore)
      currentSimulation.update({ savedViaEmail: true })
    }
  }, [isSuccess, currentSimulation])

  // If we successfully saved the simulation, we display the confirmation message
  // or if the simulation is already saved
  if (isSuccess || currentSimulation?.savedViaEmail) {
    return <Confirmation className={className} />
  }

  // There is a padding/margin shenanigan here for the scroll
  return (
    <div id="email-block" className="-mt-40 pt-40">
      <Card
        className={twMerge(
          'rainbow-border items-start rounded-xl px-4 py-6 shadow-none',
          className
        )}>
        <form
          id="newsletter-form"
          className="flex h-full flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}>
          <h3 className="flex items-center text-base sm:text-lg">
            <Trans>Vous souhaitez recevoir vos résultats ?</Trans>

            <Emoji>💡</Emoji>
          </h3>

          <p className="text-sm sm:text-base">
            <Trans>Pour cela,</Trans>{' '}
            <strong className="text-primary-700">
              <Trans>laissez-nous votre email,</Trans>{' '}
            </strong>
            {t('comme {{numberSubscribers}} personnes.', {
              numberSubscribers:
                numberSubscribers?.toLocaleString(locale, {
                  maximumFractionDigits: 0,
                }) ?? '---',
            })}
          </p>

          <div className="mb-4 flex w-full flex-col gap-2">
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
              className="mb-2"
            />

            {(!isSubscribedMainNewsletter ||
              !isSubscribedTransportNewsletter) && (
              <p className="mb-0">
                <Trans>
                  Recevez des conseils pour réduire votre empreinte :
                </Trans>
              </p>
            )}

            {!isSubscribedMainNewsletter && (
              <CheckboxInputGroup
                label={
                  <span>
                    <Emoji>☀️</Emoji>{' '}
                    <strong>
                      <Trans>Infolettre saisonnière de</Trans> Nos Gestes Climat
                    </strong>
                  </span>
                }
                {...register('newsletter-saisonniere')}
              />
            )}

            {!isSubscribedTransportNewsletter && (
              <CheckboxInputGroup
                label={
                  <span>
                    <Emoji>🚗</Emoji> <strong>Nos Gestes Transports</strong>
                    <Trans>
                       : maîtrisez l'impact carbone de vos transports avec nos 4
                      infolettres
                    </Trans>
                  </span>
                }
                {...register('newsletter-transports')}
              />
            )}

            {!isSubscribedLogementNewsletter && (
              <CheckboxInputGroup
                label={
                  <span>
                    <Emoji>🏡</Emoji>{' '}
                    <Trans>
                      <strong>Nos Gestes Logement</strong> : informez-vous sur
                      l'impact carbone du logement, en quelques e-mails
                    </Trans>
                  </span>
                }
                {...register('newsletter-logement')}
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-auto items-start">
            <Trans>Envoyer</Trans>
          </Button>

          {isError && (
            <div className="mt-4 text-red-600">{error?.toString()}</div>
          )}
        </form>
      </Card>
    </div>
  )
}
