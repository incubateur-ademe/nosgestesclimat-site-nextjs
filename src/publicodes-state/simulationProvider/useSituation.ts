import { useEffect, useState } from 'react'

type Props = {
  engine: any
  safeEvaluate: any
  defaultSituation?: any
  externalSituation: any
  updateExternalSituation: Function
}
export default function useSituation({
  engine,
  safeEvaluate,
  defaultSituation = {},
  externalSituation,
  updateExternalSituation,
}: Props) {
  const [situation, setSituation] = useState(defaultSituation)

  const updateSituation = (situationToAdd: any) => {
    // console.log('update situation', situationToAdd)
    const oldTotal = safeEvaluate('bilan').nodeValue
    updateExternalSituation(situationToAdd)

    // TODO: this is shit
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const newTotal = safeEvaluate('bilan').nodeValue
        resolve({ oldTotal, newTotal })
      })
    })
  }

  useEffect(() => {
    // console.log('set situation', externalSituation)
    engine.setSituation(externalSituation)
    setSituation(externalSituation)
  }, [externalSituation, engine])

  return {
    situation,
    updateSituation,
  }
}
