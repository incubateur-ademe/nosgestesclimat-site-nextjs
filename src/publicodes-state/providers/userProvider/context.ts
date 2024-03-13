'use client'

import { Dispatch, SetStateAction, createContext } from 'react'
import { v4 as uuid } from 'uuid'
import { MigrationType, Simulation, Tutorials, User } from '../../types'

type UserContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  tutorials: Tutorials
  setTutorials: Dispatch<SetStateAction<Tutorials>>
  simulations: Simulation[]
  setSimulations: Dispatch<SetStateAction<Simulation[]>>
  currentSimulationId: string
  setCurrentSimulationId: Dispatch<SetStateAction<string>>
  migrationInstructions: MigrationType
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
    userId: uuid(),
    administratorEmail: '',
  },
  setUser: () => {},
  tutorials: {},
  setTutorials: () => {},
  simulations: [],
  setSimulations: () => {},
  currentSimulationId: '',
  setCurrentSimulationId: () => {},
  migrationInstructions: {
    keysToMigrate: {},
    valuesToMigrate: {},
  },
})
