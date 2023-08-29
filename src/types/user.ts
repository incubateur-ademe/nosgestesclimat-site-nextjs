import { Simulation } from './simulation'

export type User = {
  region: {
    code: string
    name: string
  }
  initialRegion: {
    code: string
    name: string
  }
  name: string
  email: string
}

export type UserContextType = {
  user: User
  setUser: (prevUser: any) => void
  simulations: Simulation[]
  setSimulations: (simulations: Simulation[]) => void
  currentSimulation: string
  setCurrentSimulation: (currentSimulationId: string) => void
}
