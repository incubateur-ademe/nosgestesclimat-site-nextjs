'use client'

import Switch from '@/design-system/inputs/Switch'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'
import { useDebounce } from '@/utils/debounce'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Evaluation } from 'publicodes'
import { useEffect, useState, type ComponentProps } from 'react'
import type {
  NumberFormatValues,
  NumericFormat,
  SourceInfo,
} from 'react-number-format'
import RawNumberInput from './numberInput/RawNumberInput'

interface Props {
  question: DottedName
  unit?: string
  value?: Evaluation<number>
  placeholder?: string
  setValue: (value: number | undefined) => void
  id?: string
  className?: string
  assistance?: DottedName
}

export default function NumberInput({
  question,
  unit: unitFromProps,
  value,
  placeholder,
  setValue,
  className,
  id,
  assistance,
  ...props
}: ComponentProps<typeof NumericFormat> & Props) {
  const defaultValue: Partial<NumberFormatValues> = {
    value: undefined,
    floatValue: value ?? undefined,
  }
  const [currentValues, setCurrentValues] = useState(defaultValue)

  const { engine, addToEngineSituation } = useEngine()
  const { t } = useClientTranslation()

  const { updateCurrentSimulation, foldedSteps, situation } =
    useCurrentSimulation()

  const { situationValue: situationValueQuestion } = useRule(question)

  const {
    parent: assistanceParent,
    unit: assistanceUnit,
    situationValue: situationValueAssistance,
  } = useRule(assistance ?? 'bilan')

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

  const [unit, setUnit] = useState(assistance ? assistanceUnit : unitFromProps)

  function syncQuestionAndAssistance(nextValue: number | undefined) {
    const newFoldedSteps = foldedSteps.includes(question)
      ? foldedSteps
      : [...foldedSteps, question]

    if (!assistance) {
      setValue(nextValue)
      return
    }

    // When the user clears the field, remove both the assistance and the
    // question from the situation so the question falls back to its default.
    if (nextValue === undefined) {
      const newSituation = Object.fromEntries(
        Object.entries(situation).filter(
          ([key]) => key !== assistance && key !== question
        )
      )
      engine?.setSituation(newSituation)
      updateCurrentSimulation({
        situation: newSituation,
        foldedSteps: newFoldedSteps,
      })
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

    setCurrentValues(values)

    if (assistance && unit === assistanceUnit) {
      syncQuestionAndAssistance(values.floatValue)
      return
    } else if (assistance && unit === unitFromProps) {
      syncQuestionAndAssistance(undefined)
      return
    }

    debouncedSetValue(values.floatValue)
  }

  return (
    <>
      {assistance && (
        <div className="mt-4 flex justify-start">
          <Switch
            className="mb-2 w-28"
            aria-label={t(
              'simulator.specialQuestions.electricity_consumption',
              'Sélectionner le mode de saisie, {{unit}} sélectionné',
              {
                unit,
              }
            )}
            options={[
              {
                // Leave white space around symbol to have a similar width
                label: assistanceUnit,
                isSelected: unit === assistanceUnit,
                'data-testid': 'switch-assistance-unit',
                onClick: () => {
                  if (unit !== assistanceUnit) setUnit(assistanceUnit)
                },
              },
              {
                label: unitFromProps,
                isSelected: unit === unitFromProps,
                'data-testid': `switch-main-unit`,
                onClick: () => {
                  if (unit !== unitFromProps) setUnit(unitFromProps)
                },
              },
            ]}
          />
        </div>
      )}

      <RawNumberInput
        className={className}
        key={unit}
        value={
          (unit === assistanceUnit
            ? situationValueAssistance
            : (currentValues.value ??
              currentValues.floatValue ??
              situationValueQuestion)) as Evaluation<number>
        }
        placeholder={
          unit === assistanceUnit
            ? '0'
            : currentValues.value === undefined
              ? placeholder
              : ''
        }
        handleValueChange={handleValueChange}
        unit={unit}
        id={id}
        {...props}
      />
    </>
  )
}
