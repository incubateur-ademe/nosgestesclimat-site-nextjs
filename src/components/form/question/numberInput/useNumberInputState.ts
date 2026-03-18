import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'
import { useDebounce } from '@/utils/debounce'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Evaluation } from 'publicodes'
import { useEffect, useState } from 'react'
import type { NumberFormatValues, SourceInfo } from 'react-number-format'

export interface NumberInputStateProps {
  question: DottedName
  unit?: string
  value?: Evaluation<number>
  placeholder?: string
  setValue: (value: number | undefined) => void
  // An optional related publicodes rule whose value drives the question's value
  // (e.g. entering a distance in km to compute a yearly footprint).
  assistance?: DottedName
}

export const useNumberInputState = ({
  question,
  unit: defaultUnit,
  value,
  placeholder,
  assistance,
  setValue,
}: NumberInputStateProps) => {
  const { engine, addToEngineSituation } = useEngine()

  const { updateCurrentSimulation, foldedSteps } = useCurrentSimulation()

  const { situationValue: situationValueQuestion } = useRule(question)

  // `value` (string) drives react-number-format display; `floatValue` is the numeric truth.
  // Starting with value=undefined lets react-number-format manage its own display string.
  const defaultValue: Partial<NumberFormatValues> = {
    value: undefined,
    floatValue: value ?? undefined,
  }
  const [currentValues, setCurrentValues] = useState(defaultValue)

  // Keep local state in sync when the value prop changes externally
  // (e.g. a suggestion button sets a new value).
  useEffect(() => {
    if (value !== null && value != currentValues.floatValue) {
      setCurrentValues(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const {
    parent: assistanceParent,
    unit: assistanceUnit,
    situationValue: situationValueAssistance,
    // Default to "bilan" to avoid an error
  } = useRule(assistance ?? 'bilan')

  // Default to the assistance unit when an assistance rule is provided,
  // so the input label matches the unit the user is expected to type in.
  const [currentUnit, updateCurrentUnit] = useState(
    assistance ? assistanceUnit : defaultUnit
  )

  const debouncedSetValue = useDebounce((nextValue: number | undefined) => {
    setCurrentValues({
      value: undefined,
      floatValue: nextValue,
    })

    setValue(nextValue)
  }, 300)

  // Back-propagate the derived value to the parent question rule
  // so both stay consistent in the simulation situation
  function syncQuestionAndAssistance({
    nextValue,
    assistanceDottedName,
  }: {
    nextValue: number | undefined
    assistanceDottedName: DottedName
  }) {
    // Mark the question as answered in the foldedSteps when
    // updating the assistance value
    const newFoldedSteps = foldedSteps.includes(question)
      ? foldedSteps
      : [...foldedSteps, question]

    // Speculatively apply the assistance value to compute what the question's
    // value would be, without committing to the global situation yet.
    const newEngine = engine!.setSituation(
      { [assistanceDottedName]: nextValue },
      { keepPreviousSituation: true }
    )
    const questionNodeValue = safeEvaluateHelper(assistanceParent, newEngine)

    // Persist both the assistance and the derived question values atomically.
    const safeAndCleanSituation = addToEngineSituation({
      [assistanceDottedName]: nextValue,
      [question]: questionNodeValue?.nodeValue,
    })

    updateCurrentSimulation({
      situation: safeAndCleanSituation,
      foldedSteps: newFoldedSteps,
    })
  }

  const debouncedSyncQuestionAndAssistance = useDebounce(
    syncQuestionAndAssistance,
    300
  )

  const handleValueChange = (
    values: NumberFormatValues,
    sourceInfo: SourceInfo
  ) => {
    // Ignore updates triggered by a prop change (external value update),
    // only process genuine user-input events to avoid feedback loops.
    if ((sourceInfo.source as string) !== 'event') return

    // When the displayed unit matches the assistance unit, route through the
    // sync helper so both rules are updated together.
    if (assistance && currentUnit === assistanceUnit) {
      debouncedSyncQuestionAndAssistance({
        nextValue: values.floatValue,
        assistanceDottedName: assistance,
      })
      return
    }

    // Default case
    debouncedSetValue(values.floatValue)
  }

  return {
    currentUnit,
    assistanceUnit,
    updateCurrentUnit,
    value:
      currentUnit && currentUnit === assistanceUnit
        ? situationValueAssistance
        : (currentValues.value ??
          currentValues.floatValue ??
          situationValueQuestion),
    placeholder:
      currentUnit && currentUnit === assistanceUnit
        ? // There is no placeholder value for assistance
          '0'
        : currentValues.value === undefined
          ? placeholder
          : '',
    handleValueChange,
  }
}
