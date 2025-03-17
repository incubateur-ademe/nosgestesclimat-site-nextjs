'use client'

import Trans from '@/components/translation/trans/TransClient'
import { organisationsResultatsDetaillesFilterByPostalCode } from '@/constants/tracking/pages/organisationsResultatsDetailles'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { extractPostalCodesFromSimulations } from '@/helpers/organisations/extractPostalCodesFromSimulations'
import type { Simulation } from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { SetStateAction } from 'react'
import { useContext } from 'react'
import type { MultiValue, SingleValue } from 'react-select'
import { FiltersContext } from '../FiltersProvider'

export default function DepartementFilter({
  simulations,
  filteredSimulations,
}: {
  simulations: Simulation[]
  filteredSimulations: Simulation[]
}) {
  const { setPostalCodeFilters } = useContext(FiltersContext)

  function handleSaveSelectionToLocalStorage(
    selectedOptions: MultiValue<string | number> | SingleValue<string | number>
  ) {
    trackEvent(
      organisationsResultatsDetaillesFilterByPostalCode(
        JSON.stringify(selectedOptions)
      )
    )
    setPostalCodeFilters(
      selectedOptions as unknown as SetStateAction<{ value: string }[]>
    )
  }

  const options = extractPostalCodesFromSimulations({
    simulations,
    filteredSimulations,
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
