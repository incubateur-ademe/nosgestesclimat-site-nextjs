import { Group } from '@/types/groups'
import {
  DottedName,
  Metrics,
  SuggestionValue,
} from '@incubateur-ademe/nosgestesclimat'
import PublicodesEngine, {
  EvaluatedNode,
  ParsedRules as PublicodesParsedRules,
  Situation as PublicodesSituation,
} from 'publicodes'

// Utils

// Could be in index.d.ts as ambiant type
export type Entries<T> = [keyof T, T[keyof T]][]

// User and simulation types

export type UserOrganisationInfo = {
  administratorEmail?: string
  slug?: string
  name?: string
}

export type RegionFromGeolocation = { code: string; name: string }

export type User = {
  region?: {
    code: string
    name: string
  }
  userId: string
  name?: string
  email?: string
  initialRegion: RegionFromGeolocation
  northStarRatings?: any // TODO: should be NorthStartType or something
  loginExpirationDate?: Date
  organisation?: UserOrganisationInfo
  administratorEmail?: string
}

export type Tutorials = Record<string, boolean>

export type ComputedResultsFootprint = {
  bilan: number
  categories: Record<DottedName, number>
}
export type ComputedResults = Record<Metric, ComputedResultsFootprint>

export type UpdateCurrentSimulationProps = {
  situation?: Situation
  situationToAdd?: Situation
  foldedStepToAdd?: DottedName
  actionChoices?: any
  defaultAdditionalQuestionsAnswers?: Record<string, string>
  customAdditionalQuestionsAnswers?: Record<string, string>
  computedResults?: ComputedResults
  progression?: number
  pollToAdd?: string | null
  pollToDelete?: string | null
  groupToAdd?: string | null
  groupToDelete?: string | null
  savedViaEmail?: boolean
}

export type Simulation = {
  id: string
  date: Date | string
  situation: Situation
  foldedSteps: DottedName[]
  actionChoices: any
  persona?: string
  computedResults: ComputedResults
  progression: number
  defaultAdditionalQuestionsAnswers?: Record<string, string>
  customAdditionalQuestionsAnswers?: Record<string, string>
  polls?: string[] | null
  groups?: string[] | null
  savedViaEmail?: boolean
}

export type LocalStorage = {
  user: User
  tutorials: Tutorials
  simulations: Simulation[]
  currentSimulationId: string
  groupToRedirectToAfterTest?: Group
}

// Not used for now
export type ActionChoices = Record<DottedName, boolean>

export type Metric = Metrics

export type Situation = PublicodesSituation<DottedName>

export type ParsedRules = PublicodesParsedRules<DottedName>

export type Engine = PublicodesEngine<DottedName>

export type MissingVariables = Record<DottedName, number>

export type NGCEvaluatedNode = EvaluatedNode

export type FormattedSuggestion = {
  label: string
  value: SuggestionValue | Record<string, SuggestionValue>
}

export type SuggestionType = 'radio' | 'checkbox' | 'multiple'
