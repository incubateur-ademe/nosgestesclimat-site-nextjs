import { useCurrentSimulation } from '@/publicodes-state'
import { useTransition } from 'react'
import { endTestAction } from '../_actions/endTestAction'

export function useEndTest() {
  const currentSimulation = useCurrentSimulation()
  const [isPending, startTransition] = useTransition()

  return {
    isPending,
    endTest: startTransition(() => endTestAction(currentSimulation)),
  }
}
