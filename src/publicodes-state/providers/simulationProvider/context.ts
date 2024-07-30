'use client'
import { PublicodesExpression } from 'publicodes'
import { createContext } from 'react'
import {
  DottedName,
  Engine,
  Metric,
  MissingVariables,
  NGCEvaluatedNode,
  NGCRuleNode,
  ParsedRules,
  Rules,
  Situation,
} from '../../types'

type SimulationContextType = {
  rules: Rules | null
  engine: Engine | null
  pristineEngine: Engine | null
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (
    rule: PublicodesExpression,
    metric?: Metric
  ) => NGCEvaluatedNode | null
  parsedRules: ParsedRules
  everyRules: DottedName[]
  everyInactiveRules: DottedName[]
  everyQuestions: DottedName[]
  everyNotifications: DottedName[]
  everyUiCategories: DottedName[]
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  rawMissingVariables: MissingVariables
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
  parsedRules: {} as ParsedRules,
  everyRules: [],
  everyInactiveRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyUiCategories: [],
  everyMosaicChildrenWithParent: {} as Record<DottedName, DottedName[]>,
  rawMissingVariables: {} as MissingVariables,
  categories: [],
  subcategories: {} as Record<DottedName, DottedName[]>,
  addToEngineSituation: () => ({}) as Situation,
  isInitialized: false,
})
