'use client'

import Trans from '@/components/translation/trans/TransClient'
import Alert from '@/design-system/alerts/alert/Alert'
import Button from '@/design-system/buttons/Button'
import Loader from '@/design-system/layout/Loader'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import { updateGroupParticipant } from '@/services/groups/updateGroupParticipant'
import type { Group } from '@/types/groups'
import { captureException } from '@sentry/nextjs'
import dayjs from 'dayjs'
import { useEffect, useState, useTransition } from 'react'

type Props = {
  group: Group
  refetchGroup: () => void
}

export default function UpdateSimulationUsed({ group, refetchGroup }: Props) {
  const [isPending, startTransition] = useTransition()
  const [isError, setIsError] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [latestSimulation, setLatestSimulation] = useState<
    Simulation | undefined
  >(undefined)

  const {
    user: { userId, name, email },
    simulations,
  } = useUser()

  const { t } = useClientTranslation()

  // The user hasn't got newer simulation than the one used in the group
  const groupSimulation = group.participants.find(
    (p) => p.userId === userId
  )?.simulation

  useEffect(() => {
    if (latestSimulation) return

    const simulation = simulations
      .filter(
        (s) =>
          s.progression === 1 &&
          dayjs(s.date).isAfter(dayjs(groupSimulation?.date))
      )
      .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
      .shift()

    setLatestSimulation(simulation)
  }, [groupSimulation?.date, latestSimulation, simulations])

  if (!latestSimulation) {
    return null
  }

  const handleUpdateSimulation = () => {
    try {
      startTransition(async () => {
        try {
          await updateGroupParticipant({
            groupId: group.id,
            email,
            simulation: latestSimulation as Simulation,
            userId,
            name,
          })
        } catch (err) {
          setIsError(true)
        }

        setIsUpdated(true)

        refetchGroup()
      })
    } catch (error) {
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

  if (isError) {
    return (
      <Alert
        data-testid="error-alert"
        aria-live="polite"
        type="success"
        title={<Trans>Oups, une erreur s'est produite</Trans>}
        description={
          <Trans>
            Une erreur s'est produite au moment de mettre à jour votre
            participation. Veuillez réessayer ultérieurement. Si le problème
            persiste, veuillez nous contacter via notre page de contact.
          </Trans>
        }
        onClose={() => {
          setIsError(false)
        }}
      />
    )
  }

  if (isUpdated) {
    return (
      <Alert
        data-testid="success-alert"
        aria-live="polite"
        type="success"
        title={<Trans>Participation mise à jour</Trans>}
        description={
          <Trans>
            Votre participation a bien été mise à jour avec vos résultats de
            test les plus récents.
          </Trans>
        }
        onClose={() => {
          setLatestSimulation(undefined)
          setIsUpdated(false)
        }}
      />
    )
  }

  if (!latestSimulation) return null

  return (
    <Alert
      data-testid="update-alert"
      title={<Trans>Mettre à jour votre participation au groupe</Trans>}
      description={
        <div className="flex flex-col">
          <p>
            <Trans>
              Vous pouvez mettre à jour le groupe avec votre simulation la plus
              récente réalisée en date du
            </Trans>{' '}
            <strong>{dayjs(latestSimulation.date).format('DD/MM/YYYY')}</strong>{' '}
            <Trans>avec une empreinte carbone de</Trans>{' '}
            <strong>
              {formattedValue} {unit}
            </strong>
            .
          </p>

          <Button
            size="sm"
            className="w-60 self-end"
            disabled={isPending}
            data-testid="update-button"
            onClick={handleUpdateSimulation}>
            {isPending ? (
              <Loader />
            ) : (
              <Trans>Mettre à jour la simulation</Trans>
            )}
          </Button>
        </div>
      }
      className="mb-8"
    />
  )
}
