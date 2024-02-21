'use client'

import { createContext, useEffect, useState } from 'react'

export const PreventNavigationContext = createContext<{
  shouldPreventNavigation: boolean
  setShouldPreventNavigation: (value: boolean) => void
}>({
  shouldPreventNavigation: false,
  setShouldPreventNavigation: () => {},
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

  return (
    <PreventNavigationContext.Provider
      value={{ shouldPreventNavigation, setShouldPreventNavigation }}>
      {children}
    </PreventNavigationContext.Provider>
  )
}
