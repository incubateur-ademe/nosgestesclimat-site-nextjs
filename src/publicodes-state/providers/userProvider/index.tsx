'use client'

import { PropsWithChildren } from 'react'

import { RegionFromGeolocation } from '@/publicodes-state/types'
import { Migration } from '@publicodes/tools/migration'
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
   * The inital region of the user
   */
  initialRegion: RegionFromGeolocation
  /**
   * The migration instructions for old localstorage
   */
  migrationInstructions: Migration
}
export default function UserProvider({
  children,
  storageKey = 'ngc',
  initialRegion,
  migrationInstructions,
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
      }}>
      {children}
    </UserContext.Provider>
  )
}
