import { useEffect, useState } from 'react'

type Props = {
  engine: any
  everyRules: any
  safeEvaluate: any
  defaultSituation?: any
  externalSituation: any
  updateExternalSituation: any
}
export default function useSituation({
  engine,
  everyRules,
  safeEvaluate,
  defaultSituation = {},
  externalSituation,
  updateExternalSituation,
}: Props) {
  const [situation, setSituation] = useState(defaultSituation)

  const updateSituation = (situationToAdd: any) => {
    // console.log('update situation', situationToAdd)
    const oldTotal = safeEvaluate('bilan').nodeValue

    const safeSitationToAdd = getSafeSituation({
      situation: situationToAdd,
      everyRules,
    })
    console.log(situationToAdd, safeSitationToAdd)
    updateExternalSituation(safeSitationToAdd)

    // TODO: this is shit
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const newTotal = safeEvaluate('bilan').nodeValue
        resolve({ oldTotal, newTotal })
      })
    })
  }

  useEffect(() => {
    console.log('set situation', externalSituation)
    const safeSituation = getSafeSituation({
      situation: externalSituation,
      everyRules,
    })
    console.log(safeSituation, externalSituation)
    engine.setSituation(safeSituation)
    setSituation(safeSituation)
  }, [externalSituation, engine, everyRules])

  return {
    situation,
    updateSituation,
  }
}

const getSafeSituation = ({ situation, everyRules }: any) =>
  everyRules
    .filter((rule: string) => situation[rule])
    .reduce(
      (accumulator: any, currentValue: any) => ({
        ...accumulator,
        [currentValue]: situation[currentValue],
      }),
      {}
    )
