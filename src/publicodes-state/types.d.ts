import { Group } from '@/types/groups'
import {
  DottedName,
  Metrics,
  Persona as NGCPersona,
  Personas as NGCPersonas,
  NGCRule,
  NGCRules,
  SuggestionValue,
} from '@incubateur-ademe/nosgestesclimat'
import PublicodesEngine, {
  EvaluatedNode,
  Evaluation,
  ParsedRules as PublicodesParsedRules,
  Situation as PublicodesSituation,
  RuleNode,
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
  actionChoices?: ActionChoices
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
  actionChoices: ActionChoices
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

export type ActionChoices = Record<DottedName, boolean>

// Model types

export type {
  DottedName,
  FunFacts,
  Suggestions,
  SupportedRegion,
  SupportedRegions,
} from '@incubateur-ademe/nosgestesclimat'

export type Metric = Metrics

export type Rules = NGCRules

export type Rule = NGCRule

export type Situation = PublicodesSituation<DottedName>

export type ParsedRules = PublicodesParsedRules<DottedName>

export type Engine = PublicodesEngine<DottedName>

export type MissingVariables = Record<DottedName, number>

export type NGCRuleNode = RuleNode<DottedName> & {
  rawNode: NGCRule
}

export type NGCEvaluatedNode = EvaluatedNode

export type NodeValue = Evaluation

export type Persona = NGCPersona

export type Personas = NGCPersonas

export type FormattedSuggestion = {
  label: string
  value: SuggestionValue | Record<string, SuggestionValue>
}
