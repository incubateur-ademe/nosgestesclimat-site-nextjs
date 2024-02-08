import Trans from '@/components/translation/Trans'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { SimulationRecap } from '@/types/organizations'
import { SetStateAction, useContext } from 'react'
import { MultiValue, SingleValue } from 'react-select'
import { FiltersContext } from '../FiltersProvider'

function extractPostalCodesFromSimulationRecaps({
  simulationRecaps,
  filteredSimulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
  filteredSimulationRecaps: SimulationRecap[]
}) {
  const postalCodes = simulationRecaps.map(
    (simulationRecap) =>
      simulationRecap.defaultAdditionalQuestionsAnswers.postalCode
  )

  const uniquePostalCodes = Array.from(new Set(postalCodes)).sort()

  const filteredPostalCodes = filteredSimulationRecaps.map(
    (simulationRecap) =>
      simulationRecap.defaultAdditionalQuestionsAnswers.postalCode
  )

  return uniquePostalCodes.map((postalCode) => {
    return {
      value: postalCode,
      label: `${postalCode} (${
        filteredPostalCodes.filter((code) => code === postalCode).length
      })`,
      isDisabled: !filteredPostalCodes.includes(postalCode),
    }
  })
}

export default function DepartementFilter({
  simulationRecaps,
  filteredSimulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
  filteredSimulationRecaps: SimulationRecap[]
}) {
  const { setPostalCodeFilters } = useContext(FiltersContext)

  function handleSaveSelectionToLocalStorage(
    selectedOptions: MultiValue<string | number> | SingleValue<string | number>
  ) {
    setPostalCodeFilters(
      selectedOptions as unknown as SetStateAction<{ value: string }[]>
    )
  }

  const options = extractPostalCodesFromSimulationRecaps({
    simulationRecaps,
    filteredSimulationRecaps,
  })

  return (
    <ComplexSelect
      className="w-56"
      name="age"
      isMulti
      isSearchable
      // @ts-expect-error fix this
      options={options}
      placeholder={<Trans>Département</Trans>}
      onChange={handleSaveSelectionToLocalStorage}
    />
  )
}
