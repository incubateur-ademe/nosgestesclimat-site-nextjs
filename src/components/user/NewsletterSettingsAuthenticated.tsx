'use client'

import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import updateAuthenticatedUserNewsletters, {
  getNewsletterSubscriptions,
  type NewsletterFormState,
} from '@/helpers/server/model/newsletters'
import type { UserServer } from '@/helpers/server/model/user'
import Form from 'next/form'
import { use, useActionState } from 'react'
import Trans from '../translation/trans/TransClient'
import NewsletterCheckBoxes from './NewsletterCheckboxes'

interface Props {
  user: UserServer
}

export default function NewsletterManagement({ user }: Props) {
  const newsletterSubscriptions = use(getNewsletterSubscriptions(user.id))

  const [state, formAction] = useActionState<
    NewsletterFormState,
    FormData | null
  >(
    async (_prevState, formData) => {
      if (!formData) return _prevState
      return await updateAuthenticatedUserNewsletters(formData)
    },
    {
      newsletterIds: newsletterSubscriptions,
    }
  )

  return (
    <div className="w-xl max-w-full">
      <Form
        action={formAction}
        className="mb-8 flex flex-col items-start gap-4">
        <NewsletterCheckBoxes />

        <Button type="submit" className="mt-8">
          <span data-testid="default-submit-label">
            <Trans>Mettre à jour mes abonnements</Trans>
          </span>
        </Button>
      </Form>

      {state && 'success' in state && state.success && (
        <Alert
          aria-live="polite"
          className="mt-6"
          description={
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

      <p
        data-testid="verified-message"
        className="mt-4 mb-0 text-sm text-gray-600">
        <Trans i18nKey="newsletterManagement.message.authenticated">
          Vous pouvez vous désinscrire à tout moment en un clic !
        </Trans>
      </p>
    </div>
  )
}
