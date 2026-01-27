'use client'

import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import Emoji from '@/design-system/utils/Emoji'
import {
  getNewsletterSubscriptions,
  type NewsletterFormState,
  updateUnauthenticatedUserNewsletters,
} from '@/helpers/server/model/newsletters'
import { useUser } from '@/publicodes-state'
import Form from 'next/form'
import { use, useActionState } from 'react'
import Trans from '../translation/trans/TransClient'
import NewsletterCheckBoxes from './NewsletterCheckboxes'

export default function NewsletterSettingsUnauthenticated() {
  const { user } = useUser()

  const newsletterSubscriptions = use(getNewsletterSubscriptions(user.userId))

  const [state, formAction] = useActionState<
    NewsletterFormState,
    FormData | null
  >(
    async (_prevState, formData) => {
      if (!formData) return _prevState
      return await updateUnauthenticatedUserNewsletters(formData, user.userId)
    },
    {
      email: user.email ?? '',
      newsletterIds: newsletterSubscriptions,
    }
  )

  return (
    <div className="w-xl max-w-full">
      <Form
        action={formAction}
        className="mb-8 flex flex-col items-start gap-4">
        <NewsletterCheckBoxes />

        <EmailInput
          error={
            state && 'errors' in state
              ? state.errors?.email?.message
              : undefined
          }
        />

        <Button type="submit" className="mt-8">
          <span data-testid="default-submit-label">
            <Trans i18nKey="newsletterManagement.saveSubscriptions">
              Valider mon inscription
            </Trans>
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
                <Trans i18nKey="newsletterManagement.success.unauthenticated.title">
                  Un e-mail vient de vous être envoyé
                </Trans>
              </p>
              <p className="mb-0">
                <Trans i18nKey="newsletterManagement.success.unauthenticated.description">
                  Consultez votre boîte de réception et confirmez votre adresse
                  pour recevoir nos e-mails.
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
        data-testid="unverified-message"
        className="mt-4 mb-0 text-sm text-gray-600">
        <Emoji>⚠️</Emoji>{' '}
        <Trans i18nKey="newsletterManagement.message.unauthenticated">
          Pour vous désinscrire, passez par le lien en bas de l'e-mail reçu
        </Trans>
      </p>
    </div>
  )
}
