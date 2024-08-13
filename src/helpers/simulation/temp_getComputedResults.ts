import { defaultMetric } from '@/constants/metric'

export function temp_getComputedResults(
  simulation: any,
  metric: string = defaultMetric
) {
  return (
    simulation?.computedResults?.[metric] ??
    simulation?.computedResults ??
    undefined
  )
}
