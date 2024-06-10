import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'
import { Situation } from '../types'
import { safeEvaluateHelper } from './safeEvaluateHelper'
import { safeGetSituation } from './safeGetSituation'

type Props = {
  rules?: any
  situation: Situation
}

// Helper version of the useDisposableEngine hook, usable in a loop
export function getDisposableEngine({ rules, situation }: Props) {
  const engine = new Engine(rules, { allowOrphanRules: true }).setSituation(
    safeGetSituation({ situation, everyRules: Object.keys(rules) })
  )

  const safeEvaluate = (rule: string, engineUsed = engine) =>
    safeEvaluateHelper(rule, engineUsed)

  const getValue = (dottedName: DottedName) =>
    safeEvaluate(dottedName, engine)?.nodeValue

  return { engine, getValue, safeEvaluate }
}
