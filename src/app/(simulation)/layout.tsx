import Providers from '@/components/providers/Providers'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { PropsWithChildren, Suspense } from 'react'

export default function SimulateurLayout({ children }: PropsWithChildren) {
  const supportedRegions = getSupportedRegions()

  return (
    <Suspense fallback={null}>
      <Providers supportedRegions={supportedRegions}>{children}</Providers>
    </Suspense>
  )
}
