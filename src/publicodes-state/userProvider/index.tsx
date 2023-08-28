'use client'

import { PropsWithChildren } from 'react'

import UserContext from './context'
import usePersistentSimulations from './usePersistentSimulations'
import usePersistentUser from './usePersistentUser'

type Props = {
  storageKey?: string
  initialRegion: { code: string; name: string }
  forgetSimulations?: boolean
}

export default function UserProvider({
  children,
  storageKey = 'ngc',
  initialRegion,
  forgetSimulations,
}: PropsWithChildren<Props>) {
  const { user, setUser } = usePersistentUser({ storageKey, initialRegion })

  const {
    simulations,
    setSimulations,
    currentSimulation,
    setCurrentSimulation,
  } = usePersistentSimulations({ storageKey, forgetSimulations })

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        simulations,
        setSimulations,
        currentSimulation,
        setCurrentSimulation,
      }}>
      {children}
    </UserContext.Provider>
  )
}
