import Trans from '@/components/translation/Trans'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { extractPostalCodesFromSimulationRecaps } from '@/helpers/organisations/extractPostalCodesFromSimulationRecaps'
import { SimulationRecap } from '@/types/organisations'
import { SetStateAction, useContext } from 'react'
import { MultiValue, SingleValue } from 'react-select'
import { FiltersContext } from '../FiltersProvider'

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
