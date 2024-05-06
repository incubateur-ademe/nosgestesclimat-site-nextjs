import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useMarche({ answers, isPristine }: HookProps) {
  const { setValue: setMarcheValue } = useRule(
    'transport . mobilité douce . marche . présent'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.marche) {
      setMarcheValue('non')
    } else {
      setMarcheValue('oui')
    }
  }, [answers, isPristine, setMarcheValue])
}
