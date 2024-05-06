import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useAvion({ answers, isPristine }: HookProps) {
  const { setValue: setAvionValue } = useRule('transport . avion . usager')
  useEffect(() => {
    if (isPristine) {
      return
    }

    if (!answers.avion) {
      setAvionValue('non')
    } else {
      setAvionValue('oui')
    }
  }, [answers, isPristine, setAvionValue])
}
