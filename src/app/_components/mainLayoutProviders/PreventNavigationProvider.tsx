'use client'

import { createContext, useCallback, useEffect, useState } from 'react'

export type PreventNavigationContextType = {
  shouldPreventNavigation: boolean
  handleUpdateShouldPreventNavigation: (value: boolean) => void
}

export const PreventNavigationContext =
  createContext<PreventNavigationContextType>({
    shouldPreventNavigation: false,
    handleUpdateShouldPreventNavigation: () => {},
  })

export function PreventNavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [shouldPreventNavigation, setShouldPreventNavigation] = useState(false)

  useEffect(() => {
    if (shouldPreventNavigation) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = null
    }
  }, [shouldPreventNavigation])

  useEffect(() => {
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  const handleUpdateShouldPreventNavigation = useCallback(
    (shouldPrevent: boolean) => {
      setShouldPreventNavigation(shouldPrevent)

      window.onbeforeunload = shouldPrevent ? () => true : null
    },
    []
  )

  return (
    <PreventNavigationContext.Provider
      value={{ shouldPreventNavigation, handleUpdateShouldPreventNavigation }}>
      {children}
    </PreventNavigationContext.Provider>
  )
}
