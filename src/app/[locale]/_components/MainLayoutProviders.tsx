'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { PartnerProvider } from '@/contexts/partner/PartnerContext'
import { UserProvider } from '@/publicodes-state'
import { MotionConfig } from 'framer-motion'
import { Suspense, type PropsWithChildren } from 'react'
import { IframeOptionsProvider } from '../_components/mainLayoutProviders/IframeOptionsContext'
import MainHooks from '../_components/mainLayoutProviders/MainHooks'
import QueryClientProviderWrapper from '../_components/mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryClientProviderWrapper>
        <UserProvider>
          <PartnerProvider>
            <IframeOptionsProvider>
              <MotionConfig reducedMotion="user">
                <Suspense>
                  <MainHooks />
                </Suspense>
                {children}
              </MotionConfig>
            </IframeOptionsProvider>
          </PartnerProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </ErrorBoundary>
  )
}
