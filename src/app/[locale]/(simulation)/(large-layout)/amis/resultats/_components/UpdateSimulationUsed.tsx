'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Loader from '@/design-system/layout/Loader'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { displaySuccessToast } from '@/helpers/toasts/displaySuccessToast'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { updateGroupParticipant } from '@/services/groups/updateGroupParticipant'
import type { Group } from '@/types/groups'
import { captureException } from '@sentry/nextjs'
import dayjs from 'dayjs'
import { useState } from 'react'

type Props = {
  group: Group
  refetchGroup: () => void
}

export default function UpdateSimulationUsed({ group, refetchGroup }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    user: { userId, name, email },
    simulations,
  } = useUser()

  const { t } = useClientTranslation()

  // The user hasn't got newer simulation than the one used in the group
  const groupSimulation = group.participants.find(
    (p) => p.userId === userId
  )?.simulation

  const latestSimulation = simulations
    .filter(
      (s) =>
        s.progression === 1 &&
        dayjs(s.date).isAfter(dayjs(groupSimulation?.date))
    )
    .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
    .shift()

  if (!latestSimulation) {
    return null
  }

  const handleUpdateSimulation = async () => {
    try {
      setIsLoading(true)

      await updateGroupParticipant({
        groupId: group.id,
        email,
        simulation: latestSimulation,
        userId,
        name: name || '',
      })

      displaySuccessToast(t('Simulation mise à jour'))

      refetchGroup()
    } catch (error) {
      setIsLoading(false)
      captureException(error)
    }
  }

  const { formattedValue, unit } = formatCarbonFootprint(
    latestSimulation.computedResults.carbone.bilan,
    {
      t,
      localize: false,
    }
  )

  return (
    <Card className="mb-8">
      <div>
        <h2 className="text-lg">
          <TransClient>Mettre à jour votre participation au groupe</TransClient>
        </h2>
        <p className="text-sm md:text-base">
          <TransClient>
            Vous pouvez mettre à jour le groupe avec votre simulation la plus
            récente réalisée en date du
          </TransClient>{' '}
          <strong>{dayjs(latestSimulation.date).format('DD/MM/YYYY')}</strong>{' '}
          <TransClient>avec une empreinte carbone de</TransClient>{' '}
          <strong>
            {formattedValue} {unit}
          </strong>
          .
        </p>
      </div>
      <Button className="w-60 self-end" onClick={handleUpdateSimulation}>
        {isLoading ? (
          <Loader />
        ) : (
          <TransClient>Mettre à jour la simulation</TransClient>
        )}
      </Button>
    </Card>
  )
}
