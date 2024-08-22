'use client'

import { PropsWithChildren } from 'react'

import { RegionFromGeolocation } from '@/publicodes-state/types'
import { Migration } from '@publicodes/tools/migration'
import useUpdateOldLocalStorage from '../../hooks/userProvider/useOldLocalStorage'
import usePersistentSimulations from '../../hooks/userProvider/usePersistentSimulations'
import usePersistentTutorials from '../../hooks/userProvider/usePersistentTutorials'
import usePersistentUser from '../../hooks/userProvider/usePersistentUser'
import UserContext from './context'

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

  // We don't display the app while the simulations are not loaded from the localstorage (or generated)
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
      {simulations.length > 0 ? children : null}
    </UserContext.Provider>
  )
}
