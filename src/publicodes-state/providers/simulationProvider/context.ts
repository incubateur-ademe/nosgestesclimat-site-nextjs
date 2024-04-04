'use client'
import { PublicodesExpression } from 'publicodes'
import { createContext } from 'react'
import {
  DottedName,
  Engine,
  NGCEvaluatedNode,
  NGCRuleNode,
  NGCRules,
} from '../../types'

type SimulationContextType = {
  rules: NGCRules | null
  engine: Engine
  pristineEngine: Engine
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  everyRules: DottedName[]
  everyInactiveRules: DottedName[]
  everyQuestions: DottedName[]
  everyNotifications: DottedName[]
  everyMosaic: DottedName[]
  everyMosaicChildren: DottedName[]
  rawMissingVariables: Record<string, number>
  categories: DottedName[]
  subcategories: Record<DottedName, DottedName[]>
}
export const SimulationContext = createContext<SimulationContextType>({
  rules: null,
  engine: null,
  pristineEngine: null,
  safeGetRule: () => null,
  safeEvaluate: () => null,
  everyRules: [],
  everyInactiveRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyMosaic: [],
  everyMosaicChildren: [],
  rawMissingVariables: {},
  categories: [],
  subcategories: {},
})
