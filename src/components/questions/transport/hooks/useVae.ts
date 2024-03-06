import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useVae({ answers, isPristine }: HookProps) {
  const { setValue: setVaeValue } = useRule(
    'transport . mobilité douce . vae . présent'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.vae) {
      setVaeValue('non')
    } else {
      setVaeValue('oui')
    }
  }, [answers, isPristine, setVaeValue])
}
