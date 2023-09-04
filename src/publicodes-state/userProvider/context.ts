'use client'

import { Simulation } from '@/types/simulation'
import { User } from '@/types/user'
import { createContext } from 'react'

type UserContextType = {
  user: User
  setUser: (prevUser: User) => void
  tutorials: object
  setTutorials: (prevTutorials: object) => void
  simulations: Simulation[]
  setSimulations: (simulations: Simulation[]) => void
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
