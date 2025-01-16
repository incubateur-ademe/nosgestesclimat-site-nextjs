'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { UserProvider } from '@/publicodes-state'
import type { RegionFromGeolocation } from '@/publicodes-state/types'
import migrationInstructions from '@abc-transitionbascarbone/near-modele/public/migration.json'
import type { PropsWithChildren } from 'react'
import { IframeOptionsProvider } from './mainLayoutProviders/IframeOptionsContext'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

type Props = {
  initialRegion: RegionFromGeolocation
}
export default function MainLayoutProviders({
  children,
  initialRegion,
}: PropsWithChildren<Props>) {
  return (
    <ErrorBoundary>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <UserProvider
            storageKey="near::v1"
            migrationInstructions={migrationInstructions}
            initialRegion={initialRegion}>
            <PreventNavigationProvider>
              <MainHooks>{children}</MainHooks>
            </PreventNavigationProvider>
          </UserProvider>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </ErrorBoundary>
  )
}
