import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useOther({ answers, isPristine }: HookProps) {
  const { setValue: setOtherValue } = useRule(
    'transport . mobilité douce . autres véhicules à moteur . présent'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.other) {
      setOtherValue('non')
    } else {
      setOtherValue('oui')
    }
  }, [answers, isPristine, setOtherValue])
}
