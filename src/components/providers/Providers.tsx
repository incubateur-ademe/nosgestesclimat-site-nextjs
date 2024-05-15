'use client'

import LocalisationBanner from '@/components/translation/LocalisationBanner'
import Loader from '@/design-system/layout/Loader'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useCurrentSimulation } from '@/publicodes-state'
import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import Error500 from '../layout/500'

type Props = {
  supportedRegions: SupportedRegions
  isOptim?: boolean
}

const NO_MODEL_PATHNAME_EXCEPTIONS = ['/tutoriel', '/organisations']

export default function Providers({
  children,
  supportedRegions,
  isOptim = true,
}: PropsWithChildren<Props>) {
  const pathname = usePathname()

  const { id } = useCurrentSimulation()

  const { data: rules, isLoading } = useRules({ isOptim })

  // We don't want to display the loader when the user is on the tutorial page
  // or the landing page for organisations
  const shouldAlwaysDisplayChildren =
    NO_MODEL_PATHNAME_EXCEPTIONS.includes(pathname)
  if (shouldAlwaysDisplayChildren && isLoading) {
    return children
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader color="dark" />
      </div>
    )
  }

  if (!rules) {
    return <Error500 />
  }

  return (
    <div key={id}>
      <SimulationProvider
        rules={rules}
        shouldAlwaysDisplayChildren={shouldAlwaysDisplayChildren}>
        <LocalisationBanner supportedRegions={supportedRegions} />
        {children}
      </SimulationProvider>
    </div>
  )
}
