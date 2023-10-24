'use client'

import Trans from '@/components/translation/Trans'
import { getMatomoEventJoinedGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { Group, SimulationResults } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { getSimulationResults } from '../../_helpers/getSimulationResults'
import { getGroupURL } from '../_helpers/getGroupURL'
import { useAddUserToGroup } from '../_hooks/useAddUserToGroup'

export default function InvitationForm({ group }: { group: Group }) {
  const [prenom, setPrenom] = useState('')
  const [errorPrenom, setErrorPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const groupURL = getGroupURL(group)

  const { t } = useClientTranslation()

  const router = useRouter()

  const { getCurrentSimulation, setGroupToRedirectToAfterTest, user } =
    useUser()

  const groupBaseURL = `${window.location.origin}/amis`

  const { getValue } = useEngine()

  const { progression } = useForm()

  const hasCompletedTest = progression === 1

  const currentSimulation = getCurrentSimulation()

  const { mutateAsync: addUserToGroup } = useAddUserToGroup()

  const sendEmailToInvited = async () => {
    if (!email) {
      return
    }

    await fetch('/api/sendGroupConfirmationEmails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name: prenom,
        groupName: group.name,
        groupURL: `${groupBaseURL}/resultats?groupId=${group?._id}&mtm_campaign=voir-mon-groupe-email`,
        shareURL: `${groupBaseURL}/invitation?groupId=${group?._id}&mtm_campaign=invitation-groupe-email`,
        deleteURL: `${groupBaseURL}/supprimer?groupId=${group?._id}&userId=${user?.id}&mtm_campaign=invitation-groupe-email`,
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
    if (!prenom) {
      setErrorPrenom(t('Veuillez renseigner un prénom ou un pseudonyme.'))
      return
    }
    if (
      email &&
      !email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setErrorEmail(t('Veuillez renseigner un email valide.'))
      return
    }

    const results: SimulationResults = getSimulationResults({
      getValue,
    })

    try {
      await addUserToGroup({
        results,
        prenom,
        email,
        group,
        userId: user?.id,
        simulation: currentSimulation,
      })

      // Send email to invited friend confirming the adding to the group
      sendEmailToInvited()

      // Si l'utilisateur a déjà une simulation de complétée, on le redirige vers le dashboard
      if (hasCompletedTest) {
        trackEvent(getMatomoEventJoinedGroupe(group?._id))
        router.push(groupURL)
      } else {
        // sinon on le redirige vers le simulateur
        setGroupToRedirectToAfterTest(group)
        router.push('/simulateur/bilan')
      }
    } catch (error) {
      captureException(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <PrenomInput
        prenom={prenom}
        setPrenom={setPrenom}
        errorPrenom={errorPrenom}
        setErrorPrenom={setErrorPrenom}
        data-cypress-id="member-name"
      />

      <div className="my-4">
        <EmailInput
          email={email}
          setEmail={setEmail}
          errorEmail={errorEmail}
          setErrorEmail={setErrorEmail}
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
        aria-disabled={!prenom}
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
