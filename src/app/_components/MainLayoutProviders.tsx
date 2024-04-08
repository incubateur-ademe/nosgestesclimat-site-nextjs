'use client'

import { IframeOptionsProvider } from '@/app/_components/mainLayoutProviders/IframeOptionsContext'
import { UserProvider } from '@/publicodes-state'
import { MigrationType } from '@/publicodes-state/types'
import { PropsWithChildren } from 'react'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import SimulationSyncProvider from './mainLayoutProviders/SimulationSyncProvider'

type Props = {
  region: { code: string; name: string }
  migrationInstructions: MigrationType
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
            <SimulationSyncProvider>
              <MainHooks>{children}</MainHooks>
            </SimulationSyncProvider>
          </PreventNavigationProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </IframeOptionsProvider>
  )
}
