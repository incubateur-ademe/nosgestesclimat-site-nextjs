'use client'

import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_ALIMENTATION_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import {
  captureClickUpdateUserNewsletters,
  clickUpdateUserNewsletters,
} from '@/constants/tracking/user-account'
import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import Emoji from '@/design-system/utils/Emoji'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useUpdateUserSettings } from '@/hooks/settings/useUpdateUserSettings'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { isEmailValid } from '@/utils/isEmailValid'
import { useEffect } from 'react'
import { useForm as useReactHookForm, useWatch } from 'react-hook-form'
import Trans from '../translation/trans/TransClient'
import NewsletterCheckbox from './newsletterManagement/NewsletterCheckbox'

const getSelectedNewsletterIds = (
  newsletterIds: Record<string, boolean>
): number[] => {
  return Object.entries(newsletterIds ?? {})
    .filter(([, isSelected]) => isSelected)
    .map(([id]) => Number(id))
}

const NEWSLETTERS = [
  {
    id: LIST_MAIN_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.mainNewsletter.title',
          'Les actualités de Nos Gestes Climat'
        )}{' '}
        <Emoji>🌱</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.mainNewsletter.description',
      "Nos dernières évolutions et nos recommandations d'actions, les articles récents, les nouvelles formations, et plus encore. Une fois par mois"
    ),
    'data-testid': 'newsletter-saisonniere-checkbox',
  },
  {
    id: LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.transportNewsletter.title',
          'Nos Gestes Transports'
        )}{' '}
        <Emoji>🚗</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.transportNewsletter.description',
      "4 infolettres (sur 4 semaines), pour comprendre l'impact de nos déplacements et agir concrètement. Pour avancer vers des trajets plus légers"
    ),
    'data-testid': 'newsletter-transports-checkbox',
  },
  {
    id: LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.logementNewsletter.title',
          'Nos Gestes Logement'
        )}{' '}
        <Emoji>🏠</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.logementNewsletter.description',
      "3 infolettres (sur 3 semaines), pour découvrir comment nos choix d'habitat influencent notre empreinte carbone. Pour un logement plus sobre et confortable."
    ),
    'data-testid': 'newsletter-logement-checkbox',
  },
  {
    id: LIST_NOS_GESTES_ALIMENTATION_NEWSLETTER,
    title: (
      <>
        {t(
          'newsletterManagement.alimentationNewsletter.title',
          'Nos Gestes Alimentation'
        )}{' '}
        <Emoji>🍎</Emoji>
      </>
    ),
    description: t(
      'newsletterManagement.alimentationNewsletter.description',
      "4 infolettres (sur 4 semaines), pour découvrir l'empreinte de notre alimentation, et comprendre comment aligner son assiette avec les enjeux planétaires."
    ),
    'data-testid': 'newsletter-alimentation-checkbox',
  },
]

interface Props {
  hasEmailField?: boolean
  isAuthenticated?: boolean
}

export default function NewsletterManagement({
  hasEmailField = true,
  isAuthenticated = false,
}: Props) {
  const { user, updateEmail } = useUser()

  const { t } = useClientTranslation()

  const { data: newslettersSubscriptions } = useGetNewsletterSubscriptions(
    user?.userId ?? ''
  )
  console.log('newslettersSubscriptions', newslettersSubscriptions)
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
    if (user?.email) {
      resetEmailForm({ email: user.email })
    }
  }, [user?.email, resetEmailForm])

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

    const selectedIds = getSelectedNewsletterIds(newsletterIds)

    await updateUserSettings({
      email,
      newsletterIds: selectedIds,
      userId: user?.userId,
    })

    if (email && !user?.email) {
      updateEmail(email)
    }
  }

  return (
    <div className="w-xl max-w-full">
      <form
        onSubmit={
          isAuthenticated
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
            label={t(
              'newsletterManagement.email.label',
              'Votre adresse e-mail'
            )}
            helperText={t(
              'newsletterManagement.email.helperText',
              'Format attendu : nom.prenom@domaine.fr'
            )}
            error={emailErrors.email?.message}
            {...registerEmail('email', {
              required: t(
                'newsletterManagement.email.required',
                t('Veuillez renseigner votre adresse e-mail')
              ),
              validate: (value) =>
                isEmailValid(value) ||
                t(
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
            isAuthenticated ? (
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

      {isAuthenticated ? (
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
