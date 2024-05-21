'use client'

import { PropsWithChildren, createContext, useState } from 'react'

type InfosContextType = {
  postalCode: string
  setPostalCode: (postalCode: string) => void
  birthdate: string
  setBirthdate: (birthdate: string) => void
  customAnswers: Record<string, string>
  addCustomAnswer: ({ id, answer }: { id: string; answer: string }) => void
}
export const InfosContext = createContext<InfosContextType>({
  postalCode: '',
  setPostalCode: () => {},
  birthdate: '',
  setBirthdate: () => {},
  customAnswers: {},
  addCustomAnswer: () => {},
})

export default function InfosProvider({ children }: PropsWithChildren) {
  const [postalCode, setPostalCode] = useState('')
  const [birthdate, setBirthdate] = useState('')
  // Custom answers are stored in a key-value pair
  // id of the question : answer of user
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({})

  function addCustomAnswer({ id, answer }: { id: string; answer: string }) {
    setCustomAnswers((prev) => ({ ...prev, [id]: answer }))
  }

  return (
    <InfosContext.Provider
      value={{
        postalCode,
        setPostalCode,
        birthdate,
        setBirthdate,
        customAnswers,
        addCustomAnswer,
      }}>
      {children}
    </InfosContext.Provider>
  )
}
