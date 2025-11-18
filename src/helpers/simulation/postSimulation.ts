import { SIMULATION_URL } from '@/constants/urls/main'
import type { Simulation } from '@/publicodes-state/types'

type Props = {
  simulation: Simulation
  sendEmail?: boolean
  userId: string
}

export async function postSimulation({
  simulation,
  userId,
  sendEmail = false,
}: Props) {
  const payload = { ...simulation }

  const url = new URL(`${SIMULATION_URL}/${userId}`)

  url.searchParams.set('sendEmail', sendEmail.toString())

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}
