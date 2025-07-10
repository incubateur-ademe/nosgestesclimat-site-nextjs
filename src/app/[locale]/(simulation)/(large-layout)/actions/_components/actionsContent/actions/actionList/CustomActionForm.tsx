'use client'

import Trans from '@/components/translation/trans/TransClient'
import UserInformationForm from '@/components/user/UserInformationForm'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'

type Props = {
  dottedName: string
  setActionWithFormOpen: (focusedAction: string) => void
}

export default function CustomActionForm({
  dottedName,
  setActionWithFormOpen,
}: Props) {
  const { t } = useClientTranslation()

  const { toggleActionChoice, user } = useUser()
  const { actionChoices } = useCurrentSimulation()

  const { refetch: refreshNewsletterSubcriptions } =
    useGetNewsletterSubscriptions(user?.userId ?? '')

  if (dottedName === 'transport . infolettre')
    return (
      <div className="mt-4">
        <UserInformationForm
          title={
            <h3>
              <Trans>S’abonner à la newsletter Nos Gestes Transport</Trans>
            </h3>
          }
          inputsDisplayed={['email', 'newsletter-transports']}
          className="w-full rounded-xl bg-gray-100 p-8"
          submitLabel={t('Enregistrer')}
          onCompleted={(data: Record<string, unknown>) => {
            if (
              data['newsletter-transports'] !== undefined &&
              data['newsletter-transports'] !== actionChoices?.[dottedName]
            ) {
              toggleActionChoice(dottedName)
              refreshNewsletterSubcriptions()
              setActionWithFormOpen('')
            }
          }}
          shouldForceEmailEditable={true}
          defaultValues={{
            'newsletter-transports': true,
          }}
        />
      </div>
    )
}
