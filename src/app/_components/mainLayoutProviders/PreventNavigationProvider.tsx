'use client'

import { createContext, useEffect, useState } from 'react'

export const PreventNavigationContext = createContext<{
  shouldPreventNavigation: boolean
  handleUpdateShouldPreventNavigation: (value: boolean) => void
}>({
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

  function handleUpdateShouldPreventNavigation(shouldPrevent: boolean) {
    setShouldPreventNavigation(shouldPrevent)

    window.onbeforeunload = shouldPrevent ? () => true : null
  }

  return (
    <PreventNavigationContext.Provider
      value={{ shouldPreventNavigation, handleUpdateShouldPreventNavigation }}>
      {children}
    </PreventNavigationContext.Provider>
  )
}
