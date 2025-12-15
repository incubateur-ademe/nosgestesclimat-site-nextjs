import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'

export function useSimulationIdInQueryParams(): {
  simulationIdInQueryParams: string | null
} {
  const searchParams = getSearchParamsClientSide()

  const encodedSimulationIdInQueryParams = searchParams.get('sid')

  const simulationIdInQueryParams = encodedSimulationIdInQueryParams
    ? decodeURIComponent(encodedSimulationIdInQueryParams)
    : null

  return { simulationIdInQueryParams }
}
