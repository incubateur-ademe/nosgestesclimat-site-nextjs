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

export type OrganizationOwner = {
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
  additionalQuestions: [string]
  numberOfParticipants: number
}

export type Organization = {
  owner: OrganizationOwner
  polls: OrganizationPoll[]
  name: string
  slug: string
  lastModifiedDate: Date
  verificationCode: {
    code: string
    expirationDate: Date
  }
}
