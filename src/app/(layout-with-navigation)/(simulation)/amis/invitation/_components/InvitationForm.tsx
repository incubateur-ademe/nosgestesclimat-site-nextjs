'use client'

import Trans from '@/components/translation/Trans'
import { getMatomoEventJoinedGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { FormEvent, useEffect, useState } from 'react'

export default function InvitationForm({ group }: { group: Group }) {
  const [errorPrenom, setErrorPrenom] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const { t } = useClientTranslation()

  const {
    user,
    updateEmail,
    updateName,
    updateCurrentSimulation,
    getCurrentSimulation,
  } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { progression } = useForm()

  const hasCompletedTest = progression === 1

  const { goToSimulateurPage } = useSimulateurPage()
  const { goToEndPage } = useEndPage()

  const [shouldGoToSimulateurPage, setShouldGoToSimulateurPage] =
    useState(false)
  useEffect(() => {
    if (!shouldGoToSimulateurPage) {
      return
    }

    if (currentSimulation?.groups?.includes(group?._id || '')) {
      if (hasCompletedTest) {
        goToEndPage({ allowedToGoToGroupDashboard: true })
      } else {
        goToSimulateurPage()
      }
    }
  }, [
    goToSimulateurPage,
    goToEndPage,
    shouldGoToSimulateurPage,
    currentSimulation,
    group,
    hasCompletedTest,
  ])

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
    if (!user.name) {
      setErrorPrenom(t('Veuillez renseigner un prénom ou un pseudonyme.'))
      return
    }
    if (
      user.email &&
      !user.email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setErrorEmail(t('Veuillez renseigner un email valide.'))
      return
    }

    try {
      // Update current simulation with group id (to redirect after test completion)
      updateCurrentSimulation({
        groupToAdd: group._id,
      })

      trackEvent(getMatomoEventJoinedGroupe(group?._id))

      // Redirect to simulateur page or end page
      setShouldGoToSimulateurPage(true)
    } catch (error) {
      captureException(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <PrenomInput
        prenom={user.name ?? ''}
        setPrenom={updateName}
        errorPrenom={errorPrenom}
        setErrorPrenom={setErrorPrenom}
        data-cypress-id="member-name"
      />

      <div className="my-4">
        <EmailInput
          email={user.email ?? ''}
          setEmail={updateEmail}
          error={errorEmail}
          setError={setErrorEmail}
          label={
            <span>
              {t('Votre adresse email')}{' '}
              <span className="italic text-secondary-500">
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
