import { useCallback } from 'react'
import { useQueryParams } from './useQueryParams'

const metricParamsName = 'codeInsee'

export function useInseeCodeParams() {
  const { queryParams, setQueryParams } = useQueryParams()

  const inseeCode = queryParams.get(metricParamsName)

  const setInseeCode = useCallback(
    (metric: string) => {
      setQueryParams({ [metricParamsName]: metric })
    },
    [setQueryParams]
  )

  return { inseeCode, setInseeCode }
}
