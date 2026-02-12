'use client'

import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { STORAGE_KEY } from '@/constants/storage'
import { getGeolocation } from '@/helpers/api/getGeolocation'
import { usePosthogIdentify } from '@/hooks/tracking/usePosthogIdentify'
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

interface Props {
  /**
   * The localstorage key in use
   */
  storageKey?: string
  serverSimulations?: Simulation[]
}
export default function UserProvider({
  children,
  serverSimulations,
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
    initialRegion,
  })

  usePosthogIdentify({ userId: user?.userId })

  const { tutorials, setTutorials } = usePersistentTutorials()

  const {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  } = usePersistentSimulations({
    migrationInstructions,
    serverSimulations,
  })

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
