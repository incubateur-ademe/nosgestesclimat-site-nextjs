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
  }: Options = {}
): {
  formattedValue: string
  unit: string | null
  negative: boolean
} {
  if (metric === 'carbone') {
    return formatCarbonFootprint(value, {
      localize,
      locale,
      maximumFractionDigits,
      shouldUseAbbreviation,
      t,
    })
  }
  if (metric === 'eau') {
    return formatWaterFootprint(value, {
      localize,
      locale,
      maximumFractionDigits,
      shouldUseAbbreviation,
    })
  }

  // If the metric is not recognized, we default to carbon
  return formatCarbonFootprint(value, {
    localize,
    locale,
    maximumFractionDigits,
    shouldUseAbbreviation,
    t,
  })
}
