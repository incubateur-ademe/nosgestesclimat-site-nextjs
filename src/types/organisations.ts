import { Simulation } from '@/publicodes-state/types'

export type OrganisationSimulation = Simulation & {
  bilan: number
  categories: {
    transports: number
    logement: number
    alimentation: number
    divers: number
    services: number
  }
}

export type OrganisationAdministrator = {
  name?: string
  email: string
  position?: string
  telephone?: string
  hasOptedInForCommunications?: boolean
}

export type OrganisationPoll = {
  simulations: [OrganisationSimulation]
  startDate: Date
  endDate: Date
  name: string
  slug: string
  defaultAdditionalQuestions: [string]
  numberOfExpectedParticipants: number
}

export type Organisation = {
  administrators: OrganisationAdministrator[]
  polls: OrganisationPoll[]
  name: string
  slug: string
  lastModifiedDate: Date
  verificationCode: {
    code: string
    expirationDate: Date
  }
}

export type SimulationRecap = {
  bilan: number
  categories: {
    [key: string]: number
  }
  defaultAdditionalQuestionsAnswers: Record<string, number | string>
  progression: number
  isCurrentUser?: boolean
  date: string
}

export type PollData = {
  funFacts: FunFacts
  simulationRecaps: SimulationRecap[]
  organisationName: string
  isAdmin: boolean
  defaultAdditionalQuestions: ('postalCode' | 'birthdate')[]
}

export type PollInfo = {
  startDate: string
  endDate: string
  name: string
  slug: string
  defaultAdditionalQuestions: ('postalCode' | 'birthdate')[]
  numberOfParticipants: number
  expectedNumberOfParticipants: number
  organisationInfo: OrganisationInfo
}

export type OrganisationInfo = {
  name: string
  slug: string
}

export type FunFacts = {
  percentageOfBicycleUsers: number
  percentageOfVegetarians: number
  percentageOfCarOwners: number
  percentageOfPlaneUsers: number
  percentageOfLongPlaneUsers: number
  averageOfCarKilometers: number
  averageOfTravelers: number
  percentageOfElectricHeating: number
  percentageOfGasHeating: number
  percentageOfFuelHeating: number
  percentageOfWoodHeating: number
  averageOfElectricityConsumption: number
  percentageOfCoolingSystem: number
  percentageOfVegan: number
  percentageOfRedMeat: number
  percentageOfLocalAndSeasonal: number
  percentageOfBottledWater: number
  percentageOfZeroWaste: number
  amountOfClothing: number
  percentageOfStreaming: number
}
