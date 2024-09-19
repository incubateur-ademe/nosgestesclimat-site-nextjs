'use client'

import LocalisationBanner from '@/components/translation/LocalisationBanner'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useCurrentSimulation } from '@/publicodes-state'
import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { PropsWithChildren } from 'react'
import Error500 from '../layout/500'
import SimulationSyncProvider from './providers/SimulationSyncProvider'

type Props = {
  supportedRegions: SupportedRegions
  isOptim?: boolean
}

export default function Providers({
  children,
  supportedRegions,
  isOptim = true,
}: PropsWithChildren<Props>) {
  const { id } = useCurrentSimulation()

  const { data: rules, isLoading, isFetched } = useRules({ isOptim })

  if (isLoading) {
    return children
  }

  if (!rules && isFetched) {
    return <Error500 />
  }

  return (
    <div key={id}>
      <SimulationProvider rules={rules}>
        <LocalisationBanner supportedRegions={supportedRegions} />
        <SimulationSyncProvider>{children}</SimulationSyncProvider>
      </SimulationProvider>
    </div>
  )
}
