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
  type,
  questionsOfMosaic,
  situation,
  updateCurrentSimulation,
  addToEngineSituation,
}: Props) {
  const getMosaicResetSituation = useCallback(
    (questionsOfParentMosaic: DottedName[]): Situation => {
      const situationToAdd = questionsOfParentMosaic.reduce(
        (accumulator, mosaicChildDottedName) => {
          const isMissing = getIsMissing({
            dottedName: mosaicChildDottedName,
            situation,
          })
          if (!isMissing) return accumulator

          const rule = safeGetRule(mosaicChildDottedName)
          const evaluation = safeEvaluate(mosaicChildDottedName)
          const resetValue =
            getType({ rule, evaluation, dottedName: mosaicChildDottedName }) ===
            'boolean'
              ? 'non'
              : 0

          return {
            ...accumulator,
            [mosaicChildDottedName]: checkValueValidity({
              value: resetValue,
              type: getType({
                rule,
                evaluation,
                dottedName: mosaicChildDottedName,
              }),
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
        ).reduce(
          (accumulator: Situation, partialMosaicChildDottedName: string) => {
            const mosaicChildDottedName = utils.disambiguateReference(
              parsedRules,
              dottedName,
              partialMosaicChildDottedName
            ) as DottedName
            const rule = safeGetRule(mosaicChildDottedName)
            const evaluation = safeEvaluate(mosaicChildDottedName)
            return {
              ...accumulator,
              [mosaicChildDottedName]: checkValueValidity({
                value: value && value[partialMosaicChildDottedName],
                type: getType({
                  rule,
                  evaluation,
                  dottedName: mosaicChildDottedName,
                }),
              }),
            } as Situation
          },
          {} as Situation
        )
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
      safeGetRule,
      safeEvaluate,
      type,
      getMosaicResetSituation,
    ]
  )

  return {
    setValue,
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
