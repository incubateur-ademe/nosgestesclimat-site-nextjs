import { Simulation } from '@/types/simulation'
import { formatDataForDB } from '@/utils/formatDataForDB'
import { useMutation } from '@tanstack/react-query'

type Props = {
  data: Simulation
}
// TODO: need real endpoint and use Axios
export default function useSaveSimulationInDB() {
  return useMutation(async ({ data }: Props): Promise<any> => {
    const dataFormatted = { ...data }

    if (dataFormatted.situation) {
      dataFormatted.situation = formatDataForDB(dataFormatted)
    }

    const response = await fetch(
      'https://nosgestesclimat-pr27.osc-fr1.scalingo.io/email-simulation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: dataFormatted,
        }),
      }
    )

    const simulationSaved = await response.json()
    return simulationSaved
  })
}
