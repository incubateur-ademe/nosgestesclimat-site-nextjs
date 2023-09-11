import Engine from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluate as safeEvaluateHelper } from '../helpers/safeEvaluate'

type Props = {
  rules?: any
  situation: any
}

export const safeGetSituation = ({ situation, rules }: any): any =>
  situation
    ? Object.fromEntries(
        Object.entries(situation).filter(([ruleName]) =>
          Object.keys(rules).includes(ruleName)
        )
      )
    : {}

export default function useDisposableEngine({ rules, situation }: Props) {
  const engine = useMemo(
    () =>
      new Engine(rules).setSituation(safeGetSituation({ situation, rules })),
    [rules, situation]
  )

  const safeEvaluate = useMemo(
    () =>
      (rule: string, engineUsed = engine) =>
        safeEvaluateHelper(rule, engineUsed),
    [engine]
  )

  const getValue = (dottedName: string) =>
    safeEvaluate(dottedName, engine)?.nodeValue

  const updateSituation = (newSituation: any) => {
    engine.setSituation(safeGetSituation({ situation: newSituation, rules }))
  }

  return {
    getValue,
    updateSituation,
  }
}
