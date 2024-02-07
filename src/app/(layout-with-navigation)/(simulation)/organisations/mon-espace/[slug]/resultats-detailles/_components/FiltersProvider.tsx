'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'

export const FiltersContext = createContext<{
  ageFilters: (string | number)[]
  setAgeFilters: Dispatch<SetStateAction<(string | number)[]>>
  postalCodeFilters: (string | number)[]
  setPostalCodeFilters: Dispatch<SetStateAction<(string | number)[]>>
}>({
  ageFilters: [],
  setAgeFilters: () => {},
  postalCodeFilters: [],
  setPostalCodeFilters: () => {},
})

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [ageFilters, setAgeFilters] = useState<(string | number)[]>([])
  const [postalCodeFilters, setPostalCodeFilters] = useState<
    (string | number)[]
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
