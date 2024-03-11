import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useVan({ answers, isPristine }: HookProps) {
  const { setValue: setVanValue } = useRule(
    'transport . vacances . van . propriétaire'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.van) {
      setVanValue('non')
    } else {
      setVanValue('oui')
    }
  }, [answers, isPristine, setVanValue])
}
