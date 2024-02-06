import { Simulation } from '@/publicodes-state/types'

export type OrganizationSimulation = Simulation & {
  bilan: number
  categories: {
    transports: number
    logement: number
    alimentation: number
    divers: number
    services: number
  }
}

export type OrganizationAdministrator = {
  name?: string
  email: string
  position?: string
  telephone?: string
  hasOptedInForCommunications?: boolean
}

export type OrganizationPoll = {
  simulations: [OrganizationSimulation]
  startDate: Date
  endDate: Date
  name: string
  defaultAdditionalQuestions: [string]
  numberOfParticipants: number
}

export type Organization = {
  administrators: OrganizationAdministrator[]
  polls: OrganizationPoll[]
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
  defaultAdditionalQuestions: Record<string, number | string>
  progression: number
  isCurrentUser?: boolean
}

export type PollData = {
  funFacts: {
    percentageOfBicycleUsers: number
    percentageOfVegetarians: number
    percentageOfCarOwners: number
  }
  simulationsRecap: SimulationRecap[]
}
