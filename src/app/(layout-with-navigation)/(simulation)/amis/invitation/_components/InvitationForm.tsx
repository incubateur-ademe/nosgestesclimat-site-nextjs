'use client'

import Trans from '@/components/translation/Trans'
import { getMatomoEventJoinedGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { FormEvent, useState } from 'react'

export default function InvitationForm({ group }: { group: Group }) {
  const [errorPrenom, setErrorPrenom] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const { t } = useClientTranslation()

  const { user, updateEmail, updateName, updateCurrentSimulation } = useUser()

  const groupBaseURL = `${window.location.origin}/amis`

  const { progression } = useForm()

  const hasCompletedTest = progression === 1

  const { goToSimulateurPage } = useSimulateurPage()

  const sendEmailToInvited = async () => {
    if (!user.email) {
      return
    }

    await fetch('/api/sendGroupConfirmationEmails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        groupName: group.name,
        groupURL: `${groupBaseURL}/resultats?groupId=${group?._id}&mtm_campaign=voir-mon-groupe-email`,
        shareURL: `${groupBaseURL}/invitation?groupId=${group?._id}&mtm_campaign=invitation-groupe-email`,
        deleteURL: `${groupBaseURL}/supprimer?groupId=${group?._id}&userId=${user?.userId}&mtm_campaign=invitation-groupe-email`,
      }),
    })
  }

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
        group: group._id,
      })

      // Send email to invited friend confirming the adding to the group
      sendEmailToInvited()

      trackEvent(getMatomoEventJoinedGroupe(group?._id))

      // Redirect to simulateur page or end page
      goToSimulateurPage()
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
              <span className="text-secondary-500 italic">
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
