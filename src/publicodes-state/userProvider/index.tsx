'use client'

import React from 'react'

import UserContext from './context'
import usePersistentUser from './usePersistentUser'
import usePersistentSimulations from './usePersistentSimulations'

type Props = {
  children: React.ReactNode
  storageKey?: string
  forgetSimulations?: boolean
}

export default function UserProvider({
  children,
  storageKey = 'ngc',
  forgetSimulations,
}: Props) {
  const { user, setUser } = usePersistentUser({ storageKey })

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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
