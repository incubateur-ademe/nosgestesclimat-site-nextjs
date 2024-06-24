'use client'

import getIsMissing from '@/publicodes-state/helpers/getIsMissing'
import { PublicodesExpression, utils } from 'publicodes'
import { useCallback } from 'react'
import getType from '../../helpers/getType'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
  NGCRulesNodes,
  NodeValue,
  Situation,
  UpdateCurrentSimulationProps,
} from '../../types'

type Props = {
  dottedName: DottedName
  parsedRules: NGCRulesNodes
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  evaluation: NGCEvaluatedNode | null
  value: NodeValue
  type: string | undefined
  questionsOfMosaic: DottedName[]
  situation: Situation
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
  addToEngineSituation: (situationToAdd: Situation) => Situation
}

export default function useSetValue({
  dottedName,
  parsedRules,
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
   */
  const setValue = useCallback(
    async (
      value: NodeValue | { [dottedName: DottedName]: NodeValue },
      {
        foldedStep,
      }: {
        foldedStep?: DottedName
      } = {}
    ) => {
      let situationToAdd = {}

      if (typeof value === 'object') {
        situationToAdd = Object.keys(
          value as { [dottedName: DottedName]: NodeValue }
        ).reduce((accumulator: Situation, currentValue: DottedName) => {
          return {
            ...accumulator,
            [utils.disambiguateReference(
              parsedRules,
              dottedName,
              currentValue
            )]: value && (value[currentValue] as NodeValue),
          } as Situation
        }, {} as Situation)
      } else {
        situationToAdd = {
          [dottedName]: checkValueValidity({ value, type }),
        }
      }

      if (questionsOfMosaic) {
        situationToAdd = {
          ...getMosaicResetSituation(questionsOfMosaic),
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
      questionsOfMosaic,
      addToEngineSituation,
      updateCurrentSimulation,
      parsedRules,
      dottedName,
      type,
      getMosaicResetSituation,
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
