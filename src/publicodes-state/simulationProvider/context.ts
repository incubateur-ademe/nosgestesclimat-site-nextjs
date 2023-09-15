'use client'
import { createContext } from 'react'
import {
  Engine,
  NGCEvaluatedNode,
  NGCRuleNode,
  Rules,
  Situation,
} from '../types'

type SimulationContextType = {
  rules: Rules
  engine: Engine
  pristineEngine: Engine
  safeGetRule: (rule: string) => NGCRuleNode | null
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  situation: Situation
  updateSituation: (situationToAdd: Situation) => Promise<void>
  foldedSteps: string[]
  addFoldedStep: (foldedStep: string) => void
  everyRules: string[]
  everyQuestions: string[]
  everyNotifications: string[]
  everyMosaicChildWhoIsReallyInMosaic: string[]
  categories: string[]
  subcategories: Record<string, string[]>
}
export default createContext<SimulationContextType>({
  rules: null,
  engine: null,
  pristineEngine: null,
  safeGetRule: () => null,
  safeEvaluate: () => null,
  situation: {},
  updateSituation: () => Promise.resolve(),
  foldedSteps: [],
  addFoldedStep: () => '',
  everyRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyMosaicChildWhoIsReallyInMosaic: [],
  categories: [],
  subcategories: {},
})
