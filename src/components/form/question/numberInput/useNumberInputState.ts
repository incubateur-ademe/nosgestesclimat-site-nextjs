import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'
import { useDebounce } from '@/utils/debounce'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Evaluation } from 'publicodes'
import { useEffect, useState } from 'react'
import type { NumberFormatValues, SourceInfo } from 'react-number-format'

interface FuncProps {
  question: DottedName
  unit?: string
  value?: Evaluation<number>
  placeholder?: string
  setValue: (value: number | undefined) => void
  assistance?: DottedName
}

export const useNumberInputState = ({
  question,
  unit: defaultUnit,
  value,
  placeholder,
  assistance,
  setValue,
}: FuncProps) => {
  const { engine, addToEngineSituation } = useEngine()

  const { updateCurrentSimulation, foldedSteps } = useCurrentSimulation()

  const { situationValue: situationValueQuestion } = useRule(question)

  const defaultValue: Partial<NumberFormatValues> = {
    value: undefined,
    floatValue: value ?? undefined,
  }
  const [currentValues, setCurrentValues] = useState(defaultValue)

  const {
    parent: assistanceParent,
    unit: assistanceUnit,
    situationValue: situationValueAssistance,
  } = useRule(assistance ?? 'bilan')
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

  // La valeur peut être mise à jour depuis l'exterieur (via les boutons de suggestion par exemple)
  // Quand ça arrive, la valeur de `value` et `currentValues` sont désynchronisées.
  // Pour reset le champs avec la valeur passée en prop, on reset `currentValues.value` a undefined.
  useEffect(() => {
    if (value !== null && value != currentValues.floatValue) {
      setCurrentValues(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  function syncQuestionAndAssistance(nextValue: number | undefined) {
    const newFoldedSteps = foldedSteps.includes(question)
      ? foldedSteps
      : [...foldedSteps, question]

    if (!assistance) {
      setValue(nextValue)
      return
    }

    const newEngine = engine!.setSituation(
      { [assistance]: nextValue },
      { keepPreviousSituation: true }
    )
    const questionNodeValue = safeEvaluateHelper(assistanceParent, newEngine)

    const safeAndCleanSituation = addToEngineSituation({
      [assistance]: nextValue,
      [question]: questionNodeValue?.nodeValue,
    })

    updateCurrentSimulation({
      situation: safeAndCleanSituation,
      foldedSteps: newFoldedSteps,
    })
  }

  const handleValueChange = (
    values: NumberFormatValues,
    sourceInfo: SourceInfo
  ) => {
    // Ignore updates triggered by a prop change (external value update),
    // only process genuine user-input events to avoid feedback loops.
    if ((sourceInfo.source as string) !== 'event') return

    if (assistance && currentUnit === assistanceUnit) {
      syncQuestionAndAssistance(values.floatValue)
      return
    }

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
        ? '0'
        : currentValues.value === undefined
          ? placeholder
          : '',
    handleValueChange,
  }
}
