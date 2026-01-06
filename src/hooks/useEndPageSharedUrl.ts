import { eauMetric } from '@/constants/model/metric'
import { UTM_MEDIUM_KEY, UTM_SOURCE_KEY } from '@/constants/urls/utm'
import { useRule } from '@/publicodes-state'

export const useEndPageSharedUrl = () => {
  const { numericValue } = useRule('bilan')

  const { numericValue: waterNumericValue } = useRule('bilan', eauMetric)

  const params = `?total=${Math.round(numericValue)}&watertotal=${Math.round(waterNumericValue)}&${UTM_MEDIUM_KEY}=sharelink&${UTM_SOURCE_KEY}=NGC`

  const sharedUrl = `${window.location.origin}/partage${params}`

  return { sharedUrl }
}
