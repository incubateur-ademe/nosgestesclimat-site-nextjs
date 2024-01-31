'use client'
import { createContext } from 'react'
import {
  DottedName,
  Engine,
  NGCEvaluatedNode,
  NGCRuleNode,
  Rules,
  Situation,
} from '../../types'

type SimulationContextType = {
  rules: Rules
  engine: Engine
  pristineEngine: Engine
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: DottedName) => NGCEvaluatedNode | null
  situation: Situation
  updateSituation: (situationToAdd: Situation) => Promise<void>
  updateProgression: (progression: number) => void
  foldedSteps: DottedName[]
  addFoldedStep: (foldedStep: DottedName) => void
  everyRules: DottedName[]
  everyInactiveRules: DottedName[]
  everyQuestions: DottedName[]
  everyNotifications: DottedName[]
  everyMosaic: DottedName[]
  everyMosaicChildren: DottedName[]
  categories: DottedName[]
  subcategories: Record<DottedName, DottedName[]>
}
export default createContext<SimulationContextType>({
  rules: null,
  engine: null,
  pristineEngine: null,
  safeGetRule: () => null,
  safeEvaluate: () => null,
  situation: {},
  updateSituation: () => Promise.resolve(),
  updateProgression: () => Promise.resolve(),
  foldedSteps: [],
  addFoldedStep: () => '',
  everyRules: [],
  everyInactiveRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyMosaic: [],
  everyMosaicChildren: [],
  categories: [],
  subcategories: {},
})
