import { carboneMetric, eauMetric } from '@/constants/metric'
import { Metric } from '@/publicodes-state/types'
import { formatCarbonFootprint } from './formatCarbonFootprint'
import { formatWaterFootprint } from './formatWaterFootprint'

type Options = {
  localize?: boolean
  locale?: string
  maximumFractionDigits?: number
  shouldUseAbbreviation?: boolean
  t?: (key: string) => string
  metric?: Metric
  shouldDivideBy365?: boolean
}

export function formatFootprint(
  value: string | number,
  {
    localize,
    locale,
    maximumFractionDigits,
    shouldUseAbbreviation,
    t,
    metric,
    shouldDivideBy365,
  }: Options = {}
): {
  formattedValue: string
  unit: string | null
  negative: boolean
} {
  switch (metric) {
    case eauMetric:
      return formatWaterFootprint(value, {
        localize,
        locale,
        maximumFractionDigits,
        shouldUseAbbreviation,
        shouldDivideBy365,
      })
    case carboneMetric:
    default:
      return formatCarbonFootprint(value, {
        localize,
        locale,
        maximumFractionDigits,
        shouldUseAbbreviation,
        t,
      })
  }
}
