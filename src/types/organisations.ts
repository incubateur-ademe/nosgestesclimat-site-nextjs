import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import type {
  ComputedResults,
  Simulation,
  Situation,
} from '@/publicodes-state/types'
import type { FunFacts } from '@incubateur-ademe/nosgestesclimat'

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
  name?: string | null
  email: string
  position?: string | null
  telephone?: string | null
  optedInForCommunications?: boolean | null
}

export type CustomAdditionalQuestions = {
  question: string
  isEnabled: boolean
  _id?: string
}

export type OrganisationPoll = {
  id: string
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
  id: string
  administrators: [OrganisationAdministrator]
  polls: OrganisationPoll[]
  name: string
  slug: string
  type?: OrganisationTypeEnum | null
  numberOfCollaborators?: number | null
}

export type SimulationRecap = {
  computedResults: ComputedResults
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

export type OrgaSettingsInputsType = {
  name: string
  email: string
  position?: string
  administratorName?: string
  numberOfCollaborators?: number
  administratorTelephone?: string
  hasOptedInForCommunications?: boolean
  organisationType?: OrganisationTypeEnum
}
