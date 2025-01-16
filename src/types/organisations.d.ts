import type { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import type { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import type { SimulationAdditionalQuestionAnswerType } from '@/constants/organisations/simulationAdditionalQuestionAnswerType'
import type { ComputedResults, Situation } from '@/publicodes-state/types'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'

type CustomAdditionalQuestions = {
  question: string
  isEnabled: boolean
}

type User = {
  id: string
  name?: string
  email?: string
}

type VerifiedUser = {
  id: string
  email: string
  name?: string | null
  telephone?: string | null
  position?: string | null
  optedInForCommunications: boolean
  createdAt: string
  updatedAt: string | null
}

type BaseOrganisation = {
  id: string
  name: string
  slug: string
  administrators?: [VerifiedUser]
  polls?: Omit<OrganisationPoll, 'simulations'>[]
  type?: OrganisationTypeEnum | null
  numberOfCollaborators?: number | null
  hasCustomQuestionEnabled?: boolean
  createdAt?: string
  updatedAt?: string | null
}

export type Organisation = Required<BaseOrganisation>

type PublicOrganisation = BaseOrganisation & {
  administrators?: undefined
  polls?: undefined
  type?: undefined
  numberOfCollaborators?: undefined
  hasCustomQuestionEnabled?: undefined
  createdAt?: undefined
  updatedAt?: undefined
}

type BaseOrganisationPoll = {
  id: string
  name: string
  slug: string
  expectedNumberOfParticipants?: number
  defaultAdditionalQuestions?: PollDefaultAdditionalQuestion[]
  customAdditionalQuestions?: CustomAdditionalQuestions[]
  createdAt: string
  updatedAt: string
  organisation: Omit<Organisation, 'polls'> | PublicOrganisation
  simulations: {
    count: number
    finished: number
    hasParticipated: boolean
  }
}

export type OrganisationPoll = BaseOrganisationPoll & {
  organisation: Omit<Organisation, 'polls'>
}

export type PublicOrganisationPoll = BaseOrganisationPoll & {
  organisation: PublicOrganisation
}

export type AdditionalQuestionsAnswer =
  | {
      type: SimulationAdditionalQuestionAnswerType.default
      key: PollDefaultAdditionalQuestion
      answer: string
    }
  | {
      type: SimulationAdditionalQuestionAnswerType.custom
      key: string
      answer: string
    }

export type Simulation = {
  id: string
  date: Date | string
  situation: Situation
  foldedSteps: DottedName[]
  actionChoices: Record<string, boolean>
  computedResults: ComputedResults
  progression: number
  additionalQuestionsAnswers: AdditionalQuestionsAnswer[]
  savedViaEmail?: boolean
  /**
   * user is defined only for the current user and undefined for others
   */
  user?: User
  polls?: Array<{ id: string; slug: string }>
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
