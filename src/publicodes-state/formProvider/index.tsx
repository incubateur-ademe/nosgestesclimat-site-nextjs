'use client'

import { PropsWithChildren, useContext, useMemo } from 'react'
import simulationContext from '../simulationProvider/context'
import Provider from './Provider'

type Props = {
  root?: string
}

export default function FailSafeFormProvider({
  root = 'bilan',
  children,
}: PropsWithChildren<Props>) {
  const { safeEvaluate } = useContext(simulationContext)

  const isRootSafe = useMemo<boolean>(
    () => (safeEvaluate(root) ? true : false),
    [safeEvaluate, root]
  )

  if (!isRootSafe) return <div>La racine du formulaire n'existe pas</div>
  return <Provider root={root}>{children}</Provider>
}
