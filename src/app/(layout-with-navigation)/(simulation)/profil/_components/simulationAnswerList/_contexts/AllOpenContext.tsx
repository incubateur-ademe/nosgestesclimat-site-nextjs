'use client'

import { PropsWithChildren, createContext } from 'react'

export const AllOpenContext = createContext(false)

export const AllOpenProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: boolean }>) => {
  return (
    <AllOpenContext.Provider value={value}>{children}</AllOpenContext.Provider>
  )
}
