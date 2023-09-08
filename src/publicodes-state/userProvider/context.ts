'use client'

import { createContext } from 'react'
import { Simulation, Tutorials, User } from '../types'

type UserContextType = {
  user: User
  setUser: (user: User | ((prevUser: User) => void)) => void
  tutorials: Tutorials
  setTutorials: (
    tutorials: Tutorials | ((prevTutorials: Tutorials) => void)
  ) => void
  simulations: Simulation[]
  setSimulations: (
    simulations: Simulation[] | ((prevSimulation: Simulation[]) => void)
  ) => void
  currentSimulationId: string
  setCurrentSimulationId: (currentSimulationId: string) => void
}

export default createContext<UserContextType>({
  user: {
    region: {
      code: '',
      name: '',
    },
    initialRegion: {
      code: '',
      name: '',
    },
    name: '',
    email: '',
  },
  setUser: () => {},
  tutorials: {},
  setTutorials: () => {},
  simulations: [],
  setSimulations: () => {},
  currentSimulationId: '',
  setCurrentSimulationId: () => {},
})
