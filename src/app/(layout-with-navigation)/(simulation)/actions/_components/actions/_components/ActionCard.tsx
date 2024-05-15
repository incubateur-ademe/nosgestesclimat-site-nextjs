'use client'

import Link from '@/components/Link'
import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import CloseIcon from '@/components/icons/Close'
import {
  actionsClickAdditionalQuestion,
  actionsClickNo,
  actionsClickYes,
  actionsOpenAction,
} from '@/constants/tracking/pages/actions'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import Emoji from '@/design-system/utils/Emoji'
import { getIsCustomAction } from '@/helpers/actions/getIsCustomAction'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  useCurrentSimulation,
  useRule,
  useTempEngine,
  useUser,
} from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import { useCallback } from 'react'
import { filterRelevantMissingVariables } from '../../../_helpers/filterRelevantMissingVariables'
import { getIsActionDisabled } from '../../../_helpers/getIsActionDisabled'
import ActionValue from './ActionValue'

type Props = {
  action: any
  total: number
  rule: any
  setFocusedAction: (dottedName: DottedName) => void
  isFocused: boolean
}

export default function ActionCard({
  action,
  total,
  rule,
  setFocusedAction,
}: Props) {
  const { t } = useClientTranslation()

  const { rules, extendedFoldedSteps } = useTempEngine()

  const { toggleActionChoice, rejectAction } = useUser()

  const currentSimulation = useCurrentSimulation()

  const { dottedName, title, missingVariables, traversedVariables } = action

  const { icônes: icons } = rule || action

  const remainingQuestions = filterRelevantMissingVariables(
    Object.keys(missingVariables || {}),
    extendedFoldedSteps
  )

  const nbRemainingQuestions = remainingQuestions?.length

  const hasRemainingQuestions = nbRemainingQuestions > 0

  const pluralSuffix = nbRemainingQuestions > 1 ? 's' : ''

  const remainingQuestionsText = t(
    'publicodes.ActionVignette.questionsRestantesText',
    {
      nbRemainingQuestions,
      pluralSuffix,
    }
  )

  const { category } = useRule(dottedName)

  const actionChoices = currentSimulation?.actionChoices

  const isSelected = Object.keys(actionChoices || {}).some((key) => {
    return key === dottedName && actionChoices?.[key]
  })

  const flatRule = rules?.[dottedName]

  const hasFormula = flatRule?.formule
  const isDisabled =
    (flatRule &&
      getIsActionDisabled(flatRule) &&
      Object.keys(actionChoices || {}).some((key) => {
        return traversedVariables.includes(key)
      })) ||
    action.isIrrelevant

  const isCustomAction = getIsCustomAction(dottedName)

  const handleChooseAction = useCallback(async () => {
    if (isDisabled) return

    if (hasRemainingQuestions || isCustomAction) {
      setFocusedAction(dottedName)
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
    setFocusedAction,
    toggleActionChoice,
    isCustomAction,
  ])

  if (!currentSimulation || !rules) {
    return null
  }

  return (
    <div
      id={dottedName}
      className={`relative flex h-[18rem] w-full flex-col items-center justify-center overflow-auto rounded-xl border-2 border-solid p-4 ${
        !hasFormula ? 'h-[13rem]' : ''
      } ${
        isSelected
          ? 'border-green-500 bg-green-500/[0.23]'
          : getBorderColor(category)
      }`}>
      <div
        className={`flex h-[6rem] w-full items-center rounded-xl p-2 ${getBackgroundLightColor(
          category
        )}`}>
        <Link
          className="z-10 w-full no-underline"
          onClick={() => trackEvent(actionsOpenAction(dottedName))}
          href={'/actions/' + encodeRuleName(dottedName)}>
          {icons && (
            <Emoji className="inline-flex justify-center">{icons}</Emoji>
          )}

          <h2
            className={`mb-0 inline-block w-full text-center text-sm font-bold ${getTextDarkColor(category)}`}>
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
            isBlurred={hasRemainingQuestions}
          />

          {hasRemainingQuestions && (
            <NotificationBubble
              onClick={() => setFocusedAction(dottedName)}
              title={remainingQuestionsText}
              number={nbRemainingQuestions}
            />
          )}

          {hasRemainingQuestions && (
            <button
              className="cursor-pointer text-sm text-primary-700"
              onClick={() => {
                trackEvent(actionsClickAdditionalQuestion(dottedName))
                setFocusedAction(dottedName)
              }}>
              {remainingQuestionsText}
            </button>
          )}
        </div>
        <div className="self-bottom flex w-full justify-between px-2">
          <button
            title={t("Choisir l'action")}
            type="button"
            aria-pressed={actionChoices?.[dottedName]}
            className={hasRemainingQuestions ? 'grayscale' : ''}
            onClick={handleChooseAction}>
            <CheckCircleIcon
              className="fill-green-500"
              width="40"
              height="40"
            />
          </button>

          {!Object.keys(actionChoices || {}).some((key) => {
            return key === dottedName && actionChoices?.[key]
          }) && (
            <button
              title={t("Rejeter l'action")}
              onClick={(e) => {
                if (isDisabled) return
                rejectAction(dottedName)
                if (!isSelected) {
                  trackEvent(actionsClickNo(dottedName))
                }
                e.stopPropagation()
                e.preventDefault()
              }}>
              <CloseIcon width="40" height="40" className="fill-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
