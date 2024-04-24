'use client'

import getIsMissing from '@/publicodes-state/helpers/getIsMissing'
import { PublicodesExpression } from 'publicodes'
import { useCallback } from 'react'
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
  value: NodeValue
  type: string | undefined
  questionsOfMosaic: string[]
  situation: Situation
  addToEngineSituation: (situationToAdd: Situation) => Promise<void>
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
}

export default function useSetValue({
  dottedName,
  safeGetRule,
  safeEvaluate,
  value,
  type,
  questionsOfMosaic,
  situation,
  addToEngineSituation,
  updateCurrentSimulation,
}: Props) {
  const getMosaicReset = useCallback(
    (childToOmit: string): Situation => {
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
      return situationToAdd
    },
    [questionsOfMosaic, situation, safeEvaluate, safeGetRule]
  )

  /**
   * @param value - The value to set
   * @param options.foldedStep - The dottedName of the foldedStep
   * @param options.mosaic - The dottedName of the mosaic to reset
   */
  const setValue = useCallback(
    async (
      value: NodeValue | { [dottedName: DottedName]: NodeValue },
      {
        foldedStep,
        mosaic,
      }: { foldedStep?: DottedName; mosaic?: DottedName } = {}
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

      if (mosaic) {
        situationToAdd = {
          ...situationToAdd,
          ...getMosaicReset(mosaic),
        }
      }

      await addToEngineSituation(situationToAdd)

      return updateCurrentSimulation({ foldedStepToAdd: foldedStep })
    },
    [
      dottedName,
      type,
      addToEngineSituation,
      updateCurrentSimulation,
      getMosaicReset,
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
