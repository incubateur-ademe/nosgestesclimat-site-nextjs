import { useSearchParams } from 'next/navigation'

export function useSimulationIdInQueryParams(): {
  simulationIdInQueryParams: string | null
} {
  const searchParams = useSearchParams()

  const encodedSimulationIdInQueryParams = searchParams.get('sid')

  const simulationIdInQueryParams = encodedSimulationIdInQueryParams
    ? decodeURIComponent(encodedSimulationIdInQueryParams)
    : null

  return { simulationIdInQueryParams }
}
