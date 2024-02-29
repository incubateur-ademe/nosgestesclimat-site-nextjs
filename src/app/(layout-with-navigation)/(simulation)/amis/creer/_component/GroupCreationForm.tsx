'use client'

import Trans from '@/components/translation/Trans'
import { GROUP_NAMES } from '@/constants/groupNames'
import { matomoEventCreationGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { validateCreationForm } from '@/helpers/groups/validateCreationForm'
import useCreateGroup from '@/hooks/groups/useCreateGroup'
import { useFetchGroupsOfUser } from '@/hooks/groups/useFetchGroupsOfUser'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { FormEvent, FormEventHandler, useState } from 'react'

export default function GroupCreationForm() {
  const {
    user,
    updateName,
    updateEmail,
    getCurrentSimulation,
    updateCurrentSimulation,
  } = useUser()

  const { name, userId, email } = user

  const [administratorName, setAdministratorName] = useState(name || '')
  const [errorAdministratorName, setErrorAdministratorName] = useState('')

  const [administratorEmail, setAdministratorEmail] = useState(email || '')
  const [errorEmail, setErrorEmail] = useState('')

  const { t } = useClientTranslation()

  const currentSimulation = getCurrentSimulation()

  const hasCompletedTest = currentSimulation?.progression === 1

  const { data: groups } = useFetchGroupsOfUser()

  const { goToSimulateurPage } = useSimulateurPage()

  const { mutateAsync: createGroup, isPending, isSuccess } = useCreateGroup()

  const handleSubmit = async (event: FormEvent) => {
    // Avoid reloading page
    if (event) {
      event.preventDefault()
    }

    const isValid = validateCreationForm({
      administratorName,
      administratorEmail,
      setErrorAdministratorName,
      setErrorEmail,
      t,
    })

    if (!isValid) return

    try {
      trackEvent(matomoEventCreationGroupe)

      const { name, emoji } =
        GROUP_NAMES[groups.length % GROUP_NAMES.length] ?? GROUP_NAMES[0]

      const group = await createGroup({
        groupInfo: {
          name,
          emoji,
          administratorEmail,
          administratorName,
          userId,
          simulation: currentSimulation,
        },
      })

      // Update user info
      updateName(administratorName)
      updateEmail(administratorEmail)

      // Update current simulation with group id (to redirect after test completion)
      updateCurrentSimulation({
        group: group._id,
      })

      // Redirect to simulateur page or end page
      goToSimulateurPage()
    } catch (e) {
      captureException(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit as FormEventHandler<HTMLFormElement>}
      autoComplete="off">
      <PrenomInput
        prenom={administratorName}
        setPrenom={setAdministratorName}
        errorPrenom={errorAdministratorName}
        setErrorPrenom={setErrorAdministratorName}
        data-cypress-id="group-input-owner-name"
      />

      <div className="my-4">
        <EmailInput
          email={administratorEmail}
          setEmail={setAdministratorEmail}
          error={errorEmail}
          setError={setErrorEmail}
          label={
            <span>
              {t('Votre adresse email')}{' '}
              <span className="text-secondary-500 italic">
                {' '}
                {t('facultatif')}
              </span>
            </span>
          }
        />
      </div>

      <Button
        type="submit"
        data-cypress-id="button-create-group"
        onClick={handleSubmit}
        aria-disabled={
          !administratorName || !administratorEmail || isPending || isSuccess
        }>
        {hasCompletedTest ? (
          <Trans>Créer le groupe</Trans>
        ) : (
          <Trans>Créer et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
