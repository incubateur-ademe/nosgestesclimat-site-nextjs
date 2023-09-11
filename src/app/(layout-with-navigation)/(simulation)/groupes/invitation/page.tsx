'use client'

import Meta from '@/components/misc/Meta'
import TransClient from '@/components/translation/TransClient'
import { getMatomoEventJoinedGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { Member, SimulationResults } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { fetchAddUserToGroup } from '../_helpers/fetchAddUserToGroup'
import { getSimulationResults } from '../_helpers/getSimulationResults'
import { useFetchGroup } from '../_hooks/useFetchGroup'

export default function RejoindreGroupe({
  searchParams,
}: {
  searchParams: { groupId: string }
}) {
  const [prenom, setPrenom] = useState('')
  const [errorPrenom, setErrorPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const { groupId } = searchParams

  const groupURL = `/groupes/resultats?groupId=${groupId}`

  const groupBaseURL = `${window.location.origin}/groupes`

  const { getValue } = useEngine()

  const { progression } = useForm()

  const router = useRouter()

  const { t } = useClientTranslation()

  const { user, getCurrentSimulation, setGroupToRedirectToAfterTest } =
    useUser()

  const userId = user?.id

  const currentSimulation = getCurrentSimulation()

  const { data: group } = useFetchGroup(groupId)

  const { mutateAsync: addUserToGroup } = useMutation({
    mutationFn: (results: SimulationResults) =>
      fetchAddUserToGroup({
        group,
        name: prenom,
        email,
        userId: userId ?? '',
        simulation: currentSimulation ?? undefined,
        results,
      }),
  })

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
        deleteURL: `${groupBaseURL}/supprimer?groupId=${group?._id}&userId=${userId}&mtm_campaign=invitation-groupe-email`,
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
      await addUserToGroup(results)

      // Send email to invited friend confirming the adding to the group
      sendEmailToInvited()

      // Si l'utilisateur a déjà une simulation de complétée, on le redirige vers le dashboard
      if (progression ?? progression > 0) {
        trackEvent(getMatomoEventJoinedGroupe(groupId))
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

  if (!groupId) {
    router.push('/groupes')
    return
  }

  // Show nothing if group is not fetched yet
  if (!group) {
    return null
  }

  // If user is already in the group, redirect to group page
  if (group?.members?.find((member: Member) => member.userId === userId)) {
    router.push(groupURL)
    return
  }

  return (
    <main className="p-4 md:p-8">
      <Meta
        title={t('Rejoindre un groupe - Nos Gestes Climat')}
        description={t(
          "Rejoignez votre groupe pour calculez votre empreinte carbone et la comparer avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
        )}
      />

      <AutoCanonicalTag />

      <Title
        title={
          <TransClient>
            {group?.owner?.name} vous a invité à rejoindre le groupe{' '}
            <span className="text-violet-900">{group?.name}</span>
          </TransClient>
        }
        subtitle={t(
          "Comparez vos résultats avec votre famille ou un groupe d'amis."
        )}
      />
      <form onSubmit={handleSubmit}>
        <PrenomInput
          prenom={prenom}
          setPrenom={setPrenom}
          errorPrenom={errorPrenom}
          setErrorPrenom={setErrorPrenom}
          data-cypress-id="member-name"
        />
        <EmailInput
          email={email}
          setEmail={setEmail}
          errorEmail={errorEmail}
          setErrorEmail={setErrorEmail}
        />
        {!currentSimulation && (
          <p className="mb-2 text-xs">
            Vous devrez compléter votre test après avoir rejoint le groupe.
          </p>
        )}
        <Button
          type="submit"
          onClick={handleSubmit}
          aria-disabled={!prenom}
          data-cypress-id="button-join-group">
          {currentSimulation ? (
            <TransClient>Rejoindre</TransClient>
          ) : (
            <TransClient>Rejoindre et passer mon test</TransClient>
          )}
        </Button>
      </form>
    </main>
  )
}
