'use client'

import { PropsWithChildren, useContext, useMemo } from 'react'
import { SimulationContext } from '../simulationProvider/context'
import Provider from './Provider'

type Props = {
  root?: string
}

/**
 * This is not the real provider but a failsafe: if root is invalid we do not go further
 */
export default function FailSafeFormProvider({
  root = 'bilan',
  children,
}: PropsWithChildren<Props>) {
  const { safeEvaluate } = useContext(SimulationContext)

  const isRootSafe = useMemo<boolean>(
    () => (safeEvaluate(root) ? true : false),
    [safeEvaluate, root]
  )

  if (!isRootSafe) {
    window.location = '/404' as unknown as Location
    return
  }
  return <Provider root={root}>{children}</Provider>
}
