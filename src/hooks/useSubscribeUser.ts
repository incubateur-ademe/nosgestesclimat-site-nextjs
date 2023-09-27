import { Simulation } from '@/publicodes-state/types'
import { formatDataForDB } from '@/utils/formatDataForDB'
import * as Sentry from '@sentry/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  simulation: Simulation
  email: string
  optIn: boolean
}
export function useSubscribeUser() {
  return useMutation(
    async ({ simulation, email, optIn }: Props): Promise<any> => {
      const idSimulationSaved: string = await saveSimulationInDB(
        simulation as unknown as Simulation
      )

      if (!idSimulationSaved)
        return Promise.reject(Error(`Impossible d'enregistrer la simulation`))

      return axios.post(`/api/email-service`, {
        email,
        optIn,
        simulationURL:
          location.toString().replace('/fin', '/mon-empreinte-carbone') +
          `&sid=${encodeURIComponent(
            idSimulationSaved
          )}&mtm_campaign=retrouver-ma-simulation`,
        // URL already contains the query param details
        shareURL:
          location
            .toString()
            .replace('/fin', '/mon-empreinte-carbone/partage') +
          '&mtm_campaign=partage-email',
      })
    }
  )
}

const saveSimulationInDB = async (data: Simulation) => {
  const dataFormatted = { ...data }

  if (dataFormatted.situation) {
    dataFormatted.situation = formatDataForDB(dataFormatted)
  }

  console.log(dataFormatted)

  try {
    const response = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SERVER_URL}/email-simulation`,
      {
        data: dataFormatted,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const idSimulationSaved = response.data
    return idSimulationSaved
  } catch (e) {
    Sentry.captureException(e)
  }
}
