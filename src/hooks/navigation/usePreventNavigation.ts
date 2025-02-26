import type { PreventNavigationContextType } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import { useContext } from 'react'

export function usePreventNavigation(): PreventNavigationContextType {
  return useContext(PreventNavigationContext)
}
