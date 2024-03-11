import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useCaravane({ answers, isPristine }: HookProps) {
  const { setValue: setCaravaneValue } = useRule(
    'transport . vacances . caravane . propriétaire'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.caravane) {
      setCaravaneValue('non')
    } else {
      setCaravaneValue('oui')
    }
  }, [answers, isPristine, setCaravaneValue])
}
