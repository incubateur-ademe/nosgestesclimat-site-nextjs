import { useEffect, useState } from 'react'
import { Engine, NodeValue, Situation } from '../types'

type Props = {
  engine: Engine
  everyRules: string[]
  defaultSituation?: Situation
  externalSituation: Situation
  updateExternalSituation: (situation: Situation) => void
}
export default function useSituation({
  engine,
  everyRules,
  defaultSituation = {},
  externalSituation,
  updateExternalSituation,
}: Props) {
  const [situation, setSituation] = useState(defaultSituation)

  const updateSituation = (situationToAdd: Situation): Promise<void> => {
    const safeSitationToAdd = getSafeSituation({
      situation: situationToAdd,
      everyRules,
    })
    updateExternalSituation(safeSitationToAdd)

    // TODO: this is shit
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve()
      })
    })
  }

  useEffect(() => {
    const safeSituation = getSafeSituation({
      situation: externalSituation,
      everyRules,
    })
    engine.setSituation(safeSituation)
    setSituation(safeSituation)
  }, [externalSituation, engine, everyRules])

  return {
    situation,
    updateSituation,
  }
}

const getSafeSituation = ({
  situation,
  everyRules,
}: {
  situation: Situation
  everyRules: string[]
}): Situation =>
  everyRules
    .filter((rule: string) => situation[rule] || situation[rule] === 0)
    .reduce(
      (accumulator: Record<string, NodeValue>, currentValue: string) => ({
        ...accumulator,
        [currentValue]: situation[currentValue],
      }),
      {}
    )
