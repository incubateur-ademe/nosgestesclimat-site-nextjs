'use client'

import { useMemo } from 'react'
import getType from '../helpers/getType'
import {
  NGCEvaluatedNode,
  NGCQuestionType,
  NGCRuleNode,
  NodeValue,
  RuleName,
  Situation,
} from '../types'
type Props = {
  dottedName: RuleName
  safeGetRule: (rule: RuleName) => NGCRuleNode | null
  safeEvaluate: (rule: RuleName) => NGCEvaluatedNode | null
  evaluation: NGCEvaluatedNode | null
  type: NGCQuestionType | undefined
  questionsOfMosaic: RuleName[]
  updateSituation: (situationToAdd: Situation) => Promise<void>
  addFoldedStep: (foldedStep: string) => void
}

export default function useValue({
  dottedName,
  safeGetRule,
  safeEvaluate,
  evaluation,
  type,
  questionsOfMosaic,
  updateSituation,
  addFoldedStep,
}: Props) {
  const value = useMemo<NodeValue>(() => evaluation?.nodeValue, [evaluation])

  const displayValue = useMemo<string | number>(() => {
    switch (type) {
      case 'choices': {
        const stringValue = String(value)
        return stringValue.startsWith("'")
          ? stringValue.substring(1, stringValue.length - 1)
          : stringValue
      }
      case 'boolean':
        return value === null || value === false || value === 'non' // Model shenanigans
          ? 'non'
          : 'oui'
      case 'number':
        return Number(value)
      case 'mosaic':
        return 'mosaic'
      default:
        // NOTE(@EmileRolley): I'm not sure what is the wanted behavior for undefined type or 'noQuestion'
        return 'non défini'
    }
  }, [value, type])

  const numericValue = useMemo<number>(
    () => (Number(value) === value ? value : 0),
    [value]
  )

  const setValue = async (
    value: NodeValue,
    foldedStep?: string
  ): Promise<void> => {
    if (foldedStep) addFoldedStep(foldedStep)

    return updateSituation({
      [dottedName]: checkValueValidity({ value, type }),
    })
  }

  const setDefaultAsValue = async (foldedStep?: string): Promise<void> => {
    if (foldedStep) addFoldedStep(foldedStep)

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

  return {
    value,
    displayValue,
    numericValue,
    setValue,
    setDefaultAsValue,
  }
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
      if (!value) {
        return null
      }
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
