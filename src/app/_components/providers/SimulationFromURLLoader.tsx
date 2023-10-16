'use client'

import { EMAIL_SIMULATION_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { reformateDataFromDB } from '@/utils/formatDataForDB'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SimulationFromURLLoader() {
  const { addSimulation, currentSimulationId } = useUser()

  const searchParams = useSearchParams()

  const idSimulation = searchParams.get('sid')

  const idSimulationDecoded = decodeURIComponent(idSimulation || '')

  const { data: simulationFromURL } = useQuery(['simulationFromURL'], () =>
    axios
      .get(`${EMAIL_SIMULATION_URL}${idSimulationDecoded}`)
      .then((res) => res.data)
  )

  const simulationReformated = simulationFromURL?.data && {
    ...simulationFromURL?.data,
    situation: reformateDataFromDB(simulationFromURL?.data),
  }

  useEffect(() => {
    if (
      simulationReformated &&
      currentSimulationId !== simulationReformated.id
    ) {
      addSimulation(simulationReformated)
    }
  }, [simulationReformated])

  return null
}
