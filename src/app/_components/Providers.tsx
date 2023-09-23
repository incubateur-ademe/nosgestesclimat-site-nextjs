'use client'

import QueryClientProviderWrapper from '@/app/_components/QueryClientProviderWrapper'
import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import { IframeResizer } from '@/design-system/utils/IframeResizer'
import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'
import { IsClientCtxProvider } from './IsClientCtxProvider'

export default function Providers({
  children,
  region,
}: PropsWithChildren<{ region: { code: string; name: string } }>) {
  return (
    <IframeOptionsProvider>
      <QueryClientProviderWrapper>
        <IframeResizer />
        <UserProvider initialRegion={region}>
          <IsClientCtxProvider>{children}</IsClientCtxProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </IframeOptionsProvider>
  )
}
