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
import { marianne } from '../layout'
import { PartnerProvider } from '@/contexts/partner/PartnerContext'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryClientProviderWrapper>
        <UserProvider
          storageKey={STORAGE_KEY}
          migrationInstructions={migrationInstructions}>
          <PartnerProvider>
            <IframeOptionsProvider>
              {(containerRef: React.RefObject<HTMLBodyElement | null>) => (
                <PreventNavigationProvider>
                  <MainHooks>
                    <body
                      className={`${marianne.className} text-default bg-white transition-colors duration-700`}
                      ref={containerRef}>
                      {children}
                    </body>
                  </MainHooks>
                </PreventNavigationProvider>
              )}
            </IframeOptionsProvider>
          </PartnerProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </ErrorBoundary>
  )
}
