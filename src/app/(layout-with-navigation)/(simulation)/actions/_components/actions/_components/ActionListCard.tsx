import image1Src from '@/assets/images/2714.svg'
import image2Src from '@/assets/images/274C.svg'
import Link from '@/components/Link'
import {
  getMatomoEventActionAccepted,
  getMatomoEventActionRejected,
} from '@/constants/matomo'
import NotificationBubble from '@/design-system/alerts/NotificationBubble'
import { extractCategoriesNamespaces } from '@/helpers/publicodes/extractCategoriesNamespaces'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useForm, useUser } from '@/publicodes-state'
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

export default function ActionListCard({
  evaluation,
  total,
  rule,
  focusAction,
  isFocused,
}: Props) {
  const { t } = useClientTranslation()

  const { rules } = useEngine()

  const { getCurrentSimulation } = useUser()

  const { nodeValue, dottedName, title } = evaluation
  const { icônes: icons } = rule

  const { actionChoices } = getCurrentSimulation()

  const flatRule = rules[dottedName]

  const hasFormula = flatRule.formule

  const isDisabled =
    !hasFormula || nodeValue === 0 || nodeValue === false || nodeValue === null

  const { remainingQuestions } = useForm()

  const { getValue } = useEngine()

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

  const categories = extractCategoriesNamespaces(rules, getValue)
  const foundCategory = categories.find(
    (cat) => cat.dottedName === dottedName.split(' . ')[0]
  )

  const categoryColor =
    foundCategory?.color ||
    rules[dottedName.split(' . ')[0]]?.couleur ||
    'var(--color)'

  return (
    <div
      className={`relative w-full flex flex-col justify-between items-center h-[14.5rem] ${
        !hasFormula ? 'h-[13rem]' : ''
      } ${hasRemainingQuestions ? 'bg-gray-100' : ''} ${
        isDisabled ? 'opacity-80 text-gray-500' : ''
      } ${isFocused ? 'border-4 border-solid border-green-500' : ''} ${
        actionChoices[evaluation.dottedName]
          ? 'border-4 border-solid border-green-500 bg-green-700'
          : ''
      }`}>
      <div
        style={{ backgroundColor: categoryColor }}
        className="flex items-center w-full h-[6rem]">
        <Link
          className="z-10 no-underline"
          href={'/actions/' + encodeRuleName(dottedName)}>
          <h2 className="text-center font-bold inline-block text-white">
            {title}
          </h2>
        </Link>
        {icons && (
          <span className="absolute top-[10%] -translate-x-1/2 left-1/2 text-2xl whitespace-nowrap grayscale opacity-30">
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
              className="text-primary cursor-pointer"
              onClick={() => focusAction(dottedName)}>
              {remainingQuestionsText}
            </button>
          )}
        </div>
        <div className="flex justify-evenly mb-4">
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
              className={`w-12 ${isDisabled ? 'grayscale' : ''}`}
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
              className={`w-12 ${isDisabled ? 'grayscale' : ''}`}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  )
}
