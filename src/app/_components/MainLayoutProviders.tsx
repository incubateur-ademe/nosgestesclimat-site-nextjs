'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { STORAGE_KEY } from '@/constants/storage'
import { UserProvider } from '@/publicodes-state'
import type { RegionFromGeolocation } from '@/publicodes-state/types'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import type { PropsWithChildren } from 'react'
import { IframeOptionsProvider } from './mainLayoutProviders/IframeOptionsContext'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PostHogProvider } from './mainLayoutProviders/PostHogProvider'
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
      <PostHogProvider>
        <IframeOptionsProvider>
          {(containerRef: React.RefObject<HTMLDivElement>) => (
            <QueryClientProviderWrapper>
              <UserProvider
                storageKey={STORAGE_KEY}
                migrationInstructions={migrationInstructions}
                initialRegion={initialRegion}>
                <PreventNavigationProvider>
                  <MainHooks>
                    <div ref={containerRef}>{children}</div>
                  </MainHooks>
                </PreventNavigationProvider>
              </UserProvider>
            </QueryClientProviderWrapper>
          )}
        </IframeOptionsProvider>
      </PostHogProvider>
    </ErrorBoundary>
  )
}
