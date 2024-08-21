import { eauMetric } from '@/constants/metric'
import { useRule } from '@/publicodes-state'

export const useEndPageSharedUrl = () => {
  const { numericValue } = useRule('bilan')

  const { numericValue: waterNumericValue } = useRule('bilan', eauMetric)

  const params = `?total=${Math.round(numericValue)}&watertotal=${Math.round(waterNumericValue)}`

  const sharedUrl = `${window.location.origin}/partage${params}`

  return { sharedUrl }
}
