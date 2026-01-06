'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
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
import {
  captureClickUpdateUserNewsletters,
  clickUpdateUserNewsletters,
} from '@/constants/tracking/user-account'
import Button from '@/design-system/buttons/Button'
import CheckboxInput from '@/design-system/inputs/CheckboxInput'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { formatListIdsFromObject } from '@/helpers/brevo/formatListIdsFromObject'
import type { UserServer } from '@/helpers/server/model/user'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { captureException } from '@sentry/nextjs'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'

interface Inputs {
  [SEASONAL_NEWSLETTER_LABEL]: boolean
  [TRANSPORTS_NEWSLETTER_LABEL]: boolean
  [LOGEMENT_NEWSLETTER_LABEL]: boolean
}

interface Props {
  className?: string
  user?: UserServer
}

export default function UserNewslettersForm({ className, user }: Props) {
  const locale = useLocale()
  const isFrench = locale === i18nConfig.defaultLocale

  const isAuthenticated = !!user

  const { register, handleSubmit, setValue, getValues } =
    useReactHookForm<Inputs>()

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.id ?? ''
  )

  useEffect(() => {
    if (!newsletterSubscriptions) return
    setValue(
      SEASONAL_NEWSLETTER_LABEL,
      newsletterSubscriptions?.includes(LIST_MAIN_NEWSLETTER) ?? false
    )
    setValue(
      'newsletter-transports',
      newsletterSubscriptions?.includes(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER) ??
        false
    )
    setValue(
      'newsletter-logement',
      newsletterSubscriptions?.includes(LIST_NOS_GESTES_LOGEMENT_NEWSLETTER) ??
        false
    )
  }, [newsletterSubscriptions, setValue])

  const {
    mutateAsync: updateUserSettings,
    isPending,
    isError,
    isSuccess,
  } = useUpdateUserSettings()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newsletterIds = {
      [LIST_MAIN_NEWSLETTER]: data['newsletter-saisonniere'],
      [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]: data['newsletter-transports'],
      [LIST_NOS_GESTES_LOGEMENT_NEWSLETTER]: data['newsletter-logement'],
    }

    trackEvent(clickUpdateUserNewsletters)
    trackPosthogEvent(captureClickUpdateUserNewsletters)

    try {
      const newslettersArray = formatListIdsFromObject(newsletterIds)

      await updateUserSettings({
        newsletterIds: newslettersArray,
        userId: user!.id,
      })
    } catch (error) {
      captureException(error)
    }
  }

  return (
    <div className={className}>
      {isFrench && (
        <>
          <h2 className="mt-8">
            <Trans i18nKey="settings.newsletters.title">
              Inscription à nos contenus
            </Trans>
          </h2>

          {isAuthenticated ? (
            <p data-testid="verified-message" className="text-sm text-gray-600">
              <Trans>Vous pouvez vous désincrire à tout moment</Trans>
            </p>
          ) : (
            <p
              data-testid="unverified-message"
              className="text-sm text-gray-600">
              <Emoji>⚠️</Emoji>{' '}
              <Trans>
                Pour vous désinscrire, passez par le lien en bas de l'e-mail
                reçu
              </Trans>
            </p>
          )}
        </>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-4">
        <CheckboxInput
          data-testid="newsletter-saisonniere-checkbox"
          disableSubmitOnEnter
          label={
            <span>
              <Emoji>☀️</Emoji>{' '}
              <Trans>
                <strong>Infolettre saisonnière de Nos Gestes Climat</strong> :
                actualités climat, initiatives positives et nouveautés
              </Trans>
            </span>
          }
          disabled={!isAuthenticated && !!getValues(SEASONAL_NEWSLETTER_LABEL)}
          {...register(SEASONAL_NEWSLETTER_LABEL)}
        />

        <CheckboxInput
          data-testid="newsletter-transports-checkbox"
          disableSubmitOnEnter
          label={
            <span>
              <Emoji>🚗</Emoji>{' '}
              <Trans>
                <strong>Nos Gestes Transports</strong> : tout savoir ou presque
                sur l'impact carbone des transports, en 4 e-mails
              </Trans>
            </span>
          }
          disabled={
            !isAuthenticated && !!getValues(TRANSPORTS_NEWSLETTER_LABEL)
          }
          {...register(TRANSPORTS_NEWSLETTER_LABEL)}
        />

        <CheckboxInput
          data-testid="newsletter-logement-checkbox"
          disableSubmitOnEnter
          label={
            <span>
              <Emoji>🏡</Emoji>{' '}
              <Trans>
                <strong>Nos Gestes Logement</strong> : informez-vous sur
                l'impact carbone du logement, en quelques e-mails
              </Trans>
            </span>
          }
          disabled={!isAuthenticated && !!getValues(LOGEMENT_NEWSLETTER_LABEL)}
          {...register(LOGEMENT_NEWSLETTER_LABEL)}
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
            <span data-testid="default-submit-label">
              <Trans>Mettre à jour mes abonnements</Trans>
            </span>
          </Button>
        </div>
      </form>
    </div>
  )
}
