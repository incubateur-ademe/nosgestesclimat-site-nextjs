'use client'

'use client'

import Link from '@/components/Link'
import {
  actionsClickAdditionalQuestion,
  actionsClickNo,
  actionsClickYes,
  actionsOpenAction,
} from '@/constants/tracking/pages/actions'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import {
  getBackgroundColor,
  getBorderColor,
} from '@/helpers/getCategoryColorClass'
import { useFetchSimulation } from '@/hooks/simulation/useFetchSimulation'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule, useTempEngine, useUser } from '@/publicodes-state'
import useCurrentSimulation from '@/publicodes-state/hooks/useCurrentSimulation'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import Image from 'next/image'
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

  const { icônes: icons } = rule

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

  const { simulation: simulationSaved } = useFetchSimulation({
    simulationId: currentSimulation?.id ?? '',
  })

  const { saveSimulationNotAsync } = useSaveSimulation()

  const handleChooseAction = useCallback(async () => {
    if (isDisabled) return

    if (hasRemainingQuestions) {
      setFocusedAction(dottedName)
      return null
    }

    toggleActionChoice(dottedName)

    if (currentSimulation && !!simulationSaved) {
      saveSimulationNotAsync({
        simulation: {
          ...(currentSimulation ?? {}),
          actionChoices: {
            ...currentSimulation?.actionChoices,
            [dottedName]: true,
          },
        },
        shouldSendSimulationEmail: false,
      })
    }

    if (!isSelected) {
      trackEvent(actionsClickYes(dottedName))
    }
  }, [
    currentSimulation,
    dottedName,
    hasRemainingQuestions,
    isDisabled,
    isSelected,
    saveSimulationNotAsync,
    setFocusedAction,
    simulationSaved,
    toggleActionChoice,
  ])

  if (!currentSimulation || !rules) {
    return null
  }

  return (
    <div
      id={dottedName}
      className={`relative flex h-[16rem] w-full flex-col items-center overflow-auto rounded-lg border-4 border-solid ${
        !hasFormula ? 'h-[13rem]' : ''
      } ${
        isSelected
          ? 'border-green-500 bg-green-500/[0.23]'
          : getBorderColor(category)
      }`}>
      <div
        className={`flex h-[6rem] w-full items-center ${getBackgroundColor(
          category
        )}`}>
        <Link
          className="z-10 w-full no-underline"
          onClick={() => trackEvent(actionsOpenAction(dottedName))}
          href={'/actions/' + encodeRuleName(dottedName)}>
          <h2 className="inline-block w-full text-center text-base font-bold text-white">
            {title}
          </h2>
        </Link>

        {icons && (
          <span className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-8 whitespace-nowrap text-[4rem] opacity-20 grayscale ">
            {icons}
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-1 flex-col justify-between">
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
              className="cursor-pointer text-primary-500"
              onClick={() => {
                trackEvent(actionsClickAdditionalQuestion(dottedName))
                setFocusedAction(dottedName)
              }}>
              {remainingQuestionsText}
            </button>
          )}
        </div>
        <div className="mb-4 flex justify-evenly gap-4">
          <button
            title={t("Choisir l'action")}
            type="button"
            aria-pressed={actionChoices?.[dottedName]}
            className={hasRemainingQuestions ? 'grayscale' : ''}
            onClick={handleChooseAction}>
            <Image
              src="/images/misc/2714.svg"
              width={100}
              height={100}
              className={`w-10 ${isDisabled ? 'grayscale' : ''}`}
              alt=""
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
              <Image
                src="/images/misc/274C.svg"
                width={100}
                height={100}
                className={`w-8 ${isDisabled ? 'grayscale' : ''}`}
                alt=""
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
