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
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
  addToEngineSituation: (situationToAdd: Situation) => Situation
}

export default function useSetValue({
  dottedName,
  safeGetRule,
  safeEvaluate,
  value,
  type,
  questionsOfMosaic,
  situation,
  updateCurrentSimulation,
  addToEngineSituation,
}: Props) {
  const getMosaicResetSituation = useCallback(
    (questionsOfParentMosaic: DottedName[]): Situation => {
      const situationToAdd = questionsOfParentMosaic.reduce(
        (accumulator, currentValue) => {
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
    [situation, safeEvaluate, safeGetRule]
  )

  /**
   * @param value - The value to set
   * @param options.foldedStep - The dottedName of the foldedStep
   * @param options.questionsOfParentMosaic - The questions of the parent mosaic
   */
  const setValue = useCallback(
    async (
      value: NodeValue | { [dottedName: DottedName]: NodeValue },
      {
        foldedStep,
        questionsOfParentMosaic,
      }: {
        foldedStep?: DottedName
        questionsOfParentMosaic?: DottedName[]
      } = {}
    ) => {
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

      if (questionsOfParentMosaic) {
        situationToAdd = {
          ...getMosaicResetSituation(questionsOfParentMosaic),
          ...situationToAdd,
        }
      }

      const safeSituation = addToEngineSituation(situationToAdd)
      updateCurrentSimulation({
        situationToAdd: safeSituation,
        foldedStepToAdd: foldedStep,
      })
    },
    [
      dottedName,
      type,
      updateCurrentSimulation,
      getMosaicResetSituation,
      addToEngineSituation,
    ]
  )

  const setDefaultAsValue = useCallback(
    async (foldedStep?: DottedName) => {
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
      const safeSituation = addToEngineSituation(situationToAdd)
      updateCurrentSimulation({
        situationToAdd: safeSituation,
        foldedStepToAdd: foldedStep,
      })
    },
    [
      dottedName,
      type,
      value,
      questionsOfMosaic,
      safeEvaluate,
      safeGetRule,
      updateCurrentSimulation,
      addToEngineSituation,
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
