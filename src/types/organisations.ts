import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import type { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import type {
  ComputedResults,
  Simulation,
  Situation,
} from '@/publicodes-state/types'
import type { FunFacts } from '@incubateur-ademe/nosgestesclimat'

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
}

export type OrganisationPoll = {
  id: string
  name: string
  slug: string
  // TO DEPRECATE
  simulations: Simulation[]
  expectedNumberOfParticipants?: number
  defaultAdditionalQuestions?: PollDefaultAdditionalQuestion[]
  customAdditionalQuestions?: CustomAdditionalQuestions[]
  createdAt: string
  updatedAt: string
}

export type Organisation = {
  id: string
  administrators: [OrganisationAdministrator]
  polls?: Omit<OrganisationPoll, 'simulations'>[]
  name: string
  slug: string
  type?: OrganisationTypeEnum | null
  numberOfCollaborators?: number | null
  hasCustomQuestionEnabled: boolean
}

// TO DEPRECATE
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
  defaultAdditionalQuestions: PollDefaultAdditionalQuestion[]
  customAdditionalQuestions: CustomAdditionalQuestions[]
}

export type PollInfo = {
  _id?: string
  name: string
  slug: string
  defaultAdditionalQuestions: ('postalCode' | 'birthdate')[]
  numberOfParticipants: number
  expectedNumberOfParticipants: number
  organisationInfo: {
    name: string
    slug: string
  }
  customAdditionalQuestions: CustomAdditionalQuestions[]
  simulations?: Simulation[]
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
