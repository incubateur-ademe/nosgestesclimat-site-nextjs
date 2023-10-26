'use client'

import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

export const AbTestingContext = createContext<string[]>([])

export const AbTestingProvider = ({ children }: PropsWithChildren) => {
  const [activatedAbTests, setActivatedAbTests] = useState<string[]>([])
  const [searchParams, setSearchParams] = useState<URLSearchParams>()

  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    setTimeout(() => {
      setSearchParams(new URLSearchParams(window.location.search))
    }, 1000)
  }, [isClient])

  useEffect(() => {
    if (!isClient || !searchParams) return

    const currentAbTests = searchParams?.get('ab-test')

    if (!currentAbTests) return

    setActivatedAbTests(currentAbTests.split(','))

    // Remove ab-test param from url
    const allParams = searchParams.entries()

    const newParams = Array.from(allParams).filter(([key]) => key !== 'ab-test')

    const newSearchParams = new URLSearchParams(newParams)

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${
        newSearchParams.toString().length > 0 ? '?' : ''
      }${newSearchParams.toString()}`
    )
    setSearchParams(undefined)
  }, [searchParams, isClient])

  return (
    <AbTestingContext.Provider value={activatedAbTests}>
      {children}
    </AbTestingContext.Provider>
  )
}
