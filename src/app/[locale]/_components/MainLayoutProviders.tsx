'use client'

import { CookieConsentProvider } from '@/components/cookies/CookieConsentProvider'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import { PartnerProvider } from '@/contexts/partner/PartnerContext'
import { UserProvider } from '@/publicodes-state'
import { Suspense, type PropsWithChildren } from 'react'
import { IframeOptionsProvider } from '../_components/mainLayoutProviders/IframeOptionsContext'
import MainHooks from '../_components/mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from '../_components/mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from '../_components/mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <CookieConsentProvider>
        <QueryClientProviderWrapper>
          <UserProvider>
            <PartnerProvider>
              <IframeOptionsProvider>
                <PreventNavigationProvider>
                  <Suspense>
                    <MainHooks />
                  </Suspense>
                  {children}
                </PreventNavigationProvider>
              </IframeOptionsProvider>
            </PartnerProvider>
          </UserProvider>
        </QueryClientProviderWrapper>
      </CookieConsentProvider>
    </ErrorBoundary>
  )
}
