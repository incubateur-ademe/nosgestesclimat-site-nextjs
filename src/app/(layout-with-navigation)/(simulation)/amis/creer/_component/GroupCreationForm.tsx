'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { getGroupName } from '@/helpers/groups/getGroupName'
import { validateCreationForm } from '@/helpers/groups/validateCreationForm'
import { useCreateGroup } from '@/hooks/groups/useCreateGroup'
import { useFetchGroupsOfUser } from '@/hooks/groups/useFetchGroupsOfUser'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { captureException } from '@sentry/react'
import { FormEvent, FormEventHandler, useEffect, useState } from 'react'

export default function GroupCreationForm() {
  const { t } = useClientTranslation()

  const locale = useLocale()

  const { user, updateName, updateEmail } = useUser()

  const currentSimulation = useCurrentSimulation()
  const hasCompletedTest = currentSimulation.progression === 1

  const { goToSimulateurPage } = useSimulateurPage()
  const { goToEndPage } = useEndPage()

  const [administratorName, setAdministratorName] = useState(user.name || '')
  const [errorAdministratorName, setErrorAdministratorName] = useState('')

  const [administratorEmail, setAdministratorEmail] = useState(user.email || '')
  const [errorEmail, setErrorEmail] = useState('')

  const { data: groups } = useFetchGroupsOfUser()

  const { mutateAsync: createGroup, isPending, isSuccess } = useCreateGroup()

  const [shouldNavigate, setShouldNavigate] = useState<string | undefined>(
    undefined
  )
  useEffect(() => {
    if (
      shouldNavigate &&
      currentSimulation.groups?.includes(shouldNavigate || '')
    ) {
      setShouldNavigate(undefined)
      if (hasCompletedTest) {
        goToEndPage({ allowedToGoToGroupDashboard: true })
      } else {
        goToSimulateurPage()
      }
    }
  }, [
    currentSimulation.groups,
    hasCompletedTest,
    goToEndPage,
    goToSimulateurPage,
    shouldNavigate,
  ])

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
      const { name, emoji } = getGroupName(groups ?? [], locale ?? 'fr')

      const group = await createGroup({
        groupInfo: {
          name,
          emoji,
          administratorEmail,
          administratorName,
          userId: user.userId,
          simulation: currentSimulation,
        },
      })

      // Update user info
      updateName(administratorName)
      updateEmail(administratorEmail)

      // Update current simulation with group id (to redirect after test completion)
      currentSimulation.update({
        groupToAdd: group._id,
      })

      setShouldNavigate(group._id)
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
              <span className="italic text-secondary-700">
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
        disabled={!administratorName || isPending || isSuccess}>
        {hasCompletedTest ? (
          <Trans>Créer le groupe</Trans>
        ) : (
          <Trans>Créer et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
