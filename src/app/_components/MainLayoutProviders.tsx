'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import { UserProvider } from '@/publicodes-state'
import { MigrationType, RegionFromGeolocation } from '@/publicodes-state/types'
import { PropsWithChildren } from 'react'
import CheckFixedRegion from './mainLayoutProviders/CheckFixedRegion'
import { IframeResizer } from './mainLayoutProviders/IframeResizer'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import QueryParamsProvider from './mainLayoutProviders/QueryParamsProvider'

type Props = {
  region: RegionFromGeolocation
  migrationInstructions: MigrationType
}
export default function MainLayoutProviders({
  children,
  region,
  migrationInstructions,
}: PropsWithChildren<Props>) {
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
            <PreventNavigationProvider>
              <MainHooks>{children}</MainHooks>
            </PreventNavigationProvider>
          </UserProvider>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </QueryParamsProvider>
  )
}
