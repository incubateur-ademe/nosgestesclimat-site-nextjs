import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { v4 as uuidv4 } from 'uuid'
import { getGeolocation } from '../api/getGeolocation'
import { generateSimulation } from '../simulation/generateSimulation'

export async function resetLocalStorage() {
  const initialRegion = await getGeolocation()

  const defaultSimulation = generateSimulation()

  const resettedUser = {
    region: initialRegion,
    initialRegion: initialRegion,
    userId: uuidv4(),
  }

  safeLocalStorage.setItem(
    'nosgestesclimat::v3',
    JSON.stringify({
      user: resettedUser,
      simulations: [defaultSimulation],
      currentSimulationId: defaultSimulation.id,
    })
  )
}
