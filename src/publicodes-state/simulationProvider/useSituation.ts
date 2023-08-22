import { useState, useEffect } from 'react'

type Props = {
  engine: any
  defaultSituation?: any
  externalSituation: any
  setExternalSituation: Function
}
export default function useSituation({
  engine,
  defaultSituation = {},
  externalSituation,
  setExternalSituation,
}: Props) {
  const [internalsituation, setInternalSituation] = useState(defaultSituation)

  const [localSituation, setLocalSituation] =
    externalSituation && setExternalSituation
      ? [externalSituation, setExternalSituation]
      : [internalsituation, setInternalSituation]

  const [situation, setSituation] = useState(defaultSituation)

  const updateSituation = (situationToAdd: any) => {
    console.log('update situation', situationToAdd)
    const oldTotal = engine.evaluate('bilan').nodeValue
    setLocalSituation({
      ...localSituation,
      ...situationToAdd,
    })

    // TODO: this is shit
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const newTotal = engine.evaluate('bilan').nodeValue
        resolve({ oldTotal, newTotal })
      })
    })
  }

  useEffect(() => {
    console.log('set situation', localSituation)
    engine.setSituation(localSituation)
    setSituation(localSituation)
  }, [localSituation, engine])

  return {
    situation,
    updateSituation,
  }
}
