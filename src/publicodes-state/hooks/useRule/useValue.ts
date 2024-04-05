'use client'

import getIsMissing from '@/publicodes-state/helpers/getIsMissing'
import { PublicodesExpression } from 'publicodes'
import { useCallback, useMemo } from 'react'
import getType from '../../helpers/getType'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
  NodeValue,
  Situation,
  UpdateCurrentSimulationProps,
} from '../../types'

type Props = {
  dottedName: DottedName
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  evaluation: NGCEvaluatedNode | null
  type: string | undefined
  questionsOfMosaic: string[]
  situation: Situation
  addToEngineSituation: (situationToAdd: Situation) => Promise<void>
  updateCurrentSimulation: (
    simulation: UpdateCurrentSimulationProps
  ) => Promise<void>
}

export default function useValue({
  dottedName,
  safeGetRule,
  safeEvaluate,
  evaluation,
  type,
  questionsOfMosaic,
  situation,
  addToEngineSituation,
  updateCurrentSimulation,
}: Props) {
  const value = useMemo<NodeValue>(() => evaluation?.nodeValue, [evaluation])

  const displayValue = useMemo<string>(() => {
    if (type === 'choices') {
      const stringValue = String(value)
      return stringValue.startsWith("'")
        ? stringValue.substring(1, stringValue.length - 1)
        : stringValue
    }
    if (type === 'boolean') {
      return value === true
        ? 'oui'
        : value === false || value === null // `value` is null when `ruleDisabledByItsParent` knowing that the parent becomes `null` according to this value.
          ? 'non'
          : ''
    }
    if (type === 'mosaic') {
      return 'mosaic'
    }
    if (Number(value) === value) {
      return String(value)
    }
    return ''
  }, [value, type])

  const numericValue = useMemo<number>(
    () => (Number(value) === value ? value : 0),
    [value]
  )

  const setValue = useCallback(
    async (
      value: NodeValue | { [dottedName: DottedName]: NodeValue },
      foldedStep?: string
    ): Promise<void> => {
      let situationToAdd = {}

      if (typeof value === 'object') {
        situationToAdd = Object.keys(
          value as { [dottedName: DottedName]: NodeValue }
        ).reduce(
          (accumulator: Situation, currentValue: DottedName) => ({
            ...accumulator,
            [dottedName + ' . ' + currentValue]:
              value && (value[currentValue] as NodeValue),
          }),
          {} as Situation
        )
      } else {
        situationToAdd = {
          [dottedName]: checkValueValidity({ value, type }),
        }
      }

      await addToEngineSituation(situationToAdd)

      return updateCurrentSimulation({ foldedStepToAdd: foldedStep })
    },
    [dottedName, type, addToEngineSituation, updateCurrentSimulation]
  )

  const resetMosaicChildren = useCallback(
    async (childToOmit: string): Promise<void> => {
      const situationToAdd = questionsOfMosaic.reduce(
        (accumulator, currentValue) => {
          if (childToOmit === currentValue) return accumulator

          const isMissing = getIsMissing({
            dottedName: currentValue,
            questionsOfMosaic: [],
            situation,
          })
          if (!isMissing) return accumulator

          const rule = safeGetRule(currentValue)
          const evaluation = safeEvaluate(currentValue)
          const resetValue =
            getType({ rule, evaluation, dottedName: currentValue }) ===
            'boolean'
              ? 'non'
              : 0

          return {
            ...accumulator,
            [currentValue]: checkValueValidity({
              value: resetValue,
              type: getType({ rule, evaluation, dottedName: currentValue }),
            }),
          }
        },
        {}
      )
      return addToEngineSituation(situationToAdd)
    },
    [
      questionsOfMosaic,
      situation,
      addToEngineSituation,
      safeEvaluate,
      safeGetRule,
    ]
  )

  const setDefaultAsValue = useCallback(
    async (foldedStep?: string): Promise<void> => {
      let situationToAdd = {}
      if (type?.includes('mosaic')) {
        situationToAdd = questionsOfMosaic.reduce(
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
        situationToAdd = {
          [dottedName]: checkValueValidity({ value, type }),
        }
      }
      await addToEngineSituation(situationToAdd)

      return updateCurrentSimulation({ foldedStepToAdd: foldedStep })
    },
    [
      dottedName,
      type,
      value,
      questionsOfMosaic,
      safeEvaluate,
      safeGetRule,
      addToEngineSituation,
      updateCurrentSimulation,
    ]
  )

  return {
    value,
    displayValue,
    numericValue,
    setValue,
    setDefaultAsValue,
    resetMosaicChildren,
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
      if (value === 'oui') {
        return 'oui'
      }
      if (value === 'non' || value === null) {
        return 'non'
      }
      return undefined
    case 'mosaic':
      return 'mosaic'
    default:
      return !value ? 0 : value
  }
}
