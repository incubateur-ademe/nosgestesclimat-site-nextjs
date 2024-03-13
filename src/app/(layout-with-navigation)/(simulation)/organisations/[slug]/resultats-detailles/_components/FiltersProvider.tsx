'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'

export const FiltersContext = createContext<{
  ageFilters: { value: [number, number] }[]
  setAgeFilters: Dispatch<SetStateAction<{ value: [number, number] }[]>>
  postalCodeFilters: { value: string }[]
  setPostalCodeFilters: Dispatch<SetStateAction<{ value: string }[]>>
}>({
  ageFilters: [],
  setAgeFilters: () => {},
  postalCodeFilters: [],
  setPostalCodeFilters: () => {},
})

export default function FiltersProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [ageFilters, setAgeFilters] = useState<{ value: [number, number] }[]>(
    []
  )
  const [postalCodeFilters, setPostalCodeFilters] = useState<
    { value: string }[]
  >([])

  return (
    <FiltersContext.Provider
      value={{
        ageFilters,
        setAgeFilters,
        postalCodeFilters,
        setPostalCodeFilters,
      }}>
      {children}
    </FiltersContext.Provider>
  )
}
