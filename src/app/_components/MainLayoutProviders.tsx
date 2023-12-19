'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import useTrackPageView from '@/hooks/useTrackPageView'
import useTrackSplitTesting from '@/hooks/useTrackSplitTesting'
import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'
import CheckFixedRegion from './mainLayoutProviders/CheckFixedRegion'
import { IframeResizer } from './mainLayoutProviders/IframeResizer'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import QueryParamsProvider from './mainLayoutProviders/QueryParamsProvider'
import SimulationFromUrlLoader from './mainLayoutProviders/SimulationFromUrlLoader'

export default function MainLayoutProviders({
  children,
  region,
}: PropsWithChildren<{ region: { code: string; name: string } }>) {
  // Handles sending split testing data to Matomo
  useTrackSplitTesting()
  useTrackPageView()

  return (
    <QueryParamsProvider>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <IframeResizer />
          <UserProvider initialRegion={region} storageKey="nosgestesclimat::v3">
            <SimulationFromUrlLoader />
            <CheckFixedRegion />
            {children}
          </UserProvider>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </QueryParamsProvider>
  )
}
