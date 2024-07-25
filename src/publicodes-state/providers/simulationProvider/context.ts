'use client'
import { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import Engine, { PublicodesExpression } from 'publicodes'
import { createContext } from 'react'
import {
  DottedName,
  Metric,
  NGCEvaluatedNode,
  NGCRuleNode,
  NGCRulesNodes,
  Situation,
} from '../../types'

type SimulationContextType = {
  rules: NGCRules | null
  engine: Engine | null
  pristineEngine: Engine | null
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (
    rule: PublicodesExpression,
    metric?: Metric
  ) => NGCEvaluatedNode | null
  parsedRules: NGCRulesNodes
  everyRules: DottedName[]
  everyInactiveRules: DottedName[]
  everyQuestions: DottedName[]
  everyNotifications: DottedName[]
  everyUiCategories: DottedName[]
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  rawMissingVariables: Record<string, number>
  categories: DottedName[]
  subcategories: Record<DottedName, DottedName[]>
  addToEngineSituation: (situationToAdd: Situation) => Situation
  isInitialized: boolean
}
export const SimulationContext = createContext<SimulationContextType>({
  rules: null,
  engine: null,
  pristineEngine: null,
  safeGetRule: () => null,
  safeEvaluate: () => null,
  parsedRules: {},
  everyRules: [],
  everyInactiveRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyUiCategories: [],
  everyMosaicChildrenWithParent: {},
  rawMissingVariables: {},
  categories: [],
  subcategories: {},
  addToEngineSituation: () => ({}) as Situation,
  isInitialized: false,
})
