'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { UserProvider } from '@/publicodes-state'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { PropsWithChildren, Suspense } from 'react'
import { IframeOptionsProvider } from './mainLayoutProviders/IframeOptionsContext'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <UserProvider
            storageKey="nosgestesclimat::v3"
            migrationInstructions={migrationInstructions}>
            <PreventNavigationProvider>
              <Suspense fallback={null}>
                <MainHooks />
              </Suspense>
              {children}
            </PreventNavigationProvider>
          </UserProvider>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </ErrorBoundary>
  )
}
