import type { Group } from '@/types/groups'
import type {
  DottedName,
  ExtendedSituation,
  Metrics,
  NGCRuleNode,
  NodeValue,
  SuggestionValue,
} from '@incubateur-ademe/nosgestesclimat'
import type PublicodesEngine from 'publicodes'
import type {
  EvaluatedNode,
  NodeKind,
  PublicodesExpression,
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
  userId: string
  name?: string
  email?: string
  region?: RegionFromGeolocation
  initialRegion?: RegionFromGeolocation
  northStarRatings?: any // TODO: should be NorthStartType or something
  loginExpirationDate?: Date
  organisation?: UserOrganisationInfo
  administratorEmail?: string
}

export type Tutorials = Record<string, boolean>

export type ComputedResultsSubcategories = {
  transport: Record<DottedName, number>
  logement: Record<DottedName, number>
  alimentation: Record<DottedName, number>
  divers: Record<DottedName, number>
  'services sociétaux': Record<DottedName, number>
}

export type ComputedResultsFootprint = {
  bilan: number
  categories: Record<DottedName, number>
  subcategories?: Record<DottedName, number>
}
export type ComputedResults = Record<Metric, ComputedResultsFootprint>

export type UpdateCurrentSimulationProps = {
  situation?: Situation
  foldedSteps?: DottedName[]
  foldedStepToAdd?: {
    foldedStep: DottedName
    value?: NodeValue
    isMosaicParent?: boolean
    isMosaicChild?: boolean
  }
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
  extendedSituation: ExtendedSituation
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
  model?: string
}

export type LocalStorage = {
  user: User
  tutorials: Tutorials
  simulations: Simulation[]
  currentSimulationId: string
  groupToRedirectToAfterTest?: Group
}

export type Metric = Metrics

export type Situation = PublicodesSituation<DottedName>

export type ParsedRules = PublicodesParsedRules<DottedName>

export type Engine = PublicodesEngine<DottedName>

export type MissingVariables = Record<DottedName, number>

export type FormattedSuggestion = {
  label: string
  value: SuggestionValue | Record<string, SuggestionValue>
}

export type Action = {
  dottedName: DottedName
  value: number
} & (EvaluatedNode & NGCRuleNode)

export type PublicodesValue = string | number | boolean

export type SafeEvaluate = <T extends PublicodesValue = PublicodesValue>(
  rule: PublicodesExpression,
  metric?: Metric
) => EvaluatedNode<NodeKind, T> | null
