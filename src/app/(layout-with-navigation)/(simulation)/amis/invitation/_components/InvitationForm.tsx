'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { isEmailValid } from '@/utils/isEmailValid'
import { FormEvent, useState } from 'react'

export default function InvitationForm({ group }: { group: Group }) {
  const { t } = useClientTranslation()

  const { user, updateName, updateEmail } = useUser()

  const currentSimulation = useCurrentSimulation()
  const hasCompletedTest = currentSimulation.progression === 1

  const { goToSimulateurPage } = useSimulateurPage()
  const { goToEndPage } = useEndPage()

  const [guestName, setGuestName] = useState(user.name || '')
  const [errorGuestName, setErrorGuestName] = useState('')

  const [guestEmail, setGuestEmail] = useState(user.email || '')
  const [errorGuestEmail, setErrorGuestEmail] = useState('')

  const handleSubmit = async (event: MouseEvent | FormEvent) => {
    // Avoid reloading page
    if (event) {
      event.preventDefault()
    }

    // Shouldn't happen but in any case, avoid group joining
    if (!group) {
      return
    }

    // Inputs validation
    if (!guestName) {
      setErrorGuestName(t('Veuillez renseigner un prénom ou un pseudonyme.'))
      return
    }
    if (!isEmailValid(guestEmail)) {
      setErrorGuestEmail(t('Veuillez renseigner un email valide.'))
      return
    }

    // Update user info
    updateName(guestName)
    updateEmail(guestEmail)

    // Update current simulation with group id (to redirect after test completion)
    await currentSimulation.update({
      groupToAdd: group._id,
    })

    // Redirect to simulateur page or end page
    if (hasCompletedTest) {
      goToEndPage({ allowedToGoToGroupDashboard: true })
    } else {
      goToSimulateurPage()
    }
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <PrenomInput
        prenom={guestName}
        setPrenom={setGuestName}
        errorPrenom={errorGuestName}
        setErrorPrenom={setErrorGuestName}
        data-cypress-id="member-name"
      />

      <div className="my-4">
        <EmailInput
          email={guestEmail}
          setEmail={setGuestEmail}
          error={errorGuestEmail}
          setError={setErrorGuestEmail}
          label={
            <span>
              {t('Votre adresse email')}{' '}
              <span className="text-secondary-700 italic">
                {' '}
                {t('facultatif')}
              </span>
            </span>
          }
          helperText={t(
            'Seulement pour vous permettre de retrouver votre groupe ou de supprimer vos données'
          )}
        />
      </div>

      {!hasCompletedTest && (
        <p className="mb-2 text-xs">
          Vous devrez compléter votre test après avoir rejoint le groupe.
        </p>
      )}

      <Button
        type="submit"
        onClick={handleSubmit}
        aria-disabled={!user.name}
        data-cypress-id="button-join-group">
        {hasCompletedTest ? (
          <Trans>Rejoindre</Trans>
        ) : (
          <Trans>Rejoindre et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
