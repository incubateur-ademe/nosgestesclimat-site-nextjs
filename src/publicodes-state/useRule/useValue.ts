'use client'

import { useMemo } from 'react'
import { NGCEvaluatedNode, NGCRuleNode, NodeValue, Situation } from '../types'

type Props = {
  dottedName: string
  safeGetRule: (rule: string) => NGCRuleNode | null
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  evaluation: NGCEvaluatedNode | null
  type: string | undefined
  getType: (args: {
    dottedName: string
    rule: NGCRuleNode | null | any // Model shenanigans: question alimentation . local . consommation is missing "formule"
    evaluation: NGCEvaluatedNode | null
  }) => string | undefined
  questionsOfMosaic: string[]
  updateSituation: (situationToAdd: Situation) => Promise<void>
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
  const value = useMemo(() => evaluation?.nodeValue, [evaluation])

  const displayValue = useMemo(
    () => type && value && checkValueValidity({ value, type }),
    [value, type]
  )

  // TODO: Doesn't work well with mosaic
  const isMissing = useMemo(
    () => Object.keys(evaluation?.missingVariables || {}).length !== 0,
    [evaluation]
  )

  const setValue = async (value: NodeValue): Promise<void> => {
    return updateSituation({
      [dottedName]: checkValueValidity({ value, type }),
    })
  }

  const setDefaultAsValue = async (): Promise<void> => {
    let situationToUpdate = {}
    if (type?.includes('mosaic')) {
      situationToUpdate = questionsOfMosaic.reduce(
        (accumulator, currentValue) => {
          const rule = safeGetRule(currentValue)
          const evaluation = safeEvaluate(currentValue)
          return {
            ...accumulator,
            [currentValue]: checkValueValidity({
              value: evaluation?.nodeValue,
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

    return updateSituation(situationToUpdate)
  }

  return { value, displayValue, isMissing, setValue, setDefaultAsValue }
}

const checkValueValidity = ({
  value,
  type,
}: {
  value: any
  type: string | undefined
}): NodeValue => {
  switch (type) {
    case 'choices':
      return value.startsWith("'") ? value : `'${value}'`
    case 'boolean':
      return value === null || value === false || value === 'non' // Model shenanigans
        ? 'non'
        : 'oui'
    case 'mosaic':
      return 'mosaic'
    default:
      return !value ? 0 : value
  }
}
