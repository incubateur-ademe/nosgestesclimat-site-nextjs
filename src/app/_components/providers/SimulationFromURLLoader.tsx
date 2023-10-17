'use client'

import { EMAIL_SIMULATION_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { reformateDataFromDB } from '@/utils/formatDataForDB'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SimulationFromUrlLoader() {
  const { addSimulation, currentSimulationId } = useUser()

  const router = useRouter()

  const searchParams = useSearchParams()

  const currentPath = usePathname()

  const idSimulation = searchParams.get('sid')

  const idSimulationDecoded = decodeURIComponent(idSimulation || '')

  const { data: simulationFromURL } = useQuery(
    ['simulationFromURL'],
    () =>
      axios
        .get(`${EMAIL_SIMULATION_URL}${idSimulationDecoded}`)
        .then((res) => res.data),
    { enabled: idSimulationDecoded ? true : false, refetchOnWindowFocus: false }
  )

  useEffect(() => {
    const simulationReformated = simulationFromURL?.data && {
      ...simulationFromURL?.data,
      situation: reformateDataFromDB(simulationFromURL?.data),
    }

    if (
      simulationReformated &&
      currentSimulationId !== simulationReformated.id
    ) {
      addSimulation(simulationReformated)

      const params = new URLSearchParams(searchParams)
      params.delete('sid')
      const queryString = params.toString()
      router.replace(`${currentPath}${queryString ? `?${queryString}` : ''}`)
    }
  }, [
    addSimulation,
    currentSimulationId,
    currentPath,
    router,
    searchParams,
    simulationFromURL?.data,
  ])

  return null
}
