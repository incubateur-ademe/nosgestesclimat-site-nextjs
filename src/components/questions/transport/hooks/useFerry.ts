import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useFerry({ answers, isPristine }: HookProps) {
  const { setValue: setFerryValue } = useRule('transport . ferry . usager')
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.ferry) {
      setFerryValue('non')
    } else {
      setFerryValue('oui')
    }
  }, [answers, isPristine, setFerryValue])
}
