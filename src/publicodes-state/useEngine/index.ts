import { useMemo } from 'react'
import Engine from 'publicodes'

type Props = {
  rules?: any
  situation: any
}
export default function useEngine({ rules, situation }: Props) {
  const engine = useMemo(
    () =>
      new Engine(rules).setSituation(safeGetSituation({ situation, rules })),
    [rules, situation]
  )

  const getValue = (dottedName: string) => engine.evaluate(dottedName).nodeValue

  return {
    getValue,
  }
}

const safeGetSituation = ({ situation, rules }: any): any =>
  situation
    ? Object.fromEntries(
        Object.entries(situation).filter(([ruleName]) =>
          Object.keys(rules).includes(ruleName)
        )
      )
    : {}
