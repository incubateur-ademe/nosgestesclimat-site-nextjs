import Trans from '@/components/translation/Trans'
import ComplexSelect from '@/design-system/inputs/ComplexSelect'
import { SimulationRecap } from '@/types/organizations'
import { useContext, useEffect, useState } from 'react'
import { MultiValue, SingleValue } from 'react-select'
import { FiltersContext } from '../FiltersProvider'

const STORAGE_KEY = 'ngc-organization-postalCode-filter'

function extractPostalCodesFromSimulationRecaps(
  simulationRecaps: SimulationRecap[]
) {
  const postalCodes = simulationRecaps.map(
    (simulationRecap) =>
      simulationRecap.defaultAdditionalQuestionsAnswers.postalCode
  )

  const arrayUniquePostalCodes = Array.from(new Set(postalCodes)).sort()

  return arrayUniquePostalCodes
}

export default function DepartementFilter({
  simulationRecaps,
  filteredSimulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
  filteredSimulationRecaps: SimulationRecap[]
}) {
  const [savedSelection, setSavedSelection] = useState<(string | number)[]>([])

  function handleSaveSelectionToLocalStorage(
    selectedOptions: MultiValue<string | number> | SingleValue<string | number>
  ) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedOptions))

    setPostalCodeFilters(selectedOptions)
  }

  useEffect(() => {
    const savedSelection = localStorage.getItem(STORAGE_KEY)

    if (savedSelection) {
      const parsedSelection = JSON.parse(savedSelection)
      setSavedSelection(parsedSelection)
    }
  }, [])

  const { setPostalCodeFilters } = useContext(FiltersContext)

  return (
    <ComplexSelect
      className="w-56"
      name="age"
      isMulti
      isSearchable
      options={extractPostalCodesFromSimulationRecaps(simulationRecaps).map(
        (postalCode) => ({
          value: postalCode,
          label: postalCode,
          isDisabled: !filteredSimulationRecaps.some(
            (simulationRecap) =>
              simulationRecap.defaultAdditionalQuestionsAnswers.postalCode ===
              postalCode
          ),
        })
      )}
      placeholder={<Trans>Département</Trans>}
      value={savedSelection as unknown as string | number}
      onChange={handleSaveSelectionToLocalStorage}
    />
  )
}
