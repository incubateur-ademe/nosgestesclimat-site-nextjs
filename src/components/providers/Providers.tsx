'use client'

import SimulateurSkeleton from '@/app/(simulation)/simulateur/[root]/skeleton'
import LocalisationBanner from '@/components/translation/LocalisationBanner'
import { useRules } from '@/hooks/useRules'
import {
  SimulationProvider,
  useCurrentSimulation,
  useUser,
} from '@/publicodes-state'
import type { SupportedRegions } from '@abc-transitionbascarbone/near-modele'
import type { PropsWithChildren } from 'react'
import { Suspense, useState } from 'react'
import Error500 from '../layout/500'
import PRNumberHook from './providers/PRNumberHook'
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

  const { isInitialized } = useUser()

  const [PRNumber, setPRNumber] = useState<string | undefined>(undefined)

  const { data: rules, isLoading, isFetched } = useRules({ isOptim, PRNumber })

  if (!isInitialized) {
    return <SimulateurSkeleton />
  }

  if (isLoading) {
    return children
  }

  if (!rules && isFetched) {
    return <Error500 />
  }

  return (
    <div key={id}>
      <SimulationProvider rules={rules}>
        <Suspense fallback={null}>
          <PRNumberHook setPRNumber={setPRNumber} />
        </Suspense>
        <LocalisationBanner supportedRegions={supportedRegions} />
        <SimulationSyncProvider>{children}</SimulationSyncProvider>
      </SimulationProvider>
    </div>
  )
}
