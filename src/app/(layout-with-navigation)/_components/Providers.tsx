'use client'

import QueryClientProviderWrapper from '@/app/_components/QueryClientProviderWrapper'
import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export default function Providers({
  children,
  region,
}: PropsWithChildren<{ region: { code: string; name: string } }>) {
  // TODO: endpoint should not be static (and should point to local if available)

  return (
    <QueryClientProviderWrapper>
      <UserProvider initialRegion={region}>{children}</UserProvider>
    </QueryClientProviderWrapper>
  )
}
