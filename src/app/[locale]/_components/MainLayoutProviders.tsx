'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { STORAGE_KEY } from '@/constants/storage'
import { getGeolocation } from '@/helpers/getGeolocation'
import { UserProvider } from '@/publicodes-state'
import type { RegionFromGeolocation } from '@/publicodes-state/types'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { IframeOptionsProvider } from '../_components/mainLayoutProviders/IframeOptionsContext'
import MainHooks from '../_components/mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from '../_components/mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from '../_components/mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  const [initialRegion, setInitialRegion] = useState<
    RegionFromGeolocation | undefined
  >(undefined)

  useEffect(() => {
    getGeolocation().then((region) => {
      setInitialRegion(region)
    })
  }, [])

  return (
    <ErrorBoundary>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <UserProvider
            storageKey={STORAGE_KEY}
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
