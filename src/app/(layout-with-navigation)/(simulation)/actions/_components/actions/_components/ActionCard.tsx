import image1Src from '@/assets/images/2714.svg'
import image2Src from '@/assets/images/274C.svg'
import Link from '@/components/Link'
import {
  getMatomoEventActionAccepted,
  getMatomoEventActionRejected,
} from '@/constants/matomo'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useRule, useTempEngine, useUser } from '@/publicodes-state'
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

  const { categories } = useForm()

  const { getCurrentSimulation, toggleActionChoice, rejectAction } = useUser()

  const { actionChoices } = getCurrentSimulation()

  const { nodeValue, dottedName, title, missingVariables, traversedVariables } =
    action

  const isSelected = Object.keys(actionChoices || {}).some((key) => {
    return key === dottedName && actionChoices[key]
  })

  const { icônes: icons } = rule

  const flatRule = rules[dottedName]

  const hasFormula = flatRule.formule

  const isDisabled =
    (getIsActionDisabled(flatRule) &&
      Object.keys(actionChoices || {}).some((key) => {
        return traversedVariables.includes(key)
      })) ||
    action.isIrrelevant

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

  const foundCategory = categories?.find(
    (cat: string) => cat === dottedName?.split(' . ')?.[0]
  )

  const categoryRuleObject = useRule(foundCategory || 'bilan')

  const categoryColor =
    categoryRuleObject?.color ||
    rules[dottedName.split(' . ')[0]]?.couleur ||
    'var(--color)'

  return (
    <div
      id={dottedName}
      className={`relative flex h-[16rem] w-full flex-col items-center overflow-auto rounded-lg border-4 border-solid ${
        !hasFormula ? 'h-[13rem]' : ''
      }`}
      style={{
        borderColor: isSelected ? 'rgb(45, 164, 78)' : categoryColor,
        backgroundColor: isSelected ? 'rgba(45, 164, 78, 0.23)' : '',
      }}>
      <div
        style={{ backgroundColor: categoryColor }}
        className="flex h-[6rem] w-full items-center">
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
        <div className="relative mb-6">
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
              className="cursor-pointer text-primary"
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
              src={image1Src}
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
              src={image2Src}
              className={`w-8 ${isDisabled ? 'grayscale' : ''}`}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  )
}
