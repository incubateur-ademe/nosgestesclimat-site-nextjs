'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { formatEmail } from '@/utils/format/formatEmail'
import { useEffect, useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  guestName: string
  guestEmail: string
}

export default function InvitationForm({ group }: { group: Group }) {
  const { t } = useClientTranslation()

  const { user, updateName, updateEmail } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const currentSimulation = useCurrentSimulation()
  const hasCompletedTest = currentSimulation.progression === 1

  const { goToSimulateurPage } = useSimulateurPage()
  const { goToEndPage } = useEndPage()

  const [shouldNavigate, setShouldNavigate] = useState(false)
  useEffect(() => {
    if (shouldNavigate && currentSimulation.groups?.includes(group._id)) {
      setShouldNavigate(false)
      if (hasCompletedTest) {
        goToEndPage({ allowedToGoToGroupDashboard: true })
      } else {
        goToSimulateurPage()
      }
    }
  }, [
    currentSimulation.groups,
    group._id,
    hasCompletedTest,
    goToEndPage,
    goToSimulateurPage,
    shouldNavigate,
  ])

  async function onSubmit({ guestName, guestEmail }: Inputs) {
    // Shouldn't happen but in any case, avoid group joining
    if (!group) {
      return
    }

    const formattedQuestEmail = formatEmail(guestEmail)

    // Update user info
    updateName(guestName)
    updateEmail(formattedQuestEmail)

    // Update current simulation with group id (to redirect after test completion)
    currentSimulation.update({
      groupToAdd: group._id,
    })

    // Redirect to simulateur page or end page
    setShouldNavigate(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <PrenomInput
        data-cypress-id="member-name"
        value={user.name ?? ''}
        error={errors.guestName?.message}
        {...register('guestName', {
          required: t('Ce champ est requis.'),
        })}
      />

      <div className="my-4">
        <EmailInput
          value={user.email ?? ''}
          label={
            <span>
              {t('Votre adresse email')}{' '}
              <span className="italic text-secondary-700">
                {' '}
                {t('facultatif')}
              </span>
            </span>
          }
          helperText={t(
            'Seulement pour vous permettre de retrouver votre groupe ou de supprimer vos données'
          )}
          {...register('guestEmail', {
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t('Veuillez entrer une adresse email valide.'),
            },
          })}
        />
      </div>

      {!hasCompletedTest && (
        <p className="mb-2 text-xs">
          Vous devrez compléter votre test après avoir rejoint le groupe.
        </p>
      )}

      <Button type="submit" data-cypress-id="button-join-group">
        {hasCompletedTest ? (
          <Trans>Rejoindre</Trans>
        ) : (
          <Trans>Rejoindre et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
