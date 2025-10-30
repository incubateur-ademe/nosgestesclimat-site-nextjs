'use client'

import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { getGeolocation } from '@/helpers/api/getGeolocation'
import type {
  RegionFromGeolocation,
  Simulation,
} from '@/publicodes-state/types'
import type { Migration } from '@publicodes/tools/migration'
import UserContext from './context'
import useUpdateOldLocalStorage from './hooks/useOldLocalStorage'
import usePersistentSimulations from './hooks/usePersistentSimulations'
import usePersistentTutorials from './hooks/usePersistentTutorials'
import usePersistentUser from './hooks/usePersistentUser'

type Props = {
  /**
   * The localstorage key in use
   */
  storageKey?: string
  /**
   * The migration instructions for old localstorage
   */
  migrationInstructions: Migration
  initialSimulations?: Simulation[]
  initialCurrentSimulationId?: string
}
export default function UserProvider({
  children,
  storageKey = 'ngc',
  migrationInstructions,
  initialSimulations,
  initialCurrentSimulationId,
}: PropsWithChildren<Props>) {
  const [initialRegion, setInitialRegion] = useState<
    RegionFromGeolocation | undefined
  >(undefined)

  useEffect(() => {
    getGeolocation().then((region) => {
      setInitialRegion(region)
    })
  }, [])

  useUpdateOldLocalStorage({ storageKey })

  const { user, setUser } = usePersistentUser({ storageKey, initialRegion })

  const { tutorials, setTutorials } = usePersistentTutorials({ storageKey })

  // Dual mode: server-hydrated (no localStorage) vs localStorage
  const [simulations, setSimulations] = useState<Simulation[]>(
    initialSimulations ?? []
  )
  const [currentSimulationId, setCurrentSimulationId] = useState<string>(
    initialCurrentSimulationId ?? ''
  )
  // If not provided by props, fallback to persistent localStorage version
  const localSimStorage = usePersistentSimulations({
    storageKey,
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
