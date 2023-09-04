import image1Src from '@/assets/images/2714.svg'
import image2Src from '@/assets/images/274C.svg'
import Link from '@/components/Link'
import {
  getMatomoEventActionAccepted,
  getMatomoEventActionRejected,
} from '@/constants/matomo'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import Image from 'next/image'
import { filterRelevantMissingVariables } from '../_helpers/filterRelevantMissingVariables'
import ActionValue from './ActionValue'

type Props = {
  evaluation: any
  total: number
  rule: any
  focusAction: (dottedName: string) => void
  isFocused: boolean
}

export default function ActionCard({
  evaluation,
  total,
  rule,
  focusAction,
}: Props) {
  const { t } = useClientTranslation()

  const { rules } = useEngine()

  const {
    categories,
    actionChoices,
    toggleActionChoice,
    setActionChoiceValue,
  } = useForm()

  const hasSelectedAction =
    Object.values(actionChoices).filter((value) => value).length > 0

  const { nodeValue, dottedName, title, missingVariables } = evaluation
  const { icônes: icons } = rule

  const flatRule = rules[dottedName]
  if (!flatRule.formule) {
    console.log(missingVariables)
  }

  const hasFormula = flatRule.formule

  const isDisabled = !hasFormula
    ? false
    : nodeValue === 0 || nodeValue === false || nodeValue === null

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

  const foundCategory = categories.find(
    (cat: string) => cat === dottedName.split(' . ')[0]
  )

  const categoryRuleObject = useRule(foundCategory)

  const categoryColor =
    categoryRuleObject?.color ||
    rules[dottedName.split(' . ')[0]]?.couleur ||
    'var(--color)'

  return (
    <div
      className={`relative flex h-[16rem] w-full flex-col items-center overflow-auto rounded-lg border-4 border-solid ${
        !hasFormula ? 'h-[13rem]' : ''
      }`}
      style={{ borderColor: categoryColor }}>
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
              onClick={() => focusAction(dottedName)}
              title={remainingQuestionsText}
              number={nbRemainingQuestions}
            />
          )}

          {hasRemainingQuestions && (
            <button
              className="cursor-pointer text-primary"
              onClick={() => focusAction(dottedName)}>
              {remainingQuestionsText}
            </button>
          )}
        </div>
        <div className="mb-4 flex justify-evenly gap-4">
          <button
            title={t("Choisir l'action")}
            type="button"
            aria-pressed={actionChoices[dottedName]}
            className={hasRemainingQuestions ? 'grayscale' : ''}
            onClick={() => {
              if (hasRemainingQuestions) {
                focusAction(dottedName)
                return null
              }

              toggleActionChoice(dottedName)

              if (!hasSelectedAction) {
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
              setActionChoiceValue(
                dottedName,
                actionChoices[dottedName] === false ? null : false
              )
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
