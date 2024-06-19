import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'
import { Rules, Situation } from '../types'
import { safeEvaluateHelper } from './safeEvaluateHelper'

type Props = {
  rules?: Rules
  situation: Situation
}

// Helper version of the useDisposableEngine hook, usable in a loop
export function getDisposableEngine({ rules, situation }: Props) {
  const engine = new Engine(rules, {
    strict: {
      situation: false,
      noOrphanRule: false,
    },
  }).setSituation(situation)

  const safeEvaluate = (rule: string, engineUsed = engine) =>
    safeEvaluateHelper(rule, engineUsed)

  const getValue = (dottedName: DottedName) =>
    safeEvaluate(dottedName, engine)?.nodeValue

  return { engine, getValue, safeEvaluate }
}
