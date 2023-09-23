'use client'

import { PropsWithChildren } from 'react'

import UserContext from './context'
import usePersistentSimulations from './usePersistentSimulations'
import usePersistentTutorials from './usePersistentTutorials'
import usePersistentUser from './usePersistentUser'

type Props = {
  storageKey?: string
  initialRegion: { code: string; name: string }
}
export default function UserProvider({
  children,
  storageKey = 'ngc',
  initialRegion,
}: PropsWithChildren<Props>) {
  const { user, setUser } = usePersistentUser({ storageKey, initialRegion })

  const { tutorials, setTutorials } = usePersistentTutorials({ storageKey })

  const {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
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
      }}>
      {children}
    </UserContext.Provider>
  )
}
