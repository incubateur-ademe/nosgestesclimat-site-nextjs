'use client'

import { PropsWithChildren } from 'react'

import { MigrationType } from '@/publicodes-state/types'
import UserContext from './context'
import usePersistentSimulations from './usePersistentSimulations'
import usePersistentTutorials from './usePersistentTutorials'
import usePersistentUser from './usePersistentUser'
import useUpdateOldLocalStorage from './useUpdateOldLocalStorage'

type Props = {
  /**
   * The localstorage key in use
   */
  storageKey?: string
  /**
   * The inital region of the user
   */
  initialRegion: { code: string; name: string }
  /**
   * The migration instructions for old localstorage
   */
  migrationInstructions: MigrationType
}
export default function UserProvider({
  children,
  storageKey = 'ngc',
  initialRegion,
  migrationInstructions,
}: PropsWithChildren<Props>) {
  useUpdateOldLocalStorage({ storageKey, migrationInstructions })

  const { user, setUser } = usePersistentUser({ storageKey, initialRegion })

  const { tutorials, setTutorials } = usePersistentTutorials({ storageKey })

  const {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
    groupToRedirectToAfterTest,
    setGroupToRedirectToAfterTest,
  } = usePersistentSimulations({ storageKey })

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
        groupToRedirectToAfterTest,
        setGroupToRedirectToAfterTest,
        migrationInstructions,
      }}>
      {children}
    </UserContext.Provider>
  )
}
