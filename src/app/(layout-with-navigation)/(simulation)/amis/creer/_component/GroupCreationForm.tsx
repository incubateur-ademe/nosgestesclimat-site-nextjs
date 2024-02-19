'use client'

import Trans from '@/components/translation/Trans'
import { GROUP_NAMES } from '@/constants/groupNames'
import { matomoEventCreationGroupe } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { validateForm } from '@/helpers/groups/validateCreationForm'
import useCreateGroup from '@/hooks/groups/useCreateGroup'
import { useFetchGroups } from '@/hooks/groups/useFetchGroups'
import { useSendGroupConfirmationEmail } from '@/hooks/groups/useSendGroupConfirmationEmail'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { FormEvent, FormEventHandler, useState } from 'react'

export default function GroupCreationForm() {
  const {
    user,
    updateName,
    updateEmail,
    getCurrentSimulation,
    setGroupToRedirectToAfterTest,
  } = useUser()

  const { name, userId, email: emailFromUserObject } = user

  const [prenom, setPrenom] = useState(name || '')
  const [errorPrenom, setErrorPrenom] = useState('')
  const [email, setEmail] = useState(emailFromUserObject || '')
  const [errorEmail, setErrorEmail] = useState('')

  const { t } = useClientTranslation()

  const currentSimulation = getCurrentSimulation()

  const { progression } = useForm()

  const hasCompletedTest = progression === 1

  const { data: groups } = useFetchGroups({
    userId: user?.userId,
    email: user?.email,
  })

  const router = useRouter()

  const { mutateAsync: createGroup, isPending } = useCreateGroup()

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
      })

      updateName(prenom)
      updateEmail(email)

      // The user will be redirected to the test in order to take it
      if (!hasCompletedTest) {
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

      router.push(`/amis/resultats?groupId=${group._id}`)
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

      <div className="my-4">
        <EmailInput
          email={email}
          setEmail={setEmail}
          error={errorEmail}
          setError={setErrorEmail}
          label={
            <span>
              {t('Votre adresse email')}{' '}
              <span className="italic text-secondary"> {t('facultatif')}</span>
            </span>
          }
        />
      </div>

      <Button
        type="submit"
        data-cypress-id="button-create-group"
        onClick={handleSubmit}
        aria-disabled={!prenom && !isPending}>
        {hasCompletedTest ? (
          <Trans>Créer le groupe</Trans>
        ) : (
          <Trans>Créer et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
