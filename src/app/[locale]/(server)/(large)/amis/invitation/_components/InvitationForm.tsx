'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import PrenomInput from '@/design-system/inputs/PrenomInput'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import type { Group } from '@/types/groups'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

interface Inputs {
  guestName: string
  guestEmail: string
}

export default function InvitationForm({ group }: { group: Group }) {
  const { t } = useClientTranslation()

  const { user, updateName } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const currentSimulation = useCurrentSimulation()
  const hasCompletedTest = currentSimulation.progression === 1

  const { getLinkToSimulateurPage } = useSimulateurPage()
  const { linkToEndPage } = useEndPage()
  const router = useRouter()

  const [shouldNavigate, setShouldNavigate] = useState(false)

  useEffect(() => {
    if (shouldNavigate && currentSimulation.groups?.includes(group.id)) {
      setShouldNavigate(false)
      if (hasCompletedTest) {
        router.push(linkToEndPage)
      } else {
        router.push(getLinkToSimulateurPage())
      }
    }
  }, [
    currentSimulation.groups,
    group.id,
    hasCompletedTest,
    getLinkToSimulateurPage,
    shouldNavigate,
    router,
    linkToEndPage,
  ])
  const { saveSimulation } = useSaveSimulation()

  function onSubmit({ guestName }: Inputs) {
    // Shouldn't happen but in any case, avoid group joining
    if (!group) {
      return
    }

    // Update user info
    updateName(guestName)

    // Update current simulation with group id (to redirect after test completion)
    currentSimulation.update({
      groupToAdd: group.id,
    })

    saveSimulation({ simulation: currentSimulation })

    // Redirect to simulateur page or end page
    setShouldNavigate(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <PrenomInput
        data-testid="member-name"
        value={user.name ?? ''}
        error={errors.guestName?.message}
        {...register('guestName', {
          required: t('Ce champ est requis.'),
        })}
      />

      {!hasCompletedTest && (
        <p className="mb-2 text-xs">
          Vous devrez compléter votre test après avoir rejoint le groupe.
        </p>
      )}

      <Button type="submit" data-testid="button-join-group" className="mt-4">
        {hasCompletedTest ? (
          <Trans>Rejoindre</Trans>
        ) : (
          <Trans>Rejoindre et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}
