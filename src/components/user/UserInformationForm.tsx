'use client'

import Trans from '@/components/translation/trans/TransClient'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import Button from '@/design-system/buttons/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { formatListIdsFromObject } from '@/helpers/brevo/formatListIdsFromObject'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUnsubscribeFromNewsletters } from '@/hooks/settings/useUnsubscribeFromNewsletters'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import DefaultSubmitErrorMessage from '../error/DefaultSubmitErrorMessage'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
  'newsletter-logement': boolean
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
    'newsletter-saisonniere',
    'newsletter-transports',
    'newsletter-logement',
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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useReactHookForm<Inputs>({ defaultValues: { name: user?.name } })

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.userId ?? ''
  )

  useEffect(() => {
    if (!newsletterSubscriptions && !defaultValues) return

    setValue(
      'newsletter-saisonniere',
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

  const {
    mutateAsync: unsubscribeFromNewsletters,
    isPending: isPendingUnsubscribe,
    isError: isErrorUnsubscribe,
  } = useUnsubscribeFromNewsletters({
    email: user.email ?? '',
    userId: user.userId,
  })

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

      if (newslettersArray && newslettersArray.length === 0) {
        await unsubscribeFromNewsletters({
          name: data.name,
          email: user.email ?? '',
          newsletterIds,
        })
      }

      if (data.email && (!user?.email || shouldForceEmailEditable)) {
        updateEmail(data.email)
      }

      if (data.name) {
        updateName(data.name)
      }

      timeoutRef.current = setTimeout(() => {
        onCompleted(data)
      }, 2500)
    } catch (error) {
      captureException(error)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const isFrench = locale === i18nConfig.defaultLocale

  return (
    <div className={twMerge('flex flex-1 flex-col items-start', className)}>
      {title}

      <form
        data-testid="user-information-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-4">
        {inputsDisplayed.includes('name') && (
          <TextInputGroup
            data-testid="name-input"
            value={user?.name}
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
                <TextInputGroup
                  data-testid="email-input-readonly"
                  name="email"
                  helperText={<Trans>Ce champ n'est pas modifiable</Trans>}
                  label={t('Votre adresse electronique')}
                  value={user?.email}
                  readOnly
                />
              ) : (
                <TextInputGroup
                  data-testid="email-input-editable"
                  label={t('Votre adresse electronique')}
                  className="w-full"
                  value={user?.email ?? ''}
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

            <p className="text-sm text-gray-600">
              <Trans>Vous pouvez vous désincrire à tout moment</Trans>
            </p>
            {inputsDisplayed.includes('newsletter-saisonniere') && (
              <CheckboxInputGroup
                data-testid="newsletter-saisonniere-checkbox"
                size="lg"
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
                {...register('newsletter-saisonniere')}
              />
            )}
            {inputsDisplayed.includes('newsletter-transports') && (
              <CheckboxInputGroup
                data-testid="newsletter-transports-checkbox"
                size="lg"
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
                {...register('newsletter-transports')}
              />
            )}
            {inputsDisplayed.includes('newsletter-logement') && (
              <CheckboxInputGroup
                data-testid="newsletter-logement-checkbox"
                size="lg"
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
                {...register('newsletter-logement')}
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

        {(isError || isErrorUnsubscribe) && (
          <div data-testid="error-message">
            <DefaultSubmitErrorMessage />
          </div>
        )}

        <div>
          <Button
            data-testid="submit-button"
            type="submit"
            className="mt-6 gap-2 self-start"
            disabled={isPending || isPendingUnsubscribe}>
            {(isPending || isPendingUnsubscribe) && (
              <Loader size="sm" color="light" />
            )}

            {submitLabel ?? <Trans>Mettre à jour mes informations</Trans>}
          </Button>
        </div>
      </form>
    </div>
  )
}
