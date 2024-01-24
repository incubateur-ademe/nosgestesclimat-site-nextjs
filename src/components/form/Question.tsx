import Assistance from '@/components/form/question/Assistance'
import BooleanInput from '@/components/form/question/BooleanInput'
import ChoicesInput from '@/components/form/question/ChoicesInput'
import Label from '@/components/form/question/Label'
import Mosaic from '@/components/form/question/Mosaic'
import Notification from '@/components/form/question/Notification'
import NumberInput from '@/components/form/question/NumberInput'
import Suggestions from '@/components/form/question/Suggestions'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import { useRule } from '@/publicodes-state'
import Trans from '../translation/Trans'
import Avertissement from './question/Avertissement'

type Props = {
  question: string
  tempValue?: number
  setTempValue?: (value: number | undefined) => void
  avertissement?: string | React.ReactNode
  plancher?: number
}

export default function Question({
  question,
  tempValue,
  setTempValue,
  avertissement,
  plancher,
}: Props) {
  const {
    type,
    label,
    description,
    unit,
    value,
    numericValue,
    setValue,
    isMissing,
    choices,
    assistance,
    activeNotifications,
  } = useRule(question)

  return (
    <>
      <div className="mb-4">
        <Label
          question={question}
          label={label}
          description={description}
          htmlFor={DEFAULT_FOCUS_ELEMENT_ID}
        />
        <Suggestions question={question} />
        {type === 'number' && (
          <NumberInput
            unit={unit}
            value={numericValue}
            setValue={(value) => {
              if (
                setTempValue !== undefined &&
                plancher !== undefined &&
                value !== undefined &&
                value < plancher
              ) {
                setTempValue(value)

                return
              } else if (setTempValue !== undefined) {
                setTempValue(undefined)
              }

              const limit = 0
              setValue(value < limit ? limit : value, question)
            }}
            isMissing={isMissing}
            min={0}
            data-cypress-id={question}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'boolean' && (
          <BooleanInput
            value={value}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
            data-cypress-id={question}
            label={label || ''}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'choices' && (
          <ChoicesInput
            question={question}
            choices={choices}
            value={String(value)}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
            data-cypress-id={question}
            label={label || ''}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'mosaic' && <Mosaic question={question} />}
      </div>
      {assistance ? (
        <Assistance question={question} assistance={assistance} />
      ) : null}
      {activeNotifications.map((notification) => (
        <Notification key={notification} notification={notification} />
      ))}
      {plancher !== undefined &&
        tempValue !== undefined &&
        tempValue < plancher && (
          <Avertissement
            avertissement={
              avertissement ?? (
                <span>
                  <Trans>La valeur minimum pour ce champ est de</Trans>{' '}
                  {plancher}
                </span>
              )
            }
          />
        )}
    </>
  )
}
