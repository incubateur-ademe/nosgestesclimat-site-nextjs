import { useRule } from '@/publicodes-state'

export const useEndPageSharedUrl = () => {
  const { numericValue } = useRule('bilan')

  const { numericValue: waterNumericValue } = useRule('bilan', 'eau')

  const params = `?total=${Math.round(numericValue)}&watertotal=${Math.round(waterNumericValue)}`

  const sharedUrl = `${window.location.origin}/partage${params}`

  return { sharedUrl }
}
