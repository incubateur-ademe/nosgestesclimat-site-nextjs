'use client'

import Link from '@/components/Link'
import CloseIcon from '@/components/icons/Close'
import CheckCircleIcon from '@/components/icons/status/CheckCircleIcon'
import {
  actionsClickNo,
  actionsClickYes,
  actionsOpenAction,
} from '@/constants/tracking/pages/actions'
import Emoji from '@/design-system/utils/Emoji'
import { filterRelevantMissingVariables } from '@/helpers/actions/filterRelevantMissingVariables'
import { getIsActionDisabled } from '@/helpers/actions/getIsActionDisabled'
import { getIsCustomAction } from '@/helpers/actions/getIsCustomAction'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  useCurrentSimulation,
  useEngine,
  useRule,
  useTempEngine,
  useUser,
} from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import ActionValue from './ActionValue'

type Props = {
  action: any
  total: number
  rule: any
  setActionWithFormOpen: (dottedName: DottedName) => void
  isFocused: boolean
  handleUpdatePersistedActions: () => void
}

export default function ActionCard({
  action,
  total,
  rule,
  setActionWithFormOpen,
  handleUpdatePersistedActions,
}: Props) {
  const { t } = useClientTranslation()

  const { everyQuestions, safeEvaluate, rawMissingVariables } = useEngine()

  const { rules, extendedFoldedSteps } = useTempEngine()

  const { toggleActionChoice, rejectAction } = useUser()

  const currentSimulation = useCurrentSimulation()

  const { dottedName, title, traversedVariables, missingVariables } = action

  const { icônes: icons } = rule || action
  const remainingQuestions = filterRelevantMissingVariables({
    everyQuestions,
    missingVariables: Object.keys(missingVariables || {}) as DottedName[],
    extendedFoldedSteps,
    safeEvaluate,
    rawMissingVariables,
  })

  const nbRemainingQuestions = remainingQuestions?.length

  const hasRemainingQuestions = nbRemainingQuestions > 0

  const { category } = useRule(dottedName)

  const actionChoices = currentSimulation?.actionChoices

  const isSelected = Object.keys(actionChoices || {}).some((key) => {
    return key === dottedName && actionChoices?.[key]
  })

  const flatRule = (rules as any)?.[dottedName]

  const hasFormula = flatRule?.formule
  const isDisabled =
    (flatRule &&
      getIsActionDisabled(flatRule) &&
      Object.keys(actionChoices || {}).some((key) => {
        return traversedVariables.includes(key)
      })) ||
    action.isIrrelevant

  const isCustomAction = getIsCustomAction(dottedName)

  const handleChooseAction = useCallback(() => {
    if (isDisabled) return

    if (hasRemainingQuestions || isCustomAction) {
      setActionWithFormOpen(dottedName)
      return null
    }

    toggleActionChoice(dottedName)

    if (!isSelected) {
      trackEvent(actionsClickYes(dottedName))
    }
  }, [
    dottedName,
    hasRemainingQuestions,
    isDisabled,
    isSelected,
    setActionWithFormOpen,
    toggleActionChoice,
    isCustomAction,
  ])

  const handleRejectAction = () => {
    if (isDisabled) return

    rejectAction(dottedName)

    handleUpdatePersistedActions()

    if (!isSelected) {
      trackEvent(actionsClickNo(dottedName))
    }
  }

  if (!currentSimulation || !rules) {
    return null
  }

  return (
    <div
      id={dottedName}
      className={twMerge(
        'relative flex h-[18rem] w-full flex-col items-center justify-center overflow-auto rounded-xl border-2 border-solid p-4',
        isSelected
          ? 'border-green-500 bg-green-500/[0.23]'
          : getBorderColor(category)
      )}>
      <div
        className={twMerge(
          'flex h-[6rem] w-full items-center rounded-xl p-2',
          getBackgroundLightColor(category)
        )}>
        <Link
          className="z-10 w-full no-underline"
          onClick={() => trackEvent(actionsOpenAction(dottedName))}
          href={'/actions/' + encodeRuleName(dottedName)}>
          {icons && (
            <Emoji className="inline-flex justify-center">{icons}</Emoji>
          )}

          <h2
            className={twMerge(
              'mb-0 inline-block w-full text-center text-sm font-bold',
              getTextDarkColor(category)
            )}>
            {title}
          </h2>
        </Link>
      </div>

      <div className="mt-3 flex w-full flex-1 flex-col justify-between">
        <div className="relative">
          <ActionValue
            dottedName={dottedName}
            total={total}
            isDisabled={isDisabled}
            hasFormula={hasFormula}
            setActionWithFormOpen={setActionWithFormOpen}
            remainingQuestions={remainingQuestions}
          />
        </div>
        <div className="self-bottom flex w-full justify-between px-2">
          <button
            title={t("Choisir l'action")}
            type="button"
            aria-pressed={actionChoices?.[dottedName]}
            className={twMerge(hasRemainingQuestions ? 'grayscale' : '')}
            onClick={handleChooseAction}>
            <CheckCircleIcon
              className="fill-green-700"
              width="40"
              height="40"
            />
          </button>

          {!Object.keys(actionChoices || {}).some((key) => {
            return key === dottedName && actionChoices?.[key]
          }) && (
            <button title={t("Rejeter l'action")} onClick={handleRejectAction}>
              <CloseIcon width="40" height="40" className="fill-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
