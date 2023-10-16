import { EMAIL_SIMULATION_URL } from '@/constants/urls'
import { Simulation } from '@/publicodes-state/types'

import { reformateDataFromDB } from '@/utils/formatDataForDB'
import * as Sentry from '@sentry/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type DataSimulationObject = { data: Simulation }

export const useLoadSimulationFromURL = () => {
  const [simulation, setSimulation] = useState<
    DataSimulationObject | undefined
  >(undefined)

  // Get search params from URL
  const searchParams = useSearchParams()

  const idSimulation = searchParams.get('sid')

  const idSimulationDecoded = decodeURIComponent(idSimulation || '')

  useEffect(() => {
    const loadSimulation = async (id: string) => {
      try {
        const response = await fetch(`${EMAIL_SIMULATION_URL}${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const simulation: DataSimulationObject = await response.json()
        const simulationReformatted = { ...simulation }

        simulationReformatted.data.situation = reformateDataFromDB(
          simulationReformatted.data
        )

        return simulationReformatted
      } catch (e) {
        Sentry.captureException(e)
      }
    }

    if (idSimulationDecoded && !simulation) {
      loadSimulation(idSimulationDecoded)
        .then((simulation: DataSimulationObject | undefined) => {
          setSimulation(simulation)
        })
        .catch((e) => {
          Sentry.captureException(e)
        })
    }
  }, [idSimulationDecoded, simulation])
  console.log({ simulation, idSimulationDecoded })
  return simulation?.data
}
