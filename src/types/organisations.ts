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
  funFacts: {
    percentageOfBicycleUsers: number
    percentageOfVegetarians: number
    percentageOfCarOwners: number
  }
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

type OrganisationInfo = {
  name: string
  slug: string
}
