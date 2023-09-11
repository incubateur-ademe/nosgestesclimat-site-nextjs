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
  safeGetRule: (rule: string) => NGCRuleNode | null
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  situation: Situation
  updateSituation: (situationToAdd: Situation) => Promise<void>
  everyQuestions: string[]
  everyMosaic: string[]
  everyNotifications: string[]
  everyMosaicChildWhoIsReallyInMosaic: string[]
}
export default createContext<SimulationContextType>({
  rules: null,
  engine: null,
  safeGetRule: () => null,
  safeEvaluate: () => null,
  situation: {},
  updateSituation: () => Promise.resolve(),
  everyQuestions: [],
  everyMosaic: [],
  everyNotifications: [],
  everyMosaicChildWhoIsReallyInMosaic: [],
})
