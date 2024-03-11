import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useVelo({ answers, isPristine }: HookProps) {
  const { setValue: setVeloValue } = useRule(
    'transport . mobilité douce . vélo . présent'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.velo) {
      setVeloValue('non')
    } else {
      setVeloValue('oui')
    }
  }, [answers, isPristine, setVeloValue])
}
