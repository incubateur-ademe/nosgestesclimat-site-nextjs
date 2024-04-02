import { Group } from '@/types/groups'
import {
  EvaluatedNode,
  Evaluation,
  Engine as PublicodesEngine,
  Rule,
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
  region: {
    code: string
    name: string
  }
  initialRegion: RegionFromGeolocation
  name: string
  email: string
  northStarRatings?: any // TODO: should be NorthStartType or something
  userId: string
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
  persona?: string
  computedResults?: ComputedResults
  progression?: number
  defaultAdditionalQuestionsAnswers?: Record<string, string>
  polls?: string[] | null
  groups?: string[] | null
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

type NGCRule = Rule & {
  abréviation?: string
  couleur?: Color
  mosaique?: MosaiqueNode
  type?: string
  sévérité?: string
  action?: { dépasse: string[] }
  icônes?: string
  sévérité?: 'avertissement' | 'information' | 'invalide'
  dottedName?: DottedName
  question?: string
  plus?: boolean
  formule?: Formule
  aide?: string
  inactif?: string
  résumé?: string
  plancher?: number
  avertissement?: string
}

export type NGCRules = Record<DottedName, NGCRule>

export type MigrationType = {
  keysToMigrate: Record<DottedName, DottedName>
  valuesToMigrate: Record<DottedName, Record<string, NodeValue>>
}
