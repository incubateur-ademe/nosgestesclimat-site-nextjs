'use client'

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
import Button from '@/design-system/buttons/Button'
import CheckboxInput from '@/design-system/inputs/CheckboxInput'
import TextInput from '@/design-system/inputs/TextInput'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { formatListIdsFromObject } from '@/helpers/brevo/formatListIdsFromObject'
import { getIsUserVerified } from '@/helpers/user/getIsVerified'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import DefaultSubmitErrorMessage from '../error/DefaultSubmitErrorMessage'

type Inputs = {
  name: string
  email?: string
  [SEASONAL_NEWSLETTER_LABEL]: boolean
  [TRANSPORTS_NEWSLETTER_LABEL]: boolean
  [LOGEMENT_NEWSLETTER_LABEL]: boolean
}

type Props = {
  title: string | ReactNode
  inputsDisplayed?: Array<
    | 'name'
    | 'email'
    | 'newsletter-saisonniere'
    | 'newsletter-transports'
    | 'newsletter-logement'
  >
  submitLabel?: string | ReactNode
  onCompleted?: (props: Record<string, unknown>) => void
  className?: string
  shouldForceEmailEditable?: boolean
  defaultValues?: { 'newsletter-transports': boolean }
}

export default function UserInformationForm({
  title,
  inputsDisplayed = [
    'name',
    'email',
    SEASONAL_NEWSLETTER_LABEL,
    TRANSPORTS_NEWSLETTER_LABEL,
    LOGEMENT_NEWSLETTER_LABEL,
  ],
  submitLabel,
  onCompleted = () => {},
  className,
  shouldForceEmailEditable = false,
  defaultValues,
}: Props) {
  const { t } = useClientTranslation()

  const locale = useLocale()

  const { user, updateEmail, updateName } = useUser()

  // TODO : replace this with a proper check by calling the backend
  const isVerified = getIsUserVerified()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useReactHookForm<Inputs>({ defaultValues: { name: user?.name } })

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.userId ?? ''
  )

  useEffect(() => {
    if (!newsletterSubscriptions && !defaultValues) return

    setValue(
      SEASONAL_NEWSLETTER_LABEL,
      newsletterSubscriptions?.includes(LIST_MAIN_NEWSLETTER) ?? false
    )
    setValue(
      'newsletter-transports',
      (newsletterSubscriptions?.includes(
        LIST_NOS_GESTES_TRANSPORT_NEWSLETTER
      ) ||
        defaultValues?.['newsletter-transports']) ??
        false
    )
    setValue(
      'newsletter-logement',
      newsletterSubscriptions?.includes(LIST_NOS_GESTES_LOGEMENT_NEWSLETTER) ??
        false
    )
  }, [newsletterSubscriptions, setValue, defaultValues])

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

    try {
      const newslettersArray = formatListIdsFromObject(newsletterIds)

      await updateUserSettings({
        name: data.name,
        email: user.email ?? data.email ?? '',
        newsletterIds: newslettersArray,
        userId: user?.userId,
      })

      if (data.email && (!user?.email || shouldForceEmailEditable)) {
        updateEmail(data.email)
      }

      if (data.name) {
        updateName(data.name)
      }

      onCompleted(data)
    } catch (error) {
      captureException(error)
    }
  }

  const isFrench = locale === i18nConfig.defaultLocale

  return (
    <div className={twMerge('flex flex-1 flex-col items-start', className)}>
      {title}

      <form
        data-testid="user-information-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-4">
        {inputsDisplayed.includes('name') && (
          <TextInput
            data-testid="name-input"
            autoComplete="name"
            value={user?.name}
            helperText={t('Ce champ est requis.')}
            placeholder={t('Votre nom')}
            label={t('Votre nom')}
            {...register('name', {
              required: user?.name ? t('Ce champ est requis.') : false,
            })}
            error={errors.name?.message}
          />
        )}

        {inputsDisplayed.includes('email') && (
          <>
            {
              // On affiche le champ email en lecture seule si l'utilisateur a un email de défini
              // sinon on lui permet d'en définir un
              user?.email && !shouldForceEmailEditable ? (
                <TextInput
                  data-testid="email-input-readonly"
                  name="email"
                  helperText={<Trans>Ce champ n'est pas modifiable</Trans>}
                  label={t('Votre adresse electronique')}
                  value={user?.email}
                  readOnly
                />
              ) : (
                <TextInput
                  data-testid="email-input-editable"
                  label={t('Votre adresse electronique')}
                  className="w-full"
                  value={user?.email ?? ''}
                  autoComplete="email"
                  {...register('email')}
                />
              )
            }
          </>
        )}

        {isFrench && (
          <>
            <h3 className="mt-6 mb-0">
              <Trans>Inscription à nos e-mails</Trans>
            </h3>

            {isVerified ? (
              <p
                data-testid="verified-message"
                className="text-sm text-gray-600">
                <Trans>Vous pouvez vous désincrire à tout moment</Trans>
              </p>
            ) : (
              <p
                data-testid="unverified-message"
                className="text-sm text-gray-600">
                <Emoji>⚠️</Emoji>{' '}
                <Trans>
                  Pour vous désinscrire, passez par le lien en bas de l'email
                  reçu
                </Trans>
              </p>
            )}
            {inputsDisplayed.includes('newsletter-saisonniere') && (
              <CheckboxInput
                data-testid="newsletter-saisonniere-checkbox"
                disableSubmitOnEnter
                label={
                  <span>
                    <Emoji>☀️</Emoji>{' '}
                    <Trans>
                      <strong>
                        Infolettre saisonnière de Nos Gestes Climat
                      </strong>{' '}
                      : actualités climat, initiatives positives et nouveautés
                    </Trans>
                  </span>
                }
                disabled={!isVerified && !!getValues(SEASONAL_NEWSLETTER_LABEL)}
                {...register(SEASONAL_NEWSLETTER_LABEL)}
              />
            )}
            {inputsDisplayed.includes('newsletter-transports') && (
              <CheckboxInput
                data-testid="newsletter-transports-checkbox"
                disableSubmitOnEnter
                label={
                  <span>
                    <Emoji>🚗</Emoji>{' '}
                    <Trans>
                      <strong>Nos Gestes Transports</strong> : tout savoir ou
                      presque sur l'impact carbone des transports, en 4 e-mails
                    </Trans>
                  </span>
                }
                disabled={
                  !isVerified && !!getValues(TRANSPORTS_NEWSLETTER_LABEL)
                }
                {...register(TRANSPORTS_NEWSLETTER_LABEL)}
              />
            )}
            {inputsDisplayed.includes('newsletter-logement') && (
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
                disabled={!isVerified && !!getValues(LOGEMENT_NEWSLETTER_LABEL)}
                {...register(LOGEMENT_NEWSLETTER_LABEL)}
              />
            )}
          </>
        )}
        {isSuccess && (
          <p
            data-testid="success-message"
            role="alert"
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

            {submitLabel ? (
              <span data-testid="custom-submit-label">{submitLabel}</span>
            ) : (
              <span data-testid="default-submit-label">
                <Trans>Mettre à jour mes informations</Trans>
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
