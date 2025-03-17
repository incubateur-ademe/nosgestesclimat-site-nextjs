'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { STORAGE_KEY } from '@/constants/storage'
import { UserProvider } from '@/publicodes-state'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { type PropsWithChildren } from 'react'
import { IframeOptionsProvider } from '../_components/mainLayoutProviders/IframeOptionsContext'
import MainHooks from '../_components/mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from '../_components/mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from '../_components/mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <IframeOptionsProvider>
        {(containerRef: React.RefObject<HTMLDivElement | null>) => (
          <QueryClientProviderWrapper>
            <UserProvider
              storageKey={STORAGE_KEY}
              migrationInstructions={migrationInstructions}>
              <PreventNavigationProvider>
                <MainHooks>
                  <div ref={containerRef}>{children}</div>
                </MainHooks>
              </PreventNavigationProvider>
            </UserProvider>
          </QueryClientProviderWrapper>
        )}
      </IframeOptionsProvider>
    </ErrorBoundary>
  )
}
