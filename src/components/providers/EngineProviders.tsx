'use client'

import SimulateurSkeleton from '@/app/[locale]/(simulation)/simulateur/[root]/skeleton'
import LocalisationBanner from '@/components/translation/LocalisationBanner'
import { useRules } from '@/hooks/useRules'
import {
  EngineProvider,
  useCurrentSimulation,
  useUser,
} from '@/publicodes-state'
import type { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import type { PropsWithChildren } from 'react'
import { Suspense, useState } from 'react'
import Error500 from '../layout/500'
import PRNumberHook from './simulationProviders/PRNumberHook'

interface Props {
  supportedRegions: SupportedRegions
  isOptim?: boolean
}

export default function EngineProviders({
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
      <EngineProvider rules={rules}>
        <Suspense fallback={null}>
          <PRNumberHook setPRNumber={setPRNumber} />
        </Suspense>

        <LocalisationBanner supportedRegions={supportedRegions} />

        {children}
      </EngineProvider>
    </div>
  )
}
