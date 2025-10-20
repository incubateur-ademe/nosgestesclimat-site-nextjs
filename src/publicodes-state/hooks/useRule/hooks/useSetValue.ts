'use client'

import { checkIfDottedNameShouldNotBeIgnored } from '@/publicodes-state/helpers/checkIfDottedNameShouldNotBeIgnored'
import getIsMissing from '@/publicodes-state/helpers/getIsMissing'
import getType from '@/publicodes-state/helpers/getType'
import type {
  MissingVariables,
  ParsedRules,
  Situation,
  UpdateCurrentSimulationProps,
} from '@/publicodes-state/types'
import type {
  DottedName,
  NGCRuleNode,
  NodeValue,
} from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'
import { utils } from 'publicodes'
import { useCallback } from 'react'

type Props = {
  dottedName: DottedName
  parsedRules: ParsedRules | undefined
  safeGetRule: (rule: DottedName) => NGCRuleNode | undefined
  safeEvaluate: (rule: PublicodesExpression) => EvaluatedNode | null
  evaluation: EvaluatedNode | null
  type: string | undefined
  situation: Situation
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
  addToEngineSituation: (situationToAdd: Situation) => Situation
  foldedSteps: DottedName[]
  rawMissingVariables: MissingVariables
}

export default function useSetValue({
  dottedName,
  parsedRules,
  safeGetRule,
  safeEvaluate,
  type,
  situation,
  updateCurrentSimulation,
  addToEngineSituation,
  foldedSteps,
  rawMissingVariables,
}: Props) {
  const getMosaicResetSituation = useCallback(
    (questionsOfMosaicFromSibling: DottedName[]): Situation => {
      const situationToAdd = questionsOfMosaicFromSibling.reduce(
        (accumulator, mosaicChildDottedName) => {
          // We check if the dottedName is missing in the current situation
          const isMissing = getIsMissing({
            dottedName: mosaicChildDottedName,
            situation,
          })

          // We check if `aucun` option is being selected, ie, the dottedName we are selecting is an option `aucun` and its value is false before.
          const isNoneOptionBeingSelected =
            dottedName.includes('aucun') &&
            safeEvaluate(dottedName)?.nodeValue === false

          // We check if `aucun` option is already selected if we are selecting another option.
          const isNoneOptionSelected =
            mosaicChildDottedName.includes('aucun') &&
            safeEvaluate(mosaicChildDottedName)?.nodeValue === true

          // If the dottedName is not missing, and we are not selecting `aucun` option, and `aucun` option is not selected when selecting another option, we do not reset the value of the dottedName
          if (!isMissing && !isNoneOptionBeingSelected && !isNoneOptionSelected)
            return accumulator

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
    [situation, dottedName, safeGetRule, safeEvaluate]
  )

  /**
   * @param value - The value to set
   * @param options.questionDottedName - The dottedName to be folded
   * @param options.questionsOfMosaicFromSibling - The dottedNames of the questions of the mosaic from the brother (another child)
   */
  const setValue = useCallback(
    (
      value: NodeValue | Record<string, NodeValue>,
      {
        questionDottedName,
        questionsOfMosaicFromSibling,
      }: {
        questionDottedName?: DottedName
        questionsOfMosaicFromSibling?: DottedName[]
      } = {}
    ) => {
      let situationToAdd = {}

      if (typeof value === 'object') {
        situationToAdd = Object.keys(value || {}).reduce(
          (accumulator: Situation, partialMosaicChildDottedName: string) => {
            const mosaicChildDottedName = utils.disambiguateReference(
              parsedRules ?? {},
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
      if (questionsOfMosaicFromSibling) {
        situationToAdd = {
          ...getMosaicResetSituation(questionsOfMosaicFromSibling),
          ...situationToAdd,
        }
      }

      const safeAndCleanSituation = addToEngineSituation(situationToAdd)

      const cleanFoldedSteps = foldedSteps.filter((foldedStep) => {
        return checkIfDottedNameShouldNotBeIgnored({
          dottedName: foldedStep as DottedName,
          safeEvaluate,
          rawMissingVariables,
        })
      })

      if (
        questionDottedName !== undefined &&
        !cleanFoldedSteps.includes(questionDottedName)
      ) {
        cleanFoldedSteps.push(questionDottedName)
      }

      updateCurrentSimulation({
        situation: safeAndCleanSituation,
        foldedSteps: cleanFoldedSteps,
      })
    },
    [
      addToEngineSituation,
      foldedSteps,
      updateCurrentSimulation,
      parsedRules,
      dottedName,
      safeGetRule,
      safeEvaluate,
      type,
      getMosaicResetSituation,
      rawMissingVariables,
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
      return value?.startsWith("'") ? value : `'${value}'`
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
