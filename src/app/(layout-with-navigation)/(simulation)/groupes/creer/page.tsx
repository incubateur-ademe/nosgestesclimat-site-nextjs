'use client'

import { GROUP_NAMES } from '@/constants/groupNames'
import { GROUP_URL, NETLIFY_FUNCTIONS_URL } from '@/constants/urls'

import { useEngine, useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'

import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { FormEvent, FormEventHandler, useState } from 'react'
import { getSimulationResults } from '../_helpers/getSimulationResults'

export default function CreerGroupe() {
  const { user, getCurrentSimulation } = useUser()

  const { getValue } = useEngine()

  const userId = user?.id

  const { name, id, email: emailFromUserObject, groups } = user

  const [prenom, setPrenom] = useState(name || '')
  const [errorPrenom, setErrorPrenom] = useState('')
  const [email, setEmail] = useState(emailFromUserObject || '')
  const [errorEmail, setErrorEmail] = useState('')
  const [fetching, setFetching] = useState(false)

  const { t } = useClientTranslation()

  const router = useRouter()

  const currentSimulation = getCurrentSimulation()

  const groupBaseURL = `${window.location.origin}/groupes`

  const handleSubmit = async (event: FormEvent) => {
    setFetching(true)
    // Avoid reloading page
    if (event) {
      event.preventDefault()
    }

    // Inputs validation
    if (!prenom) {
      setErrorPrenom(t('Veuillez renseigner un prénom ou un pseudonyme.'))
      setFetching(false)
      return
    }
    if (
      email &&
      !email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setErrorEmail(t('Veuillez renseigner un email valide.'))
      setFetching(false)
      return
    }

    try {
      const results = getSimulationResults({
        rules,
        getValue,
        getRuleObject,
      })

      const groupNameObject = GROUP_NAMES[groups.length % GROUP_NAMES.length]

      const response = await fetch(GROUP_URL + '/create', {
        method: 'POST',
        body: JSON.stringify({
          name: groupNameObject.name,
          emoji: groupNameObject.emoji,
          ownerEmail: email,
          ownerName: prenom,
          userId,
          simulation: currentSimulation,
          results,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const group: Group = await response.json()

      if (!response.ok) {
        setFetching(false)
        throw new Error(JSON.stringify(group))
      }

      dispatch(addGroupToUser(group))
      dispatch(setUserNameAndEmail(prenom, email))

      // The user will be redirected to the test in order to take it
      if (!currentSimulation) {
        dispatch(setGroupToRedirectTo(group))
        setFetching(false)
        navigate('/simulateur/bilan')
        return
      }

      trackEvent(matomoEventCreationGroupe)

      // Send email to owner
      if (email) {
        await fetch(`${NETLIFY_FUNCTIONS_URL}/group-email-service`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            name: prenom,
            groupName: group.name,
            isCreation: true,
            groupURL: `${groupBaseURL}/resultats?groupId=${group?._id}&mtm_campaign=voir-mon-groupe-email`,
            shareURL: `${groupBaseURL}/invitation?groupId=${group?._id}&mtm_campaign=invitation-groupe-email`,
            deleteURL: `${groupBaseURL}/supprimer?groupId=${group?._id}&userId=${userId}&mtm_campaign=invitation-groupe-email`,
          }),
        })
      }
      setFetching(false)
      router.push(`/groupes/resultats?groupId=${group._id}`)
    } catch (e) {
      setFetching(false)
      captureException(e)
    }
  }
  return (
    <main className="p-4 md:p-8">
      <>
        {/*
        <Meta
          title={t('Créer un groupe et calculer notre empreinte carbone')}
          description={t(
            "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
          )}
        />
        <AutoCanonicalTag />
				 */}
        <GoBackLink className="mb-4 font-bold" />
        <Title
          title={t("Créer un groupe d'amis")}
          subtitle={t(
            'Comparez vos résultats avec votre famille ou un groupe d’amis'
          )}
        />
        <form onSubmit={handleSubmit as FormEventHandler<HTMLFormElement>}>
          <PrenomInput
            prenom={prenom}
            setPrenom={setPrenom}
            errorPrenom={errorPrenom}
            setErrorPrenom={setErrorPrenom}
            data-cypress-id="group-input-owner-name"
          />
          <EmailInput
            email={email}
            setEmail={setEmail}
            errorEmail={errorEmail}
            setErrorEmail={setErrorEmail}
          />
          <Button
            type="submit"
            data-cypress-id="button-create-group"
            onClick={handleSubmit}
            aria-disabled={!prenom && !fetching}>
            {currentSimulation ? (
              <TransClient>Créer le groupe</TransClient>
            ) : (
              <TransClient>Créer et passer mon test</TransClient>
            )}
          </Button>
        </form>
      </>
    </main>
  )
}
