'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { UserProvider } from '@/publicodes-state'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { PropsWithChildren } from 'react'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryClientProviderWrapper>
        <UserProvider
          storageKey="nosgestesclimat::v3"
          migrationInstructions={migrationInstructions}>
          <PreventNavigationProvider>{children}</PreventNavigationProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </ErrorBoundary>
  )
}
