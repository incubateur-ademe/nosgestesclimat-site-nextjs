import image1Src from '@/assets/images/2714.svg'
import image2Src from '@/assets/images/274C.svg'
import Link from '@/components/Link'
import {
  getMatomoEventActionAccepted,
  getMatomoEventActionRejected,
} from '@/constants/matomo'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useRule, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import Image from 'next/image'
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
  console.log(evaluation)
  const { t } = useClientTranslation()

  const { rules } = useEngine()

  const { categories } = useForm()

  const { getCurrentSimulation } = useUser()

  const { nodeValue, dottedName, title } = evaluation
  const { icônes: icons } = rule

  const { actionChoices = [] } = getCurrentSimulation()

  const flatRule = rules[dottedName]

  const hasFormula = flatRule.formule

  const isDisabled =
    !hasFormula || nodeValue === 0 || nodeValue === false || nodeValue === null

  const { remainingQuestions } = useForm()

  const nbRemainingQuestions = remainingQuestions.length

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
      className={`relative flex h-[15rem] w-full flex-col items-center justify-between overflow-auto rounded-lg border-4 border-solid ${
        !hasFormula ? 'h-[13rem]' : ''
      }`}
      style={{ borderColor: categoryColor }}>
      <div
        style={{ backgroundColor: categoryColor }}
        className="flex h-[7rem] w-full items-center">
        <Link
          className="z-10 w-full no-underline"
          href={'/actions/' + encodeRuleName(dottedName)}>
          <h2 className="inline-block w-full text-center text-lg font-bold text-white">
            {title}
          </h2>
        </Link>

        {icons && (
          <span className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-8 whitespace-nowrap text-[4rem] opacity-20 grayscale ">
            {icons}
          </span>
        )}
      </div>

      <div className="mt-auto">
        <div className="relative mb-6">
          <div className={hasRemainingQuestions ? 'blur grayscale' : ''}>
            <ActionValue
              dottedName={dottedName}
              total={total}
              isDisabled={isDisabled}
              hasFormula={hasFormula}
            />
          </div>

          {hasRemainingQuestions && (
            <NotificationBubble
              onClick={() => focusAction(dottedName)}
              title={remainingQuestionsText}
              number={remainingQuestions.length}
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
            aria-pressed={actionChoices[dottedName]}
            className={hasRemainingQuestions ? 'grayscale' : ''}
            onClick={(e) => {
              if (hasRemainingQuestions) {
                focusAction(dottedName)
                return null
              }

              /*
              TODO : implement action selection logic
              dispatch(
                setActionChoice(
                  dottedName,
                  actionChoices[dottedName] === true ? null : true
                )
              )
              */
              if (!actionChoices[dottedName]) {
                trackEvent(getMatomoEventActionAccepted(dottedName, nodeValue))
              }
              e.stopPropagation()
              e.preventDefault()
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
              /*
              dispatch(
                setActionChoice(
                  dottedName,

                  actionChoices[dottedName] === false ? null : false
                )
              )
              */
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
