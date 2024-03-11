import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useDeuxRoues({ answers, isPristine }: HookProps) {
  const { setValue: setDeuxRouesValue } = useRule(
    'transport . deux roues . usager'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.moto) {
      setDeuxRouesValue('non')
    } else {
      setDeuxRouesValue('oui')
    }
  }, [answers, isPristine, setDeuxRouesValue])
}
