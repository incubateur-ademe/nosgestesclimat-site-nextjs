import Trans from '@/components/translation/Trans'
import { GROUP_NAMES } from '@/constants/groupNames'
import { matomoEventCreationGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/router'
import { FormEvent, FormEventHandler, useState } from 'react'
import { getSimulationResults } from '../../_helpers/getSimulationResults'
import { useFetchGroups } from '../../_hooks/usFetchGroups'
import { validateForm } from '../_helpers/validateForm'
import useCreateGroup from '../_hooks/useCreateGroup'
import { useSendGroupConfirmationEmail } from '../_hooks/useSendGroupConfirmationEmail'

export default function GroupCreationForm() {
  const {
    user,
    updateName,
    updateEmail,
    getCurrentSimulation,
    setGroupToRedirectToAfterTest,
  } = useUser()

  const { name, id: userId, email: emailFromUserObject } = user

  const [prenom, setPrenom] = useState(name || '')
  const [errorPrenom, setErrorPrenom] = useState('')
  const [email, setEmail] = useState(emailFromUserObject || '')
  const [errorEmail, setErrorEmail] = useState('')

  const { t } = useClientTranslation()

  const currentSimulation = getCurrentSimulation()

  const { progression } = useForm()

  const { getValue } = useEngine()

  const { data: groups } = useFetchGroups(user?.id)

  const router = useRouter()

  const { mutateAsync: createGroup, isLoading } = useCreateGroup()

  const { mutateAsync: sendGroupEmail } = useSendGroupConfirmationEmail()

  const handleSubmit = async (event: FormEvent) => {
    // Avoid reloading page
    if (event) {
      event.preventDefault()
    }

    const isValid = validateForm({
      prenom,
      email,
      setErrorPrenom,
      setErrorEmail,
      t,
    })

    if (!isValid) return

    try {
      const results = getSimulationResults({
        getValue,
      })

      const groupNameObject = GROUP_NAMES[groups.length % GROUP_NAMES.length]

      const group = await createGroup({
        groupInfo: {
          name: groupNameObject.name,
          emoji: groupNameObject.emoji,
          email,
          prenom,
          userId,
          simulation: currentSimulation,
        },
        results,
      })

      updateName(prenom)
      updateEmail(email)

      // The user will be redirected to the test in order to take it
      if (progression && progression > 0) {
        setGroupToRedirectToAfterTest(group)

        router.push('/simulateur/bilan')
        return
      }

      trackEvent(matomoEventCreationGroupe)

      // Send email to owner
      if (email) {
        await sendGroupEmail({
          email,
          prenom,
          group,
          userId,
        })
      }

      router.push(`/groupes/resultats?groupId=${group._id}`)
    } catch (e) {
      captureException(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit as FormEventHandler<HTMLFormElement>}
      autoComplete="off">
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
        aria-disabled={!prenom && !isLoading}>
        {progression > 0 ? (
          <Trans>Créer le groupe</Trans>
        ) : (
          <Trans>Créer et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
