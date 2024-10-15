'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { UserProvider } from '@/publicodes-state'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { PropsWithChildren } from 'react'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

type Props = {
  regionCode: string
}
export default function MainLayoutProviders({
  children,
  regionCode,
}: PropsWithChildren<Props>) {
  return (
    <ErrorBoundary>
      <QueryClientProviderWrapper>
        <UserProvider
          storageKey="nosgestesclimat::v3"
          migrationInstructions={migrationInstructions}
          initialRegionCode={regionCode}>
          <PreventNavigationProvider>{children}</PreventNavigationProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </ErrorBoundary>
  )
}
