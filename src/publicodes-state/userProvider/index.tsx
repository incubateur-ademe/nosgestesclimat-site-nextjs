'use client'

import React from 'react'

import UserContext from './context'
import usePersistentUser from './usePersistentUser'
import usePersistentSimulations from './usePersistentSimulations'

type Props = {
  children: React.ReactNode
  storageKey?: string
}

export default function UserProvider({ children, storageKey = 'ngc' }: Props) {
  const { user, setUser } = usePersistentUser({ storageKey })

  const {
    simulations,
    setSimulations,
    currentSimulation,
    setCurrentSimulation,
  } = usePersistentSimulations({ storageKey })

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
