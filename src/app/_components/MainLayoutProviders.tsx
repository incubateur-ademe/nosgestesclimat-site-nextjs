'use client'

import ErrorBoundary from '@/components/error/ErrorBoundary'
import { PropsWithChildren } from 'react'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
    </ErrorBoundary>
  )
}
