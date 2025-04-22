'use client'
import type {
  DottedName,
  NGCRuleNode,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'
import { createContext } from 'react'
import type {
  Engine,
  Metric,
  MissingVariables,
  ParsedRules,
  Situation,
} from '../../types'

type EngineContextType = {
  rules: NGCRules | undefined
  engine: Engine | undefined
  pristineEngine?: Engine | null
  safeGetRule: (rule: DottedName) => NGCRuleNode | undefined
  safeEvaluate: (
    rule: PublicodesExpression,
    metric?: Metric
  ) => EvaluatedNode | null
  parsedRules?: ParsedRules
  everyRules: DottedName[]
  everyInactiveRules: DottedName[]
  everyQuestions: DottedName[]
  everyNotifications: DottedName[]
  everyUiCategories: DottedName[]
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  rawMissingVariables: MissingVariables
  categories: DottedName[]
  subcategories: DottedName[]
  addToEngineSituation: (situationToAdd: Situation) => Situation
  isInitialized: boolean
}
export const EngineContext = createContext<EngineContextType>({
  rules: undefined,
  engine: undefined,
  pristineEngine: null,
  safeGetRule: () => undefined,
  safeEvaluate: () => null,
  parsedRules: {} as ParsedRules,
  everyRules: [],
  everyInactiveRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyUiCategories: [],
  everyMosaicChildrenWithParent: {} as Record<DottedName, DottedName[]>,
  rawMissingVariables: {} as MissingVariables,
  categories: [],
  subcategories: [],
  addToEngineSituation: () => ({}) as Situation,
  isInitialized: false,
})
