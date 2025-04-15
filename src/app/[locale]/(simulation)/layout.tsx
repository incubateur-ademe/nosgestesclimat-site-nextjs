import EngineProviders from '@/components/providers/EngineProviders'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import type { PropsWithChildren } from 'react'

export default function SimulateurLayout({ children }: PropsWithChildren) {
  const supportedRegions = getSupportedRegions()

  return (
    <EngineProviders supportedRegions={supportedRegions}>
      {children}
    </EngineProviders>
  )
}
