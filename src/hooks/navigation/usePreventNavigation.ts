import type { PreventNavigationContextType } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import { useContext } from 'react'

export function usePreventNavigation(): PreventNavigationContextType {
  return useContext(PreventNavigationContext)
}
