'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransClient'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import {
  LOGEMENT_NEWSLETTER_LABEL,
  SEASONAL_NEWSLETTER_LABEL,
  TRANSPORTS_NEWSLETTER_LABEL,
} from '@/constants/forms/newsletters'
import { subscribeToNewsletterBlog } from '@/constants/tracking/pages/newsletter'
import { formatListIdsFromObject } from '@/helpers/brevo/formatListIdsFromObject'
import { getIsUserVerified } from '@/helpers/user/getIsVerified'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useMainNewsletter } from '@/hooks/useMainNewsletter'
import i18nConfig from '@/i18nConfig'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import Button from '../buttons/Button'
import CheckboxInput from '../inputs/CheckboxInput'
import EmailInput from '../inputs/EmailInput'
import BlockSkeleton from '../layout/BlockSkeleton'

interface Inputs {
  name: string
  email?: string
  [SEASONAL_NEWSLETTER_LABEL]: boolean
  [TRANSPORTS_NEWSLETTER_LABEL]: boolean
  [LOGEMENT_NEWSLETTER_LABEL]: boolean
}

function SuccessMessage() {
  return (
    <div
      className="flex h-full flex-1 flex-col items-center justify-center text-center"
      data-testid="success-message"
      role="status"
      aria-live="polite"
      aria-atomic="true">
      <CheckIcon className="mb-4 h-12 w-12 fill-green-700" aria-hidden="true" />

      <h2 className="mb-4 text-xl font-bold text-gray-800">
        <Trans>Merci de votre inscription !</Trans>
      </h2>

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
  const [isNewsletterError, setIsNewsletterError] = useState(false)
  const { data: mainNewsletter } = useMainNewsletter()

  const { t } = useClientTranslation()

  const locale = useLocale()

  const { user, updateEmail } = useUser()

  // TODO : replace this with a proper check by calling the backend
  const isVerified = getIsUserVerified()

  const {
    data: newsletterSubscriptions,
    isFetching: isFetchingNewsletterSubscriptions,
  } = useGetNewsletterSubscriptions(user?.userId ?? '')

  const {
    mutateAsync: updateUserSettings,
    isPending,
    isSuccess,
    isError,
  } = useUpdateUserSettings()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    getValues,
  } = useReactHookForm<Inputs>({
    defaultValues: { name: user?.name, email: user?.email },
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!newsletterSubscriptions) return

    setValue(
      SEASONAL_NEWSLETTER_LABEL,
      newsletterSubscriptions.includes(LIST_MAIN_NEWSLETTER)
    )
    setValue(
      TRANSPORTS_NEWSLETTER_LABEL,
      newsletterSubscriptions.includes(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER)
    )

    setValue(
      LOGEMENT_NEWSLETTER_LABEL,
      newsletterSubscriptions.includes(LIST_NOS_GESTES_LOGEMENT_NEWSLETTER)
    )
  }, [newsletterSubscriptions, setValue])

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email)
    }
    if (user?.name) {
      setValue('name', user.name)
    }
  }, [user?.email, user?.name, setValue])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsNewsletterError(false)

    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    if (!data.email) {
      return
    }

    if (!isEmailValid(data.email)) {
      setError('email', {
        message: t('Veuillez entrer une adresse email valide'),
      })
      return
    }

    const listIds = {
      [LIST_MAIN_NEWSLETTER]: data[SEASONAL_NEWSLETTER_LABEL],
      [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: data[TRANSPORTS_NEWSLETTER_LABEL],
      [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: data[LOGEMENT_NEWSLETTER_LABEL],
    }

    const newslettersArray = formatListIdsFromObject(listIds)
    // If the user is not subscribed to any newsletter and has not selected any newsletter, we don't do anything
    if (!newsletterSubscriptions?.length && !newslettersArray?.length) {
      setIsNewsletterError(true)
      return
    }

    // If the user submits without having modified the newsletter selection, we don't do anything
    if (
      newsletterSubscriptions?.length === newslettersArray?.length &&
      newsletterSubscriptions.every((id) => newslettersArray.includes(id))
    ) {
      return
    }

    trackEvent(subscribeToNewsletterBlog)

    const formattedEmail = formatEmail(data.email)

    updateEmail(formattedEmail)
    try {
      // We save the simulation (and signify the backend to send the email)
      await updateUserSettings({
        newsletterIds: newslettersArray,
        userId: user?.userId,
        email: formattedEmail,
        name: data.name,
      })
    } catch {
      // Message is already displayed
    }
  }

  const isFrench = locale === i18nConfig.defaultLocale

  if (!isFrench) return null

  return (
    <section
      className="rainbow-border w-full rounded-xl bg-white p-8 md:w-4/6"
      aria-labelledby="newsletter-title"
      aria-describedby="newsletter-description">
      {isFetchingNewsletterSubscriptions && <BlockSkeleton />}

      {!isFetchingNewsletterSubscriptions ? (
        isSuccess || newsletterSubscriptions?.length ? (
          <SuccessMessage />
        ) : (
          <>
            <h2
              id="newsletter-title"
              className="mb-2 text-lg font-semibold text-gray-900">
              <Trans>
                Vous souhaitez recevoir nos derniers articles directement ?
              </Trans>
            </h2>

            <p
              id="newsletter-description"
              className="mb-6 flex items-center text-sm text-gray-600">
              <CheckIcon
                className="mr-2 h-4 w-4 stroke-green-500"
                aria-hidden="true"
              />

              <span>
                {mainNewsletter?.totalSubscribers.toLocaleString(locale) ?? 0}{' '}
                <Trans>personnes inscrites</Trans>
              </span>
            </p>

            <form
              id="newsletter-form"
              className="flex h-full flex-col items-start"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              data-testid="newsletter-form"
              aria-labelledby="newsletter-title"
              aria-describedby="newsletter-description">
              <div className="mb-4 flex w-full flex-col gap-2">
                <fieldset
                  className="flex flex-col gap-2"
                  aria-describedby={
                    isNewsletterError ? 'newsletter-error' : 'newsletter-help'
                  }
                  aria-invalid={isNewsletterError ? 'true' : 'false'}>
                  <legend className="sr-only">
                    <Trans>
                      Sélectionnez les infolettres auxquelles vous souhaitez
                      vous inscrire
                    </Trans>
                  </legend>

                  <CheckboxInput
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
                    disabled={
                      !isVerified && !!getValues(SEASONAL_NEWSLETTER_LABEL)
                    }
                    {...register(SEASONAL_NEWSLETTER_LABEL)}
                    error={errors[SEASONAL_NEWSLETTER_LABEL]?.message}
                    data-testid="newsletter-saisonniere-checkbox"
                    aria-describedby={
                      !isVerified && !!getValues(SEASONAL_NEWSLETTER_LABEL)
                        ? 'verification-required'
                        : undefined
                    }
                  />

                  <CheckboxInput
                    label={
                      <p className="mb-0 text-sm">
                        <span>Nos Gestes Transports</span> -{' '}
                        <span className="text-gray-700">
                          <Trans>4 infolettres l'impact des transports</Trans>
                        </span>
                      </p>
                    }
                    disabled={
                      !isVerified && !!getValues(TRANSPORTS_NEWSLETTER_LABEL)
                    }
                    {...register(TRANSPORTS_NEWSLETTER_LABEL)}
                    error={errors[TRANSPORTS_NEWSLETTER_LABEL]?.message}
                    data-testid="newsletter-transports-checkbox"
                    aria-describedby={
                      !isVerified && !!getValues(TRANSPORTS_NEWSLETTER_LABEL)
                        ? 'verification-required'
                        : undefined
                    }
                  />

                  <CheckboxInput
                    label={
                      <p className="mb-0 text-sm">
                        <span>Nos Gestes Logement</span> -{' '}
                        <span className="text-gray-700">
                          <Trans>3 infolettres sur l'impact du logement</Trans>
                        </span>
                      </p>
                    }
                    disabled={
                      !isVerified && !!getValues(LOGEMENT_NEWSLETTER_LABEL)
                    }
                    {...register(LOGEMENT_NEWSLETTER_LABEL)}
                    error={errors[LOGEMENT_NEWSLETTER_LABEL]?.message}
                    data-testid="newsletter-logement-checkbox"
                    aria-describedby={
                      !isVerified && !!getValues(LOGEMENT_NEWSLETTER_LABEL)
                        ? 'verification-required'
                        : undefined
                    }
                  />

                  {isNewsletterError && (
                    <p
                      id="newsletter-error"
                      data-testid="newsletter-error"
                      className="mt-4 mb-0 rounded border border-red-200 bg-red-50 p-2 text-sm font-medium text-red-700"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true">
                      <Trans>
                        Veuillez sélectionner au moins une infolettre.
                      </Trans>
                    </p>
                  )}

                  <p id="newsletter-help" className="sr-only">
                    <Trans>
                      Cochez les cases correspondant aux infolettres auxquelles
                      vous souhaitez vous inscrire.
                    </Trans>
                  </p>
                </fieldset>

                <div className="mt-10 flex w-full flex-col gap-8 md:flex-row">
                  <div className="w-full">
                    <EmailInput
                      value={user?.email || ''}
                      {...register('email', {
                        required: t('Veuillez renseigner un email.'),
                      })}
                      title={t(
                        'common.inputs.email.label',
                        'Entrez votre adresse e-mail'
                      )}
                      aria-label={t('Entrez votre adresse email')}
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={
                        errors.email ? 'email-error' : 'email-help'
                      }
                      error={errors.email?.message}
                      data-cypress-id="fin-email-input"
                      data-testid="newsletter-email-input"
                      className="h-full"
                    />

                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-2 text-sm text-red-700"
                        role="alert"
                        aria-live="polite">
                        {errors.email.message}
                      </p>
                    )}

                    <p id="email-help" className="sr-only">
                      <Trans>
                        Entrez votre adresse email pour recevoir les infolettres
                        sélectionnées.
                      </Trans>
                    </p>

                    {isError && (
                      <DefaultSubmitErrorMessage className="mt-2 text-sm" />
                    )}
                  </div>

                  <Button
                    size="lg"
                    className="self-start"
                    type="submit"
                    disabled={isPending}
                    aria-describedby={isPending ? 'submit-loading' : undefined}
                    data-testid="newsletter-submit-button">
                    {isPending ? (
                      <>
                        <span aria-hidden="true">
                          <Trans>S'inscrire</Trans>
                        </span>
                        <span id="submit-loading" className="sr-only">
                          <Trans>Inscription en cours...</Trans>
                        </span>
                      </>
                    ) : (
                      <Trans>S'inscrire</Trans>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </>
        )
      ) : null}
    </section>
  )
}
