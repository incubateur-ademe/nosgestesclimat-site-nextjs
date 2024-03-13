'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import useTrackPageView from '@/hooks/tracking/useTrackPageView'
import useTrackSplitTesting from '@/hooks/tracking/useTrackSplitTesting'
import { UserProvider } from '@/publicodes-state'
import { MigrationType } from '@/publicodes-state/types'
import { PropsWithChildren } from 'react'
import CheckFixedRegion from './mainLayoutProviders/CheckFixedRegion'
import { IframeResizer } from './mainLayoutProviders/IframeResizer'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import QueryParamsProvider from './mainLayoutProviders/QueryParamsProvider'

type Props = {
  region: { code: string; name: string }
  migrationInstructions: MigrationType
}
export default function MainLayoutProviders({
  children,
  region,
  migrationInstructions,
}: PropsWithChildren<Props>) {
  // Handles sending split testing data to Matomo
  useTrackSplitTesting()
  useTrackPageView()

  return (
    <QueryParamsProvider>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <IframeResizer />
          <UserProvider
            initialRegion={region}
            storageKey="nosgestesclimat::v3"
            migrationInstructions={migrationInstructions}>
            <CheckFixedRegion />
            <PreventNavigationProvider>{children}</PreventNavigationProvider>
          </UserProvider>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </QueryParamsProvider>
  )
}
