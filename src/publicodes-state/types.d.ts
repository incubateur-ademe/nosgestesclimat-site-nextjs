import { Group } from '@/types/groups'
import { NGCRule } from '@incubateur-ademe/nosgestesclimat'
import {
  EvaluatedNode,
  Evaluation,
  Engine as PublicodesEngine,
  RuleNode,
} from 'publicodes'

export type DottedName = string

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

export type Rules = any

export type Tutorials = Record<string, boolean>

export type Situation = Record<DottedName, NodeValue>

export type Suggestion = {
  label: string
  value: any // TODO: sorry...
  // value:
  //   | NodeValue
  //   | {
  //       [key: string]: NodeValue
  //     }
}

export type Engine = PublicodesEngine

export type NGCRuleNode = RuleNode & {
  rawNode: NGCRule
}

export type NGCRulesNodes = Record<DottedName, NGCRuleNode>

export type NGCEvaluatedNode = EvaluatedNode
export type ActionChoices = Record<string, boolean>

export type NodeValue = Evaluation

export type ComputedResults = {
  bilan: number
  categories: Record<string, number>
}
export type Simulation = {
  id: string
  date: Date | string
  situation: Situation
  foldedSteps: DottedName[]
  actionChoices: ActionChoices
  persona?: DottedName
  computedResults?: ComputedResults
  progression: number
  defaultAdditionalQuestionsAnswers?: Record<string, string>
  customAdditionalQuestionsAnswers?: Record<string, string>
  polls?: string[] | null
  groups?: string[] | null
  savedViaEmail?: boolean
}

type UpdateCurrentSimulationProps = {
  situation?: Situation
  situationToAdd?: Situation
  foldedStepToAdd?: string
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

export type Persona = {
  nom: string
  icônes: string
  situation: Situation
  description?: string
  résumé: string
}

export type LocalStorage = {
  user: User
  tutorials: Tutorials
  simulations: Simulation[]
  currentSimulationId: string
  groupToRedirectToAfterTest?: Group
}

type Color = `#${string}`

type SuggestionsNode = Record<
  string,
  string | number | Record<string, string | number>
>

type MosaiqueNode = {
  type: 'selection' | 'nombre'
  options: DottedName[]
  total?: number
  suggestions?: SuggestionsNode
}

type MosaicInfos = {
  mosaicRule: RuleNode
  mosaicParams: MosaiqueNode
  mosaicDottedNames: [DottedName, NGCRuleNode][]
}

type Formule = any

export type MigrationType = {
  keysToMigrate: Record<DottedName, DottedName>
  valuesToMigrate: Record<DottedName, Record<string, NodeValue>>
}
