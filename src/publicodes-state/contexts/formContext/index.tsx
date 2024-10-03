'use client'

import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { PropsWithChildren, useContext, useMemo } from 'react'
import { SimulationContext } from '../simulationContext/context'
import Provider from './Provider'

type Props = {
  root?: DottedName
}

/**
 * This is not the real provider but a failsafe: if root is invalid we do not go further
 */
export default function FailSafeFormProvider({
  root = 'bilan',
  children,
}: PropsWithChildren<Props>) {
  const { safeEvaluate, rules } = useContext(SimulationContext)

  const isRootSafe = useMemo<boolean>(() => {
    if (!rules) return true

    return safeEvaluate(root) ? true : false
  }, [safeEvaluate, root, rules])

  if (!isRootSafe) {
    window.location = '/404' as unknown as Location
    return
  }
  return <Provider root={root}>{children}</Provider>
}

FailSafeFormProvider.displayName = 'FormProvider'
