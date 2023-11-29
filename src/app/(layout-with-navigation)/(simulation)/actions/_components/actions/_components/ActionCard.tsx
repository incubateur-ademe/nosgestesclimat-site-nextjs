import Link from '@/components/Link'
import {
  getMatomoEventActionAccepted,
  getMatomoEventActionRejected,
} from '@/constants/matomo'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import {
  getBackgroundColor,
  getBorderColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule, useTempEngine, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import Image from 'next/image'
import { filterRelevantMissingVariables } from '../../../_helpers/filterRelevantMissingVariables'
import { getIsActionDisabled } from '../../../_helpers/getIsActionDisabled'
import ActionValue from './ActionValue'

type Props = {
  action: any
  total: number
  rule: any
  setFocusedAction: (dottedName: string) => void
  isFocused: boolean
}

export default function ActionCard({
  action,
  total,
  rule,
  setFocusedAction,
}: Props) {
  const { t } = useClientTranslation()

  const { rules } = useTempEngine()

  const { getCurrentSimulation, toggleActionChoice, rejectAction } = useUser()

  const { nodeValue, dottedName, title, missingVariables, traversedVariables } =
    action

  const { icônes: icons } = rule

  const flatRule = rules[dottedName]

  const hasFormula = flatRule.formule

  const nbRemainingQuestions = filterRelevantMissingVariables(
    Object.keys(missingVariables || {})
  )?.length

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

  const currentSimulation = getCurrentSimulation()

  if (!currentSimulation) return

  const actionChoices = currentSimulation.actionChoices

  const isSelected = Object.keys(actionChoices || {}).some((key) => {
    return key === dottedName && actionChoices[key]
  })

  const isDisabled =
    (getIsActionDisabled(flatRule) &&
      Object.keys(actionChoices || {}).some((key) => {
        return traversedVariables.includes(key)
      })) ||
    action.isIrrelevant

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
              onClick={() => setFocusedAction(dottedName)}>
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
            onClick={() => {
              if (isDisabled) return
              if (hasRemainingQuestions) {
                setFocusedAction(dottedName)
                return null
              }

              toggleActionChoice(dottedName)

              if (!isSelected) {
                trackEvent(getMatomoEventActionAccepted(dottedName, nodeValue))
              }
            }}>
            <Image
              src="/images/misc/2714.svg"
              width={100}
              height={100}
              className={`w-10 ${isDisabled ? 'grayscale' : ''}`}
              alt=""
            />
          </button>

          <button
            title={t("Rejeter l'action")}
            onClick={(e) => {
              if (isDisabled) return
              rejectAction(dottedName)
              trackEvent(getMatomoEventActionRejected(dottedName, nodeValue))
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
        </div>
      </div>
    </div>
  )
}
