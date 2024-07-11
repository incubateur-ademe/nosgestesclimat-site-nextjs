import { Metric } from '@/publicodes-state/types'
import { useSearchParams } from 'next/navigation'

export function useCurrentMetric(): Metric {
  const searchParams = useSearchParams()

  const metric = searchParams.get('m')

  if (!metric || !['eau', 'carbone'].includes(metric)) {
    return 'carbone'
  }

  return metric as Metric
}
