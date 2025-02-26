'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { STORAGE_KEY } from '@/constants/storage'
import { UserProvider } from '@/publicodes-state'
import type { RegionFromGeolocation } from '@/publicodes-state/types'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { marianne } from '../layout'
import { IframeOptionsProvider } from './mainLayoutProviders/IframeOptionsContext'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PostHogProvider } from './mainLayoutProviders/PostHogProvider'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({
  children,
  initialRegion,
}: {
  children: React.ReactNode
  initialRegion: RegionFromGeolocation
}) {
  return (
    <ErrorBoundary>
      <PostHogProvider>
        <IframeOptionsProvider>
          {(containerRef: React.RefObject<HTMLBodyElement>) => (
            <QueryClientProviderWrapper>
              <UserProvider
                storageKey={STORAGE_KEY}
                migrationInstructions={migrationInstructions}
                initialRegion={initialRegion}>
                <PreventNavigationProvider>
                  <MainHooks>
                    <body
                      className={`${marianne.className} bg-white text-default transition-colors duration-700`}
                      ref={containerRef}>
                      {children}
                    </body>
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
