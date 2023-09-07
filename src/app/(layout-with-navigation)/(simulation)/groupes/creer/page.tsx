'use client'

import { GROUP_NAMES } from '@/constants/groupNames'
import { GROUP_URL } from '@/constants/urls'

import { useTempEngine, useUser } from '@/publicodes-state'

import TransClient from '@/components/translation/TransClient'
import { matomoEventCreationGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, FormEventHandler, useState } from 'react'
import { getSimulationResults } from '../_helpers/getSimulationResults'
import { useGetGroups } from '../_hooks/useGetGroups'

export default function CreerGroupePage() {
  const {
    user,
    updateName,
    updateEmail,
    getCurrentSimulation,
    setGroupToRedirectToAfterTest,
  } = useUser()

  const currentSimulation = getCurrentSimulation()

  const locale = useLocale()

  const { getRuleObject } = useTempEngine()

  const { data: groups } = useGetGroups(user?.id)

  const { data: rules }: { data: any } = useRules({
    region: user.region.code,
    lang: locale || 'fr',
  })

  const { name, id: userId, email: emailFromUserObject } = user

  const [prenom, setPrenom] = useState(name || '')
  const [errorPrenom, setErrorPrenom] = useState('')
  const [email, setEmail] = useState(emailFromUserObject || '')
  const [errorEmail, setErrorEmail] = useState('')
  const [fetching, setFetching] = useState(false)

  const { mutateAsync: createGroup } = useMutation({
    mutationFn: ({
      groupNameObject,
      results,
    }: {
      groupNameObject: { name: string; emoji: string }
      results: any
    }) =>
      axios
        .post(GROUP_URL + '/create', {
          name: groupNameObject.name,
          emoji: groupNameObject.emoji,
          ownerEmail: email,
          ownerName: prenom,
          userId,
          simulation: currentSimulation,
          results,
        })
        .then((res) => res.data),
  })

  const { t } = useClientTranslation()

  const router = useRouter()

  const groupBaseURL = `${window.location.origin}/groupes`

  const handleSubmit = async (event: FormEvent) => {
    console.log('OUHUO')
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
        getRuleObject,
      })
      console.log(results)
      const groupNameObject = GROUP_NAMES[groups.length % GROUP_NAMES.length]

      const group = await createGroup({ groupNameObject, results })

      updateName(prenom)
      updateEmail(email)

      // The user will be redirected to the test in order to take it
      if (!currentSimulation) {
        setGroupToRedirectToAfterTest(group)

        setFetching(false)

        router.push('/simulateur/bilan')
        return
      }

      trackEvent(matomoEventCreationGroupe)

      // Send email to owner
      if (email) {
        await axios.post('/api/send-email-group', {
          email,
          name: prenom,
          groupName: group.name,
          isCreation: true,
          groupURL: `${groupBaseURL}/resultats?groupId=${group?._id}&mtm_campaign=voir-mon-groupe-email`,
          shareURL: `${groupBaseURL}/invitation?groupId=${group?._id}&mtm_campaign=invitation-groupe-email`,
          deleteURL: `${groupBaseURL}/supprimer?groupId=${group?._id}&userId=${userId}&mtm_campaign=invitation-groupe-email`,
        })
      }

      setFetching(false)

      router.push(`/groupes/resultats?groupId=${group._id}`)
    } catch (e) {
      console.log(e)
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
