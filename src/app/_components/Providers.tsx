'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'
import CheckFixedRegion from './providers/CheckFixedRegion'
import { IframeResizer } from './providers/IframeResizer'
import PageViewTracker from './providers/PageViewTracker'
import QueryClientProviderWrapper from './providers/QueryClientProviderWrapper'
import QueryParamsProvider from './providers/QueryParamsProvider'
import SimulationFromUrlLoader from './providers/SimulationFromUrlLoader'

export default function Providers({
  children,
  region,
}: PropsWithChildren<{ region: { code: string; name: string } }>) {
  return (
    <QueryParamsProvider>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <PageViewTracker>
            <IframeResizer />
            <UserProvider
              initialRegion={region}
              storageKey="nosgestesclimat::v3">
              <SimulationFromUrlLoader />
              <CheckFixedRegion />
              {children}
            </UserProvider>
          </PageViewTracker>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </QueryParamsProvider>
  )
}
