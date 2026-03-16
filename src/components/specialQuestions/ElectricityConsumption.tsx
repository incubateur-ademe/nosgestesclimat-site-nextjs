import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'

import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'
import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import Switch from '@/design-system/inputs/Switch'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'
import type { Evaluation } from 'publicodes'
import { useState } from 'react'
import { ELECTRICITY_CONSUMPTION_RULENAME } from '.'

const ELECTRICITY_COST =
  'logement . électricité . réseau . consommation estimée via le coût . saisie'

type InputMode = 'cost' | 'consumption'

export default function ElectricityConsumption() {
  const [mode, setMode] = useState<InputMode>('cost')

  const {
    label: labelConsumption,
    unit: unitConsumption,
    value: valueConsumption,
    situationValue: situationValueConsumption,
    setValue: setValueOfConsumption,
    isMissing: isMissingConsumption,
  } = useRule(ELECTRICITY_CONSUMPTION_RULENAME)

  const {
    unit: unitCost,
    value: valueCost,
    parent: costParent,
    situationValue: situationValueCost,
    isMissing: isMissingCost,
  } = useRule(ELECTRICITY_COST)

  const { engine, addToEngineSituation } = useEngine()

  const { updateCurrentSimulation, foldedSteps } = useCurrentSimulation()

  const { t } = useClientTranslation()

  const locale = useLocale()

  function handleSetValueOfCost(value: number | undefined) {
    if (value === undefined) {
      return
    }

    // We do an intermediate calculation, where we use the publicodes
    // rules only to compute the value of the question from the cost value
    //
    // Ideally, this would be handled in the model itself
    const newEngine = engine!.setSituation(
      { [ELECTRICITY_COST]: value },
      { keepPreviousSituation: true }
    )
    const valueOfConsumption = safeEvaluateHelper(costParent, newEngine)

    // We update both the cost and the consumption in a single atomic call
    // to avoid situation closure issues (two consecutive setValue calls
    // would lose the first update due to stale closure over `situation`)
    const safeAndCleanSituation = addToEngineSituation({
      [ELECTRICITY_COST]: value,
      [ELECTRICITY_CONSUMPTION_RULENAME]: valueOfConsumption?.nodeValue,
    })

    const newFoldedSteps = foldedSteps.includes(
      ELECTRICITY_CONSUMPTION_RULENAME
    )
      ? foldedSteps
      : [...foldedSteps, ELECTRICITY_CONSUMPTION_RULENAME]

    updateCurrentSimulation({
      situation: safeAndCleanSituation,
      foldedSteps: newFoldedSteps,
    })
  }

  const isCostMode = mode === 'cost'
  const modeString = isCostMode ? t('coût') : t('consommation en kWh')

  return (
    <div className="w-full">
      <Label
        question={ELECTRICITY_CONSUMPTION_RULENAME}
        label={labelConsumption}
      />

      <div className="flex w-44 justify-end">
        <Switch
          className="mb-2"
          aria-label={t(
            'simulator.specialQuestions.electricity_consumption',
            'Sélectionner le mode de saisie, {{mode}} sélectionné',
            {
              mode: modeString,
            }
          )}
          options={[
            {
              // Leave white space around symbol to have a similar width
              label: '  €  ',
              isSelected: isCostMode,
              'data-testid': 'switch-electricity-cost',
              onClick: () => {
                if (mode !== 'cost') setMode('cost')
              },
            },
            {
              label: 'kWh',
              isSelected: mode === 'consumption',
              'data-testid': 'switch-electricity-consumption',
              onClick: () => {
                if (mode !== 'consumption') setMode('consumption')
              },
            },
          ]}
        />
      </div>

      <NumberInput
        key={`${mode}-${ELECTRICITY_CONSUMPTION_RULENAME}`}
        unit={isCostMode ? unitCost : unitConsumption}
        className="w-44 max-w-none"
        value={
          (isCostMode
            ? situationValueCost
            : situationValueConsumption) as Evaluation<number>
        }
        setValue={(value) => {
          if (isCostMode) {
            handleSetValueOfCost(value)
          } else {
            setValueOfConsumption(value, {
              questionDottedName: ELECTRICITY_CONSUMPTION_RULENAME,
            })
          }
        }}
        placeholder={
          isCostMode
            ? isMissingCost && typeof valueCost === 'number'
              ? valueCost.toLocaleString(locale, {
                  maximumFractionDigits: valueCost < 10 ? 1 : 0,
                })
              : ''
            : isMissingConsumption && typeof valueConsumption === 'number'
              ? valueConsumption.toLocaleString(locale, {
                  maximumFractionDigits: valueConsumption < 10 ? 1 : 0,
                })
              : ''
        }
        data-testid={ELECTRICITY_CONSUMPTION_RULENAME}
        id={DEFAULT_FOCUS_ELEMENT_ID}
        aria-describedby={`${QUESTION_DESCRIPTION_BUTTON_ID}-content warning-message notification-message`}
        aria-labelledby="question-label"
      />
    </div>
  )
}
