'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  safeGetRule: any
  safeEvaluate: any
  evaluation: any
  type: string
  getType: Function
  questionsOfMosaic: string[]
  updateSituation: Function
}

export default function useValue({
  dottedName,
  safeGetRule,
  safeEvaluate,
  evaluation,
  type,
  getType,
  questionsOfMosaic,
  updateSituation,
}: Props) {
  const value = useMemo(() => evaluation.nodeValue, [evaluation])

  const displayValue = useMemo(
    () => checkValueValidity({ value, type }),
    [value, type]
  )

  // TODO: Doesn't work well with mosaic
  const isMissing = useMemo(
    () => Object.keys(evaluation.missingVariables).length !== 0,
    [evaluation]
  )

  // TODO: add return  Promise({validValue: boolean, validRule: boolean, oldTotal: number, newTotal: number})
  const setValue = async (value: any): Promise<any> => {
    const { oldTotal, newTotal } = await updateSituation({
      [dottedName]: checkValueValidity({ value, type }),
    })
    return Promise.resolve({ oldTotal, newTotal })
  }

  const setDefaultAsValue = async (): Promise<any> => {
    let situationToUpdate = {}
    if (type.includes('mosaic')) {
      situationToUpdate = questionsOfMosaic.reduce(
        (accumulator, currentValue) => {
          const rule = safeGetRule(currentValue)
          const evaluation = safeEvaluate(currentValue)
          return {
            ...accumulator,
            [currentValue]: checkValueValidity({
              value: evaluation.nodeValue,
              type: getType({ rule, evaluation, dottedName: currentValue }),
            }),
          }
        },
        {}
      )
    } else {
      situationToUpdate = {
        [dottedName]: checkValueValidity({ value, type }),
      }
    }

    const { oldTotal, newTotal } = await updateSituation(situationToUpdate)
    return Promise.resolve({ oldTotal, newTotal })
  }

  return { value, displayValue, isMissing, setValue, setDefaultAsValue }
}
// FFS
const checkValueValidity = ({
  value,
  type,
}: {
  value: any
  type: string
}): number | string =>
  type === 'choices'
    ? value === null || value === false || value === 'non'
      ? 'non'
      : typeof value === 'string'
      ? !value.startsWith("'")
        ? `'${value}'`
        : value
      : 'oui'
    : type === 'mosaic'
    ? 'mosaic'
    : !value
    ? 0
    : value
