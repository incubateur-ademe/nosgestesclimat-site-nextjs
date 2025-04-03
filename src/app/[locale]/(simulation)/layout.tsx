import SimulationProviders from '@/components/providers/SimulationProviders'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import type { PropsWithChildren } from 'react'

export default function SimulateurLayout({ children }: PropsWithChildren) {
  const supportedRegions = getSupportedRegions()

  return (
    <SimulationProviders supportedRegions={supportedRegions}>
      {children}
    </SimulationProviders>
  )
}
