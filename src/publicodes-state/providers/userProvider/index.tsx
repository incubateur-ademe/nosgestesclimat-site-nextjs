'use client'

import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'

import type { RegionFromGeolocation } from '@/publicodes-state/types'
import type { Migration } from '@publicodes/tools/migration'
import UserContext from './context'
import useUpdateOldLocalStorage from './useOldLocalStorage'
import usePersistentSimulations from './usePersistentSimulations'
import usePersistentTutorials from './usePersistentTutorials'
import usePersistentUser from './usePersistentUser'

type Props = {
  /**
   * The localstorage key in use
   */
  storageKey?: string
  /**
   * The migration instructions for old localstorage
   */
  migrationInstructions: Migration
  /**
   * The region of the user (via server side geolocation)
   */
  initialRegion?: RegionFromGeolocation
}
export default function UserProvider({
  children,
  storageKey = 'ngc',
  migrationInstructions,
  initialRegion,
}: PropsWithChildren<Props>) {
  useUpdateOldLocalStorage({ storageKey })

  const { user, setUser } = usePersistentUser({ storageKey, initialRegion })

  const { tutorials, setTutorials } = usePersistentTutorials({ storageKey })

  const {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  } = usePersistentSimulations({ storageKey, migrationInstructions })

  const isInitialized = useMemo(
    () => user && !!simulations.length,
    [user, simulations]
  )

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tutorials,
        setTutorials,
        simulations,
        setSimulations,
        currentSimulationId,
        setCurrentSimulationId,
        migrationInstructions,
        isInitialized,
      }}>
      {children}
    </UserContext.Provider>
  )
}
