'use client'

import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { getGeolocation } from '@/helpers/api/getGeolocation'
import type { RegionFromGeolocation } from '@/publicodes-state/types'
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
}
export default function UserProvider({
  children,
  storageKey = 'ngc',
  migrationInstructions,
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
  console.log(user)
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
