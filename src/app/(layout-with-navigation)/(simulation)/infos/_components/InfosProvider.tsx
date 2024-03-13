'use client'

import { PropsWithChildren, createContext, useState } from 'react'

type InfosContextType = {
  postalCode: string
  setPostalCode: (postalCode: string) => void
  birthdate: string
  setBirthdate: (birthdate: string) => void
}
export const InfosContext = createContext<InfosContextType>({
  postalCode: '',
  setPostalCode: () => {},
  birthdate: '',
  setBirthdate: () => {},
})

export default function InfosProvider({ children }: PropsWithChildren) {
  const [postalCode, setPostalCode] = useState('')
  const [birthdate, setBirthdate] = useState('')

  return (
    <InfosContext.Provider
      value={{
        postalCode,
        setPostalCode,
        birthdate,
        setBirthdate,
      }}>
      {children}
    </InfosContext.Provider>
  )
}
