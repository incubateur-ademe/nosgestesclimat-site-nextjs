import { defaultMetric, metrics } from '@/constants/metric'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Metric } from '@/publicodes-state/types'
import { useCallback } from 'react'

const metricParamsName = 'theme'

export function useCurrentMetric() {
  const { queryParams, setQueryParams } = useQueryParams()

  const queryParamsMetric = queryParams.get(metricParamsName) as Metric | null

  const setCurrentMetric = useCallback(
    (metric: Metric) => {
      setQueryParams({ [metricParamsName]: metric })
    },
    [setQueryParams]
  )

  let currentMetric = queryParamsMetric

  if (!queryParamsMetric || !metrics.includes(queryParamsMetric)) {
    currentMetric = defaultMetric
  }

  return { currentMetric, setCurrentMetric }
}
