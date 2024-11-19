import Trans from '@/components/translation/Trans'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { getAgeFilterOptions } from '@/helpers/organisations/getAgeFilterOptions'
import type { SimulationRecap } from '@/types/organisations'
import type { SetStateAction} from 'react';
import { useContext } from 'react'
import type { MultiValue, SingleValue } from 'react-select'
import { FiltersContext } from '../FiltersProvider'

export default function AgeFilter({
  filteredSimulationRecaps,
}: {
  filteredSimulationRecaps: SimulationRecap[]
}) {
  const { setAgeFilters } = useContext(FiltersContext)

  function handleChange(
    selectedOptions: MultiValue<string | number> | SingleValue<string | number>
  ) {
    setAgeFilters(
      selectedOptions as unknown as SetStateAction<
        { value: [number, number] }[]
      >
    )
  }

  const options = getAgeFilterOptions({
    filteredSimulationRecaps,
  }) as unknown as {
    value: string
    label: string
    isDisabled?: boolean
  }[]

  return (
    <ComplexSelect
      className={`w-56 ${options.length <= 1 ? 'cursor-not-allowed' : ''}`}
      name="age"
      isMulti
      // @ts-expect-error fix this
      options={options}
      onClick={
        options.length <= 1 ? (e: MouseEvent) => e.stopPropagation() : undefined
      }
      placeholder={<Trans>Tranche d'âge</Trans>}
      onChange={handleChange}
    />
  )
}
