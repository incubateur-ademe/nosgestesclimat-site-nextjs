'use client'

import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { STORAGE_KEY } from '@/constants/storage'
import { getGeolocation } from '@/helpers/api/getGeolocation'
import type {
  RegionFromGeolocation,
  Simulation,
} from '@/publicodes-state/types'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import UserContext from './context'
import useUpdateOldLocalStorage from './hooks/useOldLocalStorage'
import usePersistentSimulations from './hooks/usePersistentSimulations'
import usePersistentTutorials from './hooks/usePersistentTutorials'
import usePersistentUser from './hooks/usePersistentUser'

type Props = {
  initialSimulations?: Simulation[]
  initialCurrentSimulationId?: string
  initialUserId?: string
}
export default function UserProvider({
  children,
  initialSimulations,
  initialCurrentSimulationId,
  initialUserId,
}: PropsWithChildren<Props>) {
  const [initialRegion, setInitialRegion] = useState<
    RegionFromGeolocation | undefined
  >(undefined)

  useEffect(() => {
    getGeolocation().then((region) => {
      setInitialRegion(region)
    })
  }, [])

  useUpdateOldLocalStorage({ storageKey: STORAGE_KEY })

  const { user, setUser } = usePersistentUser({
    storageKey: STORAGE_KEY,
    initialRegion,
    initialUserId,
  })

  const { tutorials, setTutorials } = usePersistentTutorials({
    storageKey: STORAGE_KEY,
  })

  // Dual mode: server-hydrated (no localStorage) vs localStorage
  const [simulations, setSimulations] = useState<Simulation[]>(
    initialSimulations ?? []
  )
  const [currentSimulationId, setCurrentSimulationId] = useState<string>(
    initialCurrentSimulationId ?? ''
  )
  // If not provided by props, fallback to persistent localStorage version
  const localSimStorage = usePersistentSimulations({
    storageKey: STORAGE_KEY,
    migrationInstructions,
  })

  const serverHydrated = typeof initialSimulations !== 'undefined'
  // Choose source of truth depending on prop
  const effectiveSimulations = serverHydrated
    ? simulations
    : localSimStorage.simulations
  const effectiveSetSimulations = serverHydrated
    ? setSimulations
    : localSimStorage.setSimulations
  const effectiveCurrentSimulationId = serverHydrated
    ? currentSimulationId
    : localSimStorage.currentSimulationId
  const effectiveSetCurrentSimulationId = serverHydrated
    ? setCurrentSimulationId
    : localSimStorage.setCurrentSimulationId

  const isInitialized = useMemo(
    () => user && !!effectiveSimulations.length,
    [user, effectiveSimulations]
  )

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tutorials,
        setTutorials,
        simulations: effectiveSimulations,
        setSimulations: effectiveSetSimulations,
        currentSimulationId: effectiveCurrentSimulationId,
        setCurrentSimulationId: effectiveSetCurrentSimulationId,
        migrationInstructions,
        isInitialized,
      }}>
      {children}
    </UserContext.Provider>
  )
}
