import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import Emoji from '@/design-system/utils/Emoji'
import updateAuthenticatedUserNewsletters, {
  getNewsletterSubscriptions,
  type NewsletterFormState,
  updateUnauthenticatedUserNewsletters,
} from '@/helpers/server/model/newsletters'
import type { UserServer } from '@/helpers/server/model/user'
import Form from 'next/form'
import { use, useActionState } from 'react'
import Trans from '../translation/trans/TransClient'
import { NEWSLETTERS } from './_constants/newsletters'
import NewsletterCheckbox, {
  type Newsletter,
} from './newsletterManagement/NewsletterCheckbox'

type NewsletterWithTestId = Newsletter & { 'data-testid'?: string }

interface Props {
  mode?: 'authenticated' | 'unauthenticated'
  user: UserServer
}

export default function NewsletterManagement({
  mode = 'authenticated',
  user,
}: Props) {
  const newsletterSubscriptions = use(getNewsletterSubscriptions(user.id))

  const [state, formAction] = useActionState<
    NewsletterFormState,
    FormData | null
  >(
    async (_prevState, formData) => {
      if (!formData) return _prevState
      return mode === 'authenticated'
        ? await updateAuthenticatedUserNewsletters(formData)
        : await updateUnauthenticatedUserNewsletters(formData, user.id)
    },
    {
      ...(mode === 'unauthenticated' ? { email: user.email ?? '' } : {}),
      newsletterIds: newsletterSubscriptions,
    }
  )

  return (
    <div className="w-xl max-w-full">
      <Form
        action={formAction}
        className="mb-8 flex flex-col items-start gap-4">
        {(NEWSLETTERS as NewsletterWithTestId[]).map((newsletter) => (
          <NewsletterCheckbox
            name={`newsletterIds.${newsletter.id}`}
            key={newsletter.id}
            newsletter={newsletter}
            data-testid={newsletter['data-testid']}
          />
        ))}

        {mode === 'unauthenticated' && (
          <EmailInput
            error={
              state && 'errors' in state
                ? state.errors?.email?.message
                : undefined
            }
          />
        )}

        <Button type="submit" className="mt-8">
          {mode === 'unauthenticated' ? (
            <span data-testid="default-submit-label">
              <Trans i18nKey="newsletterManagement.saveSubscriptions">
                Valider mon inscription
              </Trans>
            </span>
          ) : (
            <span data-testid="default-submit-label">
              <Trans>Mettre à jour mes abonnements</Trans>
            </span>
          )}
        </Button>
      </Form>

      {state && 'success' in state && state.success && (
        <Alert
          aria-live="polite"
          className="mt-6"
          description={
            mode === 'authenticated' ? (
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

      {state && 'errors' in state && state.errors && (
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

      {mode === 'authenticated' ? (
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
