'use client'

import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'

interface InfosContextType {
  postalCode: string
  setPostalCode: (postalCode: string) => void
  birthdate: string
  setBirthdate: (birthdate: string) => void
  customAnswers: Record<string, string>
  addCustomAnswer: ({ key, answer }: { key: string; answer: string }) => void
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

  function addCustomAnswer({ key, answer }: { key: string; answer: string }) {
    setCustomAnswers((prev) => ({ ...prev, [key]: answer }))
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
