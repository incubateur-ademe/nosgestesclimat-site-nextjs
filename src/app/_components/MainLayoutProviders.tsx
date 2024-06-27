'use client'

import { IframeOptionsProvider } from '@/app/_components/mainLayoutProviders/IframeOptionsContext'
import { UserProvider } from '@/publicodes-state'
import { RegionFromGeolocation } from '@/publicodes-state/types'
import { Migration } from '@publicodes/tools/migration'
import { PropsWithChildren } from 'react'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

type Props = {
  region: RegionFromGeolocation
  migrationInstructions: Migration
}
export default function MainLayoutProviders({
  children,
  region,
  migrationInstructions,
}: PropsWithChildren<Props>) {
  return (
    <IframeOptionsProvider>
      <QueryClientProviderWrapper>
        <UserProvider
          initialRegion={region}
          storageKey="nosgestesclimat::v3"
          migrationInstructions={migrationInstructions}>
          <PreventNavigationProvider>
            <MainHooks>{children}</MainHooks>
          </PreventNavigationProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </IframeOptionsProvider>
  )
}
