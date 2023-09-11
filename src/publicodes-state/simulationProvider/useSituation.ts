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
    console.log(situationToAdd, safeSitationToAdd)
    updateExternalSituation(safeSitationToAdd)

    // TODO: this is shit
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve()
      })
    })
  }

  useEffect(() => {
    console.log('set situation', externalSituation)
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
    .filter((rule: string) => situation[rule])
    .reduce(
      (accumulator: Record<string, NodeValue>, currentValue: string) => ({
        ...accumulator,
        [currentValue]: situation[currentValue],
      }),
      {}
    )
