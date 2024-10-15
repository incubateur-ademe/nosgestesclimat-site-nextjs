'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { getGeolocation } from '@/helpers/getGeolocation'
import { UserProvider } from '@/publicodes-state'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { PropsWithChildren } from 'react'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

export default async function MainLayoutProviders({
  children,
}: PropsWithChildren) {
  const regionCode = await getGeolocation()

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
