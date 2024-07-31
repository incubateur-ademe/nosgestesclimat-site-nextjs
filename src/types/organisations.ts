import {
  DottedName,
  FunFacts,
  Simulation,
  Situation,
} from '@/publicodes-state/types'

export type OrganisationAdministrator = {
  name?: string
  email: string
  position?: string
  telephone?: string
  hasOptedInForCommunications?: boolean
}

export type CustomAdditionalQuestions = {
  question: string
  isEnabled: boolean
  _id?: string
}

export type OrganisationPoll = {
  _id: string
  simulations: [Simulation]
  startDate: Date
  endDate: Date
  name: string
  slug: string
  defaultAdditionalQuestions: [string]
  customAdditionalQuestions?: CustomAdditionalQuestions[]
  numberOfExpectedParticipants: number
  createdAt: Date
}

export type Organisation = {
  _id?: string
  administrators: OrganisationAdministrator[]
  polls: OrganisationPoll[]
  name: string
  slug: string
  lastModifiedDate: Date
  verificationCode: {
    code: string
    expirationDate: Date
  }
  organisationType?: string
  numberOfCollaborators?: number
}

export type SimulationRecap = {
  bilan: number
  categories: Record<DottedName, number>
  defaultAdditionalQuestionsAnswers: Record<string, number | string>
  customAdditionalQuestionsAnswers: Record<string, number | string>
  progression: number
  isCurrentUser?: boolean
  date: string
  situation: Situation
}

export type PollData = {
  name: string
  createdAt: string
  funFacts: FunFacts
  simulationRecaps: SimulationRecap[]
  organisationName: string
  isAdmin: boolean
  defaultAdditionalQuestions: ('postalCode' | 'birthdate')[]
  customAdditionalQuestions: CustomAdditionalQuestions[]
}

export type PollInfo = {
  _id?: string
  startDate: string
  endDate: string
  name: string
  slug: string
  defaultAdditionalQuestions: ('postalCode' | 'birthdate')[]
  numberOfParticipants: number
  expectedNumberOfParticipants: number
  organisationInfo: OrganisationInfo
  customAdditionalQuestions: CustomAdditionalQuestions[]
  simulations?: Simulation[]
}

export type OrganisationInfo = {
  name: string
  slug: string
}

export type UpdatePollProps = {
  name?: string
  defaultAdditionalQuestions?: string[]
  customAdditionalQuestions?: CustomAdditionalQuestions
}
