'use client'

import {
  captureClickUpdateUserNewsletters,
  clickUpdateUserNewsletters,
} from '@/constants/tracking/user-account'
import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import Emoji from '@/design-system/utils/Emoji'
import type { UserServer } from '@/helpers/server/model/user'
import { fetchUser } from '@/helpers/user/fetchUser'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { isEmailValid } from '@/utils/isEmailValid'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm as useReactHookForm, useWatch } from 'react-hook-form'
import Trans from '../translation/trans/TransClient'
import { NEWSLETTERS } from './_constants/newsletters'
import NewsletterCheckbox from './newsletterManagement/NewsletterCheckbox'

const getSelectedNewsletterIds = (
  newsletterIds: Record<string, boolean>
): number[] => {
  return Object.entries(newsletterIds ?? {})
    .filter(([, isSelected]) => isSelected)
    .map(([id]) => Number(id))
}

interface Props {
  hasEmailField?: boolean
}

export default function NewsletterManagement({ hasEmailField = true }: Props) {
  const { user } = useUser()

  const { data: authenticatedUser } = useQuery<UserServer | null>({
    queryKey: ['user', 'me'],
    queryFn: () => fetchUser(),
  })

  const { t } = useClientTranslation()

  const { data: newslettersSubscriptions } = useGetNewsletterSubscriptions(
    authenticatedUser?.id ?? ''
  )

  const {
    mutateAsync: updateUserSettings,
    isSuccess,
    isError,
  } = useUpdateUserSettings()

  const {
    register,
    control,
    handleSubmit: handleSubmitNewsletterForm,
    reset: resetNewsletterForm,
  } = useReactHookForm<{
    newsletterIds: Record<string, boolean>
  }>({
    defaultValues: {
      newsletterIds: {},
    },
  })

  useEffect(() => {
    if (newslettersSubscriptions) {
      resetNewsletterForm({
        newsletterIds: newslettersSubscriptions.reduce(
          (acc, newsletter) => {
            acc[String(newsletter)] = true
            return acc
          },
          {} as Record<string, boolean>
        ),
      })
    }
  }, [newslettersSubscriptions, resetNewsletterForm])

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
    reset: resetEmailForm,
  } = useReactHookForm<{
    email: string
  }>({
    defaultValues: { email: user?.email ?? '' },
  })

  useEffect(() => {
    if (authenticatedUser?.email) {
      resetEmailForm({ email: authenticatedUser.email })
    }
  }, [authenticatedUser?.email, resetEmailForm])

  const newsletterIdsFromWatcher = useWatch({ control, name: 'newsletterIds' })

  const onSubmitSubscriptions = async (data?: {
    email?: string
    newsletterIds?: Record<string, boolean>
  }) => {
    const email = data?.email ?? user?.email
    const newsletterIds = data?.newsletterIds ?? newsletterIdsFromWatcher

    if (!email) return

    trackEvent(clickUpdateUserNewsletters)
    trackPosthogEvent(captureClickUpdateUserNewsletters)

    const selectedIds = getSelectedNewsletterIds(newsletterIds) ?? []

    await updateUserSettings({
      email,
      newsletterIds: selectedIds,
      userId: authenticatedUser?.id ?? user?.userId ?? '',
    })
  }

  return (
    <div className="w-xl max-w-full">
      <form
        onSubmit={
          !!authenticatedUser
            ? handleSubmitNewsletterForm(onSubmitSubscriptions)
            : (e) => e.preventDefault()
        }
        className="mb-8 flex flex-col items-start gap-4">
        {NEWSLETTERS.map((newsletter) => (
          <NewsletterCheckbox
            {...register(`newsletterIds.${newsletter.id}`)}
            key={newsletter.id}
            newsletter={newsletter}
            data-testid={newsletter['data-testid']}
          />
        ))}
        {!hasEmailField && (
          <Button type="submit" className="mt-8">
            <span data-testid="default-submit-label">
              <Trans>Mettre à jour mes abonnements</Trans>
            </span>
          </Button>
        )}
      </form>

      {hasEmailField && (
        <form
          noValidate
          onSubmit={(e) => void handleSubmitEmail(onSubmitSubscriptions)(e)}>
          <EmailInput
            error={emailErrors.email?.message}
            {...registerEmail('email', {
              required: t(
                'ui.emailInput.errors.required',
                'Veuillez renseigner votre adresse e-mail'
              ),
              validate: (value) =>
                isEmailValid(value) ||
                t(
                  'ui.emailInput.errors.invalid',
                  'Veuillez entrer une adresse email valide (format attendu : nom.prenom@domaine.fr)'
                ),
            })}
          />
          <Button type="submit" className="mt-8">
            <span data-testid="default-submit-label">
              <Trans i18nKey="newsletterManagement.saveSubscriptions">
                Valider mon inscription
              </Trans>
            </span>
          </Button>
        </form>
      )}

      {isSuccess && (
        <Alert
          aria-live="polite"
          className="mt-6"
          description={
            !!authenticatedUser ? (
              <div>
                <p className="font-bold">
                  <Trans i18nKey="newsletterManagement.success.authenticated.title">
                    Confirmation de votre choix
                  </Trans>
                </p>
                <p className="mb-0">
                  <Trans i18nKey="newsletterManagement.success.authenticated.description">
                    Nous avons bien pris en compte votre demande.
                  </Trans>
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold">
                  <Trans i18nKey="newsletterManagement.success.unauthenticated.title">
                    Un e-mail vient de vous être envoyé
                  </Trans>
                </p>
                <p className="mb-0">
                  <Trans i18nKey="newsletterManagement.success.unauthenticated.description">
                    Consultez votre boîte de réception et confirmez votre
                    adresse pour recevoir nos e-mails.
                  </Trans>
                </p>
              </div>
            )
          }
        />
      )}

      {isError && (
        <Alert
          aria-live="polite"
          className="mt-6"
          description={
            <Trans i18nKey="newsletterManagement.error.title">
              Une erreur est survenue lors de la mise à jour des informations.
            </Trans>
          }
        />
      )}

      {!!authenticatedUser ? (
        <p
          data-testid="verified-message"
          className="mt-4 mb-0 text-sm text-gray-600">
          <Trans i18nKey="newsletterManagement.message.authenticated">
            Vous pouvez vous désinscrire à tout moment en un clic !
          </Trans>
        </p>
      ) : (
        <p
          data-testid="unverified-message"
          className="mt-4 mb-0 text-sm text-gray-600">
          <Emoji>⚠️</Emoji>{' '}
          <Trans i18nKey="newsletterManagement.message.unauthenticated">
            Pour vous désinscrire, passez par le lien en bas de l'e-mail reçu
          </Trans>
        </p>
      )}
    </div>
  )
}
