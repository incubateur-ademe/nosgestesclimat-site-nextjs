import { useEngine, useFormState, useRule } from '@/publicodes-state'

import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'

interface Props {
  question: DottedName
  assistance: DottedName
  setTempValue?: (value: number | undefined) => void
  setDisplayedValue?: (value: string | undefined) => void
}

export default function Assistance({ question, assistance }: Props) {
  const { setValue: setValueOfQuestion } = useRule(question)

  const { engine } = useEngine()

  const { currentCategory } = useFormState()

  const { type, label, description, unit, parent } = useRule(assistance)

  function handleSetValueOfAssistance(value: number | undefined) {
    if (value === undefined) {
      return
    }
    // We do a intermediate calculation, where we use the publicodes
    // rules only to compute the value of the question from the assistance value
    //
    // Ideally, this would be handled in the model itself
    const newEngine = engine!.setSituation(
      { [assistance]: value },
      { keepPreviousSituation: true }
    )
    const valueOfQuestion = safeEvaluateHelper(parent, newEngine)
    setValueOfQuestion(valueOfQuestion?.nodeValue, {
      questionDottedName: question,
    })
  }
  return (
    <div
      className={twMerge(
        'mb-4 w-[20rem] max-w-full rounded-xl border-2 p-4 sm:w-2/3',
        getBgCategoryColor(currentCategory, '50'),
        getBorderCategoryColor(currentCategory, '200')
      )}>
      <Label
        question={question}
        size="sm"
        label={label}
        description={description}
        titleClassName="text-sm md:text-base font-normal"
        className="mb-2"
      />
      {type === 'number' && (
        <NumberInput
          unit={unit ? unit.split('/')[0] : ''}
          setValue={handleSetValueOfAssistance}
        />
      )}
    </div>
  )
}
